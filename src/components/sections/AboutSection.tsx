"use client";

import { motion } from "framer-motion";

const capabilities = [
  "UX/UI Design",
  "Interaction Design",
  "Design Systems",
  "Wireframing",
  "Prototyping",
  "Usability Testing",
];

const approach = [
  "Product Thinking",
  "Heuristic Evaluation",
  "User Flows",
  "Research Synthesis",
  "Design Strategy",
  "Developer Handoff",
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-12 md:grid-cols-12 md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.22em] text-zinc-400">
            About
          </p>
          <h2 className="max-w-6xl text-5xl font-bold leading-[1.2em] tracking-[0.0em] text-white md:text-7xl lg:text-[4rem]">
            Designing with clarity, systems, and intent
          </h2>

          <div className="mt-8 space-y-6 text-base leading-8 text-zinc-300 md:text-lg">
            <p>
              I’m a UX/UI designer based in London with experience designing
              digital products for audio hardware, companion apps, and
              interface-heavy experiences. My work focuses on turning complexity
              into flows, screens, and systems that feel simple to use and easy
              to trust.
            </p>

            <p>
              I’m especially interested in product design that sits at the
              intersection of usability, visual precision, and technical
              feasibility — from design systems and interaction patterns to
              research-led improvements and polished final UI.
            </p>

            <p>
              Previously, I worked on products such as StreamMagic and Melomania
              Connect, helping shape experiences around playback control, device
              settings, onboarding, and feature discoverability.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-5"
        >
          <div className="grid gap-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="mb-5 text-sm uppercase tracking-[0.18em] text-zinc-500">
                Capabilities
              </p>
              <div className="flex flex-wrap gap-3">
                {capabilities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="mb-5 text-sm uppercase tracking-[0.18em] text-zinc-500">
                Approach
              </p>
              <div className="flex flex-wrap gap-3">
                {approach.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}