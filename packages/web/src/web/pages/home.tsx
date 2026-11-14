import { useRef, useState } from "react";
import { Link } from "wouter";
import { EditionListForm } from "../components/edition-list-form";
import { WearTestForm } from "../components/wear-test-form";
import {
  cadenceChoices,
  fitChoices,
  priorityChoices,
  rememberFit,
  trackEdition,
  type CadenceTag,
  type FitTag,
  type PriorityTag,
} from "../lib/edition-list";

const frustrations = [
  ["Collars lose their shape.", "Check neckline recovery after repeated washes."],
  ["The fit changes after washing.", "Measure shrinkage and check for twisting."],
  ["The fabric feels too sheer.", "Compare opacity across candidate fabrics."],
  ["A favorite stops getting worn.", "Pair wear-test feedback with measurements."],
];

const markers = ["Fit worth returning to", "Fabric evaluated through everyday wear", "Details chosen for long use"];

const ledger = [
  ["Customer discovery", "In progress"],
  ["Fabric direction", "Candidate specification"],
  ["Sample testing", "Testing next"],
  ["Claims and traceability", "Unresolved"],
  ["Founder’s edition", "Unresolved"],
];

const notes = [
  "We’re listening to people who wear tees often and have specific standards for fit, fabric, and wash performance.",
  "We’re evaluating cotton options for weight, recovery, opacity, and feel. The 180–220 GSM range is a target.",
  "Wash, wear, fit, and construction testing will inform whether we move toward production.",
  "Durability, traceability, and sustainability claims require evidence for this tee.",
  "Edition details are still open.",
];

const standards = [
  "Design for repeat wear.",
  "Support material and durability claims with evidence.",
  "Consider care, repair, and future use from the start.",
];

export function Home() {
  return (
    <>
      <section className="home-hero wrap">
        <div className="home-hero-copy">
          <p className="index-line">Fort Worth, Texas · Made to become yours.</p>
          <h1>A cotton-first everyday tee, developed in the open.</h1>
          <p className="hero-intro">PULIDO No. 001 is our first edition. Follow the fabric choices, fit trials, and wash tests as we develop it.</p>
          <div className="hero-links">
            <a className="hop-button" href="#updates">Get Edition 001 updates</a>
            <a className="underlink" href="#fit">Share your tee story in one minute</a>
          </div>
        </div>
        <div className="hero-panel">
          <p className="panel-name">House of Pulido</p>
          <p className="panel-principles">Consider the material.<br />Learn through wear.<br />Earn the claim.</p>
        </div>
      </section>

      <section className="editorial-section wrap" id="comparison">
        <p className="index-line">First Edition / PULIDO No. 001</p>
        <h2>What we’ll test for.</h2>
        <table className="comparison">
          <caption className="sr-only">Common tee frustrations and what Edition 001 plans to check. These are plans, not results.</caption>
          <thead>
            <tr>
              <th scope="col">Common tee frustration</th>
              <th scope="col">What we plan to check</th>
            </tr>
          </thead>
          <tbody>
            {frustrations.map(([heard, check]) => (
              <tr key={heard}>
                <th scope="row">{heard}</th>
                <td>{check}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a className="underlink" href="#fit">Share your tee story in one minute</a>
      </section>

      <FitPrompt />

      <section className="editorial-section wrap" id="edition">
        <div className="edition-grid">
          <figure className="product">
            <img src="/editorial/first-edition.webp" alt="Concept study of an ivory tee with dark trousers" width="1000" height="1500" />
            <figcaption>
              <span>Editorial concept</span>
              <span>Edition 001 is in development</span>
            </figcaption>
          </figure>
          <div>
            <p className="index-line">First Edition</p>
            <h2>PULIDO No. 001<br />Everyday Tee</h2>
            <p className="section-copy">We’re developing a cotton-first everyday tee with a considered fit and substantial feel. How it holds up in the wash will shape what we make.</p>
            <ul className="edition-markers">
              {markers.map((marker) => <li key={marker}>{marker}</li>)}
            </ul>
            <p className="ledger-actions">
              <Link href="/first-edition" className="underlink">See how we’re developing our first tee</Link>
              <a className="underlink" href="#apply">Apply to wear test No. 001</a>
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-section wrap" id="journal">
        <h2>What is known.<br />What comes next.</h2>
        <dl className="ledger">
          {ledger.map(([area, status]) => (
            <div key={area}>
              <dt>{area}</dt>
              <dd>{status}</dd>
            </div>
          ))}
        </dl>
        <div className="development-notes" id="development-notes">
          <p className="index-line">Development notes</p>
          <ul>
            {notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
        <p className="ledger-actions">
          <Link href="/journal" className="underlink">Read the development notes</Link>
          <a className="underlink" href="#updates">Join the Edition 001 list</a>
        </p>
      </section>

      <section className="closing wrap" id="updates">
        <div>
          <h2>Be there when it is ready.</h2>
          <p>Join the list for development notes, select wear-test invitations, and the first word on Edition 001.</p>
          <p className="index-line">House of Pulido · Fort Worth, Texas</p>
        </div>
        <EditionListForm
          source="closing"
          idPrefix="closing"
          label="Email address"
          button="Get Edition 001 updates"
          consent="I agree to receive Edition 001 updates."
          note="Development notes only. Unsubscribe whenever you like."
        />
      </section>

      <section className="story" id="house">
        <img
          src="https://house-of-pulido-editorial.nessecito.chatgpt.site/editorial/fort-worth-study.webp"
          alt="Editorial study inspired by Fort Worth brick and limestone architecture"
          width="900"
          height="1350"
          onError={(event) => { event.currentTarget.hidden = true; }}
        />
        <div className="story-copy">
          <p className="index-line">The House</p>
          <h2>A family name, carried forward with care.</h2>
          <p>House of Pulido is an independent apparel house rooted in the Pulido family name and Fort Worth heritage. The family’s restaurant legacy is part of that story. Clothing is a new expression of it.</p>
          <Link href="/the-house" className="underlink">The story of the house</Link>
        </div>
      </section>

      <section className="editorial-section wrap" id="standard">
        <p className="index-line">The Standard</p>
        <h2>Good things take consideration.</h2>
        <p className="section-copy">We care about longevity, material choices, and a clear account of how each piece is made. We test first and make claims we can support.</p>
        <ul className="standards">
          {standards.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="application" id="apply">
        <div className="application-grid wrap">
          <div>
            <p className="index-line">No. 001 / Tester applications</p>
            <h2>The Wear Test<br />Collective.</h2>
            <p>Help shape our first tee. Selected testers will wear and wash a prototype in their usual routine, then tell us what they noticed about fit, feel, and how it changed.</p>
            <p>Open to adults 18+. We’ll email selected applicants with the next steps.</p>
            <a className="underlink" href="#edition">Back to No. 001</a>
          </div>
          <WearTestForm />
        </div>
      </section>
    </>
  );
}

function FitPrompt() {
  const [preference, setPreference] = useState<FitTag | null>(null);
  const [priority, setPriority] = useState<PriorityTag | null>(null);
  const [cadence, setCadence] = useState<CadenceTag | null>(null);
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;
    trackEdition("fit_prompt_started");
  }

  function choosePreference(tag: FitTag) {
    start();
    setPreference(tag);
    rememberFit({ preference: tag, priority, cadence });
    trackEdition("fit_prompt_answered", { preference: tag });
  }

  function choosePriority(tag: PriorityTag) {
    start();
    setPriority(tag);
    rememberFit({ preference, priority: tag, cadence });
  }

  function chooseCadence(tag: CadenceTag) {
    start();
    setCadence(tag);
    rememberFit({ preference, priority, cadence: tag });
  }

  return (
    <section className="editorial-section wrap" id="fit">
      <div className="fit-panel">
        <p className="index-line">Your everyday standard</p>
        <h2>What usually gives out first?</h2>
        <p>Think about the tee you reach for most and the one you stopped wearing. Share one answer or add two quick details.</p>
        <fieldset className="fit-choices">
          <legend>Choose one optional answer</legend>
          {fitChoices.map((choice) => (
            <label key={choice.tag}>
              <input
                type="radio"
                name="gives-out-first"
                value={choice.tag}
                aria-label={choice.label}
                checked={preference === choice.tag}
                onChange={() => choosePreference(choice.tag)}
              />
              <span>{choice.label}</span>
            </label>
          ))}
        </fieldset>
        <details className="fit-followup">
          <summary>Add two quick details <span>(optional)</span></summary>
          <fieldset className="fit-choices">
            <legend>What matters most in a favorite tee?</legend>
            {priorityChoices.map((choice) => (
              <label key={choice.tag}>
                <input
                  type="radio"
                  name="matters-most"
                  value={choice.tag}
                  aria-label={choice.label}
                  checked={priority === choice.tag}
                  onChange={() => choosePriority(choice.tag)}
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="fit-choices">
            <legend>How often do you wear your favorite tee?</legend>
            {cadenceChoices.map((choice) => (
              <label key={choice.tag}>
                <input
                  type="radio"
                  name="wear-often"
                  value={choice.tag}
                  aria-label={choice.label}
                  checked={cadence === choice.tag}
                  onChange={() => chooseCadence(choice.tag)}
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </fieldset>
        </details>
        <p className="fit-purpose">We use your answers to decide what to test for fit, fabric, and wash performance.</p>
        <EditionListForm
          source="fit"
          answers={{ preference, priority, cadence }}
          idPrefix="fit"
          label="Where should we send the first Edition 001 notes?"
          button="Get Edition 001 updates"
          consent="I agree to receive Edition 001 development notes."
          note="We’ll share development notes, planned wear-test invitations, and news about Edition 001."
        />
      </div>
    </section>
  );
}
