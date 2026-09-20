import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ExhibitionCursor Component
 *
 * Renders a minimalist, exhibition-style custom cursor with spring-physics trailing
 * and interactive state expansion over clickable elements.
 * Hardware-accelerated with Framer Motion motion values to avoid re-rendering lags.
 */
export const ExhibitionCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer smooth trailing spring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Inner snappy dot spring
  const dotConfig = { damping: 40, stiffness: 750 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable completely on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-interactive]'
          )
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[100] rounded-full border border-white mix-blend-difference items-center justify-center will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 30,
          height: isHovered ? 48 : 30,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "transparent",
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 300,
          mass: 0.4,
        }}
      />

      {/* Inner Snappy Precision Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default ExhibitionCursor;
