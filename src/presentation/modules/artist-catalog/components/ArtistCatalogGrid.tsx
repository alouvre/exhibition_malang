import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { MusicianCard } from "@/presentation/shared/components/MusicianCard";
import { Musician } from "@/domain/models";
import { StyleSheet } from "@/presentation/utils/stylesheet";

export interface ArtistCatalogGridProps {
  filteredMusicians: Musician[];
  onSelectMusician: (musician: Musician) => void;
  onResetFilters: () => void;
}

export const ArtistCatalogGrid: React.FC<ArtistCatalogGridProps> = ({
  filteredMusicians,
  onSelectMusician,
  onResetFilters,
}) => {
  const sectionHeaderClass = useFontRole("SECTION_HEADER");
  const bodyTextClass = useFontRole("BODY_TEXT");

  return (
    <main className={styles.mainContent}>
      {filteredMusicians.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4 lg:gap-6 max-w-7xl mx-auto items-stretch">
          {filteredMusicians.map((musician: Musician, index: number) => {
            if (!musician) return null;
            return (
              <div
                key={musician.id || `musician-${index}`}
                className="w-full flex"
              >
                <MusicianCard
                  musician={musician}
                  index={index}
                  onClick={() => onSelectMusician(musician)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyStateContainer}>
          <Icon name="search-x" className={styles.emptyStateIcon} />
          <h3 className={`${styles.emptyStateTitle} ${sectionHeaderClass}`}>
            No archives found matching your query or active filters.
          </h3>
          <p className={`${styles.emptyStateSubtitle} ${bodyTextClass}`}>
            Try adjusting your search keywords, changing sorting options,
            or resetting active filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className={`mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-[#CD001F] transition-colors cursor-pointer ${bodyTextClass}`}
          >
            Reset Filters & Sorting
          </button>
        </div>
      )}
    </main>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    layout:
      "flex-1 w-full overflow-y-auto custom-scrollbar py-6 min-h-0 relative z-10",
  },
  emptyStateContainer: {
    layout:
      "w-full py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-black/10 mt-8 bg-white/30 backdrop-blur-sm",
  },
  emptyStateIcon: {
    layout: "w-8 h-8 text-slate-400 mb-3 stroke-1",
  },
  emptyStateTitle: {
    layout:
      "text-sm font-medium text-slate-800 uppercase tracking-widest mb-1",
  },
  emptyStateSubtitle: {
    layout:
      "text-xs text-slate-500 max-w-md font-light leading-relaxed",
  },
});

export default ArtistCatalogGrid;
