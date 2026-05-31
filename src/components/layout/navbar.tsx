"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Contact",
    href: "#footer",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("projects");

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(
        (link) => link.href.substring(1)
      );

      sections.forEach((section) => {
        const element =
          document.getElementById(section);

        if (!element) return;

        const rect =
          element.getBoundingClientRect();

        if (
          rect.top <= 200 &&
          rect.bottom >= 200
        ) {
          setActiveSection(section);
        }
      });
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-black/50 shadow-2xl backdrop-blur-2xl"
            : "border-white/5 bg-black/20 backdrop-blur-xl"
        }`}
      >
        {/* LEFT */}
        <Link
          href="/"
          className="pl-6 text-xl font-semibold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            SnehWebDev
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 pr-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              activeSection ===
              link.href.substring(1);

            return (
              <a
                key={link.name}
                href={link.href}
                className={`group relative text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}

                {/* UNDERLINE */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-cyan-300 transition-all duration-500 ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

                {/* ACTIVE GLOW */}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-3 mx-auto h-1 w-8 rounded-full bg-cyan-300/40 blur-md" />
                )}
              </a>
            );
          })}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pr-6 text-white md:hidden"
        >
          {isOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navLinks.map((link) => {
                const isActive =
                  activeSection ===
                  link.href.substring(1);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className={`border-b border-white/5 py-4 transition duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
