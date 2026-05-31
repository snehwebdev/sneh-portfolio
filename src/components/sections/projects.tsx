"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import FadeUp from "@/components/motion/fade-up";
import TiltCard from "@/components/motion/tilt-card";
import SectionHeading from "@/components/ui/section-heading";

import {
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrls: string[];
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

export default function Projects() {
const [projects, setProjects] = useState<Project[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function loadProjects() {
try {
const res = await fetch("/api/projects");


    if (!res.ok) return;

    const data = await res.json();
    console.log("PROJECTS DATA:", data.projects);

    setProjects(data.projects || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

loadProjects();


}, []);

console.log(
  "FEATURED PROJECTS:",
  projects.filter((p) => p.featured)
);

const featuredProjects = projects.filter(
  (p) => p.featured
);

const [currentProject, setCurrentProject] =
  useState(0);

const [galleryOpen, setGalleryOpen] =
  useState(false);

const [currentImage, setCurrentImage] =
  useState(0);
const featuredProject =
  featuredProjects[currentProject];
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (!galleryOpen || !featuredProject) return;

    if (e.key === "Escape") {
      setGalleryOpen(false);
    }

    if (e.key === "ArrowLeft") {
      setCurrentImage((prev) =>
        prev === 0
          ? featuredProject.imageUrls.length - 1
          : prev - 1
      );
    }

    if (e.key === "ArrowRight") {
      setCurrentImage((prev) =>
        prev === featuredProject.imageUrls.length - 1
          ? 0
          : prev + 1
      );
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, [galleryOpen, currentImage]);
if (
  loading ||
  featuredProjects.length === 0
) {
  return null;
}

if (!featuredProject) {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl text-center text-white/50">
        No projects found.
      </div>
    </section>
  );
}
return ( <section
   id="projects"
   className="relative overflow-hidden px-6 py-24 md:py-32"
 > <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />


  <div className="relative mx-auto max-w-7xl">
    <SectionHeading
      eyebrow="Featured Project"
      title={featuredProject.title}
      description={featuredProject.description}
    />

    <FadeUp>
      <TiltCard className="group relative rounded-[36px]">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.05] md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles size={15} />
                Featured Project
              </div>

              <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {featuredProject.title}
              </h3>

              <p className="mt-6 text-lg leading-relaxed text-white/60">
                {featuredProject.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {featuredProject.technologies?.map(
                  (tech) => (
                    <div
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-white"
                    >
                      {tech}
                    </div>
                  )
                )}
              </div>

              <div className="mt-10 flex gap-4">
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/button relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/20 bg-cyan-500/10 px-7 py-3 font-medium text-white transition-all duration-500 hover:scale-105 hover:border-cyan-300/40 hover:bg-cyan-400/20"
                  >
                    <span className="relative z-10">
                      View Project
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="relative z-10 transition duration-300 group-hover/button:-translate-y-1 group-hover/button:translate-x-1"
                    />
                  </a>
                )}

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-7 py-3 text-white/80 transition hover:border-white/30"
                  >
                    GitHub
                  </a>
                )}
                {featuredProjects.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentProject((prev) =>
                          prev === 0
                            ? featuredProjects.length - 1
                            : prev - 1
                        )
                      }
                      className="rounded-full border border-white/10 px-5 py-3 text-white/80 transition hover:border-cyan-400"
                    >
                      ← Prev
                    </button>

                    <button
                      onClick={() =>
                        setCurrentProject((prev) =>
                          prev === featuredProjects.length - 1
                            ? 0
                            : prev + 1
                        )
                      }
                      className="rounded-full border border-white/10 px-5 py-3 text-white/80 transition hover:border-cyan-400"
                    >
                      Next →
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-cyan-400/10 blur-3xl transition duration-700 group-hover:scale-105" />

              <div className="glass relative overflow-hidden rounded-[32px] border border-white/10 p-6 shadow-2xl">
                <div className="mb-6 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {featuredProject.imageUrls?.[0] ? (
                    <Image
                      src={featuredProject.imageUrls[0]}
                      alt={featuredProject.title}
                      width={1400}
                      height={900}
                      priority
                      onClick={() => {
                        setGalleryOpen(true);
                        setCurrentImage(0);
                      }}
                      className="h-auto w-full cursor-pointer object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-[400px] items-center justify-center bg-white/5 text-white/40">
                      No Image Available
                    </div>
                  )}
                </div>
              
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl md:block">
                <p className="text-sm text-white/50">
                  Technologies
                </p>

                <h4 className="mt-1 text-lg font-semibold text-white">
                  {featuredProject.technologies?.length || 0}
                  {" "}Tech Stack Items
                </h4>
              </div>

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </TiltCard>
    </FadeUp>
  </div>
 {galleryOpen &&
  featuredProject.imageUrls?.length > 0 && (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-xl">

      <button
        onClick={() => setGalleryOpen(false)}
        className="
        absolute top-6 right-6
        z-50
        flex h-12 w-12 items-center justify-center
        rounded-full
        bg-black/50
        backdrop-blur-md
        border border-white/20
        text-white
        shadow-2xl
        transition-all duration-300
        hover:bg-red-500
        hover:scale-110
        "
      >
        <X size={22} />
      </button>

      <button
        onClick={() =>
          setCurrentImage((prev) =>
            prev === 0
              ? featuredProject.imageUrls.length - 1
              : prev - 1
          )
        }
        className="
        absolute left-6 top-1/2
        -translate-y-1/2
        z-50
        flex h-14 w-14 items-center justify-center
        rounded-full
        bg-black/50
        backdrop-blur-md
        border border-white/20
        text-white
        shadow-2xl
        transition-all duration-300
        hover:bg-cyan-500
        hover:border-cyan-400
        hover:scale-110
        "
      >
        <ChevronLeft size={28} />
      </button>

      <div className="relative max-w-6xl px-6">
        <img
          src={featuredProject.imageUrls[currentImage]}
          alt="Project Preview"
          className="max-h-[85vh] rounded-[32px] border border-white/10 shadow-[0_0_80px_rgba(34,211,238,0.15)]"
        />

        <div className="mt-6 flex justify-center gap-3">
          {featuredProject.imageUrls.map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentImage(index)
                }
                className={`h-3 w-3 rounded-full transition ${
                  currentImage === index
                    ? "bg-cyan-400"
                    : "bg-white/20"
                }`}
              />
            )
          )}
        </div>
      </div>

      <button
        onClick={() =>
          setCurrentImage((prev) =>
            prev === featuredProject.imageUrls.length - 1
              ? 0
              : prev + 1
          )
        }
        className="
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          z-50
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-black/50
          backdrop-blur-md
          border border-white/20
          text-white
          shadow-2xl
          transition-all duration-300
          hover:bg-cyan-500
          hover:border-cyan-400
          hover:scale-110
        "
      >
        <ChevronRight size={28} />
      </button>
    </div>
)}
</section>


);
}
