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

const ledger = [
  {
    area: 'Customer discovery',
    status: 'In progress',
    copy: 'Listening to people who wear tees often and have specific standards.',
  },
  {
    area: 'Fabric direction',
    status: 'Candidate specification',
    copy: 'Cotton-first; evaluating weight, recovery, opacity, and hand.',
  },
  {
    area: 'Sample testing',
    status: 'Testing next',
    copy: 'Wash, wear, fit, and construction testing before production is considered.',
  },
  {
    area: 'Claims and traceability',
    status: 'Unresolved',
    copy: 'Any durability or sustainability claim will need product-specific proof.',
  },
  {
    area: 'Founder’s edition',
    status: 'Not announced',
    copy: 'Details will be shared only once the product earns them.',
  },
] as const;

export function DevelopmentStatus() {
  return (
    <section
      className="section development-ledger"
      id="development-ledger"
      aria-labelledby="ledger-heading"
    >
      <div className="section-heading">
        <div>
          <span className="hop-eyebrow">Development ledger</span>
          <h2 id="ledger-heading">
            What is known. What is being tested.
            <br />
            What comes next.
          </h2>
        </div>
        <p>
          We will keep the work visible without pretending every decision has
          been made.
        </p>
      </div>

      <table className="ledger-table">
        <caption className="visually-hidden">Development ledger</caption>
        <thead>
          <tr className="ledger-row ledger-head">
            <th scope="col">Area</th>
            <th scope="col">Current status</th>
            <th scope="col">Public-facing note</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((row) => (
            <tr className="ledger-row" key={row.area}>
              <th scope="row" className="ledger-area">
                {row.area}
              </th>
              <td className="ledger-status">
                <span className="status-chip">{row.status}</span>
              </td>
              <td className="ledger-copy">{row.copy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/journal" className="text-link">
        Read the development notes <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
