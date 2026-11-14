export const fitPromptChoices = [
  { id: 'collar', label: 'The collar loses its shape' },
  { id: 'twist-shrink', label: 'It twists or shrinks after washing' },
  { id: 'thin-sheer', label: 'It is too thin, sheer, or clingy' },
  { id: 'fit', label: 'The fit never sits quite right' },
  { id: 'pills-fade', label: 'The fabric pills, fades, or feels tired' },
  { id: 'other', label: 'Something else' },
] as const;

export type FitPromptId = (typeof fitPromptChoices)[number]['id'];

export type EditionListJoin = {
  email: string;
  source: 'hero' | 'fit_prompt' | 'closing';
  preferenceTag?: FitPromptId;
  joinedAt: string;
};

const STORAGE_KEY = 'hop.editionListJoins';

function readJoins(): EditionListJoin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EditionListJoin[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function recordEditionListJoin(join: Omit<EditionListJoin, 'joinedAt'>) {
  const entry: EditionListJoin = {
    ...join,
    email: join.email.trim().toLowerCase(),
    joinedAt: new Date().toISOString(),
  };
  const next = [...readJoins().filter((item) => item.email !== entry.email), entry];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can fail in private browsing; still allow the UI confirmation.
  }
  return entry;
}

export function preferenceLabel(id?: FitPromptId) {
  return fitPromptChoices.find((choice) => choice.id === id)?.label;
}
