import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { track } from '../lib/analytics';
import {
  fitPromptChoices,
  isValidEmail,
  recordEditionListJoin,
  type FitPromptId,
} from '../lib/edition-list';

export function FitPrompt() {
  const [choice, setChoice] = useState<FitPromptId | null>(null);
  const [started, setStarted] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!started) return;
    track('fit_prompt_started');
  }, [started]);

  function selectChoice(id: FitPromptId) {
    if (!started) setStarted(true);
    setChoice(id);
    track('fit_prompt_answered', { preference_tag: id });
    setStatus('idle');
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!choice) {
      setStatus('error');
      setMessage('Choose one answer before joining the list.');
      return;
    }
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Enter a valid email address for Edition 001 notes.');
      return;
    }

    recordEditionListJoin({
      email,
      source: 'fit_prompt',
      preferenceTag: choice,
    });
    track('fit_prompt_email_joined', { preference_tag: choice });
    track('edition_list_joined', {
      source: 'fit_prompt',
      preference_tag: choice,
    });

    setStatus('ok');
    setMessage(
      'Thank you. Your preference is tagged for research, and you are on the Edition 001 list for development notes.',
    );
    setEmail('');
  }

  return (
    <section
      className="section fit-prompt"
      id="fit-prompt"
      aria-labelledby="fit-prompt-title"
    >
      <div className="section-heading">
        <div>
          <span className="hop-eyebrow">Your everyday standard</span>
          <h2 id="fit-prompt-title">What usually gives out first?</h2>
        </div>
        <p>
          Think about the tee you wear most—and the one you stopped reaching
          for.
        </p>
      </div>

      <fieldset className="fit-choices">
        <legend className="visually-hidden">What usually gives out first?</legend>
        {fitPromptChoices.map((option) => {
          const selected = choice === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={selected ? 'fit-choice is-selected' : 'fit-choice'}
              aria-pressed={selected}
              onClick={() => selectChoice(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </fieldset>

      {choice ? (
        <div className="fit-followup">
          <p className="fit-thanks">
            Thank you. We are collecting the details that decide whether a tee
            earns a permanent place.
          </p>

          {status === 'ok' ? (
            <output className="form-status" htmlFor="fit-prompt-email">
              {message}
            </output>
          ) : (
            <form className="edition-form" onSubmit={onSubmit} noValidate>
              <label htmlFor="fit-prompt-email">
                Where should we send the first Edition 001 notes?
              </label>
              <div className="email-row">
                <input
                  id="fit-prompt-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  aria-label="Email address for Edition 001 notes"
                  aria-invalid={status === 'error'}
                  aria-describedby={
                    status === 'error' ? 'fit-prompt-error' : 'fit-prompt-privacy'
                  }
                />
                <button type="submit" className="hop-button" aria-label="Keep me close">
                  Keep me close <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
              {status === 'error' ? (
                <p className="form-status" id="fit-prompt-error" role="alert">
                  {message}
                </p>
              ) : null}
              <p className="hop-caption" id="fit-prompt-privacy">
                Development notes only. Unsubscribe whenever you like. Your
                answer is stored as a preference tag for research—not as a
                product claim.
              </p>
            </form>
          )}
        </div>
      ) : null}
    </section>
  );
}
