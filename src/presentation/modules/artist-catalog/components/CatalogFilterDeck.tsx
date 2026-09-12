import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { SortType } from "../hooks/useArtistCatalogFilter";

export interface SortOption {
  id: SortType;
  label: string;
}

export const DEFAULT_SORT_YEAR_OPTIONS: SortOption[] = [
  { id: "oldest", label: "Oldest First" },
  { id: "newest", label: "Newest First" },
];

export const DEFAULT_SORT_ALPHA_OPTIONS: SortOption[] = [
  { id: "a-z", label: "A to Z" },
  { id: "z-a", label: "Z to A" },
];

export interface CategoryOption {
  id: string;
  label: string;
}

export const DEFAULT_CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "ALL", label: "ALL CATEGORIES" },
  { id: "ROCK", label: "ROCK ORIGINATOR" },
  { id: "POP", label: "POP & ELECTRONIC" },
];

export interface CatalogFilterDeckProps {
  isFilterDeckOpen: boolean;
  activeFiltersCount: number;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortType: SortType;
  setSortType: (type: SortType) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortYearOptions?: SortOption[];
  sortAlphaOptions?: SortOption[];
  categoryOptions?: CategoryOption[];
  onToggleDeck: () => void;
  onResetFilters: () => void;
  dropdownAnimationProps?: Variants;
}

export const CatalogFilterDeck: React.FC<CatalogFilterDeckProps> = ({
  isFilterDeckOpen,
  activeFiltersCount,
  triggerRef,
  popoverRef,
  searchQuery,
  setSearchQuery,
  sortType,
  setSortType,
  selectedCategory,
  setSelectedCategory,
  sortYearOptions = DEFAULT_SORT_YEAR_OPTIONS,
  sortAlphaOptions = DEFAULT_SORT_ALPHA_OPTIONS,
  categoryOptions = DEFAULT_CATEGORY_OPTIONS,
  onToggleDeck,
  onResetFilters,
  dropdownAnimationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  } as Variants,
}) => {
  const badgeTagClass = useFontRole("BADGE_TAG");
  const bodyTextClass = useFontRole("BODY_TEXT");

  return (
    <div className="relative shrink-0 self-end sm:self-auto">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggleDeck}
        className={`relative inline-flex items-center gap-1.5 cursor-pointer group rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 tracking-wide text-slate-800 px-4 py-2 text-[9px] md:text-[10px] lg:text-xs ${badgeTagClass}`}
        aria-expanded={isFilterDeckOpen}
        aria-label="Toggle Filters & Sorting Control Deck"
      >
        <span className="font-semibold text-slate-900">Filters & Sorting</span>
        {activeFiltersCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-[#CD001F] text-white text-[10px] font-bold">
            {activeFiltersCount}
          </span>
        )}
        <Icon
          name="chevron-down"
          className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] text-slate-500 transition-transform duration-300 ${
            isFilterDeckOpen ? "rotate-180 text-[#CD001F]" : ""
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
                className={`w-full bg-transparent text-xs sm:text-sm border-none outline-none text-slate-800 placeholder-slate-400 ${bodyTextClass}`}
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
              <span className={`text-[10px] font-bold tracking-widest text-[#CD001F] uppercase ${badgeTagClass}`}>
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-left cursor-pointer ${bodyTextClass} ${
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
                            ? "text-[#CD001F]"
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
              <span className={`text-[10px] font-bold tracking-widest text-[#CD001F] uppercase ${badgeTagClass}`}>
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-left cursor-pointer ${bodyTextClass} ${
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
                            ? "text-[#CD001F]"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FILTER BY CATEGORY (BADGE GRID) */}
            <div className="flex flex-col gap-2">
              <span className={`text-[10px] font-bold tracking-widest text-[#CD001F] uppercase ${badgeTagClass}`}>
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${badgeTagClass} ${
                        isSelected
                          ? "bg-[#CD001F] text-white border-[#CD001F] shadow-sm font-semibold"
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
                  onClick={onResetFilters}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#CD001F] transition-colors cursor-pointer"
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
  );
};

export default CatalogFilterDeck;
