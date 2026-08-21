import React from "react";
import { motion } from "framer-motion";

interface MobileFallbackScreenProps {
  onBypass: () => void;
}

export const MobileFallbackScreen: React.FC<
  MobileFallbackScreenProps
> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-[#0A0A0A] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
    >
      {/* Center Curatorial Message */}
      <div className="max-w-md mx-auto my-auto flex flex-col items-center text-center">
        {/* Animated Visual Device Indicator */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl flex items-center justify-center shadow-2xl">
            <svg
              className="w-8 h-8 text-[#FF1F00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
                strokeWidth="1.5"
              />
              <line
                x1="8"
                y1="21"
                x2="16"
                y2="21"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-300">
            Tablet & Laptop Recommended
          </span>
        </div>

        {/* Title & Body */}
        <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed mb-8">
          Untuk menikmati kurasi tata pamer, narasi arsip resolusi tinggi, serta
          pemutar video katalog secara optimal, silakan akses situs ini melalui{" "}
          <strong className="text-stone-200">Tablet atau Laptop</strong>.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center">
        <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest">
          FESTIVAL MBOIS 11 © 2026
        </span>
      </div>
    </motion.div>
  );
};

export default MobileFallbackScreen;
