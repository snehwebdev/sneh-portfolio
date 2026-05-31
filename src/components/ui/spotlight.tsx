"use client";

import { motion } from "framer-motion";

export default function Spotlight() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      animate={{
        background: [
          "radial-gradient(600px at 20% 20%, rgba(56,189,248,0.10), transparent 80%)",
          "radial-gradient(600px at 80% 40%, rgba(168,85,247,0.10), transparent 80%)",
          "radial-gradient(600px at 40% 80%, rgba(59,130,246,0.10), transparent 80%)",
          "radial-gradient(600px at 20% 20%, rgba(56,189,248,0.10), transparent 80%)",
        ],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
