export type EventId = 'arrive-study' | 'new-job' | 'move-city' | 'leave-germany';

export type Phase = 'before' | 'first-weeks' | 'first-months' | 'ongoing';

export type Category =
  | 'Registration'
  | 'Immigration'
  | 'Health'
  | 'Tax'
  | 'Money'
  | 'University'
  | 'Home'
  | 'Work';

export type Anchor = 'moveIn' | 'arrival' | 'semesterStart' | 'visaExpiry' | 'event';

export interface DeadlineRule {
  anchor: Anchor;
  offsetDays: number;
  kind: 'legal' | 'recommended';
  label: string;
}

export interface Process {
  id: string;
  event: EventId;
  phase: Phase;
  category: Category;
  title: string;
  german?: string;
  institution: string;
  summary: string;
  why: string;
  steps: string[];
  dependsOn: string[];
  needs: string[];
  produces: string[];
  deadline?: DeadlineRule;
  nonEUOnly?: boolean;
  optional?: boolean;
  typicalWait?: string;
  source?: { label: string; url: string };
}

export interface DocType {
  id: string;
  name: string;
  german?: string;
  hint: string;
}

export interface Impact {
  area: string;
  text: string;
  processIds: string[];
}

export interface LifeEvent {
  id: EventId;
  title: string;
  prompt: string;
  dateLabel: string;
  description: string;
  impacts: Impact[];
}

export interface Profile {
  name: string;
  from: string;
  nonEU: boolean;
  city: string;
  university: string;
  arrivalDate: string;
  moveInDate: string;
  semesterStart: string;
  visaExpiry?: string;
  sharedFlat: boolean;
}

export type Status = 'todo' | 'in_progress' | 'waiting' | 'done';

export interface TaskState {
  status: Status;
  note?: string;
  doneOn?: string;
  waitingSince?: string;
  deadlineOverride?: { date: string; label: string };
}

export interface VaultDoc {
  id: string;
  typeId: string;
  fileName?: string;
  addedOn: string;
  origin: 'demo' | 'upload' | 'letter' | 'step';
  fromId?: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  kind: 'step' | 'document' | 'letter' | 'event';
  title: string;
  detail?: string;
  link?: string;
}

export interface ActiveEvent {
  id: EventId;
  date: string;
  addedOn: string;
}

export interface Change {
  title: string;
  detail: string;
  affects: string[];
  link?: string;
}

export interface AppState {
  profile: Profile | null;
  events: ActiveEvent[];
  tasks: Record<string, TaskState>;
  documents: VaultDoc[];
  letters: Record<string, string>;
  timeline: TimelineEntry[];
  change: Change | null;
}
