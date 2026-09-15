import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFontRole } from "@/infrastructure/services/FontService";
import { Icon } from "@/infrastructure/services/IconService";
import { COLORS } from "@/presentation/styles/theme";

export interface InfoModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Triggered when closing the modal (ESC key, backdrop click, or close button) */
  onClose: () => void;
  /** Modal header headline title */
  title: string;
  /** Optional badge tag text (Deprecated/Hidden for clean white theme) */
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
 * Clean White Minimalist Exhibition Theme:
 * - Dominant white obsidian canvas & crisp typography
 * - Typography roles integrated via FontService (SECTION_HEADER, BADGE_TAG, BODY_TEXT)
 * - Light glassmorphism center badge icon
 * - Clean layout without noisy badge tags
 * - ESC key and backdrop click accessibility
 */
export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButtonText = "Start Explore",
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  showCloseIcon = true,
  bannerGradient = "from-zinc-950 via-zinc-700 to-[#FBFBF9]",
  iconName = "disc",
  className = "",
}) => {
  const fontHeader = useFontRole("SECTION_HEADER");
  const fontBadge = useFontRole("BADGE_TAG");
  const fontBody = useFontRole("BODY_TEXT");

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
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px] select-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-md sm:max-w-lg w-[190vw] sm:w-full max-h-[85vh] flex flex-col ${COLORS.ivoryBg} text-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 ${className}`}
          >
            {/* Modal Content Body */}
            <div className="p-5 sm:p-6 flex flex-col items-start text-left gap-3.5 sm:gap-4 overflow-y-auto custom-scrollbar flex-1">
              <h3
                className={`text-lg sm:text-xl font-black text-zinc-950 uppercase tracking-tight ${fontHeader}`}
              >
                {title}
              </h3>

              <p
                className={`text-xs sm:text-sm text-stone-600 leading-relaxed tracking-wide ${fontBody}`}
              >
                {description}
              </p>

              {/* Modal Action Buttons */}
              <div className="w-full pt-2.5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  className={`${
                    secondaryButtonText ? "flex-1" : "w-full"
                  } bg-zinc-900 hover:bg-black text-white font-bold text-xs sm:text-sm tracking-wider rounded-full px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer text-center flex items-center justify-center ${fontBadge}`}
                >
                  {primaryButtonText}
                </button>

                {secondaryButtonText && (
                  <button
                    type="button"
                    onClick={handleSecondaryAction}
                    className={`text-stone-500 hover:text-zinc-900 font-bold text-xs sm:text-sm tracking-wider px-3.5 py-2 transition-colors cursor-pointer ${fontBadge}`}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
