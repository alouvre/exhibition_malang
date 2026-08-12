import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { safeInitializeIcons, injectStylesheet } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, SPACING, DESIGN_TOKENS } from "../styles/theme";
import { Header, HeaderNavItem } from "../components/Header";
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
 * Dedicated exhibition view for a musician's discography catalog and visual soundscape archive.
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
        <section className={styles.heroSection.layout}>
          <Header
            leftActionType="back"
            onLeftActionClick={handleReturn}
            showCenterText={false}
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
      {/* Integrated Header Navigation */}
      <Header
        leftActionType="back"
        onLeftActionClick={handleReturn}
        showCenterText={false}
        isSticky={true}
        customNavItems={MUSICIAN_NAV_ITEMS}
        activeNavItemId="discography"
        onNavItemClick={handleNavClick}
      />

      {/* THE CATALOG & EXHIBITION WALL */}
      <section id="catalog-section" className={styles.catalogSection.layout}>
        <div className={styles.catalogSection.container}>
          {/* Left Column: The Tracklist Catalog */}
          <div className={styles.catalogSection.leftCol}>
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                DISCOGRAPHY SELECTION • {musician.name.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 font-sans tracking-tight">
                THE CATALOG
              </h3>
            </div>

            {/* CATALOG LIST TABLE */}
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

            {/* IFRAME PLAYER CONTAINER */}
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

const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
    padding: SPACING.padding.sm,
  },
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto border-b border-black/10 " +
      COLORS.canvasBg,
  },
  catalogSection: {
    layout: "w-full px-6 md:px-16 py-12 md:py-16 " + COLORS.canvasBg,
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

export default MusicianDiscographyView;
