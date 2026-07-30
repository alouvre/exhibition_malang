import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { MusicianCard } from "../components/MusicianCard";
import { musiciansRegistry, MusicianData } from "../data/musiciansRegistry";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, SPACING, DESIGN_TOKENS } from "../styles/theme";

/**
 * Helper utility to resolve a URL-friendly slug for a musician.
 * Prioritizes custom `slug` or `id`, defaulting to a sanitized lowercase name string.
 */
const getMusicianSlug = (musician: MusicianData): string => {
  return (
    musician.slug ||
    musician.id ||
    musician.name.toLowerCase().replace(/\s+/g, "-")
  );
};

/**
 * ExtendedArtistsView Component
 *
 * Renders the full, comprehensive registry archive of musicians in Malang.
 * Implements a Self-Documenting Sectional Layout with an isolated styling dictionary.
 */
export const ExtendedArtistsView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /**
   * Handles navigation back to the main showcase section of the exhibition.
   */
  const handleNavigateBackToShowcase = (): void => {
    navigate("/#showcase-icons");
  };

  /**
   * Handles musician card selection and navigates to the detail page.
   * Passes the required route state payload for context preservation.
   */
  const handleSelectMusician = (musician: MusicianData): void => {
    const slug = getMusicianSlug(musician);
    navigate(`/musician/${slug}`, { state: { musician, from: "extended" } });
  };

  return (
    <div className={styles.container}>
      {/* 1. HERO / NAVIGATION SECTION */}
      <section className={styles.heroSection.layout}>
        <Header
          leftActionType="back"
          leftActionLabel="Return to Showcase"
          onLeftActionClick={handleNavigateBackToShowcase}
          showCenterText={false}
        />
        <div className={styles.heroSection.divider} />
      </section>

      {/* 2. MAIN EDITORIAL & REGISTRY CONTENT SECTION */}
      <section className={styles.contentSection.layout}>
        {/* EDITORIAL SECTION TITLE BLOCK */}
        <header className={styles.contentSection.header}>
          <span className={styles.contentSection.badge}>
            THE COMPREHENSIVE REGISTRY
          </span>
          <h1 className={styles.contentSection.title}>EXTENDED ARCHIVE</h1>
          <p className={styles.contentSection.description}>
            Katalog kuratorial lengkap musisi dan maestro musik kota Malang dari
            berbagai era, merayakan dedikasi dan warisan karya kebudayaan di
            Music Gallery Vision.
          </p>
        </header>

        {/* DYNAMIC CARD GRID */}
        <main className={styles.contentSection.mainContent}>
          <div className={styles.contentSection.grid}>
            {(musiciansRegistry ?? []).map(
              (musician: MusicianData, index: number) => (
                <MusicianCard
                  key={musician.id || index}
                  musician={musician}
                  index={index}
                  onClick={() => handleSelectMusician(musician)}
                />
              ),
            )}
          </div>
        </main>
      </section>
    </div>
  );
};

/**
 * Isolated styling dictionary for ExtendedArtistsView layout & typography.
 * Centralizes Tailwind class utility strings outside the component tree.
 * Follows the Anti-Gravity Design System Standard (StyleSheet pattern).
 */
const extendedArtistsStyles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
    padding: SPACING.padding.sm,
  },
  heroSection: {
    layout: "w-full flex flex-col",
    divider: "w-full border-b border-black/10",
  },
  contentSection: {
    layout:
      "w-full max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-20 flex flex-col gap-12",
    header: "flex flex-col",
    badge:
      "text-[10px] sm:text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2 block",
    title:
      "text-slate-950 font-black not-italic font-display leading-none tracking-tight uppercase text-4xl sm:text-6xl",
    description:
      "text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal normal-case mt-4 max-w-2xl",
    mainContent: "w-full",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 items-start mt-8",
  },
});

const styles = extendedArtistsStyles;

export default ExtendedArtistsView;
