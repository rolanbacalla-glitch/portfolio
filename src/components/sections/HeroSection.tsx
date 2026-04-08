"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(18,101,94,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-sm uppercase tracking-[0.24em] text-zinc-400"
        >
          UX/UI Designer · Product Thinking · Design Systems
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="max-w-6xl text-5xl font-bold leading-[1.2em] tracking-[0.0em] text-white md:text-7xl lg:text-[5rem]"
        >
          Designing digital products
          <br />
          that feel clear, useful,
          <br />
          and beautifully resolved
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-8 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg"
        >
          I’m Rolan Bacalla, a London-based UX/UI designer creating product
          experiences across audio, tools, and digital platforms — with a strong
          focus on usability, systems thinking, and polished interaction design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            View Projects
            <ArrowUpRight size={16} />
          </a>

          <a
            href="mailto:rolan.bacalla@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}