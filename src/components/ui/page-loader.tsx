"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* GLOW */}
          <div className="absolute h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* LOGO */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-4xl font-semibold tracking-tight text-transparent"
            >
              SnehWebDev
            </motion.h1>

            {/* LOADING LINE */}
            <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-cyan-300"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}