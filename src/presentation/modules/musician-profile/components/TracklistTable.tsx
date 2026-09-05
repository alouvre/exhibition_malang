import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/infrastructure/services/IconService";
import { MusicianData, TrackCatalogItem } from "@/presentation/data/musiciansRegistry";
import { ActiveTrackData } from "@/presentation/context/AudioPlayerContext";

interface TracklistTableProps {
  musician: MusicianData;
  targetSlug: string;
  activeTrack: ActiveTrackData | null;
  hasValidMedia: boolean;
  onPlayTrack: (
    track: TrackCatalogItem,
    artistName: string,
    artistSlug: string,
    artistImage?: string,
  ) => void;
}

export const TracklistTable: React.FC<TracklistTableProps> = ({
  musician,
  targetSlug,
  activeTrack,
  hasValidMedia,
  onPlayTrack,
}) => {
  // State to toggle catalog card collapse/expand
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return Boolean(activeTrack && activeTrack.artistSlug === targetSlug);
  });

  // Ref to store auto-collapse timer
  const autoCollapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
    };
  }, []);

  const handleTrackSelect = (track: TrackCatalogItem) => {
    onPlayTrack(track, musician.name, targetSlug, musician.image);

    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
    }

    autoCollapseTimerRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);
  };

  const handleToggleTracklist = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
    }
    setIsCollapsed((prev) => !prev);
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="mr-auto ml-0 mb-2 sm:mb-4 w-full max-w-[calc(100vw-24px)] sm:max-w-sm pointer-events-auto flex flex-col bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl p-3.5 sm:p-5 shadow-2xl shadow-black/90 transition-all duration-300"
    >
      {/* Card Header: Title, YouTube CTA & Minimize Toggle */}
      <div className="flex items-center justify-between gap-2.5 pb-2.5 border-b border-white/15">
        <div className="flex flex-col gap-0.5 min-w-0">
          {/* Sub-header: Musician Name • Active Track Title */}
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans truncate">
            {musician.name.toUpperCase()} •{" "}
            {(
              activeTrack?.title ||
              musician.album ||
              "TRACK"
            ).toUpperCase()}
          </span>

          {/* Dynamic Main Title: "NOW PLAYING" when collapsed, "THE TRACKLIST" when expanded */}
          <h3 className="text-base sm:text-lg font-black uppercase text-white font-sans tracking-tight truncate transition-all duration-300">
            {isCollapsed ? "NOW PLAYING" : "THE TRACKLIST"}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* YouTube Icon Only Button */}
          {hasValidMedia && activeTrack?.youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${activeTrack.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FF1F00] hover:bg-[#D61A00] text-white flex items-center justify-center transition-all shadow-md shadow-[#FF1F00]/30 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title="Tonton di YouTube"
              aria-label="Tonton di YouTube"
            >
              <svg
                className="w-4.5 h-4.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          )}

          {/* Minimize / Expand Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTracklist}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all cursor-pointer flex items-center justify-center border border-white/10 shrink-0"
            title={isCollapsed ? "Expand Catalog" : "Minimize Catalog"}
            aria-label={
              isCollapsed ? "Expand Catalog" : "Minimize Catalog"
            }
          >
            <Icon
              name="chevron-down"
              className={`w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Collapsible Tracklist Table */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 max-h-[30vh] sm:max-h-[36vh] overflow-y-auto custom-scrollbar flex flex-col divide-y divide-white/10 pr-1">
              {musician.catalog.map((track, idx) => {
                const isSelected = activeTrack?.number === track.number;
                return (
                  <div
                    key={track.number || idx}
                    role="button"
                    tabIndex={0}
                    aria-selected={isSelected}
                    onClick={() => handleTrackSelect(track)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleTrackSelect(track);
                      }
                    }}
                    className={`py-2 px-2.5 flex items-center justify-between gap-2.5 rounded-xl transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-white/15 text-white border-l-2 border-[#FF1F00] font-bold pl-3"
                        : "hover:bg-white/5 text-stone-300 hover:text-white"
                    }`}
                  >
                    <span
                      className={`font-mono font-bold text-[10px] sm:text-xs w-5 shrink-0 transition-colors ${
                        isSelected ? "text-[#FF1F00]" : "text-stone-400"
                      }`}
                    >
                      {track.number}
                    </span>
                    <div className="flex-1 flex flex-col min-w-0">
                      <span
                        className={`text-[11px] sm:text-xs font-sans tracking-wide uppercase truncate ${
                          isSelected
                            ? "font-black text-white"
                            : "font-semibold text-stone-200"
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-medium text-stone-400 font-sans uppercase truncate">
                        {track.album}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-bold font-mono shrink-0 ${
                        isSelected ? "text-[#FF1F00]" : "text-stone-400"
                      }`}
                    >
                      {track.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TracklistTable;
