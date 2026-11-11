// Adapted from Awesome OSINT by jivoi, spmedia, and contributors.
// https://github.com/jivoi/awesome-osint
// Licensed under CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
// Modified: restructured into a searchable directory. Names, links, and descriptions come from the source list.
// The source is offered as-is, without warranties. This adaptation is shared under the same license.

import catalogData from "./catalog.json";

export type OsintResource = {
  name: string;
  url: string;
  description: string;
  host: string;
};

export type OsintGroup = {
  title: string;
  intro: string;
  resources: OsintResource[];
};

export type OsintSection = {
  id: string;
  title: string;
  intro: string;
  groups: OsintGroup[];
};

type CatalogFile = {
  source: {
    name: string;
    url: string;
    creators: string;
    handbookName: string;
    handbookUrl: string;
    handbookBy: string;
    license: string;
    licenseUrl: string;
    disclaimer: string;
    modified: string;
  };
  sections: OsintSection[];
};

const data = catalogData as CatalogFile;

export const osintSource = data.source;
export const osintCatalog = data.sections;
