import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { DESIGN_TOKENS } from "@/presentation/styles/theme";

export interface GalleryImageItem {
  url: string;
  title?: string;
  alt?: string;
}

interface ArchivalLightboxModalProps {
  /** List of exhibition images (either URL string or gallery item object) */
  images?: (string | GalleryImageItem)[];
  /** Currently selected image URL (for backward compatibility / open trigger) */
  selectedImage?: string | null;
  /** Initial image index to display */
  initialIndex?: number;
  musicianName: string;
  onClose: () => void;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const galleryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const thumbnailItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const ArchivalLightboxModal: React.FC<ArchivalLightboxModalProps> = ({
  images = [],
  selectedImage,
  initialIndex,
  musicianName,
  onClose,
  onImageError,
}) => {
  const badgeTagClass = useFontRole("BADGE_TAG");
  const sectionHeaderClass = useFontRole("SECTION_HEADER");

  // Normalize images array to uniform objects
  const normalizedImages: GalleryImageItem[] = useMemo(() => {
    if (images && images.length > 0) {
      return images.map((item) =>
        typeof item === "string" ? { url: item } : item,
      );
    }
    if (selectedImage) {
      return [{ url: selectedImage }];
    }
    return [];
  }, [images, selectedImage]);

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex ?? 0);

  // Sync currentIndex when selectedImage or initialIndex changes
  useEffect(() => {
    if (initialIndex !== undefined && initialIndex >= 0) {
      setCurrentIndex(initialIndex);
    } else if (selectedImage) {
      const foundIdx = normalizedImages.findIndex(
        (img) => img.url === selectedImage,
      );
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [selectedImage, initialIndex, normalizedImages]);

  const isOpen = Boolean(
    selectedImage ||
    (images && images.length > 0 && initialIndex !== undefined),
  );
  const currentImg = normalizedImages[currentIndex] || normalizedImages[0];

  return (
    <AnimatePresence>
      {isOpen && currentImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 flex flex-col cursor-default"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 bg-black/80 border-b border-white/10 text-white">
              <div className="flex items-center gap-4">
                <span
                  className={`text-[10px] px-2 py-0.5 bg-white text-black rounded font-bold uppercase ${badgeTagClass}`}
                >
                  {musicianName}
                </span>
                <span
                  className={`text-xs font-bold tracking-wide uppercase truncate ${sectionHeaderClass}`}
                >
                  EXHIBITION PHOTO{" "}
                  {normalizedImages.length > 1
                    ? `(${currentIndex + 1}/${normalizedImages.length})`
                    : ""}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close Preview"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            {/* Split-Layout Exhibition Gallery Viewport */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 p-4 sm:p-6 overflow-hidden min-h-0">
              {/* MAIN IMAGE CONTAINER */}
              <div className="flex-1 relative flex items-center justify-center bg-black/60 rounded-xl overflow-hidden p-2 min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg?.url || currentIndex}
                    src={currentImg?.url}
                    alt={currentImg?.alt || `${musicianName} Archival Preview`}
                    onError={onImageError}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* VERTICAL GALLERY SIDEBAR */}
              {normalizedImages.length > 1 && (
                <div className="w-full md:w-32 lg:w-40 flex-shrink-0 flex flex-col h-full overflow-hidden">
                  <div
                    className={`flex-1 overflow-x-auto md:overflow-y-auto p-1 pr-1.5 ${DESIGN_TOKENS.utility.scrollbar}`}
                  >
                    {/* Exhibition Gallery Grid with Scroll Reveal */}
                    <motion.div
                      variants={galleryContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-row md:flex-col gap-3 pb-8"
                    >
                      {normalizedImages.map((img, idx) => {
                        const isActive = idx === currentIndex;
                        return (
                          <motion.button
                            key={img.url || idx}
                            variants={thumbnailItemVariants}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-24 h-16 sm:w-28 sm:h-20 md:w-full md:h-24 lg:h-28 rounded-lg overflow-hidden shrink-0 cursor-pointer transition-all duration-200 ${
                              isActive
                                ? "border-2 border-white opacity-100 ring-2 ring-white/20 shadow-lg scale-[1.02]"
                                : "border border-white/20 opacity-50 hover:opacity-100 hover:border-white/50"
                            }`}
                            aria-label={`View image ${idx + 1}`}
                          >
                            <img
                              src={img.url}
                              alt={
                                img.alt ||
                                `${musicianName} thumbnail ${idx + 1}`
                              }
                              onError={onImageError}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArchivalLightboxModal;
