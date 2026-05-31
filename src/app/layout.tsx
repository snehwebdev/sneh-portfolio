import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ScrollProgress from "@/components/ui/scroll-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Sneh Barot | Full Stack Developer & AI Automation Specialist",
    template: "%s | Sneh Barot",
  },

  description:
    "Sneh Barot is a Full Stack Developer and AI Automation Specialist helping startups and businesses build modern websites, SaaS applications, AI-powered workflows, and scalable digital products.",

  keywords: [
    "Sneh Barot",
    "Sneh Web Dev",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "AI Automation Specialist",
    "n8n Automation",
    "SaaS Developer",
    "Portfolio Website",
    "UI UX Designer",
    "Freelance Web Developer",
    "Business Automation",
    "Frontend Developer",
    "Backend Developer",
  ],

  authors: [
    {
      name: "Sneh Barot",
    },
  ],

  creator: "Sneh Barot",

  openGraph: {
    title:
      "Sneh Barot | Full Stack Developer & AI Automation Specialist",

    description:
      "Modern websites, SaaS applications, AI automation systems, business workflow automation, and premium digital experiences.",

    type: "website",

    locale: "en_US",

    siteName: "Sneh Barot Portfolio",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Sneh Barot | Full Stack Developer & AI Automation Specialist",

    description:
      "Building modern websites, SaaS products, AI automation systems and scalable digital experiences.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ScrollProgress />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}