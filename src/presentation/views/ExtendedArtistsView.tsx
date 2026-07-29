import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { MusicianCard } from "../components/MusicianCard";
import { musiciansRegistry, MusicianData } from "../data/musiciansRegistry";
// import { showGlobalToast } from "../utils/toast";
import { safeInitializeIcons } from "../utils/dom";

export const ExtendedArtistsView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToMain = () => {
    // showGlobalToast("Returning to Main Exhibition Showcase");
    navigate("/#showcase-icons");
  };

  const handleMusicianClick = (musician: MusicianData) => {
    const slugName =
      musician.slug ||
      musician.id ||
      musician.name.toLowerCase().replace(/\s+/g, "-");
    // showGlobalToast(`Curated Archive: ${musician.name} (${musician.year})`);
    navigate(`/musician/${slugName}`, { state: { musician, from: "extended" } });
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-y-auto select-none min-h-screen bg-[#F6F4EE] text-slate-900">
      {/* 1. NATIVE HEADER COMPONENT (Positioned at the Very Top) */}
      <Header
        leftActionType="back"
        leftActionLabel="Return to Showcase"
        onLeftActionClick={handleBackToMain}
        showCenterText={false}
      />
      <div className="w-full border-b border-black/10" />

      {/* 2. STARK PAPER CANVAS CONTAINER FLUID LAYOUT */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-20 flex flex-col gap-12">
        {/* EDITORIAL SECTION TITLE BLOCK */}
        <header className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FF1F00] uppercase font-sans mb-2 block">
            THE COMPREHENSIVE REGISTRY
          </span>
          <h1 className="text-slate-950 font-black not-italic font-display leading-none tracking-tight uppercase text-4xl sm:text-6xl">
            EXTENDED ARCHIVE
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal normal-case mt-4 max-w-2xl">
            Katalog kuratorial lengkap musisi dan maestro musik kota Malang dari
            berbagai era, merayakan dedikasi dan warisan karya kebudayaan di
            Music Gallery Vision.
          </p>
        </header>

        {/* 3. DYNAMIC CARD GRID (Consuming musiciansRegistry Data) */}
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 items-start mt-8">
            {(musiciansRegistry ?? []).map(
              (musician: MusicianData, index: number) => (
                <MusicianCard
                  key={musician.id || index}
                  musician={musician}
                  index={index}
                  onClick={() => handleMusicianClick(musician)}
                />
              ),
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExtendedArtistsView;
