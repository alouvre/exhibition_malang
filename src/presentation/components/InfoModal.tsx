import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontService } from "../../infrastructure/services/FontService";
import { Icon } from "../../infrastructure/services/IconService";

export interface InfoModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Triggered when closing the modal (ESC key, backdrop click, or close button) */
  onClose: () => void;
  /** Modal header headline title */
  title: string;
  /** Optional badge tag text displayed beside the title */
  badgeText?: string;
  /** Modal body description paragraph */
  description: string;
  /** Primary CTA button label */
  primaryButtonText?: string;
  /** Action handler for primary CTA button */
  onPrimaryClick?: () => void;
  /** Optional secondary button label (if omitted, secondary button is hidden) */
  secondaryButtonText?: string;
  /** Action handler for secondary button */
  onSecondaryClick?: () => void;
  /** Controls top-right close "X" icon visibility (default: true) */
  showCloseIcon?: boolean;
  /** Custom Tailwind gradient class for the top header banner */
  bannerGradient?: string;
  /** Icon name for the floating center glass badge */
  iconName?: string;
  /** Additional custom Tailwind CSS classes for the modal container */
  className?: string;
}

/**
 * InfoModal Component
 *
 * Refitted to match the Anti-Gravity Design System Standard & Gallery Theme:
 * - High-contrast obsidian dark canvas & red accent (#FF1F00)
 * - Typography roles integrated via FontService (SECTION_HEADER, BADGE_TAG, BODY_TEXT)
 * - Floating glass icon badge with backdrop blur and border-white/20
 * - Customizable showCloseIcon & optional secondary button
 * - ESC key and backdrop click accessibility
 */
export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  badgeText = "MALANG ARCHIVE",
  description,
  primaryButtonText = "START EXPLORE",
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  showCloseIcon = true,
  bannerGradient = "from-[#FF1F00] via-stone-900 to-zinc-950",
  iconName = "disc",
  className = "",
}) => {
  const fontService = FontService.getInstance();
  const fontHeader = fontService.getFontClass("SECTION_HEADER");
  const fontBadge = fontService.getFontClass("BADGE_TAG");
  const fontBody = fontService.getFontClass("BODY_TEXT");

  // Accessibility: Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrimaryAction = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      onClose();
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-md w-full bg-[#111111] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/15 ${className}`}
          >
            {/* Top Header Banner with Brand Gradient & Center Floating Glass Badge */}
            <div
              className={`relative h-40 sm:h-44 w-full bg-gradient-to-tr ${bannerGradient} flex items-center justify-center p-6 border-b border-white/10`}
            >
              {/* Optional Top-Right Floating Close Button */}
              {showCloseIcon && (
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                  aria-label="Close Modal"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              )}

              {/* Centered Floating Glass Icon Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <Icon
                  name={iconName}
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_4px_12px_rgba(255,31,0,0.5)]"
                />
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 flex flex-col items-start text-left gap-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3
                  className={`text-xl sm:text-2xl font-black text-white uppercase tracking-tight ${fontHeader}`}
                >
                  {title}
                </h3>
                {badgeText && (
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FF1F00]/20 text-[#FF1F00] border border-[#FF1F00]/40 uppercase tracking-widest ${fontBadge}`}
                  >
                    {badgeText}
                  </span>
                )}
              </div>

              <p
                className={`text-xs sm:text-sm text-stone-300/90 leading-relaxed tracking-wide ${fontBody}`}
              >
                {description}
              </p>

              {/* Modal Action Buttons */}
              <div className="w-full pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  className={`${
                    secondaryButtonText ? "flex-1" : "w-full"
                  } bg-[#FF1F00] hover:bg-[#D41A00] text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full px-6 py-3.5 transition-all duration-200 shadow-lg shadow-[#FF1F00]/25 hover:scale-[1.02] active:scale-95 cursor-pointer text-center flex items-center justify-center ${fontBadge}`}
                >
                  {primaryButtonText}
                </button>

                {secondaryButtonText && (
                  <button
                    type="button"
                    onClick={handleSecondaryAction}
                    className={`text-stone-400 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-4 py-3 transition-colors cursor-pointer ${fontBadge}`}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
