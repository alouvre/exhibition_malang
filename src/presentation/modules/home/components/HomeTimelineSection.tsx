import React from "react";
import { useNavigate } from "react-router-dom";
import { useFontRole } from "@/infrastructure/services/FontService";
import { COLORS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";

interface TimelineEra {
  decade: string;
  category: string;
  artists: string;
}

const timelineEras: TimelineEra[] = [
  {
    decade: "1970s",
    category: "THE RISE OF ROCK",
    artists: "AKSA, RHYTHM KINGS",
  },
  {
    decade: "1980s",
    category: "GOLDEN POP ERA",
    artists: "CHRISYE, FARIZ RM",
  },
  {
    decade: "1990s",
    category: "INDIE & ALTERNATIVE",
    artists: "ELANG, STRETH",
  },
  {
    decade: "2010s",
    category: "MODERN RENAISSANCE",
    artists: "BAL FRAM, TWIN",
  },
];

export const HomeTimelineSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionHeaderClass = useFontRole("SECTION_HEADER");

  const handleTimelineClick = (decade: string, category: string) => {
    // Navigasi langsung ke katalog pameran arsip berdasarkan era dekade
    navigate("/extended-archive", {
      state: {
        filterDecade: decade,
        filterCategory: category,
        fromTimeline: true,
      },
    });
  };

  return (
    <section
      id="timeline-section"
      className="relative w-full shrink-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-16 sm:py-24 md:py-32"
    >
      {/* Header Group dengan Tipografi Swiss Editorial */}
      <div className="flex items-center justify-between gap-4 text-stone-500 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase relative z-10">
        <div className="flex items-center gap-2">
          <span>CURATORIAL LOGS • 1970 — 2020s</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2
              className={`${styles.timelineSection.title} ${sectionHeaderClass}`}
              style={{
                fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5.25rem)",
                letterSpacing: "-0.04em",
                lineHeight: "0.9",
              }}
            >
              THE EVOLUTION <br className="hidden sm:block" />
              <span className="text-stone-400 group-hover:text-stone-900 transition-colors duration-500">
                OF MALANG MUSIC
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Timeline Interactive Rows */}
      <div className="flex flex-col  border-t border-b border-black/10 relative z-10 mt-10">
        {(timelineEras ?? []).map((era, index) => (
          <div
            key={era.decade || index}
            role="button"
            tabIndex={0}
            onClick={() => handleTimelineClick(era.decade, era.category)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTimelineClick(era.decade, era.category);
              }
            }}
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 cursor-pointer overflow-hidden hover:bg-stone-900/3 active:scale-[0.99] focus:outline-none focus:bg-stone-900/4"
          >
            {/* Left Highlight Indicator (Slide on hover/focus) */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-galllery-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

            {/* Sisi Kiri: Dekade & Tape Audio Wave Indicator */}
            <div className="flex items-baseline gap-6 sm:gap-10">
              {/* Index Kaset Analog */}
              <span className="text-[11px] font-mono text-stone-400 group-hover:bg-gallery-red transition-colors duration-300">
                SIDE {String(index + 1).padStart(2, "0")}
              </span>

              {/* Angka Dekade */}
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 group-hover:bg-gallery-red group-hover:translate-x-2 transition-all duration-300 ease-out">
                {era.decade}
              </span>

              {/* Equalizer Sound Wave Animation */}
              <div className="hidden sm:flex items-end gap-1 h-5 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-1 bg-gallery-red rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                <span className="w-1 bg-gallery-red rounded-full animate-[bounce_0.8s_infinite_300ms] h-3/4" />
                <span className="w-1 bg-gallery-red rounded-full animate-[bounce_0.8s_infinite_200ms] h-full" />
                <span className="w-1 bg-gallery-red rounded-full animate-[bounce_0.8s_infinite_400ms] h-1/2" />
              </div>
            </div>

            {/* Sisi Kanan: Kategori Budaya & Daftar Musisi / Kurasi */}
            <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-1.5 z-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-black/5 text-stone-700 border border-black/5  group-hover:bg-gallery-red group-hover:bg-gallery-red/5 transition-all duration-300">
                  {era.category}
                </span>

                {/* Arrow Action Badge */}
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-stone-400 group-hover:text-white group-hover:bg-gallery-red group-hover:border-gallery-red transition-all duration-300 shadow-sm">
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>

              {/* Musisi Terkait */}
              <p className="text-xs sm:text-sm font-mono text-stone-500 group-hover:text-stone-800 transition-colors duration-300 text-left md:text-right max-w-md line-clamp-1">
                {era.artists}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  timelineSection: {
    layout:
      "px-6 sm:px-12 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col gap-10 max-w-7xl mx-auto w-full shrink-0 " +
      COLORS.canvasBg,
    title: "font-black tracking-tight text-stone-950 uppercase select-none",
  },
});

export default HomeTimelineSection;
