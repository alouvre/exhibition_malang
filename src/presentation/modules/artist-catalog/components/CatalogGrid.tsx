import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { MusicianCard } from "@/presentation/shared/components/MusicianCard";
import { MusicianData } from "@/presentation/data/musiciansRegistry";
import { StyleSheet } from "@/presentation/utils/stylesheet";

interface CatalogGridProps {
  filteredMusicians: MusicianData[];
  onSelectMusician: (musician: MusicianData) => void;
  onResetFilters: () => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  filteredMusicians,
  onSelectMusician,
  onResetFilters,
}) => {
  return (
    <main className={styles.mainContent}>
      {filteredMusicians.length > 0 ? (
        <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {filteredMusicians.map(
            (musician: MusicianData, index: number) => {
              if (!musician) return null;
              return (
                <div
                  key={musician.id || `musician-${index}`}
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)] flex"
                >
                  <MusicianCard
                    musician={musician}
                    index={index}
                    onClick={() => onSelectMusician(musician)}
                  />
                </div>
              );
            },
          )}
        </div>
      ) : (
        <div className={styles.emptyStateContainer}>
          <Icon name="search-x" className={styles.emptyStateIcon} />
          <h3 className={styles.emptyStateTitle}>
            No archives found matching your query or active filters.
          </h3>
          <p className={styles.emptyStateSubtitle}>
            Try adjusting your search keywords, changing sorting options,
            or resetting active filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-sans font-medium hover:bg-[#FF1F00] transition-colors cursor-pointer"
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
      "text-sm font-sans font-medium text-slate-800 uppercase tracking-widest mb-1",
  },
  emptyStateSubtitle: {
    layout:
      "text-xs font-sans text-slate-500 max-w-md font-light leading-relaxed",
  },
});

export default CatalogGrid;
