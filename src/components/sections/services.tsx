"use client";

import FadeUp from "@/components/motion/fade-up";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import SpotlightCard from "@/components/ui/spotlight-card";

import * as Icons from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured:boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const featuredServices = services.filter(
    (service) => service.featured
  );
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] =useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");

        if (!res.ok) return;

        const data = await res.json();

        setServices(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) return null;

  if (services.length === 0) {
    return (
      <section
        id="services"
        className="px-6 py-24 text-center text-white/50"
      >
        No services found.
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Premium digital solutions built for the future"
          description="I craft modern digital experiences, futuristic SaaS interfaces, and AI-powered workflow systems engineered for ambitious brands and startups."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featuredServices
            .slice(
              0,
              showAll
                ? featuredServices.length
                :6
            )
            .map((service, index) => {
            const Icon =
              (Icons[
                service.icon as keyof typeof Icons 
              ] as React.ElementType) ||
              Icons.Circle;

            return (
              <FadeUp
                className={
                  !showAll && index >= 3
                    ? "hidden md:block"
                    : ""
                }
                key={service.title}
                delay={index * 0.1}
              >
                <SpotlightCard
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.015] hover:border-cyan-400/30 hover:bg-white/[0.05]"
                >
                  {/* HOVER GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

                  {/* FLOATING LIGHT */}
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition duration-700 group-hover:scale-125" />

                  <div className="relative z-10">
                    {/* ICON */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                      <Icon
                        size={28}
                        className="transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-4 leading-relaxed text-white/60 transition duration-500 group-hover:text-white/70">
                      {service.description}
                    </p>
                  </div>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>
        {featuredServices.length > 3 && !showAll && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-8 py-3 text-cyan-300 transition hover:bg-cyan-500/20"
            >
              View All Services
            </button>
          </div>
        )}
        {showAll && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-xl">
            <div className="relative max-h-[80vh] w-full max-w-6xl overflow-y-auto rounded-[36px] border border-cyan-400/10 bg-[#0b1220]/95 p-8 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                  All Services
                </h2>

                <button
                  onClick={() =>
                    setShowAll(false)
                  }
                  className="rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-white transition hover:border-cyan-400 hover:bg-cyan-500/10"
                >
                  ✕
                </button>
              </div>

              <div className="relative grid gap-6 md:grid-cols-2">
                {services.map((service) => {
                  const Icon =
                    (Icons[
                      service.icon as keyof typeof Icons
                    ] as React.ElementType) ||
                    Icons.Circle;
                  console.log("SERVICES:", services);
                  return (
                    <div
                      key={service.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                      <Icon size={28} />

                      <h3 className="mt-4 text-xl font-semibold">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-white/60">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
