import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/infrastructure/services/IconService";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { useFontRole } from "@/infrastructure/services/FontService";

export const NotFoundView: React.FC = () => {
  useDocumentTitle("Halaman Tidak Ditemukan (404)");
  const navigate = useNavigate();

  const badgeTagClass = useFontRole("BADGE_TAG");
  const heroTitleClass = useFontRole("HERO_TITLE");
  const bodyTextClass = useFontRole("BODY_TEXT");

  return (
    <div className="w-full min-h-screen bg-[#F6F4EE] flex flex-col items-center justify-center p-6 text-stone-900 select-none">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        {/* Archival Badge */}
        <span className={`px-4 py-1 rounded-full bg-stone-200 text-stone-600 text-xs font-semibold tracking-widest uppercase ${badgeTagClass}`}>
          ERROR 404 &bull; ARSIP TIDAK DITEMUKAN
        </span>

        {/* Big Editorial Headline */}
        <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight ${heroTitleClass}`}>
          Eksibisi Tidak Ditemukan
        </h1>

        {/* Description */}
        <p className={`text-sm sm:text-base text-stone-600 leading-relaxed ${bodyTextClass}`}>
          Maaf, arsip musisi atau halaman eksibisi yang Anda cari tidak terdaftar dalam koleksi digital Museum Musik Indonesia.
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className={`mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[#FF1F00] hover:bg-[#D61A00] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 ${bodyTextClass}`}
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          Kembali ke Beranda Gallery
        </button>
      </div>
    </div>
  );
};

export default NotFoundView;
