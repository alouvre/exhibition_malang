import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontService } from "@/infrastructure/services/FontService";
import { Icon } from "@/infrastructure/services/IconService";

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
    badge: "01 • SHOWCASE GATEWAY",
    title: "START YOUR EXHIBITION JOURNEY",
    description:
      "Klik piringan hitam 'START JOURNEY' untuk membuka etalase arsip fisik piringan hitam dan rilisan legenda musik Malang.",
    tooltipPosition: "right",
  },
  {
    stepIndex: 2,
    targetId: "tour-step-2-staff-guideline",
    badge: "02 • OPERATIONAL GUIDE",
    title: "STAFF PLAYBOOK & KIOSK GUIDE",
    description:
      "Panduan operasional staf pameran untuk aktivasi Mode Layar Penuh (Fullscreen), Reset Player Visual, dan Dukungan Teknikal.",
    tooltipPosition: "right",
  },
  {
    stepIndex: 3,
    targetId: "tour-step-3-settings",
    badge: "03 • SYSTEM SETTINGS",
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
  stiffness: 240,
  damping: 30,
  mass: 0.8,
};

const smoothEase = {
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1] as const,
};

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
        const padding = 10;
        const isCircular = Math.abs(rect.width - rect.height) < 4;
        const calculatedRx = isCircular
          ? (rect.width + padding * 2) / 2
          : 18;
        setTargetRect({
          x: Math.max(0, rect.left - padding),
          y: Math.max(0, rect.top - padding),
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          rx: calculatedRx,
        });
        return true;
      }
    }
    return false;
  }, [isOpen, isVisible, currentStepConfig]);

  useEffect(() => {
    if (!isOpen || !isVisible) {
      setIsReady(false);
      return;
    }

    setIsReady(false);
    const delay = currentStep === 1 ? 140 : 280;

    let rafId: number;
    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(() => {
        const success = updateTargetRect();
        if (success) {
          setIsReady(true);
        } else {
          setTimeout(() => {
            const retrySuccess = updateTargetRect();
            if (retrySuccess) {
              setIsReady(true);
            } else {
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
  }, [isOpen, isVisible, currentStep, updateTargetRect, onSkip]);

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

  const calculateTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }

    const margin = 24;
    const cardWidth = Math.min(360, window.innerWidth - 32);

    let left = targetRect.x + targetRect.width + margin;
    let top = targetRect.y - 12;

    if (left + cardWidth > window.innerWidth - 16) {
      left = Math.max(16, targetRect.x - cardWidth - margin);
    }

    if (top + 300 > window.innerHeight) {
      top = Math.max(16, window.innerHeight - 320);
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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] select-none ${
            isReady && targetRect ? "" : "pointer-events-none"
          }`}
        >
          {/* 1. Backdrop Mask SVG */}
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

            <rect
              width="100%"
              height="100%"
              fill="rgba(8, 8, 8, 0.78)"
              className="backdrop-blur-[2px]"
              mask="url(#coachmark-spotlight-mask)"
            />
          </svg>

          {/* 2. Reticle Spotlight Target Overlay with Red Glow & Corner Brackets */}
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
              className="fixed pointer-events-none z-[101] border border-[#FF1F00]/50 shadow-[0_0_30px_rgba(255,31,0,0.35)]"
            >
              {/* Radar Ping Effect */}
              <span className="absolute -inset-1 rounded-[22px] border border-[#FF1F00]/40 animate-ping pointer-events-none opacity-40 duration-1000" />

              {/* Viewfinder Technical Corners */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF1F00]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF1F00]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF1F00]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF1F00]" />
            </motion.div>
          )}

          {/* 3. Swiss Glassmorphic Exhibition Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={smoothEase}
            style={calculateTooltipStyle()}
            className="z-[102] bg-[#0E0D0C]/95 text-stone-100 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Ambient Red Glow Corner Accent */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FF1F00]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar: Curatorial Badge & Close Action */}
            <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] animate-pulse" />
                <span
                  className={`text-[10px] font-mono font-bold tracking-[0.2em] text-stone-300 uppercase ${fontBadge}`}
                >
                  {currentStepConfig.badge}
                </span>
              </div>

              <button
                type="button"
                onClick={onSkip}
                className="text-stone-400 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 active:scale-95"
                aria-label="Skip Onboarding Tour"
              >
                <span>LEWATI</span>
                <Icon name="x" className="w-3 h-3 text-stone-400" />
              </button>
            </div>

            {/* Content: Title & Curatorial Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 relative z-10"
              >
                <h3
                  className={`text-base sm:text-lg font-black text-white tracking-tight uppercase leading-snug ${fontHeader}`}
                >
                  {currentStepConfig.title}
                </h3>
                <p
                  className={`text-xs text-stone-400 leading-relaxed font-normal tracking-wide ${fontBody}`}
                >
                  {currentStepConfig.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Footer: Stepper & Navigation Buttons */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3 relative z-10">
              {/* Cassette Tape Track Progress */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }).map((_, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === currentStep;
                  return (
                    <span
                      key={stepNum}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-6 bg-[#FF1F00] shadow-[0_0_8px_rgba(255,31,0,0.8)]"
                          : "w-2 bg-stone-700"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className={`px-3 py-1.5 text-xs font-mono font-bold text-stone-400 hover:text-white uppercase tracking-wider rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-95 ${fontBadge}`}
                  >
                    KEMBALI
                  </button>
                )}

                <button
                  type="button"
                  onClick={isLastStep ? onFinish : onNextStep}
                  className={`relative overflow-hidden bg-[#FF1F00] hover:bg-[#E01B00] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full px-4 py-1.5 transition-all duration-200 shadow-md shadow-[#FF1F00]/25 hover:shadow-[#FF1F00]/40 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center gap-1.5 ${fontBadge}`}
                >
                  <span>{isLastStep ? "SELESAI" : "LANJUT"}</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
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
