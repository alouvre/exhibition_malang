import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { safeInitializeIcons, injectStylesheet } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, SPACING, DESIGN_TOKENS } from "../styles/theme";
import { Header, HeaderNavItem } from "../components/Header";
import {
  musiciansRegistry,
  MusicianData as MusicianDetailData,
  HistoryEvent,
  TrackCatalogItem,
} from "../data/musiciansRegistry";

export type { HistoryEvent, TrackCatalogItem, MusicianDetailData };

interface MusicianDetailViewProps {
  slug?: string;
  onBack?: () => void;
}

interface LocationState {
  musician?: MusicianDetailData;
  from?: "home" | "extended";
}

const FALLBACK_IMAGE = "/assets/vinyl_record.jpg";

const MUSICIAN_NAV_ITEMS: HeaderNavItem[] = [
  { id: "biography", label: "BIOGRAPHY" },
  { id: "discography", label: "DISCOGRAPHY" },
];

const resolveAssetPath = (path: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/${path}`;
};

/**
 * MusicianDetailView Component
 *
 * Renders the musician's hero presentation, biography, and historical timeline.
 */
export const MusicianDetailView: React.FC<MusicianDetailViewProps> = ({
  slug: propSlug,
  onBack,
}) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const targetSlug = routeSlug || propSlug || "ian-antono";

  const musician = musiciansRegistry.find(
    (item) => item.slug === targetSlug || item.id === targetSlug,
  );

  useEffect(() => {
    injectStylesheet(
      "gallery-fonts",
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Poppins:ital,wght@0,300..900;1,300..900&family=Outfit:wght@300;400;500;600;700;800;900&family=Pinyon+Script&display=swap",
    );
    safeInitializeIcons();
  }, [targetSlug]);

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else if (locationState?.from === "extended") {
      navigate("/extended-archive");
    } else {
      navigate("/#showcase-icons");
    }
  };

  const handleNavClick = (item: HeaderNavItem) => {
    if (item.id === "discography") {
      navigate(`/musician/${targetSlug}/discography`, { state: locationState });
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.currentTarget;
    if (target.getAttribute("data-fallback-attempted") !== "true") {
      target.setAttribute("data-fallback-attempted", "true");
      target.src = FALLBACK_IMAGE;
    }
  };

  if (!musician) {
    return (
      <div className={styles.container}>
        <section id="hero-section" className={styles.heroSection.layout}>
          <Header
            leftActionType="back"
            onLeftActionClick={handleReturn}
            showCenterText={false}
          />

          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto min-h-[500px]">
            <span className="text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2">
              404 • ARCHIVE NOT FOUND
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-slate-950 font-display mb-4"
              style={{ fontFamily: "'Poppins', Georgia, serif" }}
            >
              ARTIST ARCHIVE NOT FOUND
            </h2>
            <p className="text-xs text-slate-500 font-sans max-w-md uppercase tracking-wide leading-relaxed mb-8">
              Data arsip musisi dengan identifier "{targetSlug}" tidak ditemukan
              di dalam katalog pameran Festival Mbois 11.
            </p>
            <button
              onClick={handleReturn}
              className="px-6 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase font-sans hover:bg-[#FF1F00] transition-colors cursor-pointer"
            >
              RETURN TO EXHIBITION SHOWCASE →
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 1. HERO SECTION: Kanvas Khusus Layout Layer Berlapis (Split Screen) */}
      <section id="hero-section" className={styles.heroSection.layout}>
        {/* Integrated Static Non-Sticky Header */}
        <Header
          leftActionType="back"
          onLeftActionClick={handleReturn}
          showCenterText={false}
          isSticky={true}
          customNavItems={MUSICIAN_NAV_ITEMS}
          activeNavItemId="biography"
          onNavItemClick={handleNavClick}
        />

        {/* Hero Body Layout */}
        <div className={styles.heroSection.contentWrapper}>
          {/* Left Column: Giant Name, Bio, Vertical Timeline */}
          <div className={styles.heroSection.leftCol}>
            <h1
              className={styles.heroSection.title}
              style={{
                fontSize: "clamp(3rem, 6vw + 1rem, 7rem)",
                fontWeight: 900,
                fontStyle: "normal",
                letterSpacing: "-0.04em",
                lineHeight: "0.9",
              }}
            >
              {musician.name}
            </h1>

            <p className={styles.heroSection.bioText}>{musician.biography}</p>

            {/* Vertical History Timeline */}
            <div className={styles.heroSection.timelineBox}>
              <h4 className={styles.heroSection.timelineHeading}>
                HISTORICAL TIMELINE
              </h4>
              <div className="flex flex-col gap-4 py-3 border-l-1 border-black/10 pl-4 pr-8 mt-3">
                {musician.historyTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-0.5 relative px-4"
                  >
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#FF1F00]" />
                    <span className="text-xs font-black tracking-wider text-[#FF1F00] font-sans">
                      {item.year}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 font-sans leading-relaxed font-normal tracking-normal normal-case">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Giant Photo Canvas & Vintage Mic Badge */}
          <div className={styles.heroSection.rightCol}>
            <div className={styles.heroSection.photoFrame}>
              <img
                src={resolveAssetPath(musician.image)}
                alt={musician.name}
                onError={handleImageError}
                className={styles.heroSection.photoImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                <span className="text-[10px] font-mono px-2 py-1 bg-white/20 backdrop-blur-md rounded">
                  ARCHIVE #{musician.id.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   NESTED STYLESHEET DEFINITION (Anti-Gravity Design System Standard)
   ========================================================================== */
const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
    // padding: SPACING.padding.sm,
  },

  // CHARACTER 1: Kontainer Khusus Bertinggi Penuh Viewport Untuk Layering Center
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto " +
      COLORS.canvasBg,
    contentWrapper:
      "relative w-full max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start flex-1 h-auto",
    leftCol: "lg:col-span-7 flex flex-col gap-8 h-auto",
    genreBadge:
      "text-[10px] sm:text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans",
    title:
      "text-slate-950 font-black not-italic font-display leading-none tracking-tight uppercase pl-16",
    bioText:
      "text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal tracking-normal normal-case pl-16",
    timelineBox: "mt-6 pt-8 flex flex-col gap-3 pl-16",
    timelineHeading:
      "text-[10px] sm:text-sm font-bold tracking-widest text-slate-800 uppercase font-sans",
    rightCol: "lg:col-span-5 w-full",
    photoFrame:
      "relative w-full aspect-[3/4] overflow-hidden shadow-2xl bg-black group rounded-sm sticky top-8",
    photoImg:
      "w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out",
  },
});

export default MusicianDetailView;
