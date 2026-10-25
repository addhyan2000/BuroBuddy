import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { demoState, emptyState } from '../data/demo';
import { LETTERS, type LetterPreset } from '../data/letters';
import { lifeEvent } from '../data/events';
import { processById } from '../data/processes';
import type { ActiveEvent, AppState, EventId, Profile, Status, VaultDoc } from '../data/types';
import { todayISO } from '../lib/dates';

const KEY = 'burobuddy-state-v1';

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    /* ignore */
  }
  return emptyState();
}

function persist(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

interface Store {
  state: AppState;
  startDemo: () => void;
  startFresh: (profile: Profile, eventId: EventId, eventDate: string) => void;
  setStatus: (processId: string, status: Status, note?: string) => void;
  addEvent: (eventId: EventId, date: string) => void;
  addDocument: (typeId: string, fileName?: string) => void;
  applyLetter: (letterId: string) => LetterPreset | undefined;
  dismissChange: () => void;
  reset: () => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);

  const save = (next: AppState) => {
    persist(next);
    setState(next);
  };

  const api = useMemo<Store>(
    () => ({
      state,
      startDemo: () => save(demoState()),
      startFresh: (profile, eventId, eventDate) => {
        const event: ActiveEvent = { id: eventId, date: eventDate, addedOn: todayISO() };
        const life = lifeEvent(eventId);
        save({
          ...emptyState(),
          profile,
          events: [event],
          timeline: [
            {
              id: uid('t'),
              date: eventDate,
              kind: 'event',
              title: life?.title ?? eventId,
              detail: life?.description,
            },
          ],
        });
      },
      setStatus: (processId, status, note) => {
        const process = processById(processId);
        const prev = state.tasks[processId] ?? { status: 'todo' as Status };
        const task = {
          ...prev,
          status,
          note: note ?? prev.note,
          doneOn: status === 'done' ? todayISO() : prev.doneOn,
          waitingSince: status === 'waiting' ? todayISO() : prev.waitingSince,
        };
        let documents = state.documents;
        let timeline = state.timeline;
        if (status === 'done' && process) {
          const additions: VaultDoc[] = process.produces
            .filter((typeId) => !documents.some((d) => d.typeId === typeId))
            .map((typeId) => ({
              id: uid('d'),
              typeId,
              addedOn: todayISO(),
              origin: 'step' as const,
              fromId: processId,
            }));
          documents = [...documents, ...additions];
          timeline = [
            {
              id: uid('t'),
              date: todayISO(),
              kind: 'step',
              title: `Finished: ${process.title}`,
              link: `/task/${processId}`,
            },
            ...timeline,
          ];
        }
        save({ ...state, tasks: { ...state.tasks, [processId]: task }, documents, timeline });
      },
      addEvent: (eventId, date) => {
        if (state.events.some((e) => e.id === eventId)) return;
        const life = lifeEvent(eventId);
        save({
          ...state,
          events: [...state.events, { id: eventId, date, addedOn: todayISO() }],
          timeline: [
            {
              id: uid('t'),
              date: todayISO(),
              kind: 'event',
              title: life?.title ?? eventId,
              detail: `Dated ${date}`,
            },
            ...state.timeline,
          ],
        });
      },
      addDocument: (typeId, fileName) => {
        const doc: VaultDoc = {
          id: uid('d'),
          typeId,
          fileName,
          addedOn: todayISO(),
          origin: 'upload',
        };
        save({
          ...state,
          documents: [doc, ...state.documents],
          timeline: [
            { id: uid('t'), date: todayISO(), kind: 'document', title: `Added ${fileName ?? typeId}`, link: '/vault' },
            ...state.timeline,
          ],
        });
      },
      applyLetter: (letterId) => {
        const letter = LETTERS.find((l) => l.id === letterId);
        if (!letter) return undefined;
        let documents = state.documents;
        const tasks = { ...state.tasks };
        if (letter.docTypeId && !documents.some((d) => d.typeId === letter.docTypeId)) {
          documents = [
            ...documents,
            {
              id: uid('d'),
              typeId: letter.docTypeId,
              fileName: `${letter.id}.pdf`,
              addedOn: todayISO(),
              origin: 'letter',
              fromId: letter.id,
            },
          ];
        }
        if (letter.processId && letter.markDone) {
          tasks[letter.processId] = {
            ...(tasks[letter.processId] ?? { status: 'todo' }),
            status: 'done',
            doneOn: todayISO(),
            note: letter.detail,
          };
        } else if (letter.processId) {
          tasks[letter.processId] = {
            ...(tasks[letter.processId] ?? { status: 'todo' }),
            status: 'in_progress',
            note: letter.detail,
          };
        }
        save({
          ...state,
          documents,
          tasks,
          letters: { ...state.letters, [letter.id]: todayISO() },
          timeline: [
            {
              id: uid('t'),
              date: todayISO(),
              kind: 'letter',
              title: `Letter: ${letter.title}`,
              detail: letter.from,
            },
            ...state.timeline,
          ],
        });
        return letter;
      },
      dismissChange: () => save({ ...state, change: null }),
      reset: () => {
        localStorage.removeItem(KEY);
        setState(emptyState());
      },
    }),
    [state],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore outside provider');
  return ctx;
}
