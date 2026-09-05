import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safeInitializeIcons, injectStylesheet } from "@/presentation/utils/dom";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { Header, HeaderNavItem } from "@/presentation/components/Header";
import { NotFoundView } from "@/presentation/views/NotFoundView";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import {
  musiciansRegistry,
  MusicianData as MusicianDetailData,
  CollaborationItem,
  HistoryEvent,
  TrackCatalogItem,
} from "@/presentation/data/musiciansRegistry";
import { BioContent } from "../components/BioContent";
import { ArchivalLightboxModal } from "../components/ArchivalLightboxModal";

export type {
  HistoryEvent,
  TrackCatalogItem,
  MusicianDetailData,
  CollaborationItem,
};

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
 * Orchestrates BioContent & ArchivalLightboxModal sub-components.
 */
export const MusicianDetailView: React.FC<MusicianDetailViewProps> = ({
  slug: propSlug,
  onBack,
}) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const targetSlug = routeSlug || propSlug;

  const [selectedLightboxImage, setSelectedLightboxImage] = useState<
    string | null
  >(null);
  const [activeCollabIndex, setActiveCollabIndex] = useState<number | null>(
    null,
  );

  const musician = musiciansRegistry.find(
    (item) => item.slug === targetSlug || item.id === targetSlug,
  );

  useDocumentTitle(musician ? `${musician.name} - Eksibisi Digital` : "Musisi Tidak Ditemukan");

  if (!musician) {
    return <NotFoundView />;
  }

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
              di dalam katalog pameran Museum Musik Indonesia.
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
      {/* 1. HERO SECTION: Split Screen View */}
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
          {/* Left Column: Decomposed BioContent Component */}
          <BioContent musician={musician} />

          {/* Right Column: Giant Photo Canvas, Archive Badge & Exhibition Gallery */}
          <div className="lg:col-span-5 relative w-full">
            <div className="lg:sticky lg:top-28 space-y-6 transition-all duration-300">
              {/* Genre & Active Era Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {musician.genre && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-black/10 text-stone-900 border border-black/10 font-mono">
                    {musician.genre}
                  </span>
                )}
                {musician.year && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#FF1F00]/10 text-[#FF1F00] border border-[#FF1F00]/20 font-mono">
                    ERA: {musician.year}
                  </span>
                )}
              </div>

              {/* Giant Photo Canvas & Archive Badge */}
              <div
                onClick={() =>
                  setSelectedLightboxImage(resolveAssetPath(musician.image))
                }
                className="relative rounded-2xl overflow-hidden border border-black/10 bg-black/5 shadow-2xl group cursor-pointer"
              >
                <img
                  src={resolveAssetPath(musician.image)}
                  alt={musician.name}
                  onError={handleImageError}
                  className="w-full aspect-[3/4] object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md font-bold tracking-wider">
                    ARCHIVE #{musician.id.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Exhibition Gallery Grid with Scroll Reveal */}
              {musician.exhibitionImages &&
                musician.exhibitionImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-4 border-t border-black/10 flex flex-col gap-3"
                  >
                    <h4 className="text-xs font-bold tracking-widest uppercase text-stone-500 font-mono flex items-center justify-between">
                      <span>
                        EXHIBITION ARCHIVES ({musician.exhibitionImages.length})
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {musician.exhibitionImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() =>
                            setSelectedLightboxImage(resolveAssetPath(imgUrl))
                          }
                          className="relative aspect-square rounded-xl overflow-hidden border border-black/10 bg-black/5 group cursor-pointer shadow-xs hover:shadow-md transition-all"
                        >
                          <img
                            src={resolveAssetPath(imgUrl)}
                            alt={`Exhibition archive ${idx + 1}`}
                            onError={handleImageError}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* Key Collaborations */}
              {musician.collaborations &&
                musician.collaborations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="pt-5 border-t border-black/10"
                  >
                    <h4 className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-3 font-mono flex items-center justify-between">
                      <span>KEY COLLABORATIONS</span>
                      <span className="text-[10px] font-normal text-stone-400 normal-case hidden sm:inline">
                        (tap to preview)
                      </span>
                    </h4>
                    <div className="flex flex-wrap gap-2 overflow-visible">
                      {musician.collaborations.map((collab, idx) => {
                        const item: CollaborationItem =
                          typeof collab === "string"
                            ? { name: collab }
                            : collab;
                        const hasPreview = Boolean(
                          item.projectTitle || item.role,
                        );
                        const isHovered = activeCollabIndex === idx;

                        return (
                          <div key={idx} className="relative inline-block">
                            <button
                              type="button"
                              onMouseEnter={() => setActiveCollabIndex(idx)}
                              onMouseLeave={() => setActiveCollabIndex(null)}
                              onClick={() =>
                                setActiveCollabIndex(isHovered ? null : idx)
                              }
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 border ${
                                isHovered
                                  ? "bg-slate-950 text-white border-slate-900 shadow-md scale-105"
                                  : "bg-black/5 hover:bg-black/10 text-stone-800 border-black/10 hover:border-black/20 backdrop-blur-sm"
                              }`}
                            >
                              <span>{item.name}</span>
                              {hasPreview && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] shadow-[0_0_6px_rgba(255,31,0,0.8)]" />
                              )}
                            </button>

                            {/* Interactive Floating Tooltip Badge */}
                            <AnimatePresence>
                              {isHovered && hasPreview && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                  }}
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-40 w-max max-w-[calc(100vw-48px)] sm:max-w-[240px] pointer-events-none"
                                >
                                  <div className="bg-slate-950/95 backdrop-blur-xl text-white border border-white/20 shadow-2xl rounded-xl p-3 flex flex-col gap-1 text-left relative">
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-950/95 border-b border-r border-white/20 rotate-45" />

                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF1F00] uppercase">
                                        COLLABORATION
                                      </span>
                                      {item.role && (
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/15 text-slate-200 font-mono">
                                          {item.role}
                                        </span>
                                      )}
                                    </div>

                                    {item.projectTitle && (
                                      <p className="text-xs font-bold text-slate-100 font-sans leading-snug">
                                        "{item.projectTitle}"
                                      </p>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

              {/* Notable Achievements & Awards */}
              {musician.awards && musician.awards.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="pt-5 border-t border-black/10"
                >
                  <h4 className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-3 font-mono">
                    ACHIEVEMENTS & AWARDS
                  </h4>
                  <div className="space-y-2.5">
                    {[...musician.awards]
                      .sort((a, b) => {
                        const yearA = parseInt(a.year, 10) || 0;
                        const yearB = parseInt(b.year, 10) || 0;
                        return yearA - yearB;
                      })
                      .map((award, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-black/5 border border-black/10 flex items-start gap-3 shadow-2xs"
                        >
                          <div className="px-2 py-1 rounded bg-black/10 text-[10px] font-mono font-bold text-stone-800 shrink-0">
                            {award.year}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-stone-900 truncate">
                              {award.title}
                            </h5>
                            <p className="text-[11px] text-stone-600 truncate">
                              {award.organization}{" "}
                              {award.category ? `• ${award.category}` : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Decomposed Interactive Archival Lightbox Modal */}
      <ArchivalLightboxModal
        selectedImage={selectedLightboxImage}
        musicianName={musician.name}
        onClose={() => setSelectedLightboxImage(null)}
        onImageError={handleImageError}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in pb-28 sm:pb-32 " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
  },
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto " +
      COLORS.canvasBg,
    contentWrapper:
      "relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-10 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-start flex-1 h-auto",
  },
});

export default MusicianDetailView;
