"use client";

import { useEffect, useState } from "react";

import FadeUp from "@/components/motion/fade-up";
import SectionHeading from "@/components/ui/section-heading";

import {
  Sparkles,
  Rocket,
  BrainCircuit,
  Layers3,
} from "lucide-react";

const highlights = [
  {
    icon: Rocket,
    title: "Modern Web Experiences",
    description:
      "Building futuristic landing pages, startup websites, and scalable digital experiences with premium UI aesthetics and smooth interactions.",
  },
  {
    icon: BrainCircuit,
    title: "AI Automation Systems",
    description:
      "Designing smart workflow automations and AI-powered systems that improve productivity and streamline modern business operations.",
  },
  {
    icon: Layers3,
    title: "Premium UI/UX Design",
    description:
      "Crafting clean, responsive, and visually immersive interfaces focused on modern user experiences and startup-level polish.",
  },
];

export default function About() {
  const [about, setAbout] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const [totalProjects, setTotalProjects] =
    useState(0);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/about");

        if (!res.ok) return;

        const text = await res.text();

        if (!text) return;

        const data = JSON.parse(text);

        setAbout({
          title: data?.title ?? "",
          subtitle: data?.subtitle ?? "",
          description: data?.description ?? "",
        });
      } catch (error) {
        console.error(
          "Error loading about section:",
          error
        );
      }
    }

    loadAbout();
    loadProjects();
    async function loadProjects() {
      try {
        const res = await fetch(
          "/api/projects"
        );

        if (!res.ok) return;

        const data = await res.json();

        setTotalProjects(
          data.stats?.totalProjects || 0
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="absolute left-0 top-1/2 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Me"
          title={
            about.title ||
            "Building modern digital experiences with development, design, and AI automation"
          }
          description="BTech Computer Science graduate focused on building modern web experiences, premium startup-style interfaces, and AI-powered workflow solutions for businesses and creators."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeUp>
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 transition-all duration-700 hover:border-cyan-400/30 hover:bg-white/[0.05] md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                  <Sparkles size={15} />
                  BTech CSE Graduate • Full Stack Developer
                </div>

                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                  {about.subtitle ||
                    "I create sleek digital products designed for modern startups and businesses."}
                </h3>

                <p className="mt-6 text-lg leading-relaxed text-white/60">
                  {about.description ||
                    "I build modern websites, premium SaaS experiences, AI automation systems, and scalable digital products for startups, businesses, and creators."}
                </p>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:border-cyan-400/20 hover:bg-cyan-500/5">
                    <h4 className="text-3xl font-semibold text-white">
                      {totalProjects}+
                    </h4>

                    <p className="mt-2 text-sm text-white/50">
                      Projects Delivered
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:border-cyan-400/20 hover:bg-cyan-500/5">
                    <h4 className="text-3xl font-semibold text-white">
                      AI + Web
                    </h4>

                    <p className="mt-2 text-sm text-white/50">
                      Core Expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeUp
                  key={item.title}
                  delay={index * 0.1}
                >
                  <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 transition-all duration-700 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

                    <div className="relative z-10 flex gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition duration-500 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
                        <Icon size={28} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-3 leading-relaxed text-white/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}