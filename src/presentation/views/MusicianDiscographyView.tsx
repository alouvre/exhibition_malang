import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safeInitializeIcons, injectStylesheet } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { DESIGN_TOKENS } from "../styles/theme";
import { Header, HeaderNavItem } from "../components/Header";
import { Icon } from "../../infrastructure/services/IconService";
import {
  musiciansRegistry,
  MusicianData as MusicianDetailData,
  TrackCatalogItem,
} from "../data/musiciansRegistry";

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
 * MusicianDiscographyView Component
 *
 * Layout and Header positioning are 100% aligned with MusicianDetailView.tsx
 * to guarantee zero layout shift when navigating between tabs.
 */
export const MusicianDiscographyView: React.FC = () => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const targetSlug = routeSlug || "ian-antono";

  const musician = musiciansRegistry.find(
    (item) => item.slug === targetSlug || item.id === targetSlug,
  );

  // Active track selection state for iframe media player
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

  // State to toggle catalog card collapse/expand
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
    if (locationState?.from === "extended") {
      navigate("/extended-archive");
    } else {
      navigate("/#showcase-icons");
    }
  };

  const handleNavClick = (item: HeaderNavItem) => {
    if (item.id === "biography") {
      navigate(`/musician/${targetSlug}`, { state: locationState });
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
            variant="dark"
          />
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto min-h-[500px]">
            <span className="text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2">
              404 • DISCOGRAPHY NOT FOUND
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-slate-950 font-display mb-4"
              style={{ fontFamily: "'Poppins', Georgia, serif" }}
            >
              DISCOGRAPHY ARCHIVE NOT FOUND
            </h2>
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
      {/* 1. HERO SECTION: Kanvas Khusus Layout Layer Berlapis (Pixel-identical with MusicianDetailView.tsx) */}
      <section id="hero-section" className={styles.heroSection.layout}>
        {/* Integrated Header Navigation (Identical Positioning & Hierarchy) */}
        <Header
          leftActionType="back"
          onLeftActionClick={handleReturn}
          showCenterText={false}
          isSticky={true}
          variant="dark"
          customNavItems={MUSICIAN_NAV_ITEMS}
          activeNavItemId="discography"
          onNavItemClick={handleNavClick}
        />

        {/* BODY CONTENT: Full-Bleed Video Background & Floating Glass Tracklist Overlay */}
        <div className="relative w-full min-h-[calc(100vh-177px)] flex items-center justify-center bg-black overflow-hidden">
          {/* Layer 1: Media Player / Video Canvas (Centered in Screen) */}
          <div className="w-full h-full max-w-full aspect-video flex items-center justify-center relative">
            {hasValidMedia && activeTrack?.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`}
                title={activeTrack.title}
                className="w-full h-full object-cover border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-900">
                <img
                  src={resolveAssetPath(musician.image)}
                  alt={musician.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
            )}
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10" />
          </div>

          {/* Layer 2: Floating UI Overlay (Spans Full Viewport Container - Absolute Inset-0 with Safe-Area Padding) */}
          <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-end items-start p-3 sm:p-6 pb-4 sm:pb-8 pointer-events-none">
            {/* Floating Glass Tracklist Overlay Card (Collapsible & Safe-Area Aligned) */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="mr-auto ml-0 mb-2 sm:mb-4 w-full max-w-[calc(100vw-24px)] sm:max-w-sm pointer-events-auto flex flex-col bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl p-3.5 sm:p-5 shadow-2xl shadow-black/90 transition-all duration-300"
            >
              {/* Card Header: Title, YouTube CTA & Minimize Toggle */}
              <div className="flex items-center justify-between gap-2.5 pb-2.5 border-b border-white/15">
                <div className="flex flex-col gap-0.5 min-w-0">
                  {/* Sub-header: Musician Name • Active Track Title (Always Track Title) */}
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans truncate">
                    {musician.name.toUpperCase()} •{" "}
                    {(
                      activeTrack?.title ||
                      musician.album ||
                      "TRACK"
                    ).toUpperCase()}
                  </span>

                  {/* Dynamic Main Title: "NOW PLAYING" when collapsed, "THE CATALOG" when expanded */}
                  <h3 className="text-base sm:text-lg font-black uppercase text-white font-sans tracking-tight truncate transition-all duration-300">
                    {isCollapsed ? "NOW PLAYING" : "THE TRACKLIST"}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* YouTube Icon Only Button (44x44px minimum touch target) */}
                  {hasValidMedia && activeTrack?.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${activeTrack.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FF1F00] hover:bg-[#D61A00] text-white flex items-center justify-center transition-all shadow-md shadow-[#FF1F00]/30 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                      title="Tonton di YouTube"
                      aria-label="Tonton di YouTube"
                    >
                      {/* Ikon YouTube SVG */}
                      <svg
                        className="w-4.5 h-4.5 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}

                  {/* Minimize / Expand Toggle Button (44x44px minimum touch target) */}
                  <button
                    type="button"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all cursor-pointer flex items-center justify-center border border-white/10 shrink-0"
                    title={isCollapsed ? "Expand Catalog" : "Minimize Catalog"}
                    aria-label={
                      isCollapsed ? "Expand Catalog" : "Minimize Catalog"
                    }
                  >
                    <Icon
                      name="chevron-down"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isCollapsed ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Collapsible Tracklist Table */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 max-h-[30vh] sm:max-h-[36vh] overflow-y-auto custom-scrollbar flex flex-col divide-y divide-white/10 pr-1">
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
                            className={`py-2 px-2.5 flex items-center justify-between gap-2.5 rounded-xl transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-white/15 text-white border-l-2 border-[#FF1F00] font-bold pl-3"
                                : "hover:bg-white/5 text-stone-300 hover:text-white"
                            }`}
                          >
                            <span
                              className={`font-mono font-bold text-[10px] sm:text-xs w-5 shrink-0 transition-colors ${
                                isSelected ? "text-[#FF1F00]" : "text-stone-400"
                              }`}
                            >
                              {track.number}
                            </span>
                            <div className="flex-1 flex flex-col min-w-0">
                              <span
                                className={`text-[11px] sm:text-xs font-sans tracking-wide uppercase truncate ${
                                  isSelected
                                    ? "font-black text-white"
                                    : "font-semibold text-stone-200"
                                }`}
                              >
                                {track.title}
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-medium text-stone-400 font-sans uppercase truncate">
                                {track.album}
                              </span>
                            </div>
                            <span
                              className={`text-[10px] sm:text-xs font-bold font-mono shrink-0 ${
                                isSelected ? "text-[#FF1F00]" : "text-stone-400"
                              }`}
                            >
                              {track.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   NESTED STYLESHEET DEFINITION (100% Identical with MusicianDetailView.tsx)
   ========================================================================== */
const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: "bg-black",
    text: "text-white",
    // padding: SPACING.padding.sm,
  },
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto bg-black",
  },
});

export default MusicianDiscographyView;
