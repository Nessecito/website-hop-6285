import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export const releaseGates = [
  ['0', 'Research', 'Define the customer, use case, price ceiling, minimum requirements, and claims worth investigating.'],
  ['1', 'Material eligibility', 'Check supplier identity and composition evidence; complete the baseline plan and resolve critical red flags.'],
  ['2', 'Prototype approval', 'Review construction and early care trials against documented minimums; assign corrective actions.'],
  ['3', 'Wear-test completion', 'Collect checkpoint feedback, document revisions, and resolve critical issues.'],
  ['4', 'Production readiness', 'Verify the production sample, specification, care label, costing, and quality-control plan.'],
  ['5', 'Commercial release', 'Sign off the decision and match every public product claim to evidence on file.'],
];

export function DevelopmentStatus() {
  return <section className="development-status" aria-labelledby="status-heading">
    <div><span className="hop-eyebrow">The first tee / A journey taking shape</span><h2 id="status-heading">Small steps.<br/>A thoughtful beginning.</h2><p>We’ve put the everyday wearer at the center of our brief, built the testing checklist, and begun our first fabric comparisons. Here’s where the work is taking us.</p><Link href="/first-edition#release-gates" className="text-link">Follow the path to the first tee <ArrowUpRight size={18}/></Link></div>
    <ol className="journey-list"><li><span className="hop-eyebrow">01 / Written</span><h3>The customer brief</h3><p>Who the tee is for, and what it should bring to everyday wear.</p></li><li><span className="hop-eyebrow">02 / Built</span><h3>The testing checklist</h3><p>The questions and care checkpoints that will guide our comparisons.</p></li><li><span className="hop-eyebrow">03 / Underway</span><h3>The first fabric comparisons</h3><p>Looking closely at the materials before the next prototype decisions.</p></li><li><span className="hop-eyebrow">04 / Ahead</span><h3>What we learn, shared openly</h3><p>Results and revisions will join the journal as the work produces them.</p></li></ol>
  </section>;
}