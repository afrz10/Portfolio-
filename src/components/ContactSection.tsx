/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 09 — CONTACT
 * Faithfully matches 10-contact.png:
 * - LET'S BUILD SOMETHING AFRUZ headline
 * - Email: afruz5954@gmail.com (with copy & mailto action)
 * - Instagram: @afrux.exe (direct link)
 * - Green Thread horizontal rule
 * - Signature sculpture on the right
 */

import React, { useState } from 'react';
import { BRAND_DATA } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { Copy, Check, ArrowUpRight, Mail } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { ref, isRevealed } = useReveal<HTMLElement>(0.1);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${BRAND_DATA.email}?subject=${encodeURIComponent(
      name ? `Collaboration inquiry from ${name}` : 'Collaboration Inquiry'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative min-h-[85vh] flex flex-col justify-center py-14 sm:py-20 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Contact AFRUZ"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="mb-8 sm:mb-10">
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1F1F1D] tracking-tight leading-[0.96] select-none">
              LET’S BUILD SOMETHING
            </h2>
            <span className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#7D9A78] tracking-tight block mt-1.5">
              AFRUZ
            </span>
          </div>

          <div className="space-y-6 sm:space-y-7 max-w-xl">
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8A8780] block mb-1">
                Email
              </span>
              <div className="flex items-center gap-3.5">
                <a
                  href={`mailto:${BRAND_DATA.email}`}
                  className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1F1F1D] hover:text-[#7D9A78] transition-colors break-all cursor-pointer"
                  data-cursor="link"
                >
                  {BRAND_DATA.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-full hover:bg-black/5 text-[#8A8780] hover:text-[#1F1F1D] transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] cursor-pointer"
                  aria-label="Copy email address"
                  title="Copy email address"
                  data-cursor="link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#10B981] animate-in zoom-in-50 duration-150" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8A8780] block mb-1">
                Instagram
              </span>
              <a
                href={BRAND_DATA.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1F1F1D] hover:text-[#7D9A78] transition-colors cursor-pointer"
                data-cursor="link"
              >
                <span>{BRAND_DATA.instagram}</span>
                <ArrowUpRight className="w-5 h-5 text-[#7D9A78] group-hover:text-[#F59E0B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            <div className="pt-2">
              <form onSubmit={handleSendEmail} className="rounded-2xl glass-panel p-5 sm:p-6 border border-[#E7E3DA] space-y-3.5 shadow-xs">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#7D9A78] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                  <span>Quick Inquiry</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/75 border border-[#E7E3DA] text-xs sm:text-sm text-[#1F1F1D] placeholder-[#8A8780] focus:outline-none focus:border-[#7D9A78] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Subject / Project"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/75 border border-[#E7E3DA] text-xs sm:text-sm text-[#1F1F1D] placeholder-[#8A8780] focus:outline-none focus:border-[#7D9A78] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F1F1D] text-white text-xs font-medium hover:bg-[#7D9A78] transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78]"
                  data-cursor="link"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 pt-5 border-t border-[#8FA88B]/40 max-w-xl" />
        </div>

        <div className="lg:col-span-4 h-[300px] sm:h-[380px] lg:h-[460px] flex items-center justify-center relative select-none">
          <SignatureSculpture size="hero" interactive={true} />
        </div>
      </div>

      <footer className="mt-14 sm:mt-16 pt-6 border-t border-[#E7E3DA] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8780] gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1F1F1D]">{BRAND_DATA.name}</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND_DATA.identity}</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} AFRUZ. All rights reserved.</span>
        </div>
      </footer>
    </section>
  );
};
