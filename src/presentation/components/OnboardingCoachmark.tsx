import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontService } from "../../infrastructure/services/FontService";
import { Icon } from "../../infrastructure/services/IconService";

export interface CoachmarkStep {
  stepIndex: number;
  targetId: string;
  badge: string;
  title: string;
  description: string;
  tooltipPosition?: "right" | "left" | "top" | "bottom";
}

export interface OnboardingCoachmarkProps {
  isOpen: boolean;
  isVisible?: boolean;
  currentStep: number;
  totalSteps?: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

const STEPS_CONFIG: CoachmarkStep[] = [
  {
    stepIndex: 1,
    targetId: "tour-step-1-start-journey",
    badge: "STEP 1 OF 3 • SHOWCASE GATEWAY",
    title: "START YOUR EXHIBITION JOURNEY",
    description:
      "Klik piringan hitam 'START JOURNEY' untuk menjelajahi etalase karya musisi dan maestro musik legenda Malang.",
    tooltipPosition: "right",
  },
  {
    stepIndex: 2,
    targetId: "tour-step-2-staff-guideline",
    badge: "STEP 2 OF 3 • OPERATIONAL GUIDE",
    title: "STAFF PLAYBOOK & KIOSK GUIDE",
    description:
      "Panduan operasional staf pameran untuk aktivasi Mode Layar Penuh (Fullscreen), Reset Player Visual, dan Dukungan Teknikal.",
    tooltipPosition: "right",
  },
  {
    stepIndex: 3,
    targetId: "tour-step-3-settings",
    badge: "STEP 3 OF 3 • SYSTEM SETTINGS",
    title: "FULLSCREEN & SYSTEM SETTINGS",
    description:
      "Akses menu pengaturan sistem pameran dan aktifkan Mode Layar Penuh (Fullscreen) untuk pengalaman visual yang imersif.",
    tooltipPosition: "right",
  },
];

interface RectBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
}

const smoothSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.8,
};

const smoothEase = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

/**
 * Contextual Coachmark Onboarding Tour Component
 *
 * Designed with Anti-Gravity Design System Standards:
 * - Precise SVG mask cutout spotlight with glowing red brand border
 * - Dark Obsidian glassmorphism tooltip card with Framer Motion spring physics
 * - Real-time window resize and scroll tracking
 * - Controlled 3-Step Guided Tour integration
 */
export const OnboardingCoachmark: React.FC<OnboardingCoachmarkProps> = ({
  isOpen,
  isVisible = true,
  currentStep,
  totalSteps = 3,
  onNextStep,
  onPrevStep,
  onSkip,
  onFinish,
}) => {
  const [targetRect, setTargetRect] = useState<RectBounds | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const fontService = FontService.getInstance();
  const fontHeader = fontService.getFontClass("SECTION_HEADER");
  const fontBadge = fontService.getFontClass("BADGE_TAG");
  const fontBody = fontService.getFontClass("BODY_TEXT");

  const currentStepConfig =
    STEPS_CONFIG.find((s) => s.stepIndex === currentStep) || STEPS_CONFIG[0];

  const updateTargetRect = useCallback(() => {
    if (!isOpen || !isVisible || !currentStepConfig) return false;

    const element = document.getElementById(currentStepConfig.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const padding = 8;
        setTargetRect({
          x: Math.max(0, rect.left - padding),
          y: Math.max(0, rect.top - padding),
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          rx: 16,
        });
        return true;
      }
    }
    return false;
  }, [isOpen, isVisible, currentStepConfig]);

  // Recalculate spotlight position with micro-delay on mount & sidebar transitions
  useEffect(() => {
    if (!isOpen || !isVisible) {
      setIsReady(false);
      return;
    }

    setIsReady(false);

    // Sidebar expansion animation takes ~250ms for steps 2 & 3, initial mount takes ~140ms
    const delay = currentStep === 1 ? 140 : 280;

    let rafId: number;
    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(() => {
        const success = updateTargetRect();
        if (success) {
          setIsReady(true);
        } else {
          // Retry once if target element is rendering asynchronously
          setTimeout(() => {
            const retrySuccess = updateTargetRect();
            if (retrySuccess) {
              setIsReady(true);
            } else {
              // Target element is absent in DOM (e.g. non-home view), dismiss tour gracefully
              onSkip();
            }
          }, 150);
        }
      });
    }, delay);

    const handleResizeOrScroll = () => {
      updateTargetRect();
    };

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [isOpen, isVisible, currentStep, updateTargetRect]);

  // Real-time ResizeObserver for target element and body layout changes
  useEffect(() => {
    if (!isOpen || !isVisible || !currentStepConfig) return;

    const targetEl = document.getElementById(currentStepConfig.targetId);
    if (!targetEl) return;

    const observer = new ResizeObserver(() => {
      updateTargetRect();
    });

    observer.observe(targetEl);
    if (document.body) {
      observer.observe(document.body);
    }

    return () => observer.disconnect();
  }, [isOpen, isVisible, currentStepConfig, updateTargetRect]);

  // Accessibility: Handle Escape key to skip tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onSkip]);

  if (!isOpen || !currentStepConfig) return null;

  const isLastStep = currentStep >= totalSteps;
  const isFirstStep = currentStep === 1;

  // Calculate tooltip card fixed positioning
  const calculateTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }

    const margin = 20;
    const cardWidth = Math.min(340, window.innerWidth - 32);

    let left = targetRect.x + targetRect.width + margin;
    let top = targetRect.y;

    // Check right screen boundary collision
    if (left + cardWidth > window.innerWidth - 16) {
      // Fallback to left side if right side overflows
      left = Math.max(16, targetRect.x - cardWidth - margin);
    }

    // Check bottom screen boundary collision
    if (top + 260 > window.innerHeight) {
      top = Math.max(16, window.innerHeight - 280);
    }

    return {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
      width: `${cardWidth}px`,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady && targetRect ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] select-none ${
            isReady && targetRect ? "" : "pointer-events-none"
          }`}
        >
          {/* 1. SVG Cutout Mask Spotlight Backdrop (z-100) */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100]">
            <defs>
              <mask id="coachmark-spotlight-mask">
                <rect width="100%" height="100%" fill="white" />
                {targetRect && (
                  <motion.rect
                    initial={false}
                    animate={{
                      x: targetRect.x,
                      y: targetRect.y,
                      width: targetRect.width,
                      height: targetRect.height,
                      rx: targetRect.rx,
                      ry: targetRect.rx,
                    }}
                    transition={smoothSpring}
                    fill="black"
                  />
                )}
              </mask>
            </defs>

            {/* Dark Backdrop with Spotlight Hole */}
            <rect
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.65)"
              mask="url(#coachmark-spotlight-mask)"
            />
          </svg>

          {/* 2. Red Glowing Accent Border around Target Spotlight */}
          {targetRect && (
            <motion.div
              initial={false}
              animate={{
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height,
                borderRadius: `${targetRect.rx}px`,
              }}
              transition={smoothSpring}
              className="fixed pointer-events-none z-[101] border-2 border-[#FF1F00] shadow-[0_0_24px_rgba(255,31,0,0.6)]"
            />
          )}

          {/* 3. High-Fashion Glassmorphism Tooltip Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={smoothEase}
            style={calculateTooltipStyle()}
            className="z-[102] bg-[#111111]/95 text-white backdrop-blur-2xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/90 flex flex-col gap-3.5"
          >
            {/* Header: Badge & Skip Button */}
            <div className="flex items-center justify-between gap-3">
              <span
                className={`px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full bg-[#FF1F00]/20 text-[#FF1F00] border border-[#FF1F00]/40 uppercase tracking-widest ${fontBadge}`}
              >
                {currentStepConfig.badge}
              </span>

              <button
                type="button"
                onClick={onSkip}
                className="text-stone-400 hover:text-white text-[11px] font-bold font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 p-0.5"
                aria-label="Skip Onboarding Tour"
              >
                <span>LEWATI</span>
                <Icon name="x" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Title & Description with AnimatePresence Smooth Text Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-1.5"
              >
                <h3
                  className={`text-sm sm:text-base font-bold text-white uppercase tracking-tight ${fontHeader}`}
                >
                  {currentStepConfig.title}
                </h3>
                <p
                  className={`text-xs sm:text-[13px] text-zinc-300 leading-relaxed tracking-wide font-normal ${fontBody}`}
                >
                  {currentStepConfig.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons & Step Progress Indicators */}
            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-3">
              {/* Step Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }).map((_, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === currentStep;
                  return (
                    <span
                      key={stepNum}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isActive ? "w-5 bg-[#FF1F00]" : "w-1.5 bg-white/30"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className={`px-2.5 py-1 text-xs font-bold text-stone-400 hover:text-white uppercase tracking-wider transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${fontBadge}`}
                  >
                    KEMBALI
                  </button>
                )}

                <button
                  type="button"
                  onClick={isLastStep ? onFinish : onNextStep}
                  className={`bg-[#FF1F00] hover:bg-[#D41A00] text-white font-bold text-xs uppercase tracking-wider rounded-full px-3.5 py-1.5 transition-all duration-200 shadow-md shadow-[#FF1F00]/30 hover:scale-[1.05] active:scale-95 cursor-pointer flex items-center gap-1.5 ${fontBadge}`}
                >
                  <span>{isLastStep ? "SELESAI TUR" : "LANJUT →"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingCoachmark;
