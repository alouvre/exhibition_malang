import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TrackCatalogItem } from "../data/musiciansRegistry";
import { Icon } from "../../infrastructure/services/IconService";

export interface ActiveTrackData extends TrackCatalogItem {
  artistName: string;
  artistSlug: string;
  artistImage?: string;
}

export interface AudioPlayerContextType {
  activeTrack: ActiveTrackData | null;
  isPlaying: boolean;
  isMinimized: boolean;
  playTrack: (
    track: TrackCatalogItem,
    artistName: string,
    artistSlug: string,
    artistImage?: string,
  ) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  togglePlay: () => void;
  stopTrack: () => void;
  setIsMinimized: (minimized: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTrack, setActiveTrack] = useState<ActiveTrackData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const playTrack = (
    track: TrackCatalogItem,
    artistName: string,
    artistSlug: string,
    artistImage?: string,
  ) => {
    setActiveTrack((prev) => {
      // Prevent state mutation if track and artist slug are identical
      if (
        prev?.youtubeId === track.youtubeId &&
        prev?.artistSlug === artistSlug
      ) {
        return prev;
      }
      return {
        ...track,
        artistName,
        artistSlug,
        artistImage,
      };
    });
    setIsPlaying(true);
    setIsMinimized(false);
  };

  const pauseTrack = () => setIsPlaying(false);
  const resumeTrack = () => setIsPlaying(true);
  const togglePlay = () => setIsPlaying((prev) => !prev);
  const stopTrack = () => {
    setActiveTrack(null);
    setIsPlaying(false);
  };

  // Route detection for active musician views
  const pathname = location.pathname;

  // 1. Discography Page: /musician/:slug/discography
  const isDiscographyPage = /^\/musician\/[^/]+\/discography\/?$/.test(
    pathname,
  );

  // 2. Musician Biography / Detail Page: /musician/:slug
  const isMusicianDetailPage = /^\/musician\/[^/]+\/?$/.test(pathname);

  // 3. Allowed active routes for player
  const isMusicianSection = isDiscographyPage || isMusicianDetailPage;

  // Auto-stop media playback when leaving musician pages
  useEffect(() => {
    if (!isMusicianSection && activeTrack) {
      stopTrack();
    }
  }, [isMusicianSection, activeTrack]);

  const hasMedia = Boolean(
    activeTrack?.youtubeId && activeTrack.youtubeId.trim() !== "",
  );

  // Stable YouTube embed URL string (Only changes when activeTrack.youtubeId changes)
  const iframeSrc = hasMedia
    ? `https://www.youtube.com/embed/${activeTrack!.youtubeId}?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0&playsinline=1&cc_load_policy=0&iv_load_policy=3`
    : undefined;

  return (
    <AudioPlayerContext.Provider
      value={{
        activeTrack,
        isPlaying,
        isMinimized,
        playTrack,
        pauseTrack,
        resumeTrack,
        togglePlay,
        stopTrack,
        setIsMinimized,
      }}
    >
      {children}

      {/* SINGLE PERSISTENT YOUTUBE PLAYER CONTAINER (STRICTLY ONE IFRAME AT ROOT - KEEP MOUNTED FOR CONTINUOUS AUDIO) */}
      <div
        id="persistent-player-wrapper"
        className={`transition-all duration-300 ${
          isDiscographyPage && activeTrack && hasMedia
            ? "fixed top-[57px] sm:top-[73px] left-0 right-0 h-[calc(100vh-177px)] z-10 pointer-events-auto bg-black overflow-hidden"
            : "fixed -top-[9999px] left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        }`}
      >
        {hasMedia && (
          <div className="relative w-full h-full flex-1 bg-black">
            <iframe
              id="persistent-youtube-player"
              src={iframeSrc}
              title={activeTrack?.title || "Audio Player"}
              className="w-full h-full object-cover border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            {isDiscographyPage && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10" />
            )}
          </div>
        )}
      </div>

      {/* COMPACT AUDIO BAR / PILL UI IN BIOGRAPHY VIEW */}
      {isMusicianDetailPage && activeTrack && hasMedia && (
        <aside
          aria-label="Now Playing Audio Bar"
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-20 z-50 flex items-center gap-6 bg-neutral-950/90 text-white backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/15 shadow-2xl transition-all select-none"
        >
          {/* Animated Audio Equalizer Wave / Indicator */}
          <div className="flex items-center gap-0.5 h-4 shrink-0">
            <span
              className={`w-1 h-full bg-[#FF1F00] rounded-full transition-all ${
                isPlaying ? "animate-[pulse_1s_infinite]" : "opacity-40"
              }`}
            />
            <span
              className={`w-1 h-2/3 bg-[#FF1F00] rounded-full transition-all ${
                isPlaying ? "animate-[pulse_1s_infinite_75ms]" : "opacity-40"
              }`}
            />
            <span
              className={`w-1 h-4/5 bg-[#FF1F00] rounded-full transition-all ${
                isPlaying ? "animate-[pulse_1s_infinite_150ms]" : "opacity-40"
              }`}
            />
          </div>

          {/* Metadata */}
          <div className="flex flex-col text-left max-w-[160px] sm:max-w-[240px] min-w-0">
            <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 truncate">
              Now Playing - {activeTrack.artistName}
            </span>
            <span className="text-md font-semibold text-white truncate">
              {activeTrack.title}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/15 shrink-0">
            {/* <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
            >
              <Icon name={isPlaying ? "pause" : "play"} className="w-4 h-4" />
            </button> */}
            <button
              type="button"
              onClick={() =>
                navigate(`/musician/${activeTrack.artistSlug}/discography`)
              }
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
              aria-label="Ke Diskografi"
              title="Ke Diskografi"
            >
              <Icon name="arrow-up-right" className="w-5 h-5" />
            </button>
            {/* <button
              type="button"
              onClick={stopTrack}
              className="p-1 hover:text-[#FF1F00] text-neutral-400 transition-colors cursor-pointer"
              aria-label="Stop audio"
              title="Stop playback"
            >
              <Icon name="x" className="w-5 h-5" />
            </button> */}
          </div>
        </aside>
      )}
    </AudioPlayerContext.Provider>
  );
};
