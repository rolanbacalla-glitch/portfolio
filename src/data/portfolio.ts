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
import caseCambridgeAudioOledImg from "@/assets/images/case_cambridge_audio_oled_1795704500782.jpg";
import caseCoffeeBreakHubImg from "@/assets/images/case_coffee_break_hub_1795704509585.jpg";
import caseApexStrategistImg from "@/assets/images/case_apex_strategist_1795704520000.jpg";
import caseSmartChargeEvImg from "@/assets/images/case_smartcharge_ev_1795704497866.jpg";
import caseTokenArchitectureSpecImg from "@/assets/images/case_token_architecture_spec_1795704505964.jpg";
import caseCheckoutFlowImg from "@/assets/images/case_checkout_flow_1795704517929.jpg";
import caseAtomAtelierDashboardsImg from "@/assets/images/case_atom_atelier_dashboards_1795704499525.jpg";
import caseRoamTogetherImg from "@/assets/images/case_roam_together_1795704516761.jpg";
import caseLyssnupPlayerImg from "@/assets/images/case_lyssnup_player_1795704525917.jpg";
import caseCodyPhilipsImg from "@/assets/images/case_cody_philips_1795704499592.jpg";
import caseWealthSaasLandingsImg from "@/assets/images/case_wealth_saas_landings_1795704509156.jpg";
import caseHozahBrandSpatialImg from "@/assets/images/case_hozah_brand_spatial_1795704518520.jpg";

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
  videoWebm?: string;
  videoMp4?: string;
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

export const COFFEE_BREAK_URL = "https://games.rolanbacalla.online/";
export const INITIAL_VISIBLE_PROJECTS = 6;

export type CaseStudyIcon =
  | "audio"
  | "headphones"
  | "compass"
  | "research"
  | "layers"
  | "shield"
  | "cpu"
  | "trending"
  | "zap"
  | "cart"
  | "layout"
  | "map"
  | "disc"
  | "briefcase"
  | "globe"
  | "car"
  | "coffee";

export interface CaseStudy {
  id: string;
  title: string;
  domain: string;
  year: string;
  category: Exclude<WorkCategory, "All">;
  icon: CaseStudyIcon;
  summary: string;
  problem: string;
  role: string;
  outcome: string;
  highlights: string[];
  metrics?: string[];
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
    videoWebm: "/videos/hero-strategy.webm",
    videoMp4: "/videos/hero-strategy.mp4",
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
    videoWebm: "/videos/hero-experiences.webm",
    videoMp4: "/videos/hero-experiences.mp4",
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
    videoWebm: "/videos/hero-systems.webm",
    videoMp4: "/videos/hero-systems.mp4",
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
  {
    id: "cambridge-audio-oled",
    title: "EVO 150 & CXN Display UI",
    domain: "Embedded Hardware · Audio UX",
    year: "2024",
    category: "Digital Experiences",
    icon: "cpu",
    summary:
      "Unified front-panel OLED/LCD display states across EVO 150, CXN, and EXN hardware streamers with 3-metre living-room legibility.",
    problem:
      "Listeners controlling hi-fi streamers via dual-concentric rotary dials needed instant visual clarity from across the room while staying synced with mobile apps.",
    role: "Lead Product Designer · Embedded Display UI, Companion Sync & UK Listener Research.",
    outcome:
      "Achieved 90% task completion and 25% faster Wi-Fi onboarding while cutting source-switching friction by 15%.",
    metrics: ["90% Task Completion", "+25% Setup Speed", "-15% Source Friction"],
    highlights: [
      "Designed 3-metre glanceable OLED typography, dB volume arcs, and rotary input selectors.",
      "Mapped 3 UK listener archetypes across an 18-screen zero-IP Wi-Fi onboarding flow.",
      "Synchronised real-time playback and source states between StreamMagic mobile surfaces and physical bezels.",
    ],
    image: caseCambridgeAudioOledImg,
    imageAlt: "Brushed dark aluminium hi-fi streamer with dual-concentric rotary dial and glowing OLED display on slate",
  },
  {
    id: "coffee-break-hub",
    title: "Coffee Break",
    domain: "Interactive Web · Game Systems",
    year: "2026",
    category: "Digital Experiences",
    icon: "coffee",
    summary:
      "An evolving collection of restorative browser rituals — spanning calm solo puzzles and tactile 1–2 player tabletop classics — unified on one modular design system for mindful focus breaks.",
    problem:
      "Short workday breaks easily get lost to endless scrolling or noisy games built to trap attention, while standalone web mini-games rarely share visual cohesion, accessibility, or a clean stopping point.",
    role: "Ongoing product design, modular game-system architecture, interaction craft, accessibility, and procedural Web Audio.",
    outcome:
      "Created an extensible, zero-account browser arcade governed by a calm one-round contract — supporting deterministic daily puzzles, Zen play, and local 2-player matches under one tactile language.",
    metrics: [
      "Living Game Suite",
      "Solo & 2-Player Modes",
      "Zero-Account · Private",
    ],
    highlights: [
      "Architected a reusable game-shell system that smoothly scales from solo spatial and colour puzzles to 8×8 tabletop classics such as Draughts and Chess as the library grows.",
      "Designed colour-independent tactile pieces using engraved symbols, grooved surfaces, and crisp contrast—paired with procedural Web Audio soundscapes and spring motion.",
      "Unified Daily Seeded, Zen, and local 2-Player play with full Light and Dark theme parity, keyboard accessibility, and privacy-by-default local persistence.",
    ],
    image: caseCoffeeBreakHubImg,
    imageAlt: "Matte ceramic V60 pour-over dripper beside interlocking ceramic puzzle tiles on warm pale oak",
    liveUrl: COFFEE_BREAK_URL,
    liveLabel: "Play Coffee Break",
  },
  {
    id: "apex-strategist",
    title: "Apex Strategist",
    domain: "FinTech · Portfolio & Risk UX",
    year: "2025",
    category: "Product Strategy",
    icon: "trending",
    summary:
      "Rules-based mobile portfolio experience replacing exchange clutter with Trade Advisor guardrails, allocation rules, and risk alerts.",
    problem:
      "Retail investors managing volatile portfolios struggle with noisy candlestick charts, emotional trades, and unclear portfolio drift.",
    role: "Lead Product Designer · Product Strategy, Information Architecture & 12-Screen Mobile UI.",
    outcome:
      "Drove a 25% lift in feature adoption, 40% reduction in rebalancing friction, and an 8.5/10 user trust score.",
    metrics: ["+25% Adoption", "-40% Friction", "8.5/10 UX Trust"],
    highlights: [
      "Surfaced tabular GBP balances and drift health scores without overwhelming chart noise.",
      "Created plain-English Trade Advisor guardrails with pre-trade risk previews.",
      "Designed one-tap automated rebalance rules and calm threshold alerts.",
    ],
    image: caseApexStrategistImg,
    imageAlt: "Sculptural brushed-brass, dark-slate, and emerald-glass architectural balance blocks on obsidian stone",
  },
  {
    id: "smartcharge-ev",
    title: "SmartCharge EV",
    domain: "CleanTech · Mobile & SaaS",
    year: "2025",
    category: "Digital Experiences",
    icon: "zap",
    summary:
      "Cross-platform home EV charging ecosystem pairing departure-time mobile scheduling with a desktop kWh analytics and tariff workspace.",
    problem:
      "EV drivers and fleet households lacked a unified way to automate off-peak overnight charging alongside transparent household energy billing.",
    role: "Senior Product Designer · Cross-Platform UX, Tariff Flows & Responsive SaaS UI.",
    outcome:
      "Unified 8 mobile companion screens and 3 desktop SaaS billing views around effortless off-peak automation.",
    metrics: ["11 Synced Screens", "Off-Peak Automation", "Mobile + SaaS"],
    highlights: [
      "Designed departure-ready mobile charge scheduling optimised around UK off-peak energy windows.",
      "Built a desktop SaaS workspace tracking kWh consumption, tariff savings, and charger telemetry.",
      "Maintained cohesive tokenised components across light-mode SaaS tables and mobile controls.",
    ],
    image: caseSmartChargeEvImg,
    imageAlt: "Minimalist matte off-white and charcoal home EV wallbox charger on a poured-concrete wall",
  },
  {
    id: "token-architecture-spec",
    title: "Multi-Platform Token Library",
    domain: "Design Systems · WCAG 2.2 AA",
    year: "2025",
    category: "Design Systems",
    icon: "layers",
    summary:
      "End-to-end 3-tier W3C DTCG token specification governing semantic surfaces, typography, interactive states, and Figma-to-code parity.",
    problem:
      "Cross-platform teams shipping web and mobile apps simultaneously needed a single source of truth for light/dark polarity and accessible contrast.",
    role: "Principal Design Systems Designer · Token Architecture & Engineering Hand-Off.",
    outcome:
      "Established 100% light and dark mode token parity with automated WCAG 2.2 AA contrast guardrails.",
    metrics: ["3-Tier Tokens", "Light & Dark Parity", "WCAG 2.2 AA"],
    highlights: [
      "Structured primitive, semantic, and component-scoped CSS/JSON tokens across surfaces and actions.",
      "Specified focus-visible rings, target-size minimums, and reduced-motion fallbacks across every primitive.",
      "Aligned Figma Variables directly with production Tailwind CSS v4 custom properties.",
    ],
    image: caseTokenArchitectureSpecImg,
    imageAlt: "Three stepped tiers of ceramic, brushed aluminium, and frosted glass design token swatches",
    liveUrl: "https://design-system.rolanbacalla.space/",
    liveLabel: "Inspect system",
  },
  {
    id: "checkout-flow",
    title: "Checkout Flow Optimisation",
    domain: "E-Commerce · Conversion UX",
    year: "2024",
    category: "Product Strategy",
    icon: "cart",
    summary:
      "Streamlined 7-screen mobile checkout reducing form friction through progressive disclosure, clear delivery tiers, and high-trust payment review.",
    problem:
      "Mobile shoppers were abandoning baskets mid-checkout due to long single-page forms, late delivery-fee surprises, and ambiguous error states.",
    role: "Product Designer · Conversion Optimisation, Form UX & Mobile Prototyping.",
    outcome:
      "Delivered a focused 7-step mobile flow with upfront shipping clarity and inline validation.",
    highlights: [
      "Broke dense address and payment inputs into calm, thumb-friendly progressive steps.",
      "Surfaced delivery dates and total GBP cost breakdowns early to eliminate basket shock.",
      "Designed unmistakable inline field recovery and high-trust order confirmation states.",
    ],
    image: caseCheckoutFlowImg,
    imageAlt: "Matte stone-grey luxury parcel box and brushed-metal payment card on a dark limestone tray",
  },
  {
    id: "atom-atelier-dashboards",
    title: "Atom Ledger & Atelier",
    domain: "Enterprise SaaS · Data Vis",
    year: "2025",
    category: "Design Systems",
    icon: "layout",
    summary:
      "High-density fintech and executive SaaS dashboards exploring dark card telemetry, multi-currency ledgers, and modular widget grids.",
    problem:
      "Finance and operations leads needed dense real-time KPI visibility without sacrificing typographic hierarchy or scan speed.",
    role: "Product Designer · Data Visualisation, Table Ergonomics & Dark UI Craft.",
    outcome:
      "Created 5 modular dashboard explorations balancing tabular precision with calm visual hierarchy.",
    highlights: [
      "Applied strict `tabular-nums` alignment and semantic status badges across high-row-count ledgers.",
      "Designed responsive bento telemetry cards with clear primary vs secondary metric contrast.",
      "Standardised dark-mode surface elevation steps to separate filters, canvas, and drawers cleanly.",
    ],
    image: caseAtomAtelierDashboardsImg,
    imageAlt: "Modular dark obsidian glass bento planes with subtle emerald and cobalt edge reflections",
  },
  {
    id: "roam-together",
    title: "Roam Together",
    domain: "Consumer Mobile · Social Maps",
    year: "2024",
    category: "Digital Experiences",
    icon: "map",
    summary:
      "Collaborative mobile travel app combining curated destination cards, shared group voting, and interactive route maps.",
    problem:
      "Friends co-planning weekend city breaks struggled to reconcile saved pins and group preferences inside a single mobile view.",
    role: "Product Designer · Mobile UX/UI, Map Overlay Ergonomics & Visual Direction.",
    outcome:
      "Crafted a warm, tactile mobile showcase uniting map exploration and shared itinerary cards.",
    highlights: [
      "Paired split-sheet map views with swipeable destination cards for effortless one-handed browsing.",
      "Designed lightweight group voting chips so travellers converge on activities quickly.",
      "Used a warm terracotta-and-amber accent system to evoke sunlit editorial travel guides.",
    ],
    image: caseRoamTogetherImg,
    imageAlt: "Sunlit terracotta stone terrace table with folded linen topographic map and brushed-brass compass",
  },
  {
    id: "lyssnup-player",
    title: "LyssnUP Music Player",
    domain: "Desktop & Tablet · Audio UI",
    year: "2024",
    category: "Digital Experiences",
    icon: "disc",
    summary:
      "Dual-mode desktop and tablet music streaming player rendered in obsidian dark and studio-grey themes with tactile playback controls.",
    problem:
      "Desktop streaming apps often feel like cluttered web wrappers rather than dedicated, album-art-forward listening instruments.",
    role: "Product Designer · Audio UI Exploration, Dual-Theme Craft & Spatial Layout.",
    outcome:
      "Designed a responsive widescreen player celebrating cover art, queue clarity, and tactile transport controls.",
    highlights: [
      "Crafted a smooth album cover-flow stage paired with lossless audio quality telemetry.",
      "Balanced obsidian dark and warm studio-grey themes with warm orange hardware-inspired accents.",
      "Optimised touch targets for tablet bedside/desk stands alongside desktop keyboard shortcuts.",
    ],
    image: caseLyssnupPlayerImg,
    imageAlt: "Minimalist brushed-aluminium and matte-black vinyl turntable on walnut plinth under warm amber studio lighting",
  },
  {
    id: "cody-philips",
    title: "Cody.Philips Executive",
    domain: "Web & Editorial · Brand UX",
    year: "2024",
    category: "Product Strategy",
    icon: "briefcase",
    summary:
      "Multi-page executive recruitment website pairing authoritative editorial typography with deep royal purple and warm gold accents.",
    problem:
      "Boutique C-suite search firms frequently blend into generic corporate templates that fail to convey discretion and senior-level authority.",
    role: "Lead Web & Brand Designer · Information Architecture, Editorial Direction & Web UI.",
    outcome:
      "Established a distinctive multi-page web presence positioned around 'Refined Talent Architecture'.",
    highlights: [
      "Structured clear journeys for both board-level hiring clients and confidential executive candidates.",
      "Paired high-contrast editorial headings with disciplined grid spacing and warm gold rules.",
      "Designed responsive practice-area index pages and partner profile templates.",
    ],
    image: caseCodyPhilipsImg,
    imageAlt: "Refined London gallery interior with fluted dark marble columns, deep plum panels, and brushed-brass trim",
  },
  {
    id: "wealth-saas-landings",
    title: "Wealth & SaaS Platforms",
    domain: "Marketing Web · Storytelling",
    year: "2024",
    category: "Product Strategy",
    icon: "globe",
    summary:
      "Full-length conversion landing pages contrasting a dark private-wealth platform with a crisp light-mode B2B SaaS product launch.",
    problem:
      "Complex financial and B2B software products lose prospective buyers above the fold when value propositions and product proof lack narrative pacing.",
    role: "Web Designer · Conversion Storytelling, Visual Hierarchy & Interactive Sections.",
    outcome:
      "Delivered two contrasting full-page web systems tailored to high-net-worth trust and SaaS trial conversion.",
    highlights: [
      "Paced hero proof, interactive product callouts, security trust markers, and pricing clarity.",
      "Explored dark obsidian wealth aesthetics ('Command your financial universe') vs crisp editorial light SaaS.",
      "Engineered modular section rhythm that collapses cleanly onto single-column mobile viewports.",
    ],
    image: caseWealthSaasLandingsImg,
    imageAlt: "Sculptural architectural contrast of matte dark obsidian stone planes meeting sunlit alabaster limestone",
  },
  {
    id: "hozah-brand-spatial",
    title: "Hozah Brand & Spatial",
    domain: "Mobility · Identity & Spatial",
    year: "2024",
    category: "Design Systems",
    icon: "car",
    summary:
      "Complete brand and spatial identity ('Drive in. Park. Walk away.') spanning web design, ANPR car-park signage, exhibition booths, and print.",
    problem:
      "Drivers encountering automated ticketless parking needed immediate, high-trust visual reassurance both on physical signage and online.",
    role: "Brand & Identity Designer · Logo Systems, Web Language & Physical Wayfinding.",
    outcome:
      "Unified digital touchpoints, large-format exhibition spaces, and collateral under a vibrant teal-and-lime identity.",
    highlights: [
      "Developed 3 logo explorations, brand guidelines, and the Hozah web visual language.",
      "Designed high-legibility outdoor wayfinding, exhibition booth graphics, and print collateral.",
      "Maintained unmistakable colour and typographic consistency from mobile screens to 4-metre booth walls.",
    ],
    image: caseHozahBrandSpatialImg,
    imageAlt: "Poured-concrete urban mobility pavilion with curved wayfinding arches and indirect teal and lime lighting",
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
