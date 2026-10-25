import type { LifeEvent } from './types';

export const LIFE_EVENTS: LifeEvent[] = [
  {
    id: 'arrive-study',
    title: 'I arrived to study',
    prompt: 'Starting a degree in Germany',
    dateLabel: 'Arrival date',
    description: 'Registration, insurance, enrolment, and — if you are non-EU — your residence permit.',
    impacts: [
      {
        area: 'City hall',
        text: 'You must register your address (Anmeldung) shortly after moving in. Almost everything else waits on this paper.',
        processIds: ['anmeldung', 'tax-id', 'rundfunkbeitrag'],
      },
      {
        area: 'University',
        text: 'Enrolment needs health insurance confirmation and the semester contribution receipt.',
        processIds: ['health-insurance', 'pay-semester-fee', 'enrol'],
      },
      {
        area: 'Immigration',
        text: 'Non-EU students convert the visa into a residence permit before it expires.',
        processIds: ['student-visa', 'residence-permit'],
      },
    ],
  },
  {
    id: 'new-job',
    title: 'I got a job',
    prompt: 'Werkstudent, mini-job, or internship',
    dateLabel: 'First day of work',
    description: 'Your employer needs tax and social-security details. Students also have hour limits.',
    impacts: [
      {
        area: 'Tax & social security',
        text: 'You need your tax ID and, after the first job, a social security number.',
        processIds: ['work-hours-check', 'give-employer-docs', 'social-security-number'],
      },
      {
        area: 'Residence permit',
        text: 'Student permits usually allow limited work. Keep the contract in case the Ausländerbehörde asks.',
        processIds: ['work-hours-check'],
      },
    ],
  },
  {
    id: 'move-city',
    title: 'I am moving',
    prompt: 'New flat, same city or another one',
    dateLabel: 'Move-in date',
    description: 'Re-register the address, tell the Ausländerbehörde, and update bank, insurance, and university.',
    impacts: [
      {
        area: 'Registration',
        text: 'Ummeldung is required within 14 days of moving in — you need a new Wohnungsgeberbestätigung.',
        processIds: ['new-landlord-confirm', 'ummeldung'],
      },
      {
        area: 'Everywhere else',
        text: 'Residence permit, insurance, bank, and university all still have the old address until you tell them.',
        processIds: ['update-permit-address', 'update-contacts'],
      },
    ],
  },
  {
    id: 'leave-germany',
    title: 'I am leaving Germany',
    prompt: 'End of studies or moving abroad',
    dateLabel: 'Planned departure',
    description: 'Give notice on the flat, cancel contracts, deregister at city hall, and close the blocked account.',
    impacts: [
      {
        area: 'Home',
        text: 'Rental notice periods are often three months, in writing, and you need a handover protocol.',
        processIds: ['terminate-rental', 'flat-handover'],
      },
      {
        area: 'Exit admin',
        text: 'Abmeldung is the paper you use to stop GEZ, insurance, and to unfreeze leftover money.',
        processIds: ['abmeldung', 'cancel-contracts', 'close-blocked-account'],
      },
    ],
  },
];

export const lifeEvent = (id: string) => LIFE_EVENTS.find((e) => e.id === id);
