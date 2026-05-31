"use client";

import Image from "next/image";

import FadeUp from "@/components/motion/fade-up";
import SectionHeading from "@/components/ui/section-heading";
import SpotlightCard from "@/components/ui/spotlight-card";

const stackGroups = [
  {
    category: "Frontend",
    technologies: [
      {
        name: "HTML5",
        logo: "/logos/html5.svg",
      },
      {
        name: "CSS3",
        logo: "/logos/css.svg",
      },
      {
        name: "JavaScript",
        logo: "/logos/javascript.svg",
      },
      {
        name: "TypeScript",
        logo: "/logos/typescript.svg",
      },
      {
        name: "React",
        logo: "/logos/react.svg",
      },
      {
        name: "Next.js",
        logo: "/logos/nextdotjs.svg",
      },
      {
        name: "TailwindCSS",
        logo: "/logos/tailwindcss.svg",
      },
      {
        name: "Framer Motion",
        logo: "/logos/framer.svg",
      },
    ],
  },

  {
    category: "Backend & Auth",
    technologies: [
      {
        name: "Node.js",
        logo: "/logos/nodedotjs.svg",
      },
      {
        name: "Python",
        logo: "/logos/python.svg",
      },
      {
        name: "PostgreSQL",
        logo: "/logos/postgresql.svg",
      },
      {
        name: "MongoDB",
        logo: "/logos/mongodb.svg",
      },
      {
        name: "Clerk Auth",
        logo: "/logos/clerk.svg",
      },
      {
        name: "Firebase",
        logo: "/logos/firebase.svg",
      },
    ],
  },

  {
    category: "Automation & AI",
    technologies: [
      {
        name: "AI Automation",
        logo: "/logos/n8n.svg",
      },
      {
        name: "n8n",
        logo: "/logos/n8n.svg",
      },
      {
        name: "Workflow Systems",
        logo: "/logos/n8n.svg",
      },
    ],
  },

  {
    category: "Design & SEO",
    technologies: [
      {
        name: "Figma",
        logo: "/logos/figma.svg",
      },
      {
        name: "UI/UX Design",
        logo: "/logos/framer.svg",
      },
      {
        name: "SEO Optimization",
        logo: "/logos/vercel.svg",
      },
      {
        name: "Responsive Design",
        logo: "/logos/css.svg",
      },
      {
        name: "Vercel",
        logo: "/logos/vercel.svg",
      },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* BACKGROUND LIGHT */}
      <div className="absolute right-0 top-1/2 h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Modern technologies powering premium digital experiences"
          description="A curated ecosystem of modern frontend technologies, automation tools, AI systems, and scalable development workflows."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {stackGroups.map((group, index) => (
            <FadeUp
              key={group.category}
              delay={index * 0.1}
            >
              <div className="glass group rounded-[28px] p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-purple-500/30">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {group.category}
                </h3>

                <div className="mt-8 flex flex-wrap gap-4">
                  {group.technologies.map((tech) => (
                    <SpotlightCard
                      key={tech.name}
                      className="group/item flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-500/10"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 transition-all duration-500 group-hover/item:scale-110 group-hover/item:border-cyan-400/30">
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          width={22}
                          height={22}
                          className="object-contain brightness-0 invert"
                        />
                      </div>

                      <span className="text-sm font-medium text-white/80 transition-all duration-300 group-hover/item:text-white">
                        {tech.name}
                      </span>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
