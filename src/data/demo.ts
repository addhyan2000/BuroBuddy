import type { AppState, Profile } from './types';

export const DEMO_PROFILE: Profile = {
  name: 'Maya Sharma',
  from: 'India',
  nonEU: true,
  city: 'Munich',
  university: 'TUM',
  arrivalDate: '2026-09-12',
  moveInDate: '2026-09-18',
  semesterStart: '2026-10-01',
  visaExpiry: '2027-03-11',
  sharedFlat: true,
};

export const emptyState = (): AppState => ({
  profile: null,
  events: [],
  tasks: {},
  documents: [],
  letters: {},
  timeline: [],
  change: null,
});

export const demoState = (): AppState => ({
  profile: DEMO_PROFILE,
  events: [{ id: 'arrive-study', date: '2026-09-12', addedOn: '2026-09-12' }],
  tasks: {
    'blocked-account': { status: 'done', doneOn: '2026-07-02' },
    'health-insurance': { status: 'done', doneOn: '2026-08-10' },
    'student-visa': { status: 'done', doneOn: '2026-08-28' },
    'find-housing': { status: 'done', doneOn: '2026-09-04' },
    'pay-semester-fee': { status: 'done', doneOn: '2026-09-15' },
    enrol: { status: 'done', doneOn: '2026-09-28' },
    anmeldung: { status: 'done', doneOn: '2026-09-24' },
    'german-bank': { status: 'done', doneOn: '2026-10-02' },
    'residence-permit': { status: 'in_progress', note: 'Online appointment booked for 12 Nov.' },
    'tax-id': { status: 'waiting', waitingSince: '2026-09-24', note: 'Nothing in the WG mailbox yet.' },
    rundfunkbeitrag: { status: 'todo' },
  },
  documents: [
    { id: 'd1', typeId: 'passport', fileName: 'passport.pdf', addedOn: '2026-07-01', origin: 'demo' },
    { id: 'd2', typeId: 'admission-letter', fileName: 'TUM-admission.pdf', addedOn: '2026-06-12', origin: 'demo' },
    { id: 'd3', typeId: 'degree-certificates', fileName: 'bachelor-degree.pdf', addedOn: '2026-07-01', origin: 'demo' },
    { id: 'd4', typeId: 'blocked-account-confirmation', fileName: 'sperrkonto.pdf', addedOn: '2026-07-02', origin: 'step', fromId: 'blocked-account' },
    { id: 'd5', typeId: 'insurance-confirmation', fileName: 'TK-mitglied.pdf', addedOn: '2026-08-10', origin: 'step', fromId: 'health-insurance' },
    { id: 'd6', typeId: 'biometric-photo', fileName: 'photo.jpg', addedOn: '2026-08-01', origin: 'demo' },
    { id: 'd7', typeId: 'visa', fileName: 'visa-sticker.jpg', addedOn: '2026-08-28', origin: 'step', fromId: 'student-visa' },
    { id: 'd8', typeId: 'rental-contract', fileName: 'WG-mullerstr.pdf', addedOn: '2026-09-04', origin: 'step', fromId: 'find-housing' },
    { id: 'd9', typeId: 'wohnungsgeberbestaetigung', fileName: 'wgb.pdf', addedOn: '2026-09-18', origin: 'step', fromId: 'find-housing' },
    { id: 'd10', typeId: 'anmeldeformular', fileName: 'anmeldeformular.pdf', addedOn: '2026-09-20', origin: 'demo' },
    { id: 'd11', typeId: 'meldebescheinigung', fileName: 'meldebescheinigung.pdf', addedOn: '2026-09-24', origin: 'step', fromId: 'anmeldung' },
    { id: 'd12', typeId: 'fee-receipt', fileName: 'semesterbeitrag.pdf', addedOn: '2026-09-15', origin: 'step', fromId: 'pay-semester-fee' },
    { id: 'd13', typeId: 'enrolment-certificate', fileName: 'imma.pdf', addedOn: '2026-09-28', origin: 'step', fromId: 'enrol' },
    { id: 'd14', typeId: 'iban', fileName: 'n26-iban.pdf', addedOn: '2026-10-02', origin: 'step', fromId: 'german-bank' },
  ],
  letters: {},
  timeline: [
    { id: 't1', date: '2026-07-02', kind: 'step', title: 'Blocked account confirmed', link: '/task/blocked-account' },
    { id: 't2', date: '2026-08-28', kind: 'step', title: 'Student visa issued', link: '/task/student-visa' },
    { id: 't3', date: '2026-09-12', kind: 'event', title: 'Arrived in Munich to study at TUM' },
    { id: 't4', date: '2026-09-18', kind: 'event', title: 'Moved into the WG on Müllerstraße' },
    { id: 't5', date: '2026-09-24', kind: 'step', title: 'Registered at the KVR (Anmeldung)', link: '/task/anmeldung' },
    { id: 't6', date: '2026-09-28', kind: 'step', title: 'Enrolled at TUM', link: '/task/enrol' },
    { id: 't7', date: '2026-10-02', kind: 'document', title: 'German IBAN saved', link: '/vault' },
  ],
  change: {
    title: 'Munich residence-permit appointments',
    detail: 'The KVR now asks most students to book online. Walk-ins for first student permits are no longer accepted.',
    affects: ['residence-permit'],
    link: '/task/residence-permit',
  },
});
