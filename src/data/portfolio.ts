import type { StaticImageData } from "next/image";

import heroStrategyImg from "@/assets/images/hero_strategy_1795370199539.jpg";
import heroExperiencesImg from "@/assets/images/hero_digital_experiences_1795374606347.jpg";
import heroSystemsImg from "@/assets/images/hero_systems_1795370220079.jpg";
import approachProductCraftImg from "@/assets/images/approach_product_craft_1795373697405.jpg";

import caseStreamMagicImg from "@/assets/images/case_streammagic_1795370194148.jpg";
import caseMelomaniaImg from "@/assets/images/case_melomania_1795370163141.jpg";
import caseTravelKinImg from "@/assets/images/case_travel_kin_1795370238144.jpg";
import caseLyndaPlusImg from "@/assets/images/case_lynda_plus_1795370180138.jpg";
import caseDesignSystemsImg from "@/assets/images/case_design_systems_1795370237571.jpg";
import caseNestWalletImg from "@/assets/images/case_nest_wallet_1795370175156.jpg";

import avatarLead1 from "@/assets/images/avatar_lead_1_1795370247707.jpg";
import avatarLead2 from "@/assets/images/avatar_lead_2_1795370156756.jpg";
import avatarLead3 from "@/assets/images/avatar_lead_3_1795370209878.jpg";

export type WorkCategory =
  | "All"
  | "Product Strategy"
  | "Digital Experiences"
  | "Design Systems";

export interface DisciplineCard {
  id: string;
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  icon: "lightbulb" | "monitor" | "chart";
  image: StaticImageData;
  imageAlt: string;
  filterTarget: Exclude<WorkCategory, "All">;
  zoomClass?: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  diamond: string;
  mode: "Diverge" | "Converge";
  summary: string;
  detail: string;
  deliverables: string[];
  icon: "search" | "target" | "pencil" | "check";
}

export interface CaseStudy {
  id: string;
  title: string;
  domain: string;
  year: string;
  category: Exclude<WorkCategory, "All">;
  icon: "audio" | "headphones" | "compass" | "research" | "layers" | "shield";
  summary: string;
  problem: string;
  role: string;
  outcome: string;
  highlights: string[];
  image: StaticImageData;
  imageAlt: string;
  liveUrl?: string;
  liveLabel?: string;
}

export interface ExpertisePillar {
  title: string;
  description: string;
  focus: string;
}

export const collaboratorAvatars = [
  { src: avatarLead1, alt: "Product lead collaborator" },
  { src: avatarLead2, alt: "Design director collaborator" },
  { src: avatarLead3, alt: "Engineering lead collaborator" },
];

export const designerPortrait = {
  src: approachProductCraftImg,
  alt: "London UX and product designer desk with hand-drawn wireframes, mobile prototype, and studio sketchbook",
};

export const heroDisciplines: DisciplineCard[] = [
  {
    id: "strategy",
    titleTop: "Product",
    titleBottom: "Strategy",
    subtitle: "Find clarity. Build differently.",
    icon: "lightbulb",
    image: heroStrategyImg,
    imageAlt: "Curved modern glass architecture rising against a blue sky",
    filterTarget: "Product Strategy",
  },
  {
    id: "experiences",
    titleTop: "Digital",
    titleBottom: "Experiences",
    subtitle: "Design products people love.",
    icon: "monitor",
    image: heroExperiencesImg,
    imageAlt:
      "Minimalist smartphone displaying a modern mobile audio app interface beside a brushed aluminium control dial on a warm peach backdrop",
    filterTarget: "Digital Experiences",
    zoomClass: "object-center group-hover:scale-[1.05]",
  },
  {
    id: "systems",
    titleTop: "Design",
    titleBottom: "Systems",
    subtitle: "Turn insights into scalable craft.",
    icon: "chart",
    image: heroSystemsImg,
    imageAlt: "Sculptural mint and emerald layered geometric waves",
    filterTarget: "Design Systems",
    zoomClass: "scale-[1.18] group-hover:scale-[1.24]",
  },
];

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Discover",
    diamond: "Problem Space",
    mode: "Diverge",
    summary:
      "Explore user needs, behaviours, and friction broadly through qualitative research and UX audits.",
    detail:
      "Open the first diamond wide—speaking with users, auditing existing journeys, and gathering real-world context before assuming a solution.",
    deliverables: [
      "User interviews & field insight",
      "Heuristic & usability audits",
      "End-to-end journey mapping",
    ],
    icon: "search",
  },
  {
    number: "02",
    title: "Define",
    diamond: "Problem Space",
    mode: "Converge",
    summary:
      "Synthesise research into a sharp problem statement, clear user flows, and prioritised scope.",
    detail:
      "Narrow the first diamond down to what genuinely matters—aligning product stakeholders around the core UX opportunity and measurable outcomes.",
    deliverables: [
      "Research synthesis & themes",
      "Problem framing & priorities",
      "Information architecture",
    ],
    icon: "target",
  },
  {
    number: "03",
    title: "Develop",
    diamond: "Solution Space",
    mode: "Diverge",
    summary:
      "Explore multiple interface directions, interactive prototypes, and reusable design-system patterns.",
    detail:
      "Expand the second diamond to test competing solutions—co-designing with engineers, iterating wireframes, and building scalable UI components.",
    deliverables: [
      "Wireframes & UI exploration",
      "Interactive Figma prototypes",
      "Scalable component systems",
    ],
    icon: "pencil",
  },
  {
    number: "04",
    title: "Deliver",
    diamond: "Solution Space",
    mode: "Converge",
    summary:
      "Validate with real users, refine edge cases, and partner closely with engineers through launch.",
    detail:
      "Converge on the strongest tested experience—finalising accessible specs, micro-interaction polish, and QA support so the shipped product feels resolved.",
    deliverables: [
      "Usability testing & iteration",
      "Developer handoff specs",
      "Launch QA & refinement",
    ],
    icon: "check",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "streammagic",
    title: "StreamMagic",
    domain: "Connected Audio · App UX",
    year: "2024",
    category: "Digital Experiences",
    icon: "audio",
    summary:
      "Improved a hi-fi streaming companion experience for listeners managing playback, sources, and connected audio hardware.",
    problem:
      "Listeners navigating multi-source hi-fi streamers faced fragmented controls and dense settings across playback, queue management, and device configuration.",
    role: "UX/UI design, interaction design, design systems, and usability refinement.",
    outcome:
      "Delivered a calmer, more intuitive control hierarchy that reduced friction across everyday listening and device switching.",
    highlights: [
      "Restructured core playback and source-switching navigation for one-handed mobile control.",
      "Simplified hardware setup and room-level settings into progressive, scannable flows.",
      "Aligned dark-mode surface elevation and typography across iOS and Android screens.",
    ],
    image: caseStreamMagicImg,
    imageAlt: "Brushed dark aluminium hi-fi streaming amplifier with crisp display",
  },
  {
    id: "melomania-connect",
    title: "Melomania Connect",
    domain: "Mobile App · Consumer Audio",
    year: "2024",
    category: "Digital Experiences",
    icon: "headphones",
    summary:
      "Designed companion features for wireless earbuds, covering ANC, transparency mode, equaliser presets, and custom touch controls.",
    problem:
      "Audio hardware controls such as active noise cancellation, EQ bands, and gesture mapping often overwhelm users on smaller mobile viewports.",
    role: "Product design, feature UX, settings architecture, and reusable UI components.",
    outcome:
      "Created clearer visual feedback and everyday usability for key listening modes and personalisation controls.",
    highlights: [
      "Crafted tactile ANC and transparency state switchers with immediate visual hierarchy.",
      "Redesigned multi-band equaliser interactions for effortless thumb adjustment.",
      "Clarified left/right earbud touch-control customisation to reduce accidental inputs.",
    ],
    image: caseMelomaniaImg,
    imageAlt: "Matte charcoal true-wireless earbuds beside open charging case on stone",
  },
  {
    id: "travel-kin",
    title: "Travel Kin",
    domain: "Travel Planning · Product Design",
    year: "2025",
    category: "Product Strategy",
    icon: "compass",
    summary:
      "Designed a travel companion experience helping people organise itineraries, shared plans, and decisions with far less friction.",
    problem:
      "Group and solo trip planning frequently scatters across spreadsheets, chat threads, and saved links—leaving key decisions unclear.",
    role: "End-to-end UX/UI design, user flows, product structure, and visual direction.",
    outcome:
      "Established a structured, calm planning experience with clear visibility of daily schedules, tasks, and shared choices.",
    highlights: [
      "Mapped end-to-end trip lifecycle from early inspiration to day-by-day on-the-ground navigation.",
      "Designed modular itinerary cards that surface timing, notes, and status without visual noise.",
      "Built an interactive prototype to test itinerary editing and group collaboration flows.",
    ],
    image: caseTravelKinImg,
    imageAlt: "Sunlit Mediterranean architectural terrace overlooking calm sea horizon",
    liveUrl: "https://travel-kin.rolanbacalla.space/",
    liveLabel: "Open live project",
  },
  {
    id: "lynda-plus",
    title: "Lynda Plus",
    domain: "UX Research · Product Concept",
    year: "2025",
    category: "Product Strategy",
    icon: "research",
    summary:
      "An insight synthesis workspace helping product teams turn qualitative research sessions into structured, actionable decisions faster.",
    problem:
      "UX researchers and product managers spend hours tagging transcripts and clustering notes before stakeholders can act on findings.",
    role: "Product strategy, UX architecture, research workflow design, and interface craft.",
    outcome:
      "Streamlined synthesis from raw session notes to prioritised themes with transparent source traceability.",
    highlights: [
      "Structured side-by-side transcript evidence and thematic clustering for fast verification.",
      "Designed scannable research briefs tailored for hiring managers and product stakeholders.",
      "Balanced dense analytical workflows with generous breathing room and clear typographic rhythm.",
    ],
    image: caseLyndaPlusImg,
    imageAlt: "Minimalist London UX studio desk with research synthesis display",
    liveUrl: "https://lynda-plus.rolanbacalla.space/",
    liveLabel: "Open live project",
  },
  {
    id: "design-systems",
    title: "Design Systems Foundations",
    domain: "Systems · UI Foundations",
    year: "2025",
    category: "Design Systems",
    icon: "layers",
    summary:
      "Scalable UI foundations, reusable components, and tokenised patterns supporting visual consistency and smooth engineering handoff.",
    problem:
      "Growing multi-screen products accumulate inconsistent spacing, ad-hoc component states, and avoidable engineering rework.",
    role: "Design systems architecture, token modelling, accessibility auditing, and documentation.",
    outcome:
      "Accelerated interface assembly across product surfaces while raising WCAG contrast and interaction consistency.",
    highlights: [
      "Defined semantic colour, spacing, elevation, and typographic scales across light and dark modes.",
      "Documented interactive states—hover, focus-visible, disabled, and loading—for core components.",
      "Partnered with front-end engineers to mirror Figma component APIs cleanly in code.",
    ],
    image: caseDesignSystemsImg,
    imageAlt: "Modular geometric ceramic and frosted glass design system blocks",
    liveUrl: "https://design-system.rolanbacalla.space/",
    liveLabel: "Inspect system",
  },
  {
    id: "nest-wallet",
    title: "Nest Wallet",
    domain: "Fintech · Trust & Risk UX",
    year: "2025",
    category: "Design Systems",
    icon: "shield",
    summary:
      "A protective transaction clarity layer inside a digital wallet that explains actions in plain English and flags high-risk approvals.",
    problem:
      "Cryptic hex payloads and opaque signing prompts leave everyday wallet users vulnerable to irreversible mistakes and phishing.",
    role: "Interaction design, risk-state communication patterns, and high-contrast UI systems.",
    outcome:
      "Transformed opaque signing screens into plain-language summaries with unmistakable risk hierarchy.",
    highlights: [
      "Translated technical contract calls into readable human summaries before user confirmation.",
      "Designed progressive warning tiers paired with explicit icons and clear copy—never colour alone.",
      "Crafted a disciplined dark interface optimised for scanning critical figures accurately.",
    ],
    image: caseNestWalletImg,
    imageAlt: "Sculpted dark frosted obsidian glass slabs with soft emerald edge light",
    liveUrl: "https://nest-wallet.rolanbacalla.space/",
    liveLabel: "Open live project",
  },
];

export const expertisePillars: ExpertisePillar[] = [
  {
    title: "Product Design",
    description:
      "User flows, interaction design, wireframing, prototyping, and end-to-end interface architecture.",
    focus: "Web, iOS & Android",
  },
  {
    title: "UX Research",
    description:
      "Usability testing, heuristic evaluation, research synthesis, and user-centred decision-making.",
    focus: "Evidence-led UX",
  },
  {
    title: "Design Systems",
    description:
      "Component architecture, tokenised consistency, accessible UI patterns, and engineering handoff.",
    focus: "Scalable foundations",
  },
  {
    title: "Visual Craft",
    description:
      "Disciplined hierarchy, refined typography, considered motion, and responsive interaction polish.",
    focus: "Detail & accessibility",
  },
];
