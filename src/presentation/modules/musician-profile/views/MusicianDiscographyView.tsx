import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  safeInitializeIcons,
  injectStylesheet,
  DEFAULT_FALLBACK_IMAGE,
} from "@/presentation/utils/dom";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { DESIGN_TOKENS } from "@/presentation/styles/theme";
import { Header, HeaderNavItem } from "@/presentation/components/Header";
import {
  musiciansRegistry,
  MusicianData as MusicianDetailData,
} from "@/presentation/data/musiciansRegistry";
import { useAudioPlayer } from "@/presentation/context/AudioPlayerContext";
import { TracklistTable } from "../components/TracklistTable";

interface LocationState {
  musician?: MusicianDetailData;
  from?: "home" | "extended";
}

const MUSICIAN_NAV_ITEMS: HeaderNavItem[] = [
  { id: "biography", label: "BIOGRAPHY" },
  { id: "discography", label: "DISCOGRAPHY" },
];

/**
 * MusicianDiscographyView Component
 *
 * View orchestrator for discography playback canvas and decomposed TracklistTable.
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

  const { activeTrack, playTrack } = useAudioPlayer();

  useEffect(() => {
    injectStylesheet(
      "gallery-fonts",
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Poppins:ital,wght@0,300..900;1,300..900&family=Outfit:wght@300;400;500;600;700;800;900&family=Pinyon+Script&display=swap",
    );
    safeInitializeIcons();

    if (musician && musician.catalog && musician.catalog.length > 0) {
      if (!activeTrack || activeTrack.artistSlug !== targetSlug) {
        const defaultTrack =
          musician.catalog.find((track) =>
            Boolean(track.youtubeId && track.youtubeId.trim() !== ""),
          ) ||
          musician.catalog[0] ||
          null;
        if (defaultTrack) {
          playTrack(defaultTrack, musician.name, targetSlug, musician.image);
        }
      }
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
      target.src = DEFAULT_FALLBACK_IMAGE;
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
              className="px-6 py-3 bg-black text-[#F6F4EE] text-xs font-bold tracking-widest uppercase font-sans hover:bg-[#FF1F00] transition-colors cursor-pointer"
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
      {/* 1. HERO SECTION: Full-Bleed Background & Collapsible Floating Tracklist */}
      <section id="hero-section" className={styles.heroSection.layout}>
        {/* Integrated Header Navigation */}
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

        {/* BODY CONTENT */}
        <div className="relative w-full min-h-[calc(100vh-177px)] flex items-center justify-center bg-black overflow-hidden">
          {/* Layer 1: Musician Background Cover Canvas */}
          <div className="w-full h-full max-w-full aspect-video flex items-center justify-center relative">
            <div className="w-full h-full flex items-center justify-center bg-stone-900">
              <img
                alt={musician.name}
                onError={handleImageError}
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10" />
          </div>

          {/* Layer 2: Floating UI Overlay with Decomposed TracklistTable Component */}
          <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-end items-start p-3 sm:p-6 pb-4 sm:pb-8 pointer-events-none">
            <TracklistTable
              musician={musician}
              targetSlug={targetSlug}
              activeTrack={activeTrack}
              hasValidMedia={hasValidMedia}
              onPlayTrack={playTrack}
            />
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
    background: "bg-black",
    text: "text-white",
  },
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-4 md:pb-8 overflow-visible flex flex-col justify-between h-auto bg-black",
  },
});

export default MusicianDiscographyView;
