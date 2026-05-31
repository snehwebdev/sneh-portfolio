"use client";

import FadeUp from "@/components/motion/fade-up";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* BACKGROUND LIGHTS */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">
        <FadeUp>
          <div className="glass overflow-hidden rounded-[40px] border border-white/10 px-8 py-20 text-center md:px-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-sm text-purple-200">
                Let’s build something futuristic
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Designing premium digital experiences for the next generation of startups
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
                From modern SaaS platforms to AI automation systems,
                I help brands create scalable, visually premium,
                and future-ready digital products.
              </p>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              

                <a
                  href="#footer"
                  className="..."
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}