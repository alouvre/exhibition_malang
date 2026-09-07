import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/presentation/shared/components";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { FontService } from "@/infrastructure/services/FontService";
import { safeInitializeIcons } from "@/presentation/utils/dom";

export interface PrivacyViewProps {
  onToggleSidebar?: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({
  onToggleSidebar,
}) => {
  useDocumentTitle("Kebijakan Privasi - Museum Musik Indonesia");
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
              PRIVACY POLICY
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
              PRIVACY POLICY • MMI DIGITAL ARCHIVE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-stone-900 tracking-tight leading-none">
            PRIVACY POLICY
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-mono text-stone-500 uppercase tracking-wider">
            Kebijakan Perlindungan Data & Transparansi Pengunjung Galeri
          </p>
        </div>

        {/* Disclosure Cards */}
        <article className="space-y-6 sm:space-y-8 text-stone-800 text-sm font-sans leading-relaxed">
          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i data-lucide="hard-drive" className="w-5 h-5 text-[#FF1F00]" />
              1. Penggunaan LocalStorage & Kiosk Session State
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Platform eksibisi ini hanya menyimpan preferensi sesi lokal di
              peramban (seperti status penyelesaian tur pemandu{" "}
              <em>Onboarding Coachmark</em>, preferensi pemutar audio, serta
              mode fallback seluler). Data ini disimpan secara lokal di
              perangkat Anda tanpa melacak identitas pribadi.
            </p>
          </section>

          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i data-lucide="lock" className="w-5 h-5 text-[#FF1F00]" />
              2. Ketiadaan Transmisi Data Pihak Ketiga
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Museum Musik Indonesia berkomitmen penuh menjaga privasi
              pengunjung. Aplikasi tidak mengumpulkan, menjual, atau
              mentransmisikan data analitik lokasi maupun data rekaman pribadi
              ke pelacak komersial pihak ketiga.
            </p>
          </section>

          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i data-lucide="shield" className="w-5 h-5 text-[#FF1F00]" />
              3. Keamanan Data Pengunjung Galeri
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Sistem Kiosk galeri dirancang berjalan secara terisolasi dengan
              standar keamanan tinggi. Pengunjung dapat menikmati antarmuka
              eksibisi interaktif secara aman tanpa perlu melakukan pendaftaran
              akun atau memasukkan informasi sensitif.
            </p>
          </section>
        </article>
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

export default PrivacyView;
