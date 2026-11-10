export const editorialSite = "https://house-of-pulido-editorial.nessecito.chatgpt.site/";

export const shirtFeedbackEmail = `mailto:Vanessa@houseofpulido.com?subject=${encodeURIComponent("My everyday shirt — a note for Vanessa and Ryan")}&body=${encodeURIComponent("Hi Vanessa and Ryan,\n\nWhat usually goes wrong with my favorite everyday shirt:\n\n\nThe detail I would love you to get right:\n\n\nThanks,\n")}`;

export const questions = [
  ["01", "Does the fit stay familiar?", "We plan to measure dimensional change and twisting through repeat care trials."],
  ["02", "Does the fabric earn its place?", "We plan to compare opacity, construction, appearance, and practical care."],
  ["03", "Would you wear it again?", "Structured wearer feedback will sit alongside measurements—not replace them."],
] as const;

export const journey = [
  ["01 / Written", "The customer brief", "Who the tee is for, and what it should bring to everyday wear."],
  ["02 / Built", "The testing checklist", "The questions and care checkpoints that will guide our comparisons."],
  ["03 / Underway", "The first fabric comparisons", "Looking closely at the materials before the next prototype decisions."],
  ["04 / Ahead", "What we learn, shared openly", "Results and revisions will join the journal as the work produces them."],
] as const;

export const principles = [
  ["01", "Materials with purpose.", "Cotton-first where it suits the garment. Other fibers considered for a meaningful functional benefit—not a blanket claim of superiority."],
  ["02", "Honesty before promises.", "Publish the method and its limits. Mark unsupported material claims as unverified. Internal trials are not accredited laboratory results."],
  ["03", "Feedback that changes things.", "Invite criticism. Record the issue, revise the relevant detail, and retest before claiming an improvement."],
] as const;

export const releaseGates = [
  ["0", "Research", "Define the customer, use case, price ceiling, minimum requirements, and claims worth investigating."],
  ["1", "Material eligibility", "Check supplier identity and composition evidence; complete the baseline plan and resolve critical red flags."],
  ["2", "Prototype approval", "Review construction and early care trials against documented minimums; assign corrective actions."],
  ["3", "Wear-test completion", "Collect checkpoint feedback, document revisions, and resolve critical issues."],
  ["4", "Production readiness", "Verify the production sample, specification, care label, costing, and quality-control plan."],
  ["5", "Commercial release", "Sign off the decision and match every public product claim to evidence on file."],
] as const;

export const journalEntries = [
  {
    eyebrow: "Field notes / Editorial site",
    title: "Step inside the first chapter",
    caption: "The material brief, our point of view, and the story behind the house.",
    href: editorialSite,
  },
  {
    eyebrow: "Tee Test Journal / Testing plan",
    title: "What we’ll measure before launch",
    caption: "The questions, care checkpoints, and how we intend to learn.",
    href: "/method",
  },
] as const;

export const futureNotes = [
  "What the first wash trials actually showed",
  "Your feedback, and the next prototype revision",
  "How to read a tee’s specifications and test report",
];

export const methodSections = [
  {
    eyebrow: "01 / Know the sample",
    title: "Identity before claims.",
    paragraphs: [
      "Each material will need an ID and intake record: supplier legal identity, mill or agent, sample lot, composition evidence, knit structure, claimed origin, weight, finish, care guidance, and relevant certificates or reports.",
      "A certification logo alone does not establish that a supplied lot is certified. Unsupported claims will be marked unverified. Sample and prototype IDs will be published only when assigned to real records.",
    ],
  },
  {
    eyebrow: "02 / Establish the baseline",
    title: "Measure the same way.",
    paragraphs: [
      "Record dimensions, weight and GSM, appearance, opacity, drape, and hand feel. Record the setup and conditions, use multiple readings, and photograph comparable samples under consistent lighting.",
      "Subjective impressions will remain separate from measured outcomes. Cotton jersey and other fabric types will not be ranked on one universal scale.",
    ],
  },
  {
    eyebrow: "03 / Repeat ordinary care",
    title: "One wash is only a beginning.",
    paragraphs: [
      "Plan matched swatch and garment trials at the intended care conditions. Record the machine, detergent, temperature, drying method, actual cycle count, and any deviations.",
    ],
    washes: true,
  },
  {
    eyebrow: "04 / Listen to real wear",
    title: "Room to say no.",
    paragraphs: [
      "The proposed Wear Test Collective will record actual wear and wash counts: before wear, first wear, after three wears, five washes, ten washes, and at thirty days.",
      "Planned ratings use a 1–5 scale with an N/A option: softness, movement comfort, perceived breathability, fit, drape, opacity and confidence, ease of care, appearance after washing, perceived durability, and overall satisfaction.",
      "Ask separately: “Would you choose to wear it again?” and, once a proposed price exists, “Would you consider buying it at this price?” Invite what annoyed people and when they avoided wearing it.",
    ],
  },
  {
    eyebrow: "05 / Make the feedback matter",
    title: "Record. Revise. Retest.",
    paragraphs: [
      "Track each issue against its material or garment ID, test conditions, severity, evidence, proposed change, owner, and retest result. Count affected testers—not repeated comments as independent people.",
      "Future entries will show what changed between real prototype versions. No improvement claim will be made solely because a change was proposed.",
    ],
  },
] as const;

export const faqs: { q: string; a: string; href?: string; label?: string }[] = [
  {
    q: "What is House of Pulido?",
    a: "House of Pulido is our independent clothing venture from Fort Worth, Texas. We are Vanessa and Ryan, carrying the Pulido family name into clothing and beginning with an everyday tee. It is a house in the making, not a finished store.",
  },
  {
    q: "Is this the Pulido’s restaurant?",
    a: "No. The Pulido’s restaurant legacy is part of our family story in Fort Worth, and we carry the name forward with respect. House of Pulido is an independent clothing venture, not the restaurant’s successor.",
  },
  {
    q: "Can I buy the tee yet?",
    a: "No. There are no orders, reservations, preorders, prices, sizes, or delivery dates yet. “First Edition” names this development chapter. The gates, not the calendar, decide what ships.",
    href: "/(tabs)/house",
    label: "See the development path",
  },
  {
    q: "Where is the work right now?",
    a: "The customer brief is written, the testing checklist is built, and our first fabric comparisons are underway. Results and revisions will join the public record as the work produces them. Nothing is marked complete before its evidence exists.",
    href: "/(tabs)/house",
    label: "Follow the release gates",
  },
  {
    q: "How can I follow along?",
    a: "Read the field notes on our editorial site and the proposed testing plan in this app. There is no newsletter signup.",
    href: editorialSite,
    label: "Read the field notes",
  },
  {
    q: "How do I share my shirt story?",
    a: "The shirt-story button opens a draft in your email app addressed to Vanessa. You choose what to share and when to send it. It is a conversation, not a mailing-list signup or tester application.",
    href: shirtFeedbackEmail,
    label: "Share your shirt story",
  },
  {
    q: "What is the Wear Test Collective?",
    a: "A planned small adult pilot with different routines and preferences. Applications are not open. A separate app, Pulido Wear Log, can keep your own wears, washes, and checkpoint notes on this device. That log is not an application, and nothing in it is sent unless you choose to share it.",
  },
  {
    q: "What will you measure?",
    a: "Identity before claims, consistent baselines, repeat care trials at 1, 5, 10, and 20 washes, real-wearer feedback, and a recorded revision for every issue. Internal trials are not accredited laboratory results.",
    href: "/method",
    label: "Read the proposed method",
  },
  {
    q: "Do you collect my email in this app?",
    a: "No. This app has no forms and collects no newsletter addresses or tester information. The shirt-story button opens your email app. The preview build includes platform analytics.",
  },
  {
    q: "How do I contact you?",
    a: "Email Vanessa directly at Vanessa@houseofpulido.com. There is no in-app chat, and no reply-time promise.",
    href: "mailto:Vanessa@houseofpulido.com",
    label: "Email Vanessa",
  },
];
