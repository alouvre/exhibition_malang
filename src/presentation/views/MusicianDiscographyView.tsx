import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
        <div className="relative flex-1 w-full min-h-[calc(100vh-180px)] overflow-hidden">
          {/* Full-Bleed Background Video / Fallback Image Layer (z-0 / z-10) */}
          <div className="absolute inset-0 aspect-video w-full z-0 overflow-hidden">
            {hasValidMedia && activeTrack?.youtubeId ? (
              <iframe
                className="absolute inset-0 w-full h-full object-cover scale-105 z-0 opacity-100 border-none pointer-events-none"
                src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0`}
                title={activeTrack.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <img
                src={resolveAssetPath(musician.image)}
                alt={musician.name}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
              />
            )}
            {/* Dark Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none z-10" />
          </div>

          {/* Floating Glass Tracklist Overlay Card (Bottom-Left Corner Positioning) (z-20 / z-30) */}
          <div className="relative z-20 w-full h-full flex flex-col justify-end items-start p-4 md:p-6 pointer-events-none">
            <div className="mr-auto ml-0 mb-2 sm:mb-4 max-w-xs sm:max-w-sm w-full pointer-events-auto flex flex-col gap-0.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-black/90">
              {/* Card Header: Title & YouTube CTA */}
              <div className="flex items-center justify-between gap-2.5 pb-2.5 border-b border-white/15">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans truncate">
                    {musician.name.toUpperCase()} •{" "}
                    {(activeTrack?.album || musician.album).toUpperCase()}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase text-white font-sans tracking-tight truncate">
                    THE CATALOG
                  </h3>
                </div>

                {/* YouTube CTA Button */}
                {hasValidMedia && activeTrack?.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeTrack.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF1F00] hover:bg-[#D61A00] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 transition-all shadow-md shadow-[#FF1F00]/30 hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
                    title="Open video directly on YouTube"
                  >
                    <span>YOUTUBE</span>
                    <Icon name="external-link" className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Scrollable Tracklist Table */}
              <div className="max-h-[35vh] sm:max-h-[42vh] overflow-y-auto custom-scrollbar flex flex-col divide-y divide-white/10 pr-1">
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
                      className={`py-2.5 px-2.5 flex items-center justify-between gap-2.5 rounded-xl transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-white/15 text-white border-l-2 border-[#FF1F00] font-bold pl-3"
                          : "hover:bg-white/5 text-stone-300 hover:text-white"
                      }`}
                    >
                      <span
                        className={`font-mono font-bold text-[10px] sm:text-xs w-6 shrink-0 transition-colors ${
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
                          ALBUM: {track.album}
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
            </div>
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
