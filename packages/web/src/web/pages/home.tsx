import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DevelopmentStatus } from '../components/development';
import { editorialSite } from '../lib/house-links';

export function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <div className="hop-eyebrow hero-eyebrow"><span className="tiny-rule"/>From Fort Worth · With Vanessa & Ryan</div>
        <h1>Everyday clothing,<br/><em>considered closely.</em></h1>
        <p className="hero-question">A family name from Fort Worth. A new chapter, made together.</p>
        <p>We’re Vanessa and Ryan, carrying the Pulido name into clothing and building our first everyday tee in the open. Come follow the materials, the questions, and the small decisions that make it ours.</p>
        <a className="hop-button main-cta" href={editorialSite} target="_blank" rel="noopener noreferrer">Read our field notes <ArrowUpRight size={18}/></a>
        <a className="text-link hero-participation" href="#follow">Tell us about your everyday shirt <ArrowRight size={18}/></a>
        <span className="hero-footnote">There’s a place for your experience in the making.</span>
      </div>
      <div className="hero-plate" aria-label="Our development philosophy">
        <div className="plate-top"><span className="hop-eyebrow">The Pulido point of view</span><span className="plate-mark">H · P</span></div>
        <img src="/brand/assets/monogram-ivory.png" alt="House of Pulido monogram" width="200" height="200"/>
        <p>Consider the material.<br/>Learn through wear.<br/><em>Earn the claim.</em></p>
        <div className="plate-bottom"><span>OUR GOAL: GARMENTS WORTH PASSING ON.</span><span>Come along for the making.</span></div>
      </div>
    </section>
    <div className="manifesto-strip"><span className="hop-eyebrow">The guiding question</span><p>What makes you reach for it again?</p><span className="strip-number">THE EVERYDAY / RECONSIDERED</span></div>

    <section className="section problem-section">
      <div className="section-heading"><div><span className="hop-eyebrow">01 / Start with your experience</span><h2>A favorite tee.<br/>Until it isn’t.</h2></div><p>Maybe the fit changes. Maybe the seams twist. Maybe it simply stops feeling like your favorite. We’re starting with the details you notice in everyday wear.</p></div>
      <div className="principles">{[['01','Does the fit stay familiar?','We plan to measure dimensional change and twisting through repeat care trials.'],['02','Does the fabric earn its place?','We plan to compare opacity, construction, appearance, and practical care.'],['03','Would you wear it again?','Structured wearer feedback will sit alongside measurements—not replace them.']].map(([n,title,body])=><div className="principle" key={n}><span className="hop-eyebrow">{n} / Research question</span><h3>{title}</h3><p>{body}</p></div>)}</div>
    </section>

    <section className="section programs-section">
      <div className="section-heading"><div><span className="hop-eyebrow">02 / The work before the garment</span><h2>Two ways to learn.<br/>One honest record.</h2></div><Link href="/first-edition" className="text-link">Inside the development hub <ArrowUpRight size={18}/></Link></div>
      <div className="programs-grid">
        <div className="program"><span className="hop-eyebrow">A / Materials & method</span><h3>The Pulido<br/>Material Lab</h3><p>Our first fabric comparisons are underway. The next steps are baseline measurements and repeat care trials, with the conditions and trade-offs shared alongside what we learn.</p><Link href="/journal/what-we-will-measure" className="text-link">Read our testing plan <ArrowUpRight size={18}/></Link></div>
        <div className="program"><span className="hop-eyebrow">B / A community taking shape</span><h3>The Wear Test<br/>Collective</h3><p>Different routines. Different preferences. Real room for feedback. As the tee develops, we’ll bring wearers into the process. Your everyday experience can help shape the questions now.</p><a href="#follow" className="text-link">Start with your shirt story <ArrowUpRight size={18}/></a></div>
      </div>
    </section>
    <DevelopmentStatus/>

    <section className="section story-grid"><div><span className="hop-eyebrow">03 / The House · Fort Worth, Texas</span><h2>A name remembered.<br/>A story still being made.</h2></div><div className="story-copy"><p className="large-copy">Before it was a label,<br/>Pulido’s was a name at the table.</p><p>The Pulido’s restaurant legacy is part of Fort Worth’s family story. For us—Vanessa and Ryan—carrying the name into clothing is a personal next chapter.</p><p>House of Pulido is our independent clothing venture. We’re beginning with the everyday tee: something familiar, useful, and worth giving our attention to.</p><Link href="/the-house" className="text-link">Meet the house <ArrowUpRight size={18}/></Link></div></section>

    <section className="section journal-preview"><div className="section-heading"><div><span className="hop-eyebrow">04 / Notes from the making</span><h2>The material.<br/>The method. The story.</h2></div><Link href="/journal" className="text-link">Open the Tee Test Journal <ArrowUpRight size={18}/></Link></div><p className="journal-intro">There’s already a beginning to read. Explore the material and process writing on our editorial site, or start here with the testing plan. We’ll share results as the work produces them.</p><div className="journal-list"><a href={editorialSite} target="_blank" rel="noopener noreferrer" className="journal-row"><span className="journal-number">01</span><div><span className="hop-eyebrow">Field notes / Our editorial site</span><h3>Step inside the first chapter</h3><p className="hop-caption">The material brief, our point of view, and the story behind the house.</p></div><ArrowUpRight size={22}/></a><Link href="/journal/what-we-will-measure" className="journal-row"><span className="journal-number">02</span><div><span className="hop-eyebrow">Tee Test Journal / Testing plan</span><h3>What we’ll measure before launch</h3><p className="hop-caption">The questions, care checkpoints, and how we intend to learn.</p></div><ArrowRight size={22}/></Link></div></section>
  </>;
}