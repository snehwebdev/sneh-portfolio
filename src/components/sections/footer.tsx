import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";

import { FiMail } from "react-icons/fi";

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com/snehwebdev",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/sneh-barot",
  },
  {
    icon: FaGithub,
    href: "https://github.com/snehwebdev",
  },
  {
    icon: FaWhatsapp,
    href: "",
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/10 px-6 py-14"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              <span className="gradient-text">
                SnehWebDev
              </span>
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
              Freelance Full Stack Developer &
              AI Automation Builder crafting
              futuristic SaaS experiences,
              premium interfaces, and modern
              workflow systems.
            </p>

            {/* EMAIL */}
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&to=snehwebdev@gmail.com&tf=cm"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-3 text-sm text-white/60 transition duration-300 hover:text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
                <FiMail size={18} />
              </div>

              <span>
                snehwebdev@gmail.com
              </span>
            </a>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white/70 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Icon
                    size={20}
                    className="relative z-10"
                  />

                  {/* HOVER GLOW */}
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div
                      className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${
                        social.icon === FaWhatsapp
                          ? "bg-green-400/20"
                          : "bg-cyan-400/20"
                      }`}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-sm text-white/40 md:flex-row">
          <p>
            © 2026 SnehWebDev. All rights reserved.
          </p>

          <p>
            Designed & developed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}