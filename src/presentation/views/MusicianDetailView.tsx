import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safeInitializeIcons, injectStylesheet } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "../styles/theme";
import { Header, HeaderNavItem } from "../components/Header";
import { Icon } from "../../infrastructure/services/IconService";
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

  const [selectedLightboxImage, setSelectedLightboxImage] = useState<
    string | null
  >(null);

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
          {/* Left Column: Giant Name, Bio, Quotes, Profile, Timeline */}
          <div className={styles.heroSection.leftCol}>
            {/* Giant Name */}
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
              {(() => {
                const words = musician.name.split(" ");
                const totalLength = musician.name.length;
                const shouldWrap = words.length > 1 && totalLength > 9;

                if (!shouldWrap) {
                  return musician.name;
                }

                return words.map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ));
              })()}
            </h1>

            {/* Headline Summary */}
            {musician.headlineSummary && (
              <div className="pl-16 mr-0">
                <p className="text-base sm:text-lg font-serif text-slate-700 leading-snug tracking-tight italic pl-10 -mt-2 border-l-1 border-[#7d7d7d] py-0.5">
                  "{musician.headlineSummary}"
                </p>
              </div>
            )}

            {/* Main Biography Text */}
            <p className={styles.heroSection.bioText}>{musician.biography}</p>

            {/* Musical Style, Instruments & Influences */}
            {musician.musicalProfile && (
              <div className="ml-16 flex flex-col gap-4 p-6 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
                <h4 className="text-xs font-bold tracking-widest text-slate-900 uppercase font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F00]" />
                  MUSICAL PROFILE & INSTRUMENTATION
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {musician.musicalProfile.primaryInstruments.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans">
                        Primary Instruments
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {musician.musicalProfile.primaryInstruments.map(
                          (inst, i) => (
                            <span
                              key={i}
                              className="text-xs font-semibold px-2.5 py-1 bg-white text-slate-800 border border-slate-200 rounded-lg shadow-2xs"
                            >
                              {inst}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  {musician.musicalProfile.influences &&
                    musician.musicalProfile.influences.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans">
                          Musical Influences
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {musician.musicalProfile.influences.map((inf, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium px-2.5 py-1 bg-slate-200/70 text-slate-700 rounded-lg"
                            >
                              {inf}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Vertical History Timeline */}
            <div className={styles.heroSection.timelineBox}>
              <h4 className={styles.heroSection.timelineHeading}>
                HISTORICAL TIMELINE
              </h4>
              <div className="flex flex-col gap-4 py-3 border-l-2 border-slate-200 pl-4 pr-4 mt-3">
                {musician.historyTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 relative px-4 group"
                  >
                    <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-[#FF1F00] ring-4 ring-white" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tracking-wider text-[#FF1F00] font-sans">
                        {item.year}
                      </span>
                      {item.category && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-mono border border-slate-200">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 font-sans leading-relaxed">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Quote / Editorial Motto Blockquote */}
            {musician.signatureQuote && (
              <div className="ml-16 my-2 p-6 sm:p-8 bg-slate-950 text-white rounded-2xl relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute top-2 right-4 text-7xl font-serif text-white/10 select-none pointer-events-none">
                  “
                </div>
                <p className="text-base sm:text-lg font-medium italic font-serif leading-relaxed text-slate-100 relative z-10">
                  "{musician.signatureQuote.text}"
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-sans relative z-10">
                  <span className="font-bold text-[#FF1F00] tracking-wide uppercase">
                    — {musician.signatureQuote.source || musician.name}
                  </span>
                  {musician.signatureQuote.year && (
                    <span className="font-mono text-[10px] text-slate-400">
                      {musician.signatureQuote.year}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

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

              {/* Exhibition Gallery Grid with Framer Motion Scroll Reveal */}
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
                    <div className="grid grid-cols-3 gap-2.5">
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
                    <h4 className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-3 font-mono">
                      KEY COLLABORATIONS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {musician.collaborations.map((collab, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-black/5 text-stone-800 border border-black/10 backdrop-blur-sm"
                        >
                          {collab}
                        </span>
                      ))}
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
                    {musician.awards.map((award, idx) => (
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

      {/* Interactive Museum Archival Lightbox Modal */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 flex flex-col cursor-default"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between p-4 bg-black/80 border-b border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF1F00] text-white rounded font-bold uppercase">
                    ARCHIVE EXHIBIT
                  </span>
                  <span className="text-xs font-bold font-sans tracking-wide uppercase truncate">
                    {musician.name} — EXHIBITION PHOTO
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLightboxImage(null)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Viewport */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-4 min-h-[350px]">
                <img
                  src={selectedLightboxImage}
                  alt={`${musician.name} Archival Preview`}
                  onError={handleImageError}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    timelineBox: "flex flex-col gap-3 pl-16",
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
