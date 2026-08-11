import React, { useEffect } from "react";
import { safeInitializeIcons } from "../utils/dom";

export interface MusicianIcon {
  id?: string;
  name: string;
  image: string;
  genre: string;
  album: string;
  year: string;
}

export interface MusicianCardStyles {
  card?: string;
  cardImg?: string;
}

export interface MusicianCardProps {
  musician: MusicianIcon;
  index: number;
  onClick: () => void;
  styles?: MusicianCardStyles;
}

// 🏛️ EDITORIAL OVERLAP & NEO-GLASSMORPHISM DESIGN TOKENS
const DEFAULT_CARD_STYLE =
  "relative group w-full bg-white/40 backdrop-blur-xl hover:bg-white/75 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl shadow-sm rounded-xl overflow-hidden select-none flex flex-col justify-between";

const DEFAULT_CARD_IMG_STYLE =
  "w-full h-full object-cover object-center grayscale contrast-[1.20] brightness-95 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out";

const FALLBACK_IMAGE = "/assets/vinyl_record.jpg";

/**
 * Ensures asset path starts with a leading slash for Vite static root resolution
 */
const resolveAssetPath = (path?: string): string => {
  if (!path || path.trim() === "") return FALLBACK_IMAGE;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
};

export const MusicianCard: React.FC<MusicianCardProps> = ({
  musician,
  index: _index,
  onClick,
  styles,
}) => {
  useEffect(() => {
    safeInitializeIcons();
  }, []);

  const cardBaseStyle = styles?.card || DEFAULT_CARD_STYLE;
  const cardImgStyle = styles?.cardImg || DEFAULT_CARD_IMG_STYLE;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.currentTarget;
    if (target.getAttribute("data-fallback-attempted") !== "true") {
      target.setAttribute("data-fallback-attempted", "true");
      console.warn(
        `[MusicianCard Image Fallback] Image failed to load for "${musician?.name}" (Attempted URL: ${target.src}). Falling back to ${FALLBACK_IMAGE}`,
      );
      target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cardBaseStyle}
    >
      {/* Soft Orbital Ambient Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900/[0.02] via-transparent to-[#FF1F00]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 1. Photo Canvas with Full Aspect Ratio & Z-Index Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg bg-black/5">
        <img
          src={resolveAssetPath(musician?.image)}
          alt={musician?.name || "Musician"}
          onError={handleImageError}
          className={cardImgStyle}
        />

        {/* Legibility Gradient Overlay for Overlapping Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />

        {/* 2. Editorial Overlap Typography: Z-Index Stacking Directly Over Photo Canvas */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-1">
          {/* Musician Name: Multi-Word Line Break Headline with Tight Leading */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-[0.9] group-hover:text-[#FF1F00] transition-colors duration-300 drop-shadow-md">
            {(musician?.name || "UNTITLED").split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h3>

          {/* Year / Era Marker: Micro Warm Stone Gray Tag */}
          <p className="text-[10px] sm:text-[10px] font-bold tracking-widest text-white/80 uppercase font-sans mt-1">
            {musician?.year || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicianCard;
