type FileApi = {
  mkdir: (path: string, options?: { recursive?: boolean }) => Promise<void>;
  readFile: (path: string, encoding: "utf8") => Promise<string>;
  writeFile: (path: string, data: string) => Promise<void>;
};

export type StoredApplication = {
  email: string;
  name: string;
  size: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

const listFile = new URL("../../data/wear-test.json", import.meta.url);
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

async function readAll(): Promise<StoredApplication[]> {
  try {
    const parsed = JSON.parse(await (await files()).readFile(filePath(listFile), "utf8")) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is StoredApplication => {
      return !!row && typeof row === "object" && typeof (row as StoredApplication).email === "string";
    });
  } catch {
    return [];
  }
}

async function writeAll(rows: StoredApplication[]) {
  const fs = await files();
  await fs.mkdir(filePath(listDir), { recursive: true });
  await fs.writeFile(filePath(listFile), `${JSON.stringify(rows, null, 2)}\n`);
}

export function saveApplication(entry: Omit<StoredApplication, "createdAt" | "updatedAt">) {
  return withLock(async () => {
    const rows = await readAll();
    const now = new Date().toISOString();
    const index = rows.findIndex((row) => row.email === entry.email);
    if (index === -1) rows.push({ ...entry, createdAt: now, updatedAt: now });
    else rows[index] = { ...rows[index], ...entry, createdAt: rows[index].createdAt, updatedAt: now };
    await writeAll(rows);
  });
}
