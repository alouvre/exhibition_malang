import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/infrastructure/services/IconService";

interface ArchivalLightboxModalProps {
  selectedImage: string | null;
  musicianName: string;
  onClose: () => void;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const ArchivalLightboxModal: React.FC<ArchivalLightboxModalProps> = ({
  selectedImage,
  musicianName,
  onClose,
  onImageError,
}) => {
  return (
    <AnimatePresence>
      {selectedImage && (
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
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 flex flex-col cursor-default"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 bg-black/80 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF1F00] text-white rounded font-bold uppercase">
                  ARCHIVE EXHIBIT
                </span>
                <span className="text-xs font-bold font-sans tracking-wide uppercase truncate">
                  {musicianName} — EXHIBITION PHOTO
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

            {/* Lightbox Image Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-4 min-h-[350px]">
              <img
                src={selectedImage}
                alt={`${musicianName} Archival Preview`}
                onError={onImageError}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArchivalLightboxModal;
