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
    a: 'Use “Get Edition 001 updates” on the homepage. The list is for development notes, not a launch date, a preorder, or a tester application. The ledger on that page says what is known and what is still open.',
    link: undefined,
  },
  {
    q: 'How do I share my shirt story?',
    a: 'The homepage fit prompt can save what usually gives out first, plus two optional details, with your Edition 001 address. You can also email Vanessa directly. Neither path is a tester application or a product reservation.',
  },
  {
    q: 'What is the Wear Test Collective?',
    a: 'Adults 18 and older can apply on the homepage to wear and wash a prototype in their usual routine. This preview saves the application and does not send mail yet. Being selected, receiving a prototype, and any incentive are still unconfirmed. The list signup is not an application.',
    link: { href: '/#apply', label: 'Apply to wear test No. 001' },
  },
  {
    q: 'What will you measure?',
    a: 'Identity before claims, consistent baselines, repeat care trials at 1, 5, 10, and 20 washes, real-wearer feedback, and a recorded revision for every issue. Internal trials are not accredited laboratory results, and perceived qualities are kept separate from measured outcomes.',
    link: { href: '/journal/what-we-will-measure', label: 'Read the proposed method' },
  },
  {
    q: 'Do you collect my email on this website?',
    a: 'The Edition 001 form stores your email, your consent, and any fit answers you gave. The wear-test form stores your name, email, usual size, an optional note, and your confirmation that you are 18 or older. This preview keeps those records and does not send mail until a sending service is connected. The list confirmation lets you remove the address. The managed preview also includes platform analytics.',
    link: { href: '/privacy', label: 'Preview privacy note' },
  },
  {
    q: 'How do I contact you?',
    a: 'Email Vanessa directly at Vanessa@houseofpulido.com. The homepage can save an Edition 001 address or a wear-test application. Those are not a live chat, and this preview does not send mail yet. There is no reply-time promise.',
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
                item.link.href.includes("#") ? (
                  <a href={item.link.href} className="text-link">
                    {item.link.label} <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <Link href={item.link.href} className="text-link">
                    {item.link.label} <ArrowUpRight size={18} />
                  </Link>
                )
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
              Or write directly.
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
        <p className="hop-caption">The email link opens your email app. The Edition 001 list is on the homepage.</p>
      </section>
    </>
  );
}
