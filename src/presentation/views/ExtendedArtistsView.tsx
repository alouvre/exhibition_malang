import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { InfoModal } from "../components/InfoModal";
import { MusicianCard } from "../components/MusicianCard";
import { musiciansRegistry, MusicianData } from "../data/musiciansRegistry";
import { safeInitializeIcons } from "../utils/dom";
import { Icon } from "../../infrastructure/services/IconService";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, SPACING, DESIGN_TOKENS } from "../styles/theme";
import { useMusicianFilter, SortType } from "../hooks/useMusicianFilter";

/**
 * Helper utility to resolve a URL-friendly slug for a musician.
 * Prioritizes custom `slug` or `id`, defaulting to a sanitized lowercase name string.
 */
const getMusicianSlug = (musician?: MusicianData): string => {
  if (!musician) return "";
  return (
    musician.slug ||
    musician.id ||
    (musician.name ? musician.name.toLowerCase().replace(/\s+/g, "-") : "")
  );
};

interface SortOption {
  id: SortType;
  label: string;
}

const sortYearOptions: SortOption[] = [
  { id: "oldest", label: "Oldest First" },
  { id: "newest", label: "Newest First" },
];

const sortAlphaOptions: SortOption[] = [
  { id: "a-z", label: "A to Z" },
  { id: "z-a", label: "Z to A" },
];

const categoryOptions = [
  { id: "ALL", label: "ALL CATEGORIES" },
  { id: "ROCK", label: "ROCK ORIGINATOR" },
  { id: "POP", label: "POP & ELECTRONIC" },
  { id: "FOLK", label: "FOLK & ETHNIC" },
  { id: "KRONCONG", label: "KRONCONG & KLASIK" },
  { id: "LADY ROCKER", label: "LADY ROCKER" },
];

const alphabetOptions = [
  "ALL",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const dropdownAnimationProps = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
  transition: { type: "spring", stiffness: 450, damping: 30 },
};

/**
 * ExtendedArtistsView Component
 *
 * Renders the full, comprehensive registry archive of musicians in Malang.
 * Equipped with an iOS Minimalist Premium 'Filters & Sorting' Control Deck
 * and floating pop-over menu for interactive multi-parameter catalog exploration.
 */
export const ExtendedArtistsView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { showInfoModal?: boolean } | null;

  // InfoModal Auto-Trigger State
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  // Interaction Deck State
  const [isFilterDeckOpen, setIsFilterDeckOpen] = useState<boolean>(false);

  useEffect(() => {
    if (locationState?.showInfoModal) {
      setIsInfoModalOpen(true);
    }
  }, [locationState]);

  // Custom Filter & Sorting State Hook
  const {
    sortType,
    setSortType,
    selectedCategory,
    setSelectedCategory,
    selectedAlphabet,
    setSelectedAlphabet,
    searchQuery,
    setSearchQuery,
    filteredMusicians,
    activeFiltersCount,
    handleResetFilters,
  } = useMusicianFilter(musiciansRegistry);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Click outside listener for Pop-over dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsFilterDeckOpen(false);
      }
    };

    if (isFilterDeckOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterDeckOpen]);

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
    if (!musician) return;
    const slug = getMusicianSlug(musician);
    navigate(`/musician/${slug}`, { state: { musician, from: "extended" } });
  };

  return (
    <ErrorBoundary onReset={handleResetFilters}>
      <div className={styles.container}>
        {/* 1. HERO / NAVIGATION SECTION */}
        <section className={styles.heroSection.layout}>
          <Header
            leftActionType="back"
            leftActionLabel="Return to Showcase"
            onLeftActionClick={handleNavigateBackToShowcase}
            showCenterText={false}
            isSticky={true}
          />
          <div className={styles.heroSection.divider} />
        </section>

        {/* 2. MAIN EDITORIAL & REGISTRY CONTENT SECTION */}
        <section className={styles.contentSection.layout}>
          {/* EDITORIAL CONTROL DECK HEADER */}
          <header className={styles.contentSection.header}>
            <div className="flex flex-row items-center justify-end w-full">
              {/* CONTROL DECK & POP-OVER CONTAINER */}
              <div className="relative shrink-0">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setIsFilterDeckOpen((prev) => !prev)}
                  className="relative inline-flex items-center gap-1 md:gap-1 cursor-pointer group rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 font-sans tracking-wide text-slate-800 px-4 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 text-[9px] md:text-[10px] lg:text-xs"
                  aria-expanded={isFilterDeckOpen}
                  aria-label="Toggle Filters & Sorting Control Deck"
                >
                  <span className="font-semibold text-slate-900">Filters</span>

                  {activeFiltersCount > 0 && (
                    <span className="flex items-center justify-center min-w-[18px] h-4.5 md:min-w-[20px] md:h-5 lg:min-w-[22px] lg:h-5.5 text-[9px] md:text-[10px] lg:text-xs font-bold bg-[#FF1F00] text-white rounded-full px-1.5 shadow-sm">
                      {activeFiltersCount}
                    </span>
                  )}

                  <Icon
                    name="chevron-down"
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] text-slate-500 transition-transform duration-300 ${
                      isFilterDeckOpen ? "rotate-180 text-[#FF1F00]" : ""
                    }`}
                  />
                </button>

                {/* FLOATING MENU POP-OVER PANEL */}
                <AnimatePresence>
                  {isFilterDeckOpen && (
                    <motion.div
                      ref={popoverRef}
                      variants={dropdownAnimationProps}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute right-0 top-full mt-3 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-3xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl shadow-black/10 p-5 sm:p-6 flex flex-col gap-5 text-slate-900"
                    >
                      {/* Quick Search inside Pop-over */}
                      <div className="relative flex items-center bg-slate-100/80 rounded-xl px-3.5 py-2.5 border border-black/5 focus-within:border-black/20 focus-within:bg-white focus-within:shadow-sm transition-all">
                        <Icon
                          name="search"
                          className="w-4 h-4 text-slate-400 mr-2.5 shrink-0"
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari musisi atau kata kunci..."
                          className="w-full bg-transparent text-xs sm:text-sm font-sans border-none outline-none text-slate-800 placeholder-slate-400"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="p-1 text-slate-400 hover:text-slate-800 rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Clear search"
                          >
                            <Icon name="x" className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* SORT BY YEAR SECTION */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                          SORT BY YEAR
                        </span>
                        <div className="flex flex-col gap-1">
                          {sortYearOptions.map((opt) => {
                            const isSelected = sortType === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSortType(opt.id)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all text-left cursor-pointer ${
                                  isSelected
                                    ? "bg-slate-900 text-white font-medium shadow-sm"
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <span>{opt.label}</span>
                                <Icon
                                  name={isSelected ? "check" : "circle"}
                                  className={`w-4 h-4 ${
                                    isSelected
                                      ? "text-[#FF1F00]"
                                      : "text-slate-300"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* SORT BY ALPHABET SECTION */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                          SORT BY ALPHABET
                        </span>
                        <div className="flex flex-col gap-1">
                          {sortAlphaOptions.map((opt) => {
                            const isSelected = sortType === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSortType(opt.id)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all text-left cursor-pointer ${
                                  isSelected
                                    ? "bg-slate-900 text-white font-medium shadow-sm"
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <span>{opt.label}</span>
                                <Icon
                                  name={isSelected ? "check" : "circle"}
                                  className={`w-4 h-4 ${
                                    isSelected
                                      ? "text-[#FF1F00]"
                                      : "text-slate-300"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* FILTER BY INITIAL LETTER GRID */}
                        <div className="pt-2">
                          <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-1.5 block">
                            FILTER BY INITIAL LETTER
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {alphabetOptions.map((letter) => {
                              const isSelected = selectedAlphabet === letter;
                              return (
                                <button
                                  key={letter}
                                  type="button"
                                  onClick={() => setSelectedAlphabet(letter)}
                                  className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center justify-center border ${
                                    isSelected
                                      ? "bg-[#FF1F00] text-white border-[#FF1F00] font-bold shadow-sm"
                                      : "bg-slate-100/80 text-slate-700 border-black/5 hover:bg-slate-200/70"
                                  }`}
                                >
                                  {letter}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* FILTER BY CATEGORY (BADGE GRID) */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
                          FILTER BY CATEGORY
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categoryOptions.map((cat) => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer border ${
                                  isSelected
                                    ? "bg-[#FF1F00] text-white border-[#FF1F00] shadow-sm font-semibold"
                                    : "bg-slate-100/80 text-slate-700 border-black/5 hover:bg-slate-200/70 hover:border-black/10"
                                }`}
                              >
                                {cat.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* RESET & STATUS FOOTER */}
                      {activeFiltersCount > 0 && (
                        <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleResetFilters}
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#FF1F00] transition-colors cursor-pointer"
                          >
                            <Icon name="rotate-ccw" className="w-3.5 h-3.5" />
                            <span>Reset All Filters</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* DYNAMIC CARD GRID & EMPTY STATE FALLBACK */}
          <main className={styles.contentSection.mainContent}>
            {filteredMusicians.length > 0 ? (
              /* Menggunakan Flexbox Wrapping + Justify Center agar baris terakhir simetris di tengah */
              <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
                {filteredMusicians.map(
                  (musician: MusicianData, index: number) => {
                    if (!musician) return null;
                    return (
                      /* Ukuran item disesuaikan presisi untuk 5 kolom pada screen besar (xl), tapi tetap responsif */
                      <div
                        key={musician.id || `musician-${index}`}
                        className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)] flex"
                      >
                        <MusicianCard
                          musician={musician}
                          index={index}
                          onClick={() => handleSelectMusician(musician)}
                        />
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className={styles.emptyState.container}>
                <Icon name="search-x" className={styles.emptyState.icon} />
                <h3 className={styles.emptyState.title}>
                  No archives found matching your query or active filters.
                </h3>
                <p className={styles.emptyState.subtitle}>
                  Try adjusting your search keywords, changing sorting options,
                  or resetting active filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-sans font-medium hover:bg-[#FF1F00] transition-colors cursor-pointer"
                >
                  Reset Filters & Sorting
                </button>
              </div>
            )}
          </main>
        </section>

        {/* DYNAMIC REUSABLE INFOMODAL */}
        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="THE ALL-ERA MAESTRO"
          badgeText="MALANG ARCHIVE"
          description="Etalase kolektif yang merekam jejak seluruh musisi dan maestro musik kota Malang. Dari era pionir legenda hingga gelombang modern, setiap rekam jejak terarsip lengkap di sini."
          primaryButtonText="START EXPLORE"
          onPrimaryClick={() => setIsInfoModalOpen(false)}
          showCloseIcon={false}
        />
      </div>
    </ErrorBoundary>
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
      "flex flex-col flex-1 h-full w-full overflow-hidden select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
    padding: SPACING.padding.sm,
  },
  heroSection: {
    layout:
      "flex-shrink-0 z-30 w-full flex flex-col bg-[#F6F4EE]/90 backdrop-blur-md",
    divider: "w-full border-b border-black/10",
  },
  contentSection: {
    layout:
      "flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 pt-4 pb-0 overflow-visible min-h-0 relative",
    header: "flex-shrink-0 w-full pb-4 border-b border-black/10 relative z-40",
    heroControls:
      "flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full items-start",
    badge:
      "text-[10px] sm:text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2 block",
    title:
      "text-slate-950 font-black not-italic font-display leading-none tracking-tight uppercase text-4xl sm:text-6xl",
    description:
      "text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal normal-case max-w-xl lg:max-w-2xl",
    mainContent:
      "flex-1 w-full overflow-y-auto custom-scrollbar py-6 min-h-0 relative z-10",
    grid: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 items-start",
  },
  searchSection: {
    wrapper:
      "w-full md:max-w-xs lg:max-w-sm relative flex items-center shrink-0",
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
