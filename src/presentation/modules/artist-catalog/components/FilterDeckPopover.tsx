import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/infrastructure/services/IconService";
import { SortType } from "../hooks/useMusicianFilter";

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

const dropdownAnimationProps = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
  transition: { type: "spring", stiffness: 450, damping: 30 },
};

interface FilterDeckPopoverProps {
  isFilterDeckOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  sortType: SortType;
  setSortType: (type: SortType) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFiltersCount: number;
  handleResetFilters: () => void;
  onToggleDeck: () => void;
}

export const FilterDeckPopover: React.FC<FilterDeckPopoverProps> = ({
  isFilterDeckOpen,
  triggerRef,
  popoverRef,
  sortType,
  setSortType,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  activeFiltersCount,
  handleResetFilters,
  onToggleDeck,
}) => {
  return (
    <div className="relative shrink-0 self-end sm:self-auto">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggleDeck}
        className="relative inline-flex items-center gap-1 md:gap-1 cursor-pointer group rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 font-sans tracking-wide text-slate-800 px-4 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 text-[9px] md:text-[10px] lg:text-xs"
        aria-expanded={isFilterDeckOpen}
        aria-label="Toggle Filters & Sorting Control Deck"
      >
        <span className="font-semibold text-slate-900">Filters</span>

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
  );
};

export default FilterDeckPopover;
