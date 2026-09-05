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
      <Header leftActionType="menu" onLeftActionClick={onMenuClick} />

      {/* Hero Body Layout */}
      <div className={styles.heroSection.contentWrapper}>
        {/* BACKGROUND LAYER: Vinyl Record Centered Absolut (z-0) */}
        <div className={styles.vinylWrapper.container}>
          <div className={styles.vinylWrapper.disk}>
            <img
              src="/assets/vinyl_record.jpg"
              alt="Vinyl Record"
              className={styles.vinylWrapper.img}
            />
            <div className={styles.vinylWrapper.centerLabel}>
              <div className={styles.vinylWrapper.spindleHole} />
            </div>
          </div>

          {/* Circular Black Action Button Floating Near Vinyl */}
          <button
            id="tour-step-1-start-journey"
            onClick={onStartJourney}
            className={styles.ticketBtn.circular}
            aria-label="Start Journey"
          >
            <span className={styles.ticketBtn.labelTop}>START</span>
            <span className={styles.ticketBtn.labelBottom}>JOURNEY</span>
          </button>
        </div>

        {/* FOREGROUND LAYER: Typography Aligned to the Bottom, Overlapping The Vinyl (z-10) */}
        <div className={styles.heroSection.textGrid}>
          {/* Left Lower Headline: THE SOUND (Rata Kiri bawah) */}
          <div
            className={`${styles.heroSection.typographyLeft} ${heroTitleClass}`}
            style={{
              fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            <div>
              THE <br /> SOUND
            </div>
          </div>

          {/* Right Lower Headline: OF MALANG (Rata Kanan bawah) */}
          <div
            className={`${styles.heroSection.typographyRight} ${heroTitleClass}`}
            style={{
              fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            <div>
              OF <br /> MALANG
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
      "relative w-full max-w-full px-0 pt-0 pb-12 md:pb-16 overflow-hidden flex flex-col justify-between min-h-screen md:min-h-[750px] border-b border-black/10 " +
      COLORS.canvasBg,
    contentWrapper:
      "relative w-full max-w-7xl mx-auto px-6 py-8 md:px-16 md:py-0 lg:px-16 lg:py-0 flex flex-col justify-end items-center flex-1 min-h-[70px]",
    textGrid:
      "w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-[clamp(2rem,5vh,6rem)] md:gap-0 z-10 pointer-events-none mix-blend-darken",
    typographyLeft:
      "flex flex-col items-center text-center md:items-start md:text-left text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
    typographyRight:
      "flex flex-col items-center text-center md:items-end md:text-right text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
  },
  vinylWrapper: {
    container:
      "relative w-[32rem] h-[32rem] sm:w-[38rem] sm:h-[38rem] md:w-[38rem] md:h-[38rem] lg:w-[44rem] lg:h-[44rem] my-6 md:my-0 flex items-center justify-center z-10 flex-shrink-0 pointer-events-auto",
    disk: "relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-black/20 transform hover:rotate-90 transition-transform duration-1000 ease-out flex items-center justify-center cursor-pointer",
    img: "w-full h-full object-cover rounded-full",
    centerLabel:
      "absolute w-28 h-28 sm:w-36 sm:h-36 md:w-[12rem] md:h-[12rem] lg:w-[14rem] lg:h-[14rem] rounded-full bg-[#F4EFE6] border-2 border-stone-800/20 shadow-inner flex items-center justify-center z-20 pointer-events-none",
    spindleHole:
      "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-30 lg:h-30 rounded-full bg-[#FF1F00] border border-black/30",
  },
  ticketBtn: {
    circular:
      "absolute bottom-75 w-20 h-20 md:w-26 md:h-26 rounded-full bg-black text-white hover:scale-105 active:scale-95 transition-full duration-300 flex flex-col items-center justify-center cursor-pointer shadow-2xl z-30 border-2 border-stone-200/30",
    labelTop:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none text-stone-200",
    labelBottom:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none mt-1",
  },
});

export default VinylHero;
