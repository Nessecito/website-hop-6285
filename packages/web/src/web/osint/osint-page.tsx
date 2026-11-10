import { useEffect, useMemo, useState } from "react";
import { osintCatalog, osintSource, type OsintResource, type OsintSection } from "./catalog";
import "./osint.css";

function countResources(section: OsintSection) {
  return section.groups.reduce((total, group) => total + group.resources.length, 0);
}

const totalResources = osintCatalog.reduce((total, section) => total + countResources(section), 0);

function resourceMatches(resource: OsintResource, sectionTitle: string, groupTitle: string, tokens: string[]) {
  const blob = `${resource.name} ${resource.description} ${resource.host} ${sectionTitle} ${groupTitle}`.toLowerCase();
  return tokens.every((token) => blob.includes(token));
}

export function OsintApp() {
  const [query, setQuery] = useState("");
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  useEffect(() => {
    document.body.classList.add("hacker-body");
    const previousTitle = document.title;
    document.title = "awesome-osint";
    return () => {
      document.body.classList.remove("hacker-body");
      document.title = previousTitle;
    };
  }, []);

  const visible = useMemo(() => {
    const activeTokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (activeTokens.length === 0) return osintCatalog;
    return osintCatalog
      .map((section) => ({
        ...section,
        groups: section.groups
          .map((group) => ({
            ...group,
            resources: group.resources.filter((resource) => resourceMatches(resource, section.title, group.title, activeTokens)),
          }))
          .filter((group) => group.resources.length > 0),
      }))
      .filter((section) => section.groups.length > 0);
  }, [query]);

  const shown = visible.reduce((total, section) => total + countResources(section), 0);

  return (
    <div className="hacker">
      <a className="hacker-skip" href="#main_content">Skip to content</a>
      <header>
        <div className="container">
          <a id="a-title" href="/osint">
            <h1>awesome-osint</h1>
          </a>
          <h2>A curated list of amazingly awesome open source intelligence tools and resources.</h2>
          <section id="downloads">
            <a className="btn btn-github" href={osintSource.url}>
              <span className="icon" aria-hidden="true" />
              View on GitHub
            </a>
          </section>
        </div>
      </header>
      <div className="container">
        <section id="main_content">
          <p>
            <a href="https://en.wikipedia.org/wiki/Open-source_intelligence">Open-source intelligence (OSINT)</a> is intelligence collected from publicly available sources. In the intelligence community, “open” means overt, public sources.
          </p>
          <p>This list is for people learning cyber threat intelligence, threat hunting, or OSINT, from a first look through to deeper research.</p>
          <blockquote>
            <p>
              This directory only links to the published list. It does not run searches or collect personal data. People-search, breach, and location tools are here because the source list includes them. Use those for your own information, or for work you are allowed to do.
            </p>
          </blockquote>
          <search className="search-bar">
            <label htmlFor="osint-query">Search the list</label>
            <div className="search-row">
              <input
                id="osint-query"
                type="search"
                value={query}
                placeholder="Name, description, or site"
                autoComplete="off"
                aria-label="Search the list"
                onChange={(event) => setQuery(event.target.value)}
              />
              {query ? (
                <button type="button" className="search-clear" onClick={() => setQuery("")}>
                  Clear
                </button>
              ) : null}
            </div>
          </search>
          <p className="search-count" aria-live="polite">
            {tokens.length === 0
              ? `${totalResources} resources in ${osintCatalog.length} sections`
              : `${shown} of ${totalResources} resources`}
          </p>

          <div id="table-of-contents">
            {tokens.length === 0 ? (
              <>
                <h2>Table of Contents</h2>
                <ul>
                  {osintCatalog.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {visible.length === 0 ? <p>No resources match that search.</p> : null}

          {visible.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>
                <a className="up" href="#table-of-contents">↑</a>
                {section.title}
              </h2>
              {section.intro ? <p><em>{section.intro}</em></p> : null}
              {section.groups.map((group, groupIndex) => (
                <div key={`${section.id}-${group.title}-${groupIndex}`}>
                  {group.title ? <h3>{group.title}</h3> : null}
                  {group.intro ? <p><em>{group.intro}</em></p> : null}
                  <ul>
                    {group.resources.map((resource) => (
                      <li key={`${resource.name}-${resource.url}`}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>
                        {resource.description ? ` - ${resource.description}` : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          <hr />
          <section className="credits" id="license">
            <h2>License and credits</h2>
            <p>
              Adapted from <a href={osintSource.url}>{osintSource.name}</a> by {osintSource.creators}. Part of the original list was taken from {osintSource.handbookBy}’s <a href={osintSource.handbookUrl}>{osintSource.handbookName}</a>.
            </p>
            <p>
              Licensed under <a href={osintSource.licenseUrl}>{osintSource.license}</a>. {osintSource.modified} {osintSource.disclaimer}
            </p>
            <p>
              <a href="/">House of Pulido</a>
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
