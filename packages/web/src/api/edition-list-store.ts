export type StoredSubscriber = {
  email: string;
  preference: string | null;
  priority: string | null;
  cadence: string | null;
  source: "fit" | "closing";
  heroVariant: "follow" | "close";
  createdAt: string;
  updatedAt: string;
};

type FileApi = {
  mkdir: (path: string, options?: { recursive?: boolean }) => Promise<void>;
  readFile: (path: string, encoding: "utf8") => Promise<string>;
  writeFile: (path: string, data: string) => Promise<void>;
};

const listFile = new URL("../../data/edition-list.json", import.meta.url);
const listDir = new URL("../../data/", import.meta.url);

function filePath(url: URL) {
  return decodeURIComponent(url.pathname);
}

async function files(): Promise<FileApi> {
  const load = new Function("specifier", "return import(specifier)") as (specifier: string) => Promise<FileApi>;
  return load("node:fs/promises");
}

let chain: Promise<unknown> = Promise.resolve();

function withLock<T>(task: () => Promise<T>): Promise<T> {
  const run = chain.then(task, task);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readAll(): Promise<StoredSubscriber[]> {
  try {
    const parsed = JSON.parse(await (await files()).readFile(filePath(listFile), "utf8")) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is StoredSubscriber => {
      return !!row && typeof row === "object" && typeof (row as StoredSubscriber).email === "string";
    });
  } catch {
    return [];
  }
}

async function writeAll(rows: StoredSubscriber[]) {
  const fs = await files();
  await fs.mkdir(filePath(listDir), { recursive: true });
  await fs.writeFile(filePath(listFile), `${JSON.stringify(rows, null, 2)}\n`);
}

export function saveSubscriber(entry: Omit<StoredSubscriber, "createdAt" | "updatedAt">) {
  return withLock(async () => {
    const rows = await readAll();
    const now = new Date().toISOString();
    const index = rows.findIndex((row) => row.email === entry.email);
    if (index === -1) {
      rows.push({ ...entry, createdAt: now, updatedAt: now });
    } else {
      const current = rows[index];
      rows[index] = {
        ...current,
        preference: entry.preference ?? current.preference,
        priority: entry.priority ?? current.priority ?? null,
        cadence: entry.cadence ?? current.cadence ?? null,
        source: entry.source,
        heroVariant: entry.heroVariant,
        updatedAt: now,
      };
    }
    await writeAll(rows);
  });
}

export function removeSubscriber(email: string) {
  return withLock(async () => {
    const rows = await readAll();
    await writeAll(rows.filter((row) => row.email !== email));
  });
}
