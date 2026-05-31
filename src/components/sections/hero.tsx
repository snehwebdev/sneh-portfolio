"use client";

import FadeUp from "@/components/motion/fade-up";
import Parallax from "@/components/motion/parallax";
import AnimatedGrid from "@/components/ui/animated-grid";
import Magnetic from "../motion/magnetic";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-40">
      <AnimatedGrid />

      {/* TOP GLOW */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px]" />

      {/* RIGHT GLOW */}
      <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <Parallax offset={60}>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <FadeUp>
              <div className="glass mb-6 inline-flex rounded-full px-4 py-2 text-sm text-white/70">
                Freelance Full Stack Developer & AI Automation Builder
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
                Building futuristic
                <span className="gradient-text">
                  {" "}AI-powered digital experiences
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
                I build premium SaaS platforms, AI automation
                systems, workflow solutions, and modern startup
                experiences designed for the future.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                {/* VIEW PROJECTS BUTTON */}
                <Magnetic>
                    <a
                    href="#projects"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/20 bg-cyan-500/10 px-7 py-3 font-medium text-white transition-all duration-500 hover:scale-105 hover:border-cyan-300/40 hover:bg-cyan-400/20"
                    >
                    <span className="relative z-10">
                        View Projects
                    </span>

                    <ArrowRight
                        size={18}
                        className="relative z-10 transition duration-300 group-hover:translate-x-1"
                    />

                    {/* BUTTON GLOW */}
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-2xl" />
                    </div>
                    </a>
                </Magnetic>

                {/* CONTACT BUTTON */}
                <Magnetic>
                    <a
                    href="#footer"
                    className="glass group relative inline-flex items-center overflow-hidden rounded-full px-7 py-3 text-white/80 transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                    <span className="relative z-10">
                        Contact Me
                    </span>

                    {/* BUTTON GLOW */}
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
                    </div>
                    </a>
                </Magnetic>
              </div>
            </FadeUp>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
