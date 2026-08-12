import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { showGlobalToast } from "../utils/toast";
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
  { id: "biography", label: "BIOGRAPHY", targetId: "hero-section" },
  { id: "discography", label: "DISCOGRAPHY", targetId: "catalog-section" },
];

const resolveAssetPath = (path: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/${path}`;
};

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

  // 1. ACTIVE TRACK STATE & NAVIGATION MANAGEMENT
  const [activeNavItemId, setActiveNavItemId] = useState<string>("biography");
  const [activeTrack, setActiveTrack] = useState<TrackCatalogItem | null>(
    () => {
      if (!musician?.catalog || musician.catalog.length === 0) return null;
      return (
        musician.catalog.find((track) =>
          Boolean(track.youtubeId && track.youtubeId.trim() !== ""),
        ) ||
        musician.catalog[0] ||
        null
      );
    },
  );

  // 2. ANCHORED SCROLL INITIAL LOAD HANDLING
  const hasInitialScrolledRef = useRef(false);

  useEffect(() => {
    hasInitialScrolledRef.current = false;
  }, [targetSlug]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!hasInitialScrolledRef.current && location.hash) {
      const targetId = location.hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        hasInitialScrolledRef.current = true;
        timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [targetSlug, location.hash]);

  // 3. SCROLLSPY INTERSECTION OBSERVER WITH URL HASH BINDING
  useEffect(() => {
    if (!musician) return;

    const sectionIds = ["hero-section", "catalog-section"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: [0.2, 0.4, 0.6],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev,
        );
        const id = mostVisible.target.id;
        if (id === "hero-section") {
          setActiveNavItemId("biography");
        } else if (id === "catalog-section") {
          setActiveNavItemId("discography");
        }
        if (id && window.location.hash !== `#${id}`) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}#${id}`,
          );
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [targetSlug, musician, location.pathname]);

  useEffect(() => {
    injectStylesheet(
      "gallery-fonts",
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Poppins:ital,wght@0,300..900;1,300..900&family=Outfit:wght@300;400;500;600;700;800;900&family=Pinyon+Script&display=swap",
    );
    safeInitializeIcons();

    if (musician?.catalog && musician.catalog.length > 0) {
      const defaultTrack =
        musician.catalog.find((track) =>
          Boolean(track.youtubeId && track.youtubeId.trim() !== ""),
        ) ||
        musician.catalog[0] ||
        null;
      setActiveTrack(defaultTrack);
    } else {
      setActiveTrack(null);
    }
  }, [targetSlug, musician]);

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else if (locationState?.from === "extended") {
      navigate("/extended-archive");
    } else {
      navigate("/#showcase-icons");
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

  // 4. DATA SAFETY & MEDIA GUARDRAILS
  const hasValidMedia = Boolean(
    activeTrack?.youtubeId && activeTrack.youtubeId.trim() !== "",
  );

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
          activeNavItemId={activeNavItemId}
          onNavItemClick={(item) => setActiveNavItemId(item.id)}
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

      {/* A3. THE CATALOG & EXHIBITION WALL */}
      <section id="catalog-section" className={styles.catalogSection.layout}>
        <div className={styles.catalogSection.container}>
          {/* Left Column: The Tracklist Catalog */}
          <div className={styles.catalogSection.leftCol}>
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                DISCOGRAPHY SELECTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 font-sans tracking-tight">
                THE CATALOG
              </h3>
            </div>

            {/* 3. CATALOG LIST INTERACTIVITY & ACCESSIBILITY */}
            <div className={styles.catalogSection.table}>
              {musician.catalog.map((track, idx) => {
                const isSelected = activeTrack?.number === track.number;
                return (
                  <div
                    key={track.number || idx}
                    role="button"
                    tabIndex={0}
                    aria-selected={isSelected}
                    onClick={() => setActiveTrack(track)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveTrack(track);
                      }
                    }}
                    className={`${styles.catalogSection.tableRow} ${
                      isSelected
                        ? "bg-stone-100/40 font-bold border-l-2 border-[#FF1F00] pl-3"
                        : "hover:bg-black/[0.02]"
                    }`}
                  >
                    <span
                      className={`font-mono font-bold text-xs w-8 transition-colors ${
                        isSelected ? "text-[#FF1F00]" : "text-slate-400"
                      }`}
                    >
                      {track.number}
                    </span>
                    <div className="flex-1 flex flex-col">
                      <span
                        className={`text-sm font-sans tracking-wide uppercase transition-colors ${
                          isSelected
                            ? "font-black text-slate-950"
                            : "font-bold text-slate-900"
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 font-sans uppercase">
                        ALBUM: {track.album}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold font-mono transition-colors ${
                        isSelected ? "text-[#FF1F00]" : "text-slate-400"
                      }`}
                    >
                      {track.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Archive / Video Embed Container */}
          <div className={styles.catalogSection.rightCol}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                  DOCUMENTARY SOUNDSCAPE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 font-sans tracking-tight">
                  VISUAL ARCHIVE
                </h3>
              </div>
              {hasValidMedia && activeTrack?.youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${activeTrack.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-[10px] font-bold tracking-wider uppercase font-sans px-3 py-1.5 bg-black/5 hover:bg-gallery-red hover:text-white text-slate-700 transition-colors rounded-sm flex items-center justify-center cursor-pointer shrink-0 gap-1.5"
                  title="Open video directly on YouTube"
                >
                  <span>OPEN ON YOUTUBE</span>
                  <i
                    data-lucide="external-link"
                    className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              )}
            </div>

            {/* 1. IFRAME RE-MOUNTING PREVENTION & SMOOTH SRC UPDATE */}
            <div className="relative aspect-video w-full overflow-hidden border-none bg-black/[0.02] backdrop-blur-md rounded-sm shadow-2xl transition-all duration-500">
              {hasValidMedia && activeTrack?.youtubeId ? (
                <iframe
                  className="w-full h-full object-cover border-none opacity-90 pointer-events-auto shadow-2xl transition-all duration-500 rounded-sm"
                  src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                  title={activeTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-6 relative overflow-hidden group">
                  <img
                    src={resolveAssetPath(musician.image)}
                    alt={musician.name}
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center text-center gap-2">
                    <i
                      data-lucide="disc"
                      className="w-10 h-10 text-[#FF1F00]"
                    />
                    <span className="text-xs font-bold tracking-widest uppercase font-sans text-white/90">
                      {activeTrack ? activeTrack.title : "NO TRACK SELECTED"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                      VISUAL ARCHIVE UNAVAILABLE
                    </span>
                  </div>
                </div>
              )}
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
    padding: SPACING.padding.sm,
  },

  // CHARACTER 1: Kontainer Khusus Bertinggi Penuh Viewport Untuk Layering Center
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto border-b border-black/10 " +
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

  catalogSection: {
    layout: "w-full pl-2 sm:pl-4 md:pl-32 py-16 md:py-24 " + COLORS.canvasBg,
    container:
      "w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start",
    leftCol: "lg:col-span-4 w-full",
    rightCol: "lg:col-span-8 w-full",
    table:
      "flex flex-col divide-y divide-black/10 border-t border-b border-black/10 w-full",
    tableRow:
      "py-4 flex justify-between items-center gap-4 hover:bg-black/[0.02] px-2 transition-colors cursor-pointer",
  },
});

export default MusicianDetailView;
