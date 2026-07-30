import React, { useState, useMemo, useEffect } from "react";
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
 * Features a Reactive Client-Side Search Engine for filtering musicians by
 * stage name and real name/biography in real time with a stark minimalist aesthetic.
 */
export const ExtendedArtistsView: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Re-initialize Lucide icons dynamically when search results or query change
  useEffect(() => {
    safeInitializeIcons();
  }, [searchQuery]);

  /**
   * Dual-parameter reactive filter logic.
   * Flexibly matches the query against musician.name (stage name),
   * musician.realName (if present), and musician.biography (real names mentioned in text).
   */
  const filteredMusicians = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return musiciansRegistry ?? [];

    return (musiciansRegistry ?? []).filter((musician: MusicianData) => {
      const stageNameMatches = musician.name
        .toLowerCase()
        .includes(normalizedQuery);
      const realNameProperty =
        (
          musician as MusicianData & { realName?: string }
        ).realName?.toLowerCase() ?? "";
      const realNameMatches = realNameProperty.includes(normalizedQuery);
      const biographyMatches = musician.biography
        .toLowerCase()
        .includes(normalizedQuery);

      return stageNameMatches || realNameMatches || biographyMatches;
    });
  }, [searchQuery]);

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
          <p className={styles.contentSection.description}>
            Katalog kuratorial lengkap musisi dan maestro musik kota Malang dari
            berbagai era, merayakan dedikasi dan warisan karya kebudayaan di
            Music Gallery Vision.
          </p>
        </header>

        {/* IOS MINIMALIST PREMIUM REACTIVE SEARCH BAR */}
        <div className={styles.searchSection.wrapper}>
          <div className={styles.searchSection.inputContainer}>
            <i data-lucide="search" className={styles.searchSection.icon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search musician by stage or real name..."
              className={styles.searchSection.input}
              aria-label="Search musicians by stage or real name"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.searchSection.clearButton}
                aria-label="Clear search query"
              >
                <i data-lucide="x" className="w-4 h-4 block" />
              </button>
            )}
          </div>
        </div>

        {/* DYNAMIC CARD GRID & EMPTY STATE FALLBACK */}
        <main className={styles.contentSection.mainContent}>
          {filteredMusicians.length > 0 ? (
            <div className={styles.contentSection.grid}>
              {filteredMusicians.map(
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
          ) : (
            <div className={styles.emptyState.container}>
              <i data-lucide="search-x" className={styles.emptyState.icon} />
              <h3 className={styles.emptyState.title}>
                No archives found matching your query.
              </h3>
              <p className={styles.emptyState.subtitle}>
                Try adjusting your search keywords or clearing the filter to
                explore the catalog.
              </p>
            </div>
          )}
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
      "w-full max-w-7xl mx-auto px-6 md:px-16 py-4 md:py-8 flex flex-col gap-4",
    header: "flex flex-col",
    badge:
      "text-[10px] sm:text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2 block",
    title:
      "text-slate-950 font-black not-italic font-display leading-none tracking-tight uppercase text-4xl sm:text-6xl",
    description:
      "text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal normal-case mt-4 max-w-2xl",
    mainContent: "w-full",
    grid: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 items-start mt-6",
  },
  searchSection: {
    wrapper: "w-full max-w-lg mt-6 relative flex items-center",
    inputContainer:
      "relative w-full flex items-center bg-white/70 backdrop-blur-md rounded-2xl border border-black/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus-within:border-black/20 focus-within:shadow-md focus-within:bg-white transition-all duration-300 ease-out",
    icon: "absolute left-4 w-4 h-4 text-slate-400 pointer-events-none block",
    input:
      "w-full bg-transparent pl-11 pr-10 py-3 text-sm font-sans border-none outline-none text-slate-800 placeholder-slate-400 tracking-wide focus:outline-none",
    clearButton:
      "absolute right-3.5 text-slate-400 hover:text-slate-900 transition-colors p-1 flex items-center justify-center cursor-pointer rounded-full hover:bg-black/5",
  },
  emptyState: {
    container:
      "w-full py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-black/10 mt-8 bg-white/30 backdrop-blur-sm",
    icon: "w-8 h-8 text-slate-400 mb-3 stroke-1",
    title:
      "text-sm font-sans font-medium text-slate-800 uppercase tracking-widest mb-1",
    subtitle:
      "text-xs font-sans text-slate-500 max-w-md font-light leading-relaxed",
  },
});

const styles = extendedArtistsStyles;

export default ExtendedArtistsView;
