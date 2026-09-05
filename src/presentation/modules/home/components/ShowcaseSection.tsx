import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { FontService } from "@/infrastructure/services/FontService";
import { COLORS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MusicianCard, MusicianIcon } from "@/presentation/shared/components/MusicianCard";

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
  const fontService = FontService.getInstance();
  const sectionHeaderClass = fontService.getFontClass("SECTION_HEADER");
  const badgeTagClass = fontService.getFontClass("BADGE_TAG");
  const bodyTextClass = fontService.getFontClass("BODY_TEXT");

  return (
    <section
      id="showcase-icons"
      ref={sectionRef}
      className={styles.iconsSection.layout}
    >
      {/* Header Group dengan Swiss Alignment */}
      <div className={styles.iconsSection.headerGroup}>
        <div>
          <h2
            className={`${styles.iconsSection.title} ${sectionHeaderClass}`}
            style={{
              fontSize: "clamp(2.25rem, 4.5vw + 0.5rem, 4.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: "0.95",
            }}
          >
            HALL OF LEGENDS
          </h2>
        </div>

        {/* OPSI A: Tombol Editorial Samping Judul */}
        <div className="flex flex-col items-start sm:items-end self-start sm:self-auto mb-1">
          <span
            className={`text-[10px] sm:text-[10px] font-medium tracking-wider text-stone-500/60 uppercase mb-2 ${bodyTextClass}`}
          >
            Showcasing {totalMaestros} maestros
          </span>
          <button
            onClick={onExploreExtendedArchive}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 hover:border-[#FF1F00]/50 bg-stone-900/[0.02] hover:bg-[#FF1F00]/[0.05] transition-all duration-300 cursor-pointer"
            aria-label="Explore Extended Archive"
          >
            <span
              className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-stone-600 group-hover:text-[#FF1F00] transition-colors duration-300 ${badgeTagClass}`}
            >
              EXPLORE HERE
            </span>
            <Icon
              name="arrow-up-right"
              className="w-4 h-4 text-stone-500 group-hover:text-[#FF1F00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </button>
        </div>
      </div>

      <div className={styles.iconsSection.grid}>
        {(musicians ?? []).slice(0, 5).map((musician, index) => (
          <MusicianCard
            key={musician.id || index}
            musician={musician}
            index={index}
            onClick={() => onMusicianClick(musician)}
          />
        ))}
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  iconsSection: {
    layout:
      "px-6 sm:px-12 md:px-16 py-[clamp(6rem,15vh,14rem)] border-b border-black/10 flex flex-col gap-8 max-w-7xl mx-auto w-full " +
      COLORS.canvasBg,
    headerGroup:
      "flex flex-col sm:flex-row sm:items-end justify-between gap-4 pl-4 border-l-2 border-stone-900/20",
    title: "font-black tracking-tight text-stone-950 uppercase",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4",
  },
});

export default ShowcaseSection;
