import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InfoModal, ErrorBoundary } from "@/presentation/shared/components";
import { musiciansRegistry } from "@/presentation/data/musiciansRegistry";
import { Musician } from "@/domain/models";
import { safeInitializeIcons } from "@/presentation/utils/dom";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { useArtistCatalogFilter } from "../hooks/useArtistCatalogFilter";
import { CatalogFilterDeck } from "../components/CatalogFilterDeck";
import { ArtistCatalogGrid } from "../components/ArtistCatalogGrid";

const getMusicianSlug = (musician?: Musician): string => {
  if (!musician) return "";
  return (
    musician.slug ||
    musician.id ||
    (musician.name ? musician.name.toLowerCase().replace(/\s+/g, "-") : "")
  );
};

export const ArtistCatalogView: React.FC = () => {
  useDocumentTitle("Katalog Arsip Musisi - Sound of Malang");
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { showInfoModal?: boolean } | null;

  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isFilterDeckOpen, setIsFilterDeckOpen] = useState<boolean>(false);

  useEffect(() => {
    if (locationState?.showInfoModal) {
      setIsInfoModalOpen(true);
    }
  }, [locationState]);

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
  } = useArtistCatalogFilter(musiciansRegistry);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFilterDeckOpen) {
        setIsFilterDeckOpen(false);
      }
    };

    if (isFilterDeckOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterDeckOpen]);

  const fontBadge = useFontRole("BADGE_TAG");

  const handleNavigateBackToShowcase = (): void => {
    navigate("/#showcase-icons");
  };

  const handleSelectMusician = (musician: Musician): void => {
    if (!musician) return;
    const slug = getMusicianSlug(musician);
    navigate(`/musician/${slug}`, { state: { musician, from: "extended" } });
  };

  return (
    <ErrorBoundary onReset={handleResetFilters}>
      {/* ROOT CONTAINER: Menangani edge-to-edge scroll tanpa padding */}
      <div className={styles.container}>
        {/* HEADER WRAPPER: Full width dengan background sticky */}
        <div className={styles.headerWrapper.layout}>
          {/* HEADER INNER: Batasan lebar (max-w) agar isi tetap sejajar dengan grid */}
          <header className={styles.contentBoundary.layout}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full py-4">
              <button
                type="button"
                onClick={handleNavigateBackToShowcase}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-zinc-900 border border-zinc-200/80 shadow-sm backdrop-blur-md transition-all duration-200 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] cursor-pointer group self-start sm:self-auto"
                aria-label="Return to Showcase"
              >
                <Icon
                  name="arrow-up-left"
                  className="w-4 h-4 text-stone-600 group-hover:text-[#CD001F] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
                <span className={`text-xs ${fontBadge}`}>
                  Return to Showcase
                </span>
              </button>

              <CatalogFilterDeck
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
                onResetFilters={handleResetFilters}
                onToggleDeck={() => setIsFilterDeckOpen((prev) => !prev)}
              />
            </div>
          </header>
        </div>

        {/* MAIN GRID SECTION */}
        <section className="flex-1 w-full">
          {/* GRID INNER: Batasan lebar diaplikasikan di dalam, bukan di pembungkus scroll */}
          <div className={`${styles.contentBoundary.layout} pt-6 pb-20`}>
            <ArtistCatalogGrid
              filteredMusicians={filteredMusicians}
              onSelectMusician={handleSelectMusician}
              onResetFilters={handleResetFilters}
            />
          </div>
        </section>

        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="THE ALL-ERA MAESTRO"
          badgeText="MALANG ARCHIVE"
          description="Etalase kolektif yang merekam jejak seluruh musisi dan maestro musik Malang Raya. Dari era pionir legenda hingga gelombang modern, setiap rekam jejak terarsip lengkap di sini."
          primaryButtonText="START EXPLORE"
          onPrimaryClick={() => setIsInfoModalOpen(false)}
          showCloseIcon={false}
        />
      </div>
    </ErrorBoundary>
  );
};

// STRUKTUR STYLES YANG DIPERBARUI
const styles = StyleSheet.create({
  container: {
    // Diubah menjadi h-screen dan overflow-y-auto agar scrollbar berada di paling ujung layar
    layout:
      "flex flex-col h-screen w-full overflow-y-auto overflow-x-hidden select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-slate-900",
  },
  headerWrapper: {
    layout:
      "w-full flex-shrink-0 sticky top-0 z-40 border-b border-black/10 bg-[#FBFBF9]/95 backdrop-blur-md",
  },
  contentBoundary: {
    // Memindahkan px-6 dan max-w ke dalam elemen inner
    layout: "w-full max-w-7xl mx-auto px-6 md:px-12",
  },
});

export default ArtistCatalogView;
