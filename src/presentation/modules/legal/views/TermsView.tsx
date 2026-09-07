import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/presentation/shared/components";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { FontService } from "@/infrastructure/services/FontService";
import { safeInitializeIcons } from "@/presentation/utils/dom";

export interface TermsViewProps {
  onToggleSidebar?: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onToggleSidebar }) => {
  useDocumentTitle("Syarat & Ketentuan - Museum Musik Indonesia");
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
              TERMS & CONDITIONS
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
              LEGAL & COMPLIANCE • REVISI 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-stone-900 tracking-tight leading-none">
            TERMS & CONDITIONS
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-mono text-stone-500 uppercase tracking-wider">
            Syarat Penggunaan & Ketentuan Pengunjung Eksibisi Digital Museum
            Musik Indonesia
          </p>
        </div>

        {/* Content Body */}
        <article className="space-y-6 sm:space-y-8 text-stone-800 text-sm font-sans leading-relaxed">
          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i
                data-lucide="shield-check"
                className="w-5 h-5 text-[#FF1F00]"
              />
              1. Ketentuan Umum Eksibisi
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Seluruh materi kurasi, pita kaset digital, arsip musik, dan
              rekaman yang ditampilkan dalam platform ini merupakan hak kekayaan
              intelektual milik Museum Musik Indonesia (MMI) dan para pencipta
              karya terkait. Akses diberikan semata-mata untuk keperluan
              edukasi, pelestarian sejarah, dan apresiasi seni budaya.
            </p>
          </section>

          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i data-lucide="disc" className="w-5 h-5 text-[#FF1F00]" />
              2. Penggunaan Kiosk Digital & Pembatasan Rekaman
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Pengunjung diperkenankan mendengarkan pratinjau audio dan
              menjelajahi linimasa sejarah secara interaktif melalui antarmuka
              Kiosk galeri. Dilarang keras merekam ulang secara komersial,
              meretas aliran audio, mendistribusikan tanpa izin, atau
              mengekstrak hak milik intelektual dalam bentuk apapun.
            </p>
          </section>

          <section className="bg-white/60 p-6 rounded-2xl border border-black/5">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2.5">
              <i data-lucide="book-open" className="w-5 h-5 text-[#FF1F00]" />
              3. Lisensi Akses Materi Edukasi
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Penggunaan materi biografi musisi, foto arsip fisik, dan
              dokumentasi sejarah untuk keperluan riset ilmiah atau liputan
              jurnalistik harus mencantumkan atribusi resmi:{" "}
              <strong>
                "Museum Musik Indonesia — Sound of Malang Digital Archive"
              </strong>
              .
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

export default TermsView;
