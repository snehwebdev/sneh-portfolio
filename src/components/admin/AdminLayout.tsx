"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({
  title,
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Projects",
      href: "/admin/projects",
    },
    {
      name: "Services",
      href: "/admin/services",
    },
    {
      name: "Technologies",
      href: "/admin/technologies",
    },
    {
      name: "About",
      href: "/admin/about",
    },
    {
      name: "Contact",
      href: "/admin/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="fixed left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="fixed right-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div className="border-b border-white/10 p-8">
            <h2 className="text-2xl font-bold">
              TecnaSync CMS
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Portfolio Management
            </p>
          </div>

          <nav className="space-y-2 p-4">
            {links.map((link) => {
              const active =
                pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative block rounded-2xl px-4 py-3 transition-all duration-300
                    ${
                      active
                        ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400" />
                  )}

                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Current Section */}
          <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Current Section
            </p>

            <p className="mt-2 font-medium text-cyan-300">
              {title}
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-wider text-cyan-300">
              TecnaSync CMS
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              {title}
            </h1>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}