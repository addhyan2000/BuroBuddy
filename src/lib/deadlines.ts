import type { ActiveEvent, DeadlineRule, Process, Profile } from '../data/types';
import { addDays, diffDays, todayISO } from './dates';

export function eventDateFor(process: Process, events: ActiveEvent[]): string | undefined {
  return events.find((e) => e.id === process.event)?.date;
}

export function deadlineDate(
  rule: DeadlineRule,
  profile: Profile,
  events: ActiveEvent[],
  process: Process,
): string | undefined {
  const anchors: Record<DeadlineRule['anchor'], string | undefined> = {
    moveIn: profile.moveInDate,
    arrival: profile.arrivalDate,
    semesterStart: profile.semesterStart,
    visaExpiry: profile.visaExpiry,
    event: eventDateFor(process, events),
  };
  const base = anchors[rule.anchor];
  if (!base) return undefined;
  return addDays(base, rule.offsetDays);
}

export type Urgency = 'overdue' | 'soon' | 'ok' | 'none';

export function urgency(iso?: string, from: string = todayISO()): Urgency {
  if (!iso) return 'none';
  const n = diffDays(iso, from);
  if (n < 0) return 'overdue';
  if (n <= 14) return 'soon';
  return 'ok';
}
