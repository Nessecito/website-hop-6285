import { useState, type FormEvent } from "react";
import { client } from "../lib/api";
import { teeSizes, type TeeSize } from "../lib/edition-list";

export function WearTestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<TeeSize | "">("");
  const [note, setNote] = useState("");
  const [adult, setAdult] = useState(false);
  const [phase, setPhase] = useState<"form" | "saved">("form");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const person = name.trim();
    const address = email.trim().toLowerCase();
    if (!person) {
      setMessage("Enter the name we should use.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setMessage("Enter an email address.");
      return;
    }
    if (!size) {
      setMessage("Select a usual tee size.");
      return;
    }
    if (!adult) {
      setMessage("Confirm that you are 18 or older and agree to be contacted.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const result = await client.wearTest.apply({
        name: person,
        email: address,
        size,
        note: note.trim() ? note.trim() : null,
        adult: true,
      });
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      setPhase("saved");
    } catch {
      setMessage("We couldn’t save that application just now. You can email Vanessa@houseofpulido.com instead.");
    } finally {
      setPending(false);
    }
  }

  if (phase === "saved") {
    return (
      <output className="form-status">
        Application saved. This preview keeps it for review and has not sent an email.
      </output>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required aria-label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" inputMode="email" required aria-label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="full">
          Usual tee size
          <select name="size" required aria-label="Usual tee size" value={size} onChange={(event) => setSize(event.target.value as TeeSize | "")}>
            <option value="">Select a size</option>
            {teeSizes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="full">
          What do you look for in an everyday tee? <small>Optional</small>
          <textarea name="note" rows={4} maxLength={500} aria-label="What do you look for in an everyday tee?" value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" aria-label="I’m 18 or older and agree to be contacted about this wear test." checked={adult} onChange={(event) => setAdult(event.target.checked)} />
        <span>I’m 18 or older and agree to be contacted about this wear test.</span>
      </label>
      <p className="form-note" role={message ? "alert" : undefined}>
        {message || "House of Pulido uses these details to review applications and contact testers. This preview saves the application and does not send that email yet."}
      </p>
      <button type="submit" disabled={pending}>{pending ? "Saving…" : "Submit application"}</button>
    </form>
  );
}
