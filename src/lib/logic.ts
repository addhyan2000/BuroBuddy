import { PROCESSES } from '../data/processes';
import type { AppState, Process, Status } from '../data/types';

export const PHASES: { id: Process['phase']; label: string }[] = [
  { id: 'before', label: 'Before arrival' },
  { id: 'first-weeks', label: 'First weeks' },
  { id: 'first-months', label: 'First months' },
  { id: 'ongoing', label: 'Keep going' },
];

export const STATUS_LABEL: Record<Status, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  waiting: 'Waiting',
  done: 'Done',
};

export function visibleProcesses(state: AppState): Process[] {
  const profile = state.profile;
  if (!profile) return [];
  const active = new Set(state.events.map((e) => e.id));
  return PROCESSES.filter((p) => active.has(p.event)).filter((p) => !p.nonEUOnly || profile.nonEU);
}

export function taskStatus(state: AppState, id: string): Status {
  return state.tasks[id]?.status ?? 'todo';
}

export function isBlocked(state: AppState, process: Process): boolean {
  return process.dependsOn.some((id) => taskStatus(state, id) !== 'done');
}

export function hasDoc(state: AppState, typeId: string): boolean {
  return state.documents.some((d) => d.typeId === typeId);
}

export function missingNeeds(state: AppState, process: Process): string[] {
  return process.needs.filter((id) => !hasDoc(state, id));
}

export function progress(state: AppState) {
  const list = visibleProcesses(state);
  const done = list.filter((p) => taskStatus(state, p.id) === 'done').length;
  return { done, total: list.length };
}
