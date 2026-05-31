"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* SMOOTH SPRING */
  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  /* PREMIUM SPOTLIGHT */
  const background = useMotionTemplate`
    radial-gradient(
      260px circle at ${smoothX}px ${smoothY}px,
      rgba(34,211,238,0.12),
      transparent 45%
    )
  `;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{ background }}
      className={`relative overflow-hidden transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}