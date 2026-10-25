export interface LetterPreset {
  id: string;
  title: string;
  from: string;
  detail: string;
  processId?: string;
  docTypeId?: string;
  markDone?: boolean;
}

export const LETTERS: LetterPreset[] = [
  {
    id: 'tax-id',
    title: 'Tax ID letter',
    from: 'Bundeszentralamt für Steuern',
    detail: 'Your 11-digit tax ID has arrived. Save it — employers will ask for it for the rest of your life in Germany.',
    processId: 'tax-id',
    docTypeId: 'tax-id-letter',
    markDone: true,
  },
  {
    id: 'kvr-appointment',
    title: 'Ausländerbehörde appointment',
    from: 'KVR München',
    detail: 'Your biometrics appointment is confirmed. Take the originals listed on the residence-permit checklist.',
    processId: 'residence-permit',
  },
  {
    id: 'rundfunk',
    title: 'Broadcasting fee letter',
    from: 'Beitragsservice',
    detail: 'They noticed a new resident at your address. Check whether a flatmate already pays before you register.',
    processId: 'rundfunkbeitrag',
    docTypeId: 'official-letter',
  },
  {
    id: 'sv-number',
    title: 'Social security number',
    from: 'Deutsche Rentenversicherung',
    detail: 'Your social security number is on this letter. Forward it to HR if they are waiting.',
    processId: 'social-security-number',
    docTypeId: 'sv-number',
    markDone: true,
  },
];
