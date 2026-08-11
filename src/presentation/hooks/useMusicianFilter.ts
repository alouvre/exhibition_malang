import { useState, useMemo } from "react";
import { MusicianData } from "../data/musiciansRegistry";

export type SortType = "oldest" | "newest" | "a-z" | "z-a";

export interface UseMusicianFilterReturn {
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedAlphabet: string;
  setSelectedAlphabet: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredMusicians: MusicianData[];
  activeFiltersCount: number;
  handleResetFilters: () => void;
}

/**
 * Extracts starting year from year string (e.g., "1950S - 1980S" => 1950, "1970s" => 1970).
 * Safely defaults to 9999 if the argument is null, undefined, or non-string.
 */
export const getStartingYear = (yearStr?: string): number => {
  if (!yearStr || typeof yearStr !== "string") return 9999;
  const match = yearStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 9999;
};

/**
 * Custom hook for state management & multi-parameter reactive filtering.
 * Manages sort order (defaulting to "oldest"), category genre filtering,
 * alphabet initial letter filtering, and text search query intersection.
 */
export const useMusicianFilter = (
  musicians: MusicianData[]
): UseMusicianFilterReturn => {
  const [sortType, setSortType] = useState<SortType>("oldest");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMusicians = useMemo(() => {
    let result = [...(musicians ?? [])];

    // 1. Search Query Intersection
    const normalizedQuery = (searchQuery ?? "").trim().toLowerCase();
    if (normalizedQuery) {
      result = result.filter((musician: MusicianData) => {
        if (!musician) return false;
        const stageNameMatches = (musician.name ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        const realNameProperty =
          (musician as MusicianData & { realName?: string }).realName?.toLowerCase() ?? "";
        const realNameMatches = realNameProperty.includes(normalizedQuery);
        const biographyMatches = (musician.biography ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        const genreMatches = (musician.genre ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        return (
          stageNameMatches ||
          realNameMatches ||
          biographyMatches ||
          genreMatches
        );
      });
    }

    // 2. Flexible & Case-Insensitive Category/Genre Filter
    if (selectedCategory && selectedCategory !== "ALL") {
      result = result.filter((musician: MusicianData) => {
        if (!musician) return false;
        return (musician.genre ?? "")
          .toUpperCase()
          .includes(selectedCategory.toUpperCase());
      });
    }

    // 3. Alphabet Initial Letter Filter (Case-Insensitive)
    if (selectedAlphabet && selectedAlphabet !== "ALL") {
      result = result.filter((musician: MusicianData) => {
        if (!musician) return false;
        return (musician.name ?? "")
          .trim()
          .toUpperCase()
          .startsWith(selectedAlphabet.toUpperCase());
      });
    }

    // 4. Dual Sorting Logic (Year & Alphabetical)
    if (sortType === "oldest") {
      result.sort((a, b) => getStartingYear(a?.year) - getStartingYear(b?.year));
    } else if (sortType === "newest") {
      result.sort((a, b) => getStartingYear(b?.year) - getStartingYear(a?.year));
    } else if (sortType === "a-z") {
      result.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""));
    } else if (sortType === "z-a") {
      result.sort((a, b) => (b?.name ?? "").localeCompare(a?.name ?? ""));
    }

    return result;
  }, [musicians, searchQuery, selectedCategory, selectedAlphabet, sortType]);

  // Active filter count calculator (excluding "oldest" default sort)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (sortType !== "oldest") count++;
    if (selectedCategory !== "ALL") count++;
    if (selectedAlphabet !== "ALL") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [sortType, selectedCategory, selectedAlphabet, searchQuery]);

  const handleResetFilters = (): void => {
    setSortType("oldest");
    setSelectedCategory("ALL");
    setSelectedAlphabet("ALL");
    setSearchQuery("");
  };

  return {
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
  };
};

export default useMusicianFilter;
