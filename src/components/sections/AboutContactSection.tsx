"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react";

const EMAIL = "rolan.bacalla@gmail.com";

const externalLinks = [
  {
    label: "View LinkedIn",
    href: "https://www.linkedin.com/in/rolan-bacalla/",
  },
  {
    label: "View GitHub",
    href: "https://github.com/rolanbacalla-glitch/",
  },
];

export default function AboutContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer
      id="contact"
      className="w-full text-[#10161C]"
    >
      <div className="mx-auto max-w-[1380px] px-6 pt-12 pb-10 sm:px-10 lg:px-14 lg:pt-16 lg:pb-12">
        {/* Main Contact Row */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[14px] font-semibold tracking-[-0.01em] text-[#1D7A5E]">
              Let’s work together
            </p>

            <h2 className="mt-2.5 font-heading text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#10161C] sm:text-[2.5rem]">
              Have a digital product or role in mind?
            </h2>

            <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-[#3D4550]">
              I’m currently open to UK product design roles, UX/UI consultancy,
              and freelance collaborations. If you’re building something that
              needs thoughtful, systems-led design, I’d love to hear about it.
            </p>
          </div>

          {/* Primary Contact Actions */}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#0F171E] px-6 py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A5E] whitespace-nowrap shrink-0"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Rolan
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#CBD2DA] bg-white px-5 py-3 text-[14.5px] font-medium text-[#10161C] transition-colors duration-200 hover:border-[#10161C] hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A5E] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check
                      className="h-4 w-4 text-[#1D7A5E]"
                      aria-hidden="true"
                    />
                    <span>Email copied</span>
                  </>
                ) : (
                  <>
                    <Copy
                      className="h-4 w-4 text-[#4B5563]"
                      aria-hidden="true"
                    />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Real Profile Links */}
            <nav
              aria-label="External profiles"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-[14.5px] font-medium text-[#2F3742]"
            >
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-[#10161C] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D7A5E] whitespace-nowrap"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#D4DAE2] pt-6 text-[14px] text-[#4B5563] sm:flex-row sm:items-center">
          <p>© 2026 Rolan Bacalla · UX/UI Designer based in London, UK.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-medium text-[#1F2937] underline-offset-4 transition-colors hover:text-[#10161C] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D7A5E] whitespace-nowrap"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
