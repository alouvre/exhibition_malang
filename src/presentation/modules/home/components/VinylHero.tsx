import React from "react";
import { Header } from "@/presentation/shared/components";
import { FontService } from "@/infrastructure/services/FontService";
import { COLORS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";

interface VinylHeroProps {
  isHeroVisible: boolean;
  onMenuClick: () => void;
  onStartJourney: () => void;
}

export const VinylHero: React.FC<VinylHeroProps> = ({
  isHeroVisible,
  onMenuClick,
  onStartJourney,
}) => {
  const fontService = FontService.getInstance();
  const heroTitleClass = fontService.getFontClass("HERO_TITLE");

  return (
    <section
      id="hero-section"
      data-hero-visible={isHeroVisible}
      className={styles.heroSection.layout}
    >
      {/* Integrated Static Non-Sticky Header */}
      <Header
        leftActionType="menu"
        onLeftActionClick={onMenuClick}
        showPartnerLogos={true}
      />

      {/* Hero Body Layout */}
      <div className={styles.heroSection.contentWrapper}>
        {/* BACKGROUND LAYER: Turntable Platter & Physical Sleeve Assembly (z-0) */}
        <div className={`group relative ${styles.vinylWrapper.container}`}>
          {/* Turntable Circular Platter Shadow Underlay */}
          <div className="absolute inset-0 rounded-full bg-black/15 blur-2xl transform scale-105 pointer-events-none -z-10" />

          {/* 2. Precision Turntable Tone-Arm Assembly */}
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 z-30 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out origin-top-right group-hover:rotate-[-2.5deg]">
            {/* Base Housing with Brushed Metal Rim */}
            <div className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-400/40 bg-gradient-to-br from-stone-800 via-stone-900 to-black shadow-lg flex items-center justify-center z-10">
              <div className="w-4 h-4 rounded-full border border-stone-500/30 bg-stone-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] shadow-[0_0_6px_#FF1F00]" />
              </div>
            </div>

            {/* Tone Arm Vector Art */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Arm Drop Shadow Line */}
              <path
                d="M 174 26 L 162 80 L 104 140"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter blur-[1px]"
              />

              {/* Rear Counterweight Stub */}
              <line
                x1="190"
                y1="10"
                x2="176"
                y2="24"
                stroke="#44403c"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Brushed Aluminum Main Shaft */}
              <path
                d="M 176 24 L 164 78 L 106 138"
                stroke="#1c1917"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 176 24 L 164 78 L 106 138"
                stroke="#a8a29e"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Headshell & Stylus Cartridge */}
              <g transform="translate(106, 138) rotate(42)">
                <rect
                  x="-3"
                  y="-4"
                  width="15"
                  height="8"
                  rx="1.5"
                  fill="#18181b"
                  stroke="#52525b"
                  strokeWidth="0.8"
                />
                <circle cx="8" cy="0" r="1.5" fill="#a1a1aa" />
                {/* Red Stylus Light / Needle */}
                <line
                  x1="-7"
                  y1="0"
                  x2="-2"
                  y2="0"
                  stroke="#FF1F00"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="-7" cy="0" r="1.2" fill="#FF1F00" />
              </g>
            </svg>
          </div>

          {/* 3. Vinyl Disk Assembly with Specular Groove Refraction */}
          <div
            className={`${styles.vinylWrapper.disk} relative z-10 border border-black/30 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)]`}
          >
            {/* Physical Edge Lip Highlight */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none z-20" />

            <img
              src="/assets/vinyl_record.jpg"
              alt="Vinyl Record"
              className={styles.vinylWrapper.img}
            />

            {/* Specular Sheen (Dual-Conical Groove Reflection) */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_35deg_at_50%_50%,rgba(255,255,255,0.22)_0deg,transparent_45deg,rgba(255,255,255,0.16)_180deg,transparent_225deg,rgba(255,255,255,0.22)_360deg)] pointer-events-none mix-blend-screen z-10 opacity-90" />

            {/* Center Paper Label */}
            <div
              className={`${styles.vinylWrapper.centerLabel} z-20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]`}
            >
              {/* Concentric Grooves on Center Ring */}
              <div className="absolute inset-2 rounded-full border border-stone-800/10 pointer-events-none" />
              <div className={styles.vinylWrapper.spindleHole} />
            </div>
          </div>

          {/* 4. Action Gateway Button (Spindle Core Trigger) */}
          <button
            id="tour-step-1-start-journey"
            onClick={onStartJourney}
            className={`${styles.ticketBtn.circular} z-30 group ring-4 ring-black/10 hover:ring-[#FF1F00]/30 transition-all duration-300`}
            aria-label="Start Journey"
          >
            {/* Ambient Pulse Rings */}
            <span className="absolute inset-0 rounded-full bg-[#FF1F00]/20 animate-ping pointer-events-none opacity-50 duration-1000" />
            <span className="absolute -inset-1 rounded-full border border-white/20 pointer-events-none" />

            <span
              className={`${styles.ticketBtn.labelTop} group-hover:scale-105 transition-transform`}
            >
              START
            </span>
            <span
              className={`${styles.ticketBtn.labelBottom} group-hover:scale-105 transition-transform`}
            >
              JOURNEY
            </span>
          </button>
        </div>

        {/* FOREGROUND LAYER: Typography Aligned to the Bottom with Fade-in Slide (z-10) */}
        <div className={styles.heroSection.textGrid}>
          {/* Left Lower Headline: THE SOUND */}
          <div
            className={`${styles.heroSection.typographyLeft} ${heroTitleClass} transition-all duration-1000 ease-out ${
              isHeroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Curatorial Technical Index Stamp */}
            {/* <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-stone-400 uppercase mb-3 md:mb-4 select-none font-normal leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] animate-pulse shrink-0" />
              <span>CATALOG REF. 1970–2026 // EAST JAVA SOUND ARCHIVE • EXHIBITION ROOM 01</span>
            </div> */}

            <div className="select-none drop-shadow-sm flex flex-col items-center md:items-start">
              <span
                className="font-black tracking-wide leading-[0.85]"
                style={{ fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)" }}
              >
                THE
              </span>
              <span
                className="font-black tracking-normal text-stone-950 leading-[0.85]"
                style={{ fontSize: "clamp(3.8rem, 9vw + 1rem, 10rem)" }}
              >
                SOUND
              </span>
            </div>
          </div>

          {/* Right Lower Headline: OF MALANG */}
          <div
            className={`${styles.heroSection.typographyRight} ${heroTitleClass} transition-all duration-1000 delay-200 ease-out ${
              isHeroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="select-none drop-shadow-sm flex flex-col items-center md:items-end">
              <span
                className="font-black tracking-wide leading-[0.85]"
                style={{ fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)" }}
              >
                OF
              </span>
              <span
                className="font-black tracking-tighter text-stone-950 leading-[0.85]"
                style={{ fontSize: "clamp(3.8rem, 9vw + 1rem, 10rem)" }}
              >
                MALANG
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    layout:
      "relative w-full max-w-full shrink-0 px-0 pt-0 pb-6 md:pb-10 overflow-hidden flex flex-col justify-between min-h-screen border-b border-black/10 " +
      COLORS.canvasBg,
    contentWrapper:
      "relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-between items-center flex-1 min-h-0 py-4",
    textGrid:
      "w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-0 z-10 pointer-events-none mix-blend-darken pb-4 md:pb-6",
    typographyLeft:
      "flex flex-col items-center text-center md:items-start md:text-left text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
    typographyRight:
      "flex flex-col items-center text-center md:text-right text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
  },
  vinylWrapper: {
    container:
      "group relative w-56 h-56 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] xl:w-[29rem] xl:h-[29rem] -translate-y-3 sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-8 xl:-translate-y-10 my-auto flex items-center justify-center z-10 shrink-0 pointer-events-auto",
    disk: "relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-black/20 flex items-center justify-center cursor-pointer transition-transform duration-700 hover:scale-[1.02] animate-[spin_20s_linear_infinite] hover:[animation-play-state:paused]",
    img: "w-full h-full object-cover rounded-full select-none pointer-events-none",
    centerLabel:
      "absolute w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-34 lg:h-34 xl:w-40 xl:h-40 rounded-full bg-[#F4EFE6] border-2 border-stone-800/20 shadow-inner flex items-center justify-center z-20 pointer-events-none",
    spindleHole:
      "w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full bg-[#FF1F00] border border-black/30 animate-pulse",
  },
  ticketBtn: {
    circular:
      "group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-24 xl:h-24 rounded-full bg-black text-white hover:scale-110 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(255,31,0,0.35)] z-30 border-2 border-stone-200/30 hover:border-[#FF1F00]",
    labelTop:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none text-stone-200 group-hover:text-[#FF1F00] transition-colors duration-200",
    labelBottom:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none mt-1 group-hover:translate-y-0.5 transition-transform duration-200",
  },
});

export default VinylHero;
