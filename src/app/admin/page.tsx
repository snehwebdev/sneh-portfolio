import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Rocket,
  Briefcase,
  BrainCircuit,
  User,
  Mail,
  Layers3,
} from "lucide-react";

const sections = [
  {
    title: "Projects",
    description: "Manage portfolio projects",
    href: "/admin/projects",
    icon: Briefcase,
  },
  {
    title: "Services",
    description: "Manage offered services",
    href: "/admin/services",
    icon: Rocket,
  },
  {
    title: "About",
    description: "Manage about section",
    href: "/admin/about",
    icon: User,
  },
  {
    title: "Hero",
    description: "Manage landing section",
    href: "/admin/hero",
    icon: Layers3,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Glow Effects */}
      <div className="fixed left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="fixed right-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <p className="mb-3 text-cyan-300">
              Sneh Barot Portfolio CMS
            </p>

            <h1 className="text-5xl font-bold">
              Content Management
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-white/60">
              Manage every section of your portfolio without
              touching code.
            </p>
          </div>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-12 w-12",
              },
            }}
          />
      </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
              >
                <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.05]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon size={28} />
                    </div>

                    <h2 className="text-2xl font-semibold">
                      {section.title}
                    </h2>

                    <p className="mt-3 text-white/60">
                      {section.description}
                    </p>

                    <div className="mt-6 text-cyan-300">
                      Open →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}