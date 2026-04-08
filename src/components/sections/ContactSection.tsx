"use client";

import { motion } from "framer-motion";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: <Globe size={16} />,
    href: "https://github.com/rolanbacalla-glitch/",
  },
  {
    name: "Flux Lab AI",
    icon: <Globe size={16} />,
    href: "#",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(18,101,94,0.2),transparent_28%)]" />

        <div className="relative max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.22em] text-zinc-400">
            Contact
          </p>

          <h2 className="max-w-6xl text-5xl font-bold leading-[1.2em] tracking-[0.0em] text-white md:text-7xl lg:text-[4rem]">
            Let’s talk about product design, UX,
            <br /> or collaboration
          </h2>

          <p className="mt-6 text-base leading-7 text-zinc-300 md:text-lg">
            I’m currently open to UX/UI and product design opportunities,
            freelance collaborations, and design conversations around digital
            products, research, and systems-led work.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:rolan.bacalla@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Email Me
              <Mail size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/rolan-bacalla/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              View LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/[0.08]"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}