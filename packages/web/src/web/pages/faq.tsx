import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { editorialSite } from '../lib/house-links';

const faqs = [
  {
    q: 'What is House of Pulido?',
    a: 'House of Pulido is our independent clothing venture from Fort Worth, Texas. We are Vanessa and Ryan, carrying the Pulido family name into clothing and beginning with an everyday tee. It is a house in the making, not a finished store.',
  },
  {
    q: 'Is this the Pulido’s restaurant?',
    a: 'No. The Pulido’s restaurant legacy is part of our family story in Fort Worth, and we carry the name forward with respect. House of Pulido is an independent clothing venture, not the restaurant’s successor.',
  },
  {
    q: 'Can I buy the tee yet?',
    a: 'No. There are no orders, reservations, preorders, prices, sizes, or delivery dates yet. “First Edition” names this development chapter. The gates, not the calendar, decide what ships — see the development hub.',
    link: { href: '/first-edition', label: 'Inside the development hub' },
  },
  {
    q: 'Where is the work right now?',
    a: 'The customer brief is written, the testing checklist is built, and our first fabric comparisons are underway. Results and revisions will join the public record as the work produces them — nothing is marked complete before its evidence exists.',
    link: { href: '/first-edition#release-gates', label: 'Follow the release gates' },
  },
  {
    q: 'How can I follow along?',
    a: 'Join the Edition 001 list on the homepage for development notes, or read the proposed testing plan in the Journal. There are no launch-date promises while the tee is still in development.',
    link: { href: '/#follow', label: 'Follow Edition 001' },
  },
  {
    q: 'What is the fit prompt?',
    a: 'A one-question prompt asking what usually gives out first on the tee you wear most. Your answer is stored as a preference tag for research and, later, relevant testing updates—not as proof about a finished product.',
    link: { href: '/#fit-prompt', label: 'Answer the fit prompt' },
  },
  {
    q: 'What is the Wear Test Collective?',
    a: 'A planned small adult pilot with different routines and preferences. Applications are not open; the pilot budget, recruitment criteria, and prototype availability still need to be confirmed. Newsletter membership, if it ever exists, will not be a tester application or product reservation.',
    link: { href: '/wear-test-collective', label: 'Read the participation plan' },
  },
  {
    q: 'What will you measure?',
    a: 'Identity before claims, consistent baselines, repeat care trials at 1, 5, 10, and 20 washes, real-wearer feedback, and a recorded revision for every issue. Internal trials are not accredited laboratory results, and perceived qualities are kept separate from measured outcomes.',
    link: { href: '/journal/what-we-will-measure', label: 'Read the proposed method' },
  },
  {
    q: 'Do you collect my email on this website?',
    a: 'Yes, if you join the Edition 001 list or complete the fit prompt. Your email and optional preference tag are recorded for development notes and research. A mailing service is not connected yet, so delivery begins only after that connection is confirmed. The managed preview also includes platform analytics.',
    link: { href: '/privacy', label: 'Preview privacy note' },
  },
  {
    q: 'How do I contact you?',
    a: 'Email Vanessa directly at Vanessa@houseofpulido.com. There is no website contact form or live chat, and no reply-time promise.',
  },
];

export function Faq() {
  return (
    <>
      <section className="page-intro">
        <span className="hop-eyebrow">Questions / Honest answers</span>
        <h1>
          Asked,
          <br />
          <em>answered plainly.</em>
        </h1>
        <p className="large-copy">
          What this house is, what it isn’t,
          <br />
          and where the first tee stands.
        </p>
        <p className="hop-caption">
          No scores, prices, sizes, or dates are promised here. If an answer isn’t known yet, it says so.
        </p>
      </section>
      <section className="section faq-list" aria-label="Frequently asked questions">
        {faqs.map((item) => (
          <details key={item.q} className="faq-row">
            <summary>{item.q}</summary>
            <div className="faq-answer">
              <p>{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="text-link">
                  {item.link.label} <ArrowUpRight size={18} />
                </Link>
              )}
            </div>
          </details>
        ))}
      </section>
      <section className="section faq-follow">
        <div className="section-heading">
          <div>
            <span className="hop-eyebrow">Still curious</span>
            <h2>
              Read the notes.
              <br />
              Share your story.
            </h2>
          </div>
        </div>
        <div className="faq-actions">
          <a className="hop-button main-cta" href="/#follow">
            Follow Edition 001 <ArrowUpRight size={18} />
          </a>
          <a className="hop-button hop-button--secondary main-cta" href={editorialSite} target="_blank" rel="noopener noreferrer">
            Read the field notes <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="hop-caption">List joins record your email for development notes. Delivery starts once the mailing service is connected.</p>
      </section>
    </>
  );
}
