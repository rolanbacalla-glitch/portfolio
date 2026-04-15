"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  size: "small" | "medium" | "large";
  href?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "StreamMagic",
    category: "Connected Audio / App UX",
    description:
      "Redesigned key listening and control flows for a hi-fi streaming companion app, improving clarity, navigation, and day-to-day usability across complex product interactions.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop",
    size: "medium",
    href: "https://play.google.com/store/apps/details?id=com.audiopartnership.music.streammagic&hl=en_GB",
  },
  {
    id: 2,
    title: "Melomania Connect",
    category: "Mobile App / Consumer Audio",
    description:
      "Designed app experiences for wireless earbuds management, including ANC, transparency mode, EQ, and touch controls with a focus on intuitive settings architecture.",
    image:
      "https://images.unsplash.com/photo-1615554851544-e6249b92a492?q=80&w=1740&auto=format&fit=crop",
    size: "medium",
    href: "https://play.google.com/store/apps/details?id=com.cambridgeaudio.melomaniaplus&hl=en_GB",
  },
  {
    id: 3,
    title: "Travel Kin",
    category: "Concept Product / Travel",
    description:
      "Explored a travel companion product that helps users organise trips, navigate plans, and manage information through clearer UX structure and supportive design patterns.",
    image:
      "https://images.unsplash.com/photo-1708370456263-464604531b30?q=80&w=2064&auto=format&fit=crop",
    size: "medium",
    href: "https://travel-kin.rolanbacalla.space/",
  },
  {
    id: 4,
    title: "Lynda Plus",
    category: "Research / Evaluation",
    description:
      "A high-end, AI-powered user research platform designed to deliver deep, actionable insights with unprecedented speed. ",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    href: "https://lynda-plus.rolanbacalla.space/",
  },
  {
    id: 5,
    title: "Design Systems Work",
    category: "Systems / UI Foundations",
    description:
      "Created scalable UI structures, reusable components, and clearer design patterns to support consistency across screens, workflows, and developer handoff.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop",
    size: "medium",
    href: "https://design-system.rolanbacalla.space/",
  },
  {
    id: 6,
    title: "Nest Wallet",
    category: "Crypto Wallet / Trading",
    description:
      "An AI layer inside a crypto wallet that explains transactions, detects risk, and helps users avoid scams and irreversible mistakes.  ",
    image:
      "https://images.unsplash.com/photo-1652533625932-25d5104161a1?q=80&w=774&auto=format&fit=crop",
    size: "medium",
    href: "https://nest-wallet.rolanbacalla.space/",
  },
  {
    id: 7,
    title: "Visual Exploration & Systems",
    category: "UI/UX / Visual Systems",
    description:
      "A deep dive into functional aesthetics, spanning from user journey mapping to high-fidelity dark-mode interfaces and dashboard systems.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    href: "https://photos.app.goo.gl/L84z1yFRZhecR7p99",
  },
];

export default function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="mb-14 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.22em] text-zinc-400">
          Selected Projects
        </p>
        <h2 className="max-w-6xl text-5xl font-bold leading-[1.2em] tracking-[0.0em] text-white md:text-7xl lg:text-[4rem]">
          Case studies grounded in real product challenges
        </h2>
        <p className="mt-5 text-base leading-7 text-zinc-300 md:text-lg">
          A selection of product design work spanning connected audio, companion
          apps, UX audits, and concept development. Each project focuses on
          solving a specific user or business problem with clear design thinking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((project, i) => {
          const spanClass =
            project.size === "large"
              ? "md:col-span-7 md:row-span-2"
              : project.size === "medium"
                ? "md:col-span-5"
                : "md:col-span-4";

          return (
            <motion.a
              key={project.id}
              href={project.href || "#"}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] ${spanClass}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] font-bold text-zinc-400">
                  {project.category}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
