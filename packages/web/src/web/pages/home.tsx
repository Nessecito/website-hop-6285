import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DevelopmentStatus } from '../components/development';
import { FitPrompt } from '../components/fit-prompt';
import { track } from '../lib/analytics';

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hop-eyebrow hero-eyebrow">
            <span className="tiny-rule" />
            House of Pulido · Fort Worth, Texas
          </div>
          <h1>
            Made to become
            <br />
            <em>yours.</em>
          </h1>
          <p>
            Everyday clothing, considered closely. House of Pulido is developing
            its first edition around one question: what would make the tee you
            reach for most feel worth keeping?
          </p>
          <a
            className="hop-button main-cta"
            href="#follow"
            onClick={() => track('hero_cta_clicked', { variant: 'follow_edition_001' })}
          >
            Follow Edition 001 <ArrowRight size={18} aria-hidden="true" />
          </a>
          <span className="hero-footnote">
            Occasional development notes. No launch-date promises.
          </span>
        </div>
        <figure className="hero-art">
          <img
            src="/brand/leather-study.jpg"
            alt="Close study of natural material texture with the House of Pulido monogram—brand atmosphere, not a finished garment"
            width="1200"
            height="1200"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <span>Editorial study</span>
            <span>Texture · not a product mockup</span>
          </figcaption>
        </figure>
      </section>

      <section
        className="section edition-block"
        id="first-edition"
        aria-labelledby="edition-title"
      >
        <div className="edition-symbol" aria-hidden="true">
          <span className="hop-eyebrow">Edition mark</span>
          <img
            src="/brand/assets/monogram-espresso.png"
            alt=""
            width="200"
            height="200"
            loading="lazy"
          />
          <span className="hop-caption">PULIDO · No. 001</span>
        </div>
        <div className="edition-copy">
          <span className="hop-eyebrow">First edition</span>
          <h2 id="edition-title">PULIDO No. 001 Everyday Tee</h2>
          <p>
            The first object is not ready to be sold yet. It is being developed
            as a durable, cotton-first everyday tee with a considered hand, fit,
            and wash life.
          </p>
          <div className="principles edition-markers">
            {[
              ['01', 'Fit worth returning to'],
              ['02', 'Fabric tested in real rotation'],
              ['03', 'Details chosen for long use'],
            ].map(([n, title]) => (
              <div className="principle" key={n}>
                <span className="hop-eyebrow">{n}</span>
                <h3>{title}</h3>
              </div>
            ))}
          </div>
          <Link href="/first-edition" className="text-link">
            See what is being developed <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FitPrompt />
      <DevelopmentStatus />

      <section className="section story-grid" aria-labelledby="house-title">
        <div>
          <span className="hop-eyebrow">The house</span>
          <h2 id="house-title">
            A family name, carried
            <br />
            forward with care.
          </h2>
        </div>
        <div className="story-copy">
          <p>
            House of Pulido is an independent apparel house rooted in the Pulido
            family name and Fort Worth heritage. It is not the restaurant’s
            successor. It is a new expression of a legacy: fewer,
            better-considered things made for a life actually lived.
          </p>
          <Link href="/the-house" className="text-link">
            The story of the house <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="standard-title">
        <div className="section-heading">
          <div>
            <span className="hop-eyebrow">The standard</span>
            <h2 id="standard-title">
              Good things take
              <br />
              consideration.
            </h2>
          </div>
          <p>
            We care about longevity, material choices, and a clear account of
            how each piece is made. That means testing first and claiming only
            what can be supported.
          </p>
        </div>
        <div className="principles">
          {[
            [
              '01',
              'Repeat wear',
              'Design for repeat wear, not a single season.',
            ],
            [
              '02',
              'Clear evidence',
              'Prefer clear evidence over vague sustainability language.',
            ],
            [
              '03',
              'Future use',
              'Make care, repair, and future use part of the product story.',
            ],
          ].map(([n, title, body]) => (
            <div className="principle" key={n}>
              <span className="hop-eyebrow">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
