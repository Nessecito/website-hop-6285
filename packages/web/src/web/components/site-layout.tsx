import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { editorialSite, shirtFeedbackEmail } from '../lib/house-links';

const links = [['/first-edition', 'First Edition'], ['/the-house', 'The House'], ['/journal', 'Tee Test Journal']];

export function Signup() {
  return <section className="signup section" id="follow" aria-labelledby="follow-title">
    <div><span className="hop-eyebrow">The founding community / Pull up a chair</span><h2 id="follow-title">Your everyday shirt.<br/><em>Your part in the story.</em></h2><p>We’re Vanessa and Ryan. We’d love to know what you notice, what you keep, and what you wish someone would get right.</p></div>
    <div className="signup-copy"><p className="participation-question">What usually goes wrong with your favorite everyday shirt?</p><p>A collar that stretches? A fit that changes? A detail you miss once it’s gone? Send us a note—your experience can help shape the questions we take into development.</p>
      <a href={shirtFeedbackEmail} className="hop-button main-cta">Share your shirt story <ArrowUpRight size={18}/></a>
      <p className="hop-caption participation-note">Opens a draft in your email app addressed to Vanessa. You choose what to share and when to send it; this is a conversation, not a mailing-list signup or tester application.</p>
      <a href={editorialSite} target="_blank" rel="noopener noreferrer" className="text-link">Follow along in our field notes <ArrowUpRight size={18}/></a>
    </div>
  </section>;
}

export function SiteLayout({children}: {children: ReactNode}) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); window.scrollTo(0,0); }, [location]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="preview-note">FROM FORT WORTH, WITH CARE <span>—</span> Welcome to a house in the making.</div>
    <header className="site-header wrap">
      <Link href="/" className="brand" aria-label="House of Pulido home"><img src="/brand/assets/monogram-espresso.png" alt=""/><span>HOUSE OF<br/>PULIDO</span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(([href,label]) => <Link key={href} href={href} aria-current={location===href?'page':undefined}>{label}</Link>)}</nav>
      <a href="#follow" className="header-follow">The founding community <ArrowUpRight size={15}/></a>
      <button ref={menuButton} className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </header>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([href,label])=><Link key={href} href={href}>{label}<ArrowUpRight size={20}/></Link>)}<Link href="/wear-test-collective">Wear Test Collective <ArrowUpRight size={20}/></Link><a href="#follow" onClick={()=>setOpen(false)}>The founding community <ArrowRight size={20}/></a></nav>}
    <main id="main" className="wrap">{children}<Signup/></main>
    <footer className="site-footer"><div className="wrap footer-inner"><div className="footer-brand"><img src="/brand/assets/monogram-ivory.png" alt="House of Pulido"/><p>Everyday clothing,<br/>considered closely.</p></div><div className="footer-links"><Link href="/the-house">The House</Link><Link href="/first-edition">Development hub</Link><Link href="/journal">Tee Test Journal</Link><Link href="/wear-test-collective">Wear Test Collective</Link></div><div className="footer-links"><Link href="/contact">Contact Vanessa</Link><Link href="/privacy">Preview privacy</Link><Link href="/terms">Preview terms</Link><a href="#main">Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 House of Pulido</span><span>Our goal: garments worth passing on.</span></div></div></footer>
  </>;
}