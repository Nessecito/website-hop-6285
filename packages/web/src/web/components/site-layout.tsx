import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { EditionSignup } from './edition-signup';

const links = [
  ['/first-edition', 'First Edition'],
  ['/the-house', 'The House'],
  ['/journal', 'Journal'],
] as const;

export function Signup() {
  return (
    <EditionSignup
      id="follow"
      source="closing"
      eyebrow="Edition 001 / Stay close"
      headline="Be there when it is ready."
      body="Join the list for development notes, select wear-test invitations, and the first word on Edition 001."
      buttonLabel="Follow the house"
      placeholder="Email address"
      footnote="House of Pulido · Fort Worth, Texas. Development notes only. Unsubscribe whenever you like."
    />
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="preview-note">
        FROM FORT WORTH, WITH CARE <span>—</span> Welcome to a house in the
        making.
      </div>
      <header className="site-header wrap">
        <Link href="/" className="brand" aria-label="House of Pulido home">
          <img src="/brand/assets/monogram-espresso.png" alt="" />
          <span>
            HOUSE OF
            <br />
            PULIDO
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={location === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <a href="#follow" className="header-follow">
          Follow <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
          <a href="#follow" onClick={() => setOpen(false)}>
            Follow <ArrowRight size={20} aria-hidden="true" />
          </a>
        </nav>
      )}
      <main id="main" className="wrap">
        {children}
        <Signup />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <img
              src="/brand/assets/monogram-ivory.png"
              alt="House of Pulido monogram"
              width="64"
              height="64"
              loading="lazy"
            />
            <p>
              Everyday clothing,
              <br />
              considered closely.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/first-edition">First Edition</Link>
            <Link href="/the-house">The House</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="footer-links">
            <a href="#follow">Follow Edition 001</a>
            <Link href="/contact">Contact Vanessa</Link>
            <Link href="/privacy">Preview privacy</Link>
            <Link href="/terms">Preview terms</Link>
            <a href="#main">Back to top ↑</a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 House of Pulido · Fort Worth, Texas</span>
            <span>Our goal: garments worth passing on.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
