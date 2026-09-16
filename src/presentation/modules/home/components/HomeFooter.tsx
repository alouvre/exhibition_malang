import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFontRole } from "@/infrastructure/services/FontService";

export interface SocialModalData {
  platform: string;
  title: string;
  handle: string;
  url: string;
  qrUrl: string;
}

export const HomeFooter: React.FC = () => {
  const [socialModal, setSocialModal] = useState<SocialModalData | null>(null);
  const fontHeader = useFontRole("HERO_TITLE");
  const fontBadge = useFontRole("BADGE_TAG");
  const fontBody = useFontRole("BODY_TEXT");

  return (
    <>
      <footer
        id="footer-section"
        className={`relative w-full bg-[#161513] text-[#F6F4EE] pt-12 pb-18 px-4 sm:px-8 lg:px-12 border-t border-black/20 select-none ${fontBody}`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 items-stretch">
          {/* KARTU 1: BRAND */}
          <div className="md:col-span-6 lg:col-span-5 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group">
            {/* <div className="flex items-center justify-between mb-12 z-10">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full bg-white/10 text-gallery-red text-xs font-bold tracking-widest uppercase ${fontBadge}`}
                >
                  2026®
                </span>
                <span className="text-[11px] font-sans text-stone-400 tracking-wider">
                  UNESCO MEDIA ARTS
                </span>
              </div>
            </div> */}

            <div className="mb-8 z-10">
              <h2
                className={`${fontHeader} text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-white`}
              >
                MUSEUM
                <br />
                MUSIK
                <br />
                INDONESIA
              </h2>
              <p className="mt-6 text-xs font-mono text-stone-300 leading-relaxed tracking-wide uppercase max-w-sm">
                Jl. Soekarno Hatta Indah IV No.18, Mojolangu, Kec. Lowokwaru,
                Kota Malang, Jawa Timur 65142
              </p>
              {/* <p className="mr-8 text-[12px] font-mono text-stone-400 leading-relaxed tracking-tight uppercase">
                Jl. Soekarno Hatta Indah IV No.18, Mojolangu, Kec. Lowokwaru,
                Kota Malang, Jawa Timur 65142
              </p> */}
            </div>

            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gallery-red/5 blur-3xl pointer-events-none" />

            <div className="pt-3">
              <div className="group relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-white/10 bg-[#080808]">
                {/* MAP */}
                <iframe
                  title="Lokasi Museum Musik Indonesia"
                  src="https://maps.google.com/maps?q=Museum+Musik+Indonesia+Gedung+Kesenian+Gajayana+Malang&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="
      absolute inset-0
      w-full h-full
      border-0
      pointer-events-none
      scale-[2]
      filter
      invert-[0.9]
      hue-rotate-180
      contrast-[1.15]
      grayscale-[0.3]
      opacity-70
      transition-all duration-700 ease-out
      group-hover:scale-[1.07]
      group-hover:opacity-90
    "
                  loading="lazy"
                />

                {/* DARK ATMOSPHERE */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/10 to-black/30" />

                {/* TECH GRID */}
                <div
                  className="
      absolute inset-0 pointer-events-none opacity-[0.12]
      bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
      bg-[size:32px_32px]
      mask-[linear-gradient(to_bottom,transparent,black_45%,black)]
    "
                />

                {/* TOP HUD */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-[9px] font-sans font-bold uppercase tracking-[0.22em] text-white/80">
                      LOCATION
                    </span> */}
                  </div>

                  <span className="text-[9px] font-mono tracking-wider text-white/40">
                    08°00′S / 112°37′E
                  </span>
                </div>

                {/* CENTER CROSSHAIR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-12 h-12">
                    {/* Crosshair */}
                    <div className="absolute left-1/2 top-0 w-px h-3 bg-white/50 -translate-x-1/2" />
                    <div className="absolute left-1/2 bottom-0 w-px h-3 bg-white/50 -translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 h-px w-3 bg-white/50 -translate-y-1/2" />
                    <div className="absolute top-1/2 right-0 h-px w-3 bg-white/50 -translate-y-1/2" />

                    <div className="absolute inset-[15px] rounded-full border border-gallery-red/80">
                      <div className="absolute inset-[4px] rounded-full bg-gallery-red shadow-[0_0_18px_rgba(255,60,60,0.7)]" />
                    </div>
                  </div>
                </div>

                {/* LOCATION INFO */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-[9px] sm:text-base font-sans font-medium tracking-tight text-white">
                      Art Museum
                    </h3>

                    <p className="text-sm text-white/50 mt-0.5">
                      10.00 AM – 4.00 PM
                    </p>
                  </div>

                  {/* OPEN MAP */}
                  <a
                    href="https://maps.google.com/?q=Museum+Musik+Indonesia+Gedung+Kesenian+Gajayana+Malang"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buka navigasi di Google Maps"
                    className="
        shrink-0
        group/map
        flex items-center gap-2
        px-3 py-2
        rounded-lg
        border border-white/15
        bg-black/60
        backdrop-blur-md
        text-[9px]
        font-bold
        uppercase
        tracking-[0.15em]
        text-white/80
        transition-all duration-300
        hover:border-gallery-red/60
        hover:bg-gallery-red
        hover:text-white
      "
                  >
                    <span>OPEN MAP</span>

                    <span className="text-sm leading-none transition-transform duration-300 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </div>

                {/* CORNER ACCENTS */}
                {/* <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gallery-red/60 pointer-events-none" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gallery-red/60 pointer-events-none" /> */}
              </div>
            </div>
          </div>

          {/* KARTU 2: NAVIGASI */}
          <div className="md:col-span-6 lg:col-span-4 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4 col-span-2 sm:col-span-1">
                <span className="text-[12px] font-sans font-bold uppercase tracking-wider text-gallery-red block">
                  MAIN MENU
                </span>
                <ul className="space-y-2 text-sm font-mono uppercase text-stone-300">
                  <li>
                    <a
                      href="#hero-section"
                      className="hover:text-white transition-colors"
                    >
                      HOME
                    </a>
                  </li>
                  <li>
                    <a
                      href="/extended-archive"
                      className="hover:text-white transition-colors flex items-center gap-1"
                    >
                      CATALOG{" "}
                      <span className="text-[9px] text-gallery-red">(12)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      ABOUT MMI
                    </a>
                  </li>
                  <li>
                    <Link
                      // to="/help-center"
                      to="#"
                      className="hover:text-white transition-colors"
                    >
                      HELP CENTER
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 col-span-2 sm:col-span-1">
                <span className="text-[12px] font-sans font-bold uppercase tracking-wider text-gallery-red block">
                  Legal
                </span>
                <ul className="space-y-2 text-sm font-mono uppercase text-stone-300">
                  <li>
                    <Link
                      // to="/terms-conditions"
                      to="#"
                      className="hover:text-white transition-colors"
                    >
                      TERMS & CONDITION
                    </Link>
                  </li>
                  <li>
                    <Link
                      // to="/privacy-policy"
                      to="#"
                      className="hover:text-white transition-colors"
                    >
                      PRIVACY POLICY
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* KARTU 3: INSTITUTIONAL & MEDIA PARTNERS */}
          <div className="md:col-span-6 lg:col-span-3 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md">
            <div className="flex flex-col">
              {/* Header Label */}
              <div className="mb-1">
                <span className="text-[12px] font-sans font-bold uppercase tracking-[0.14em] text-gallery-red">
                  COLLABORATION PARTNERS
                </span>
              </div>

              {/* Partners */}
              <div className="flex flex-col">
                {/* PRIMARY INSTITUTIONAL PARTNER */}
                <div className="h-14 sm:h-16 flex items-center justify-center">
                  <img
                    src="/assets/Primary_Horizontal-Logo.png"
                    alt="Kemendiktisaintek RI"
                    className="
            max-h-10 sm:max-h-11
            max-w-[58%]
            w-auto
            object-contain
            bg-white
            px-4
            py-2
            rounded-full
          "
                  />
                </div>

                {/* COLLABORATION PARTNERS */}
                <div className="grid grid-cols-2">
                  {/* BINUS */}
                  <div className="h-16 sm:h-[68px] flex items-center justify-center pr-3">
                    <img
                      src="/assets/BINUS University Logo - Black - 3427x2048 - zonalogo.com.png"
                      alt="BINUS University"
                      className="
              max-h-10 sm:max-h-11
              max-w-[90%]
              w-auto
              object-contain
              opacity-90
              bg-white
            px-3
            py-1
            rounded-full
            "
                    />
                  </div>

                  {/* MUSEUM MUSIK INDONESIA */}
                  <div className="h-16 sm:h-[68px] flex items-center justify-center pl-3">
                    <img
                      src="/assets/LOGOMMI.webp"
                      alt="Museum Musik Indonesia"
                      className="
              max-h-10 sm:max-h-11
              max-w-[90%]
              w-auto
              object-contain
              opacity-90
              bg-white
              px-3
              py-[-2]
              rounded-full
            "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-FOOTER */}
        <div className="pt-8 mt-6 px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-5 border-t border-white/5">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            {/* Instagram Trigger */}
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  platform: "instagram",
                  title: "OFFICIAL INSTAGRAM ACCOUNT",
                  handle: "@museummusikindonesia",
                  url: "https://www.instagram.com/museummusikindonesia/",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.instagram.com/museummusikindonesia/")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-gallery-red text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="Instagram QR"
              title="Instagram MMI"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </button>

            {/* TikTok Trigger */}
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  platform: "tiktok",
                  title: "OFFICIAL TIKTOK ACCOUNT",
                  handle: "@museummusikindonesia",
                  url: "https://www.tiktok.com/@museummusikindonesia",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.tiktok.com/@museummusikindonesia")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-gallery-red text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="TikTok QR"
              title="TikTok MMI"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </button>

            {/* YouTube Trigger */}
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  platform: "youtube",
                  title: "OFFICIAL YOUTUBE ACCOUNT",
                  handle: "@museummusikindonesia7485",
                  url: "https://www.youtube.com/@museummusikindonesia7485",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.youtube.com/@museummusikindonesia7485")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-gallery-red text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="YouTube Channel MMI"
              title="YouTube MMI"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9 10 15" />
              </svg>
            </button>

            {/* LinkedIn Trigger */}
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  platform: "linkedin",
                  title: "OFFICIAL LINKEDIN ACCOUNT",
                  handle: "@museum-musik-indonesia",
                  url: "https://www.linkedin.com/company/museum-musik-indonesia",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.linkedin.com/company/museum-musik-indonesia")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-gallery-red text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="LinkedIn QR"
              title="LinkedIn MMI"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </button>

            {/* Web Trigger */}
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  platform: "web",
                  title: "OFFICIAL WEBSITE MMI",
                  handle: "",
                  url: "https://museummusikindonesia.id",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://museummusikindonesia.id")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-gallery-red text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="Website Resmi MMI"
              title="Website Resmi MMI"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left ">
            <span className="text-[10px] font-sans text-stone-100 uppercase tracking-widest font-bold">
              2026© MUSEUM MUSIK INDONESIA
            </span>
            <span className="hidden sm:inline-block text-stone-600 text-[10px]">
              •
            </span>
            <span className="text-[10px] font-sans text-stone-400 uppercase tracking-wider">
              ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </footer>

      {/* QR MODAL */}
      {socialModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSocialModal(null)}
        >
          <div
            className="relative w-full max-w-sm bg-[#1C1A17] text-[#F6F4EE] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col items-center text-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSocialModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-2 mt-4">
              <span className="text-[14px] font-mono tracking-[0.2em] text-gallery-red uppercase font-bold">
                {socialModal.title}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {socialModal.handle}
              </h3>
            </div>

            <div className="w-56 h-56 rounded-lg bg-white p-3 shadow-inner flex items-center justify-center border border-stone-200">
              <img
                src={socialModal.qrUrl}
                alt={`${socialModal.platform} QR Code`}
                className="w-full h-full object-contain rounded-lg select-none"
              />
            </div>

            <p className="text-sm font-mono text-stone-400 uppercase tracking-wider">
              Pindai QR code atau <br /> buka link resmi di bawah
            </p>

            <div className="flex items-center gap-3 w-full pt-1">
              {/* <button
                type="button"
                onClick={() => setSocialModal(null)}
                className="flex-1 py-2.5 rounded-full border border-white/15 text-stone-300 text-xs font-mono font-bold tracking-wider hover:bg-white/10 transition-colors uppercase cursor-pointer"
              >
                Tutup
              </button> */}
              <a
                href={socialModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-full bg-gallery-red hover:bg-[#D61A00] text-white text-xs font-mono font-bold tracking-wider transition-colors uppercase text-center cursor-pointer shadow-md"
              >
                Buka Link ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeFooter;
