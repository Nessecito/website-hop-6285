import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { editorialSite, shirtFeedbackEmail } from '../lib/house-links';

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
    a: 'Read the field notes on our editorial site and the proposed testing plan in the Tee Test Journal. There is no newsletter signup on this website.',
    link: undefined,
  },
  {
    q: 'How do I share my shirt story?',
    a: 'Use the “Share your shirt story” link anywhere on this site. It opens a draft in your email app addressed to Vanessa — for example, what usually goes wrong with your favorite everyday shirt. You choose what to share and when to send it. It is a conversation, not a mailing-list signup or tester application.',
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
    a: 'No. This website has no forms and collects no newsletter addresses or tester information. The shirt-story link opens your email app; if you choose to send, your message goes through your email service. The managed preview includes platform analytics.',
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
          <a className="hop-button main-cta" href={editorialSite} target="_blank" rel="noopener noreferrer">
            Read the field notes <ArrowUpRight size={18} />
          </a>
          <a className="hop-button hop-button--secondary main-cta" href={shirtFeedbackEmail}>
            Share your shirt story <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="hop-caption">The story link opens your email app. Nothing is collected on this site.</p>
      </section>
    </>
  );
}
