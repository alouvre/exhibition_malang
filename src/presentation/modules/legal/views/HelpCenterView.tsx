import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/presentation/shared/components";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { FontService } from "@/infrastructure/services/FontService";
import { safeInitializeIcons } from "@/presentation/utils/dom";

export interface HelpCenterViewProps {
  onToggleSidebar?: () => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({
  onToggleSidebar,
}) => {
  useDocumentTitle("Pusat Bantuan - Museum Musik Indonesia");
  const navigate = useNavigate();

  const fontService = FontService.getInstance();
  const fontBadge = fontService.getFontClass("BADGE_TAG");

  useEffect(() => {
    safeInitializeIcons();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className={styles.container}>
      <Header leftActionType="menu" onLeftActionClick={onToggleSidebar} />

      <main className="flex-1 overflow-y-auto max-w-4xl mx-auto px-6 py-8 sm:py-12 md:py-16 w-full">
        {/* Editorial Breadcrumb & Navigation Deck */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-between gap-4 pb-6 border-b border-black/10 mb-8"
        >
          <ol className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase">
            <li>
              <Link
                to="/"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                HOME
              </Link>
            </li>
            <li className="text-stone-300 select-none">/</li>
            <li className="text-stone-900 font-bold" aria-current="page">
              HELP CENTER
            </li>
          </ol>

          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white/40 hover:bg-stone-900 hover:text-white transition-all duration-200 text-[10px] font-mono tracking-widest uppercase cursor-pointer"
          >
            <i
              data-lucide="arrow-left"
              className="w-3.5 h-3.5 text-stone-500 group-hover:text-white transition-colors"
            />
            <span>BACK</span>
          </button>
        </nav>

        {/* Header Title Section */}
        <div className="border-b border-black/10 pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF1F00]" />
            <span
              className={`text-xs text-stone-500 uppercase tracking-widest ${fontBadge}`}
            >
              HELP CENTER • PANDUAN OPERASIONAL & SUPPORT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-stone-900 tracking-tight leading-none">
            HELP CENTER
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-mono text-stone-500 uppercase tracking-wider">
            Panduan Interaksi Kiosk, Pemutar Audio & Dukungan Teknis Galeri
          </p>
        </div>

        {/* Operational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/80 p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FF1F00]/10 flex items-center justify-center mb-4 text-[#FF1F00]">
                <i data-lucide="sliders" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase mb-2">
                Mode Kiosk Fullscreen
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tekan tombol gerigi pengaturan di bilah navigasi samping
                (Sidebar) lalu pilih menu "Fullscreen" untuk menyesuaikan rasio
                tampilan penuh pada monitor layar sentuh galeri.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 text-[10px] font-mono text-stone-400 uppercase">
              Operational Guideline • Staff & Kiosk
            </div>
          </div>

          <div className="bg-white/80 p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FF1F00]/10 flex items-center justify-center mb-4 text-[#FF1F00]">
                <i data-lucide="disc" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase mb-2">
                Pemutar Audio & Turntable
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tekan piringan hitam pada halaman utama atau tombol "PLAY
                DISCOGRAPHY" pada halaman profil maestro untuk mengaktifkan
                pemutar audio vinyl interaktif.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 text-[10px] font-mono text-stone-400 uppercase">
              Audio Engine • YouTube Stream
            </div>
          </div>

          <div className="bg-white/80 p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FF1F00]/10 flex items-center justify-center mb-4 text-[#FF1F00]">
                <i data-lucide="phone" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase mb-2">
                Bantuan & Kontak Teknis
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Jika mengalami masalah pemutaran audio atau memerlukan bantuan
                pemandu galeri, silakan hubungi staf kurator Museum Musik
                Indonesia di lokasi eksibisi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 text-[10px] font-mono text-stone-400 uppercase">
              Contact MMI Staff • Support Desk
            </div>
          </div>
        </div>

        {/* Technical Support Information Card */}
        <section className="bg-[#161513] text-[#F6F4EE] p-8 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#FF1F00] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                DIRECT TECHNICAL SUPPORT
              </span>
              <h2 className="text-xl font-bold text-white uppercase mt-3 tracking-tight">
                Museum Musik Indonesia (MMI) Support Desk
              </h2>
              <p className="text-xs font-mono text-stone-400 uppercase mt-1">
                Jl. Soekarno Hatta Indah IV No.18, Mojolangu, Kec. Lowokwaru,
                Kota Malang, Jawa Timur 65142
              </p>
            </div>
            <a
              href="https://museummusikindonesia.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 hover:bg-[#FF1F00] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shrink-0"
            >
              Kunjungi Web MMI ↗
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout:
      "w-full h-full flex flex-col select-none animate-fade-in " +
      COLORS.canvasBg,
  },
});

export default HelpCenterView;
