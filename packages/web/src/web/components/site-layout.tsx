import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { EditionListForm } from './edition-list-form';

const sections = [
  ['edition', 'First Edition'],
  ['house', 'The House'],
  ['journal', 'Journal'],
  ['updates', 'Follow'],
] as const;

const social = [
  ['https://www.instagram.com/houseofpulido/', 'Instagram'],
  ['https://x.com/HouseofPulido', 'X'],
  ['https://www.threads.com/@houseofpulido', 'Threads'],
  ['https://www.facebook.com/profile.php?id=61595523170333', 'Facebook'],
] as const;

const closet = 'https://house-of-pulido-editorial.nessecito.chatgpt.site/closet-archaeology';

export function Signup() {
  return <section className="signup section" id="updates" aria-labelledby="updates-title">
    <div><span className="hop-eyebrow">Edition 001</span><h2 id="updates-title">Be there when it is ready.</h2><p>Join the list for development notes, select wear-test invitations, and the first word on Edition 001.</p></div>
    <div className="signup-copy">
      <EditionListForm source="closing" idPrefix="page-closing" label="Email address" button="Get Edition 001 updates" consent="I agree to receive Edition 001 updates." note="Development notes only. Unsubscribe whenever you like." />
      <p className="hop-caption">House of Pulido · Fort Worth, Texas</p>
    </div>
  </section>;
}

export function SiteLayout({children}: {children: ReactNode}) {
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = location === '/';

  useEffect(() => {
    document.body.classList.add('edition-home');
    return () => document.body.classList.remove('edition-home');
  }, []);

  useEffect(() => {
    setOpen(false);
    const pending = sessionStorage.getItem('hop-scroll');
    if (pending && location === '/') {
      sessionStorage.removeItem('hop-scroll');
      requestAnimationFrame(() => document.getElementById(pending)?.scrollIntoView());
      return;
    }
    const id = window.location.hash.replace('#', '');
    if (id && document.getElementById(id)) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setOpen(false);
    if (location !== '/') {
      sessionStorage.setItem('hop-scroll', id);
      navigate('/');
      return;
    }
    document.getElementById(id)?.scrollIntoView();
    window.history.pushState(null, '', `/#${id}`);
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    {!home && <div className="preview-note">FROM FORT WORTH, WITH CARE <span>—</span> Welcome to a house in the making.</div>}
    <header className="mast">
      <div className="wrap mast-inner">
        <Link href="/" className="wordmark">House of Pulido</Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {sections.map(([id, label]) => <a key={id} href={`/#${id}`} onClick={(event) => goToSection(event, id)}>{label}</a>)}
        </nav>
        <button ref={menuButton} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
    {open && <nav id="mobile-navigation" className="mobile-nav wrap" aria-label="Mobile navigation">{sections.map(([id, label]) => <a key={id} href={`/#${id}`} onClick={(event) => goToSection(event, id)}>{label}</a>)}</nav>}
    <main id="main">{home ? children : <div className="wrap">{children}</div>}{!home && <div className="wrap"><Signup /></div>}</main>
    <footer className="hop-footer">
      <div className="wrap">
        <div className="footer-top">
          <p>Heritage meets intention.</p>
          <nav aria-label="Footer" className="footer-nav">
            <a href="/#edition" onClick={(event) => goToSection(event, 'edition')}>First Edition</a>
            <a href="/#house" onClick={(event) => goToSection(event, 'house')}>The House</a>
            <a href="/#journal" onClick={(event) => goToSection(event, 'journal')}>Journal</a>
            <a href="/#updates" onClick={(event) => goToSection(event, 'updates')}>Follow Edition 001</a>
            <a href="/#apply" onClick={(event) => goToSection(event, 'apply')}>Apply to test</a>
          </nav>
        </div>
        <nav aria-label="Social" className="social-links">
          {social.map(([href, label]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
          <a href={closet} target="_blank" rel="nofollow noopener noreferrer">Closet Archaeology</a>
        </nav>
        <p className="footer-word">Pulido</p>
        <div className="footer-bottom">
          <span>© 2026 House of Pulido</span>
          <a href="#main">Back to top</a>
        </div>
        <nav aria-label="House notes" className="footer-legal">
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Preview privacy</Link>
          <Link href="/terms">Preview terms</Link>
          <Link href="/wear-test-collective">Wear Test Collective</Link>
        </nav>
      </div>
    </footer>
  </>;
}
