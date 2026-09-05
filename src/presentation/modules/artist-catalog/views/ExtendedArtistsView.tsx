import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InfoModal } from "@/presentation/components/InfoModal";
import { musiciansRegistry, MusicianData } from "@/presentation/data/musiciansRegistry";
import { safeInitializeIcons } from "@/presentation/utils/dom";
import { Icon } from "@/infrastructure/services/IconService";
import { FontService } from "@/infrastructure/services/FontService";
import { ErrorBoundary } from "@/presentation/components/ErrorBoundary";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, SPACING, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { useMusicianFilter } from "../hooks/useMusicianFilter";
import { FilterDeckPopover } from "../components/FilterDeckPopover";
import { CatalogGrid } from "../components/CatalogGrid";

/**
 * Helper utility to resolve a URL-friendly slug for a musician.
 */
const getMusicianSlug = (musician?: MusicianData): string => {
  if (!musician) return "";
  return (
    musician.slug ||
    musician.id ||
    (musician.name ? musician.name.toLowerCase().replace(/\s+/g, "-") : "")
  );
};

/**
 * ExtendedArtistsView Component
 *
 * Page orchestrator for full catalog registry. Bound to useMusicianFilter hook,
 * location.state parameters, and decomposed FilterDeckPopover / CatalogGrid components.
 */
export const ExtendedArtistsView: React.FC = () => {
  useDocumentTitle("Katalog Arsip Musisi - Sound of Malang");
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

  const fontService = FontService.getInstance();
  const fontBadge = fontService.getFontClass("BADGE_TAG");

  const handleNavigateBackToShowcase = (): void => {
    navigate("/#showcase-icons");
  };

  const handleSelectMusician = (musician: MusicianData): void => {
    if (!musician) return;
    const slug = getMusicianSlug(musician);
    navigate(`/musician/${slug}`, { state: { musician, from: "extended" } });
  };

  return (
    <ErrorBoundary onReset={handleResetFilters}>
      <div className={styles.container}>
        {/* MAIN EDITORIAL & REGISTRY CONTENT SECTION */}
        <section className={styles.contentSection.layout}>
          {/* EDITORIAL CONTROL DECK HEADER */}
          <header className={styles.contentSection.header}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
              {/* Inline Return to Showcase Capsule Button */}
              <button
                type="button"
                onClick={handleNavigateBackToShowcase}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-zinc-900 border border-zinc-200/80 shadow-sm backdrop-blur-md transition-all duration-200 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] cursor-pointer group self-start sm:self-auto"
                aria-label="Return to Showcase"
              >
                <Icon
                  name="arrow-up-left"
                  className="w-4 h-4 text-stone-600 group-hover:text-[#FF1F00] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
                <span className={`text-xs ${fontBadge}`}>Return to Showcase</span>
              </button>

              {/* Decomposed FilterDeckPopover Component */}
              <FilterDeckPopover
                isFilterDeckOpen={isFilterDeckOpen}
                triggerRef={triggerRef}
                popoverRef={popoverRef}
                sortType={sortType}
                setSortType={setSortType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeFiltersCount={activeFiltersCount}
                handleResetFilters={handleResetFilters}
                onToggleDeck={() => setIsFilterDeckOpen((prev) => !prev)}
              />
            </div>
          </header>

          {/* Decomposed CatalogGrid Component */}
          <CatalogGrid
            filteredMusicians={filteredMusicians}
            onSelectMusician={handleSelectMusician}
            onResetFilters={handleResetFilters}
          />
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

const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full w-full overflow-hidden select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
    padding: SPACING.padding.sm,
  },
  contentSection: {
    layout:
      "flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 pt-4 pb-0 overflow-visible min-h-0 relative",
    header: "flex-shrink-0 w-full pb-4 border-b border-black/10 relative z-40",
  },
});

export default ExtendedArtistsView;
