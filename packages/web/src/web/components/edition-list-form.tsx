import { useState, type FormEvent } from "react";
import { client } from "../lib/api";
import { rememberedFit, trackEdition, type FitAnswers, type ListSource } from "../lib/edition-list";

type Props = {
  source: ListSource;
  answers?: FitAnswers;
  label: string;
  button: string;
  consent: string;
  note: string;
  idPrefix: string;
};

const previewNote = " This preview saves the address here. Mail is not sent until a sending service is connected.";

export function EditionListForm({ source, answers, label, button, consent, note, idPrefix }: Props) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [phase, setPhase] = useState<"form" | "joined" | "removed">("form");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const fieldId = `${idPrefix}-email`;
  const consentId = `${idPrefix}-consent`;
  const statusId = `${idPrefix}-status`;

  async function join(event: FormEvent) {
    event.preventDefault();
    const address = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setMessage("Enter the email address where notes should go.");
      return;
    }
    if (!agreed) {
      setMessage("Please agree to receive Edition 001 notes before we save the address.");
      return;
    }
    setPending(true);
    setMessage("");
    const saved = answers ?? (source === "closing" ? rememberedFit() : { preference: null, priority: null, cadence: null });
    try {
      const result = await client.editionList.join({
        email: address,
        source,
        preference: saved.preference,
        priority: saved.priority,
        cadence: saved.cadence,
        heroVariant: "follow",
        consent: true,
      });
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      trackEdition("edition_list_joined", {
        source,
        heroVariant: "follow",
        preference: saved.preference ?? "none",
      });
      if (source === "fit") {
        trackEdition("fit_prompt_email_joined", { preference: saved.preference ?? "none" });
      }
      setEmail(address);
      setPhase("joined");
    } catch {
      setMessage("We couldn’t save that just now. You can email Vanessa@houseofpulido.com instead.");
    } finally {
      setPending(false);
    }
  }

  async function leave() {
    setPending(true);
    setMessage("");
    try {
      const result = await client.editionList.leave({ email });
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      setPhase("removed");
    } catch {
      setMessage("We couldn’t remove that address just now. Email Vanessa@houseofpulido.com and ask to be taken off.");
    } finally {
      setPending(false);
    }
  }

  if (phase === "joined" || phase === "removed") {
    return (
      <div>
        <output className="form-status">
          {phase === "joined"
            ? "You’re noted for Edition 001. Development notes only — nothing here is a launch date."
            : "That address has been removed."}
        </output>
        {phase === "joined" && (
          <button type="button" className="hop-button hop-button--secondary" onClick={leave} disabled={pending}>
            Remove this address
          </button>
        )}
        {message && <p className="form-status" role="alert">{message}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={join} noValidate>
      <label htmlFor={fieldId}>{label}</label>
      <div className="signup-row">
        <input
          id={fieldId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-label={label}
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={statusId}
        />
        <button type="submit" disabled={pending}>{pending ? "Saving…" : button}</button>
      </div>
      <label className="check" htmlFor={consentId}>
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          aria-label={consent}
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
        />
        <span>{consent}</span>
      </label>
      <p id={statusId} className="form-note" role={message ? "alert" : undefined}>
        {message || `${note}${previewNote}`}
      </p>
    </form>
  );
}
