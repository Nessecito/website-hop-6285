export const fitChoices = [
  { tag: "collar-loses-shape", label: "The collar loses its shape" },
  { tag: "twists-or-shrinks", label: "It twists or shrinks after washing" },
  { tag: "thin-sheer-or-clingy", label: "It is too thin, sheer, or clingy" },
  { tag: "fit-never-sits-right", label: "The fit never sits quite right" },
  { tag: "pills-fades-or-tired", label: "The fabric pills, fades, or feels tired" },
  { tag: "something-else", label: "Something else" },
] as const;

export const priorityChoices = [
  { tag: "fit-stays-familiar", label: "The fit stays familiar" },
  { tag: "fabric-feels-right", label: "The fabric feels right" },
  { tag: "wear-it-again", label: "I want to wear it again" },
] as const;

export const cadenceChoices = [
  { tag: "most-days", label: "Most days" },
  { tag: "few-times-a-week", label: "A few times a week" },
  { tag: "weekends", label: "Mostly on weekends or days off" },
  { tag: "less-often", label: "Less often" },
] as const;

export const teeSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL+", "Varies"] as const;

export type FitTag = (typeof fitChoices)[number]["tag"];
export type PriorityTag = (typeof priorityChoices)[number]["tag"];
export type CadenceTag = (typeof cadenceChoices)[number]["tag"];
export type TeeSize = (typeof teeSizes)[number];
export type HeroVariant = "follow" | "close";
export type ListSource = "fit" | "closing";

export type FitAnswers = {
  preference: FitTag | null;
  priority: PriorityTag | null;
  cadence: CadenceTag | null;
};

const answersKey = "hop-fit-answers";

const emptyAnswers: FitAnswers = { preference: null, priority: null, cadence: null };

function known<T extends string>(value: unknown, choices: readonly { tag: T }[]): T | null {
  return choices.some((choice) => choice.tag === value) ? (value as T) : null;
}

export function rememberFit(answers: FitAnswers) {
  try {
    sessionStorage.setItem(answersKey, JSON.stringify(answers));
  } catch {
    /* The fit form still sends the answers with the address. */
  }
}

export function rememberedFit(): FitAnswers {
  try {
    const raw = sessionStorage.getItem(answersKey);
    if (!raw) return emptyAnswers;
    const parsed = JSON.parse(raw) as Partial<FitAnswers>;
    return {
      preference: known(parsed.preference, fitChoices),
      priority: known(parsed.priority, priorityChoices),
      cadence: known(parsed.cadence, cadenceChoices),
    };
  } catch {
    return emptyAnswers;
  }
}

export function trackEdition(name: string, props?: Record<string, string>) {
  window.stonks?.event(name, props);
}
