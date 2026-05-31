"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({
  children,
  className = "",
}: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 120,
    damping: 15,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 120,
    damping: 15,
  });

  const glareX = useTransform(
    smoothRotateY,
    [-10, 10],
    ["40%", "60%"]
  );

  const glareY = useTransform(
    smoothRotateX,
    [-10, 10],
    ["40%", "60%"]
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX =
      e.clientX - rect.left;

    const mouseY =
      e.clientY - rect.top;

    const rotateYValue =
      ((mouseX / width) - 0.5) * 12;

    const rotateXValue =
      ((mouseY / height) - 0.5) * -12;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {/* GLARE */}
      <motion.div
        style={{
          left: glareX,
          top: glareY,
        }}
        className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div
        style={{
          transform: "translateZ(40px)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}