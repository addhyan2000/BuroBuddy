import type { DocType } from './types';

// Demo knowledge base: the documents that steps need or produce.
export const DOC_TYPES: DocType[] = [
  { id: 'passport', name: 'Passport', german: 'Reisepass', hint: 'Valid for your whole planned stay.' },
  { id: 'visa', name: 'Student visa', german: 'Nationales Visum', hint: 'The sticker in your passport from the German embassy.' },
  { id: 'admission-letter', name: 'University admission letter', german: 'Zulassungsbescheid', hint: 'Sent by your university when you were accepted.' },
  { id: 'degree-certificates', name: 'Previous degree certificates', german: 'Zeugnisse', hint: 'Originals plus certified copies or translations if required.' },
  { id: 'blocked-account-confirmation', name: 'Blocked account confirmation', german: 'Sperrkonto-Bestätigung', hint: 'Proof of finances from your blocked account provider.' },
  { id: 'rental-contract', name: 'Rental contract', german: 'Mietvertrag', hint: 'Signed by you and your landlord.' },
  { id: 'wohnungsgeberbestaetigung', name: "Landlord's move-in confirmation", german: 'Wohnungsgeberbestätigung', hint: 'A one-page form your landlord must fill in and sign. Ask for it — it is not the rental contract.' },
  { id: 'anmeldeformular', name: 'Registration form, filled in', german: 'Anmeldeformular', hint: "Download it from your city's website or pick it up at the Bürgeramt." },
  { id: 'meldebescheinigung', name: 'Registration certificate', german: 'Meldebescheinigung', hint: 'Handed to you at the Bürgeramt after your Anmeldung.' },
  { id: 'insurance-confirmation', name: 'Health insurance confirmation', german: 'Mitgliedsbescheinigung', hint: 'Your insurer confirms membership and notifies the university electronically.' },
  { id: 'fee-receipt', name: 'Semester contribution receipt', german: 'Zahlungsnachweis Semesterbeitrag', hint: 'Bank transfer confirmation for the semester contribution.' },
  { id: 'enrolment-certificate', name: 'Enrolment certificate', german: 'Immatrikulationsbescheinigung', hint: 'Downloadable from the university portal once you are enrolled.' },
  { id: 'biometric-photo', name: 'Biometric passport photo', german: 'Biometrisches Passbild', hint: 'Recent, 35 × 45 mm. Photo booths and drugstores make them.' },
  { id: 'iban', name: 'German bank details', german: 'IBAN', hint: 'From your German current account.' },
  { id: 'tax-id-letter', name: 'Tax ID letter', german: 'Steuer-ID', hint: 'Arrives by post after your Anmeldung. Keep it for life.' },
  { id: 'residence-permit', name: 'Residence permit card', german: 'Aufenthaltstitel (eAT)', hint: 'The card issued by the Ausländerbehörde.' },
  { id: 'employment-contract', name: 'Employment contract', german: 'Arbeitsvertrag', hint: 'Signed by you and your employer.' },
  { id: 'sv-number', name: 'Social security number', german: 'Sozialversicherungsnummer', hint: 'On the letter from the Deutsche Rentenversicherung.' },
  { id: 'new-wohnungsgeberbestaetigung', name: "New landlord's move-in confirmation", german: 'Wohnungsgeberbestätigung (neu)', hint: 'From the landlord of the flat you are moving into.' },
  { id: 'new-meldebescheinigung', name: 'New registration certificate', german: 'Meldebescheinigung (neu)', hint: 'Issued when you re-register at your new address.' },
  { id: 'termination-letter', name: 'Written notice to landlord', german: 'Kündigungsschreiben', hint: 'Signed on paper — email is usually not enough.' },
  { id: 'handover-protocol', name: 'Flat handover protocol', german: 'Übergabeprotokoll', hint: 'Signed by you and the landlord when you return the keys.' },
  { id: 'abmeldebescheinigung', name: 'Deregistration certificate', german: 'Abmeldebescheinigung', hint: 'Issued by the Bürgeramt when you deregister. Needed to cancel contracts.' },
  { id: 'official-letter', name: 'Official letter', german: 'Schreiben', hint: 'A letter you received from an office or institution.' },
  { id: 'other', name: 'Other document', hint: 'Anything else you want to keep in one place.' },
];

export const docType = (id: string): DocType =>
  DOC_TYPES.find((d) => d.id === id) ?? { id, name: id, hint: '' };
