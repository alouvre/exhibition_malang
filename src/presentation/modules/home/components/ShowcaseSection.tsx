import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { FontService } from "@/infrastructure/services/FontService";
import { COLORS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import {
  MusicianCard,
  MusicianIcon,
} from "@/presentation/shared/components/MusicianCard";

interface ShowcaseSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  totalMaestros: number;
  musicians: MusicianIcon[];
  onExploreExtendedArchive: () => void;
  onMusicianClick: (musician: MusicianIcon) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  sectionRef,
  totalMaestros,
  musicians,
  onExploreExtendedArchive,
  onMusicianClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const internalSectionRef = useRef<HTMLElement | null>(null);

  const fontService = FontService.getInstance();
  const sectionHeaderClass = fontService.getFontClass("SECTION_HEADER");
  const badgeTagClass = fontService.getFontClass("BADGE_TAG");
  const bodyTextClass = fontService.getFontClass("BODY_TEXT");

  useEffect(() => {
    const targetElement =
      sectionRef && "current" in sectionRef && sectionRef.current
        ? sectionRef.current
        : internalSectionRef.current;

    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      id="showcase-icons"
      ref={(el) => {
        internalSectionRef.current = el;
        if (sectionRef && "current" in sectionRef) {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current =
            el;
        }
      }}
      className={styles.iconsSection.layout}
    >
      {/* Editorial Curatorial Header Bar */}
      <div
        className={`flex flex-col gap-6 pb-6 border-b border-stone-800/10 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Top Ticker: Gallery Index Metadata */}
        <div className="flex items-center justify-between gap-4 text-stone-500 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase">
          <div className="flex items-center gap-2">
            {/* <span className="w-2 h-2 rounded-full bg-[#FF1F00] animate-pulse" /> */}
            <span>EXHIBIT ROOM 01 // SELECTED MAESTROS</span>
          </div>
          <span className="hidden sm:inline-block text-stone-400">
            CURATED PHYSICAL COLLECTION
          </span>
        </div>

        {/* Main Header Split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2
              className={`${styles.iconsSection.title} ${sectionHeaderClass}`}
              style={{
                fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5.25rem)",
                letterSpacing: "-0.04em",
                lineHeight: "0.9",
              }}
            >
              HALL OF <br className="hidden sm:block" />
              <span className="text-stone-900 hover:text-[#FF1F00] transition-colors duration-500">
                LEGENDS
              </span>
            </h2>
          </div>

          {/* Right Action: Editorial Counter & Explore Pill */}
          <div className="flex flex-col items-start md:items-end gap-3 self-start md:self-end">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-stone-600 uppercase">
              <span className="text-[#FF1F00] font-bold">
                [{totalMaestros}]
              </span>
              <span className={bodyTextClass}>ARCHIVED ARTISTS AVAILABLE</span>
            </div>

            <button
              onClick={onExploreExtendedArchive}
              className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-stone-900/15 hover:border-[#FF1F00] bg-stone-950 text-white hover:bg-[#FF1F00] hover:shadow-[0_8px_25px_-6px_rgba(255,31,0,0.4)] active:scale-95 transition-all duration-300 cursor-pointer select-none"
              aria-label="Explore Extended Archive"
            >
              <span
                className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase ${badgeTagClass}`}
              >
                OPEN FULL CATALOG
              </span>
              <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white flex items-center justify-center transition-colors">
                <Icon
                  name="arrow-up-right"
                  className="w-3.5 h-3.5 text-white group-hover:text-[#FF1F00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Kartu dengan Frame Kuratorial & Staggered Reveal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 pt-2">
        {(musicians ?? []).slice(0, 5).map((musician, index) => (
          <div
            key={musician.id || index}
            style={{
              transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
            }}
            className={`relative group transform transition-all duration-700 ease-out will-change-transform ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.97] pointer-events-none"
            }`}
          >
            {/* Index Label Micro di atas tiap kartu */}
            <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-stone-400 uppercase mb-2 px-1">
              <span>NO. 0{index + 1}</span>
              <span className="opacity-0 group-hover:opacity-100 text-[#FF1F00] transition-opacity">
                VIEW BIO →
              </span>
            </div>

            {/* Kartu Musisi */}
            <div className="rounded-xl overflow-hidden border border-stone-800/10 bg-white/40 backdrop-blur-xs hover:border-[#FF1F00]/40 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] transition-all duration-500">
              <MusicianCard
                musician={musician}
                index={index}
                onClick={() => onMusicianClick(musician)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  iconsSection: {
    layout:
      "px-6 sm:px-12 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-10 max-w-7xl mx-auto w-full shrink-0 " +
      COLORS.canvasBg,
    title: "font-black tracking-tight text-stone-950 uppercase select-none",
  },
});

export default ShowcaseSection;
