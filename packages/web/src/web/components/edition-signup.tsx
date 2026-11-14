import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { track } from '../lib/analytics';
import {
  isValidEmail,
  recordEditionListJoin,
  type FitPromptId,
} from '../lib/edition-list';

type Props = {
  source: 'hero' | 'closing';
  headline: string;
  body: string;
  buttonLabel: string;
  placeholder?: string;
  footnote?: string;
  preferenceTag?: FitPromptId;
  eyebrow?: string;
  id?: string;
};

export function EditionSignup({
  source,
  headline,
  body,
  buttonLabel,
  placeholder = 'Email address',
  footnote,
  preferenceTag,
  eyebrow,
  id = 'follow',
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Enter a valid email address to follow Edition 001.');
      return;
    }

    recordEditionListJoin({ email, source, preferenceTag });
    track('edition_list_joined', {
      source,
      preference_tag: preferenceTag ?? null,
    });

    setStatus('ok');
    setMessage(
      'You are on the Edition 001 list. Development notes will come once the mailing service is connected—no launch-date promises.',
    );
    setEmail('');
  }

  return (
    <section className="signup section" id={id} aria-labelledby={`${id}-title`}>
      <div>
        {eyebrow ? <span className="hop-eyebrow">{eyebrow}</span> : null}
        <h2 id={`${id}-title`}>{headline}</h2>
        <p>{body}</p>
      </div>
      <div className="signup-copy">
        {status === 'ok' ? (
          <output className="form-status" htmlFor={`${id}-email`}>
            {message}
          </output>
        ) : (
          <form className="edition-form" onSubmit={onSubmit} noValidate>
            <label htmlFor={`${id}-email`}>Email address</label>
            <div className="email-row">
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={placeholder}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-label="Email address"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? `${id}-error` : `${id}-privacy`}
              />
              <button type="submit" className="hop-button" aria-label={buttonLabel}>
                {buttonLabel} <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            {status === 'error' ? (
              <p className="form-status" id={`${id}-error`} role="alert">
                {message}
              </p>
            ) : null}
            <p className="hop-caption" id={`${id}-privacy`}>
              {footnote ?? 'Development notes only. Unsubscribe whenever you like.'}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
