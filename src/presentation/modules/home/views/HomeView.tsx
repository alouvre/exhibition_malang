import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  safeInitializeIcons,
  injectStylesheet,
} from "@/presentation/utils/dom";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { OverlayNavbar } from "@/presentation/shared/components";
import { MusicianIcon } from "@/presentation/shared/components/MusicianCard";
import { musiciansRegistry } from "@/presentation/data/musiciansRegistry";
import { FontService } from "@/infrastructure/services/FontService";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { VinylHero } from "../components/VinylHero";
import { ShowcaseSection } from "../components/ShowcaseSection";

interface TimelineEra {
  decade: string;
  category: string;
  artists: string;
}

interface HomeViewProps {
  onToggleSidebar?: () => void;
  onSelectMusician?: (musician: MusicianIcon) => void;
  onHeroVisibilityChange?: (isVisible: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onToggleSidebar,
  onSelectMusician,
  onHeroVisibilityChange,
}) => {
  useDocumentTitle("Beranda Gallery - Sound of Malang");
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  const [socialModal, setSocialModal] = useState<{
    platform: "instagram" | "tiktok";
    title: string;
    handle: string;
    url: string;
    qrUrl: string;
  } | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSocialModal(null);
      }
    };
    if (socialModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [socialModal]);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleStartJourney = () => {
    iconsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 1. Reset Hash & Scroll Secara Instan saat Mount / Refresh
  useLayoutEffect(() => {
    // Inject editorial typography fonts dynamically on mount
    injectStylesheet(
      "gallery-fonts",
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Poppins:ital,wght@0,300..900;1,300..900&family=Outfit:wght@300;400;500;600;700;800;900&family=Pinyon+Script&display=swap",
    );

    // Safely initialize Lucide icons
    safeInitializeIcons();

    // Matikan perilaku auto-scroll bawaan browser saat refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Bersihkan hash sekunder langsung dari address bar tanpa reload
    if (window.location.hash) {
      const cleanUrl =
        window.location.origin +
        window.location.pathname +
        window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }

    // Paksa scroll kembali ke paling atas (Hero Section) secara instan
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Reset state hero & coachmark
    setIsHeroVisible(true);
  }, []);

  // 2. Hero Section Visibility Observer for Onboarding Coachmark
  useEffect(() => {
    const heroElement =
      document.getElementById("hero-section") ||
      document.querySelector("section");
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Coachmark is active only if hero section is at least 40% visible in viewport
        const visible = entry.isIntersecting;
        setIsHeroVisible(visible);
        if (onHeroVisibilityChange) {
          onHeroVisibilityChange(visible);
        }
      },
      {
        root: containerRef.current || null,
        threshold: 0.4,
      },
    );

    observer.observe(heroElement);
    return () => {
      observer.disconnect();
      if (onHeroVisibilityChange) {
        onHeroVisibilityChange(false);
      }
    };
  }, [onHeroVisibilityChange]);

  // 3. Sinkronkan URL Hash dengan Posisi Scroll Nyata (Scroll Spy)
  useEffect(() => {
    const handleScrollHashSync = () => {
      const container = containerRef.current;
      const scrollY = container ? container.scrollTop : window.scrollY;
      const cleanUrl =
        window.location.origin +
        window.location.pathname +
        window.location.search;

      // Jika berada di area Hero (0 - 300px dari atas)
      if (scrollY < 300) {
        if (
          window.location.hash !== "" &&
          window.location.hash !== "#hero-section"
        ) {
          window.history.replaceState(null, "", cleanUrl);
        }
        return;
      }

      // Deteksi seksi yang sedang aktif saat scroll
      const sections = [
        { id: "showcase-icons", el: document.getElementById("showcase-icons") },
        {
          id: "timeline-section",
          el: document.getElementById("timeline-section"),
        },
        { id: "footer-section", el: document.getElementById("footer-section") },
      ];

      for (const sec of sections) {
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight * 0.4 &&
            rect.bottom >= window.innerHeight * 0.2
          ) {
            const targetHash = `#${sec.id}`;
            if (window.location.hash !== targetHash) {
              window.history.replaceState(null, "", targetHash);
            }
            break;
          }
        }
      }
    };

    const container = containerRef.current;
    window.addEventListener("scroll", handleScrollHashSync, { passive: true });
    if (container) {
      container.addEventListener("scroll", handleScrollHashSync, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScrollHashSync);
      if (container) {
        container.removeEventListener("scroll", handleScrollHashSync);
      }
    };
  }, []);

  const handleMenuClick = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    } else {
      const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
      if (sidebarToggleBtn) {
        sidebarToggleBtn.click();
      }
    }
  };

  const handleMusicianClick = (musician: MusicianIcon) => {
    const slugName = musician.name.toLowerCase().replace(/\s+/g, "-");
    if (onSelectMusician) {
      onSelectMusician(musician);
    }
    navigate(`/musician/${slugName}`, { state: { musician, from: "home" } });
  };

  // 🏛️ Navigation Gateway Action Handler to Extended Roster / Archive Exhibition
  const handleExploreExtendedArchive = () => {
    navigate("/extended-archive", { state: { showInfoModal: true } });
  };

  const handleTimelineClick = (_decade: string, _category: string) => {};

  const musicians: MusicianIcon[] = musiciansRegistry;
  const totalMaestros = musicians?.length || 0;

  const timelineEras: TimelineEra[] = [
    {
      decade: "1970s",
      category: "THE RISE OF ROCK",
      artists: "AKSA, RHYTHM KINGS",
    },
    {
      decade: "1980s",
      category: "GOLDEN POP ERA",
      artists: "CHRISYE, FARIZ RM",
    },
    {
      decade: "1990s",
      category: "INDIE & ALTERNATIVE",
      artists: "ELANG, STRETH",
    },
    {
      decade: "2010s",
      category: "MODERN RENAISSANCE",
      artists: "BAL FRAM, TWIN",
    },
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 1. HERO SECTION Component */}
      <VinylHero
        isHeroVisible={isHeroVisible}
        onMenuClick={handleMenuClick}
        onStartJourney={handleStartJourney}
      />

      {/* REUSABLE FLOATING BOTTOM OVERLAY NAVBAR (NO ICONS) */}
      <OverlayNavbar />

      {/* 2. ICONS SECTION Component */}
      <ShowcaseSection
        sectionRef={iconsSectionRef}
        totalMaestros={totalMaestros}
        musicians={musicians}
        onExploreExtendedArchive={handleExploreExtendedArchive}
        onMusicianClick={handleMusicianClick}
      />

      {/* 3. TIMELINE SECTION */}
      <section id="timeline-section" className={styles.timelineSection.layout}>
        <div className={styles.timelineSection.headerGroup}>
          <span className={styles.timelineSection.subtitle}>
            CULTURAL TIMELINE
          </span>
          <h2 className={styles.timelineSection.title}>
            THE EVOLUTION OF MALANG MUSIC
          </h2>
        </div>

        <div className={styles.timelineSection.table}>
          {(timelineEras ?? []).map((era, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => handleTimelineClick(era.decade, era.category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTimelineClick(era.decade, era.category);
                }
              }}
              className={styles.timelineSection.row}
            >
              <span className={styles.timelineSection.decade}>
                {era.decade}
              </span>
              <div className={styles.timelineSection.details}>
                <div className="flex items-center gap-3 justify-end">
                  <div className="hidden group-hover:flex items-center gap-0.5 h-3">
                    <div className="w-0.5 h-full bg-[#FF1F00] animate-[pulse_1s_infinite]" />
                    <div className="w-0.5 h-[70%] bg-[#FF1F00] animate-[pulse_1s_infinite_75ms]" />
                    <div className="w-0.5 h-[85%] bg-[#FF1F00] animate-[pulse_1s_infinite_150ms]" />
                  </div>
                  <span className={styles.timelineSection.category}>
                    {era.category}
                  </span>
                </div>
                <span className={styles.timelineSection.artists}>
                  {era.artists}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER SECTION — BENTO CARD MEGA-FOOTER */}
      <footer
        id="footer-section"
        className="relative w-full bg-[#161513] text-[#F6F4EE] pt-12 pb-18 px-4 sm:px-8 lg:px-12 border-t border-black/20 font-sans select-none"
      >
        {/* Layer Kontainer Bento Utama */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 items-stretch">
          {/* ==============================================================
              KARTU 1 (KIRI ATAS): IDENTITAS BRAND BESAR & GENRE PILLS
              ============================================================== */}
          <div className="md:col-span-6 lg:col-span-5 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group">
            {/* Header Badge Logo & Tahun */}
            <div className="flex items-center justify-between mb-12 z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#FF1F00] text-xs font-mono font-bold tracking-widest uppercase">
                  2026®
                </span>
                <span className="text-[11px] font-mono text-stone-400 tracking-wider">
                  UNESCO MEDIA ARTS
                </span>
              </div>
              {/* Top Action Pill (Mirip tombol 'VOTE NOW ↗') */}
              {/* <div className="flex justify-end">
                <a
                  href="#showcase-icons"
                  className="group inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black border border-white/10 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span className="text-xs font-mono font-black tracking-wider uppercase">
                    EXPLORE
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white text-black group-hover:bg-black group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                    ↗
                  </div>
                </a>
              </div> */}
              {/* <div className="w-8 h-8 rounded-full bg-stone-800 border border-white/10 flex items-center justify-center text-xs font-mono text-stone-300">
                MMI
              </div> */}
            </div>

            {/* Tipografi Brand Raksasa (Swiss Bold Style) */}
            <div className="mb-10 z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                MUSEUM
                <br />
                MUSIK
                <br />
                INDONESIA®
              </h2>
              <p className="mt-6 text-xs font-mono text-stone-400 leading-relaxed uppercase max-w-sm">
                Kurasi arsip & apresiasi sejarah musik terbesar di Jawa Timur.
                Merayakan satu abad Stadion Gajayana & Kota Musik Malang.
              </p>
            </div>

            {/* Tag Filter Pil Kategori (Genre Pill Deck) */}
            {/* <div className="z-10 pt-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-3.5 py-1.5 rounded-full bg-black text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm">
                  ROCK
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white text-stone-900 text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm">
                  POP
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-[11px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer">
                  KERONTJONG
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm">
                  DANGDUT
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-[11px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer">
                  JAZZ
                </span>
                <span className="px-3 py-1.5 rounded-full border border-dashed border-white/30 text-stone-400 text-[11px] font-mono tracking-wider">
                  +20 ERA
                </span>
              </div>
            </div> */}

            {/* Ornamen Latar Belakang Lingkaran Halus */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#FF1F00]/5 blur-3xl pointer-events-none" />
          </div>

          {/* ==============================================================
              KARTU 2 (TENGAH): MENU NAVIGASI DECK 3 KOLOM
              ============================================================== */}
          <div className="md:col-span-6 lg:col-span-3 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Kolom Menu 1: Main Menu */}
              <div className="space-y-4 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF1F00] block">
                  MAIN MENU
                </span>
                <ul className="space-y-2 text-xs font-mono uppercase text-stone-300">
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
                      <span className="text-[9px] text-[#FF1F00]">(12)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#showcase-icons"
                      className="hover:text-white transition-colors"
                    >
                      LEGENDS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      ABOUT US
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kolom Menu 2: Events / Pameran */}
              {/* <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF1F00] block">
                  EVENTS
                </span>
                <ul className="space-y-2 text-xs font-mono uppercase text-stone-300">
                  <li>
                    <span className="text-stone-400">EXPO MBOIS</span>
                  </li>
                  <li>
                    <span className="text-stone-400">MUSIC SUMMIT</span>
                  </li>
                  <li>
                    <span className="text-stone-400">COMMUNITY</span>
                  </li>
                  <li>
                    <span className="text-stone-400">PREMIERE</span>
                  </li>
                  <li>
                    <span className="text-stone-400">CEREMONY</span>
                  </li>
                </ul>
              </div> */}

              {/* Kolom Menu 3: Info & Bantuan */}
              <div className="space-y-4 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF1F00] block">
                  HELP
                </span>
                <ul className="space-y-2 text-xs font-mono uppercase text-stone-300">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      TERMS & CONDITION
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      PRIVACY POLICY
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      HELP CENTER
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ==============================================================
              KARTU 3 (KANAN): CTA PILL, LIVE COUNTDOWN & SOCIAL DOCK
              ============================================================== */}
          <div className="md:col-span-6 lg:col-span-4 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between">
            {/* Museum Location & Hours (Swiss Minimalist Data Block) */}
            <div className="rounded-2xl flex flex-col justify-between gap-4">
              {/* Primary Address Block */}
              <div className="flex flex-col gap-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] sm:text-[13px] font-mono font-bold text-white tracking-tight uppercase">
                    Gedung Kesenian Gajayana
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    LT. 2
                  </span>
                </div>
                <p className="mr-12 text-[11px] font-mono text-stone-400 leading-relaxed tracking-tight uppercase">
                  Jl. Nusakambangan No. 19, Klojen, Kota Malang, Jawa Timur
                  65117
                </p>
              </div>

              {/* Interactive Dark Preview Map */}
              <div className="pt-3">
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10 bg-black group">
                  <iframe
                    title="Lokasi Museum Musik Indonesia"
                    src="https://maps.google.com/maps?q=Museum+Musik+Indonesia+Gedung+Kesenian+Gajayana+Malang&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 pointer-events-none filter invert-[0.9] hue-rotate-180 contrast-[1.1] grayscale-[0.25] opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />

                  {/* Minimalist Floating Click-Out Trigger */}
                  {/* <a
                    href="https://maps.google.com/?q=Museum+Musik+Indonesia+Gedung+Kesenian+Gajayana+Malang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-end justify-between p-2.5 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"
                    aria-label="Buka navigasi di Google Maps"
                  >
                    <span className="text-[9px] font-mono tracking-widest text-stone-200 uppercase bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      BUKA PETA LENGKAP
                    </span>
                    <span className="text-xs font-mono text-white bg-black/60 w-5 h-5 flex items-center justify-center rounded border border-white/10 backdrop-blur-sm group-hover:border-[#FF1F00] group-hover:text-[#FF1F00] transition-colors">
                      ↗
                    </span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer Deck: Copyright & Social Media Dock */}
        <div className="pt-8 mt-6 pr-10 pl-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Sisi Kanan: Deretan Tombol Sosial Media Lingkaran */}
          <div className="flex items-center gap-2">
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
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF1F00] text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
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
                  title: "OFFICIAL TIKTOK",
                  handle: "@museummusikindonesia",
                  url: "https://www.tiktok.com/@museummusikindonesia",
                  qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.tiktok.com/@museummusikindonesia")}`,
                })
              }
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF1F00] text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
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

            {/* Web / Globe Icon */}
            <a
              href="https://museummusikindonesia.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF1F00] text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
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
            </a>

            {/* YouTube Icon */}
            <a
              href="https://www.youtube.com/@museummusikindonesia7485"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF1F00] text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
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
            </a>
          </div>
          {/* Sisi Kiri: Copyright & Identitas Lokasi Arsip */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
              2026© MUSEUM MUSIK INDONESIA
            </span>
            <span className="hidden sm:inline-block text-stone-600 text-[10px]">
              •
            </span>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-stone-900",
  },
  timelineSection: {
    layout:
      "px-10 sm:px-12 md:px-20 py-[clamp(8rem,18vh,16rem)] border-b border-black/10 flex flex-col gap-12 bg-[#F6F4EE]",
    headerGroup: "flex flex-col items-start text-left pl-6 gap-2",
    subtitle:
      "text-[10px] font-bold tracking-widest text-stone-400 uppercase text-left tracking-[0.2em] " +
      FontService.getInstance().getFontClass("BADGE_TAG"),
    title:
      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-stone-950 uppercase text-left leading-[0.9] max-w-3xl " +
      FontService.getInstance().getFontClass("SECTION_HEADER"),
    table:
      "flex flex-col divide-y divide-black/10 mt-6 max-w-7xl mx-auto w-full border-t border-b border-black/10",
    row: "py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-stone-900/[0.02] px-4 transition-colors duration-300 ease-out cursor-pointer",
    decade:
      "text-3xl md:text-4xl font-black italic text-stone-300 group-hover:text-black transition-colors duration-300 tracking-tight " +
      FontService.getInstance().getFontClass("SECTION_HEADER"),
    details: "flex flex-col text-left sm:text-right gap-0.5",
    category:
      "text-sm md:text-base font-black tracking-wider text-stone-900 uppercase transition-colors duration-300 group-hover:text-[#FF1F00] " +
      FontService.getInstance().getFontClass("CARD_NAME"),
    artists:
      "text-[10px] md:text-xs font-medium tracking-widest text-stone-400 uppercase " +
      FontService.getInstance().getFontClass("BODY_TEXT"),
  },
  footerSection: {
    layout:
      "px-6 sm:px-12 md:px-16 pt-[clamp(6rem,12vh,12rem)] border-t border-black/10 bg-[#F6F4EE] relative overflow-hidden min-h-[480px] flex flex-col justify-between",
    gridContainer:
      "w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start z-10",
    brandBlock: "flex flex-col gap-4 max-w-md",
    brandTitle:
      "text-lg font-black tracking-widest uppercase text-stone-950 leading-none " +
      FontService.getInstance().getFontClass("SECTION_HEADER"),
    brandText:
      "text-[10px] md:text-xs text-stone-500 leading-relaxed uppercase tracking-widest leading-none" +
      FontService.getInstance().getFontClass("BODY_TEXT"),
    detailsBlock: "flex flex-col gap-4 w-full ml-100",
    subtitle:
      "text-[10px] font-bold tracking-widest " +
      COLORS.primaryText +
      " uppercase tracking-[0.15em] " +
      FontService.getInstance().getFontClass("BADGE_TAG"),
    table:
      "flex flex-col divide-y divide-black/10 border-t border-b border-black/10 text-[11px] w-full " +
      FontService.getInstance().getFontClass("BODY_TEXT"),
    tableRow:
      "py-3 flex justify-between items-center gap-6 transition-colors hover:bg-black/[0.01] px-1",
    tableLabel:
      "font-medium text-stone-600 uppercase tracking-wider " +
      FontService.getInstance().getFontClass("BADGE_TAG"),
    tableValueActive:
      "font-bold " +
      COLORS.primaryText +
      " uppercase tracking-wide " +
      FontService.getInstance().getFontClass("BODY_TEXT"),
    tableValue:
      "font-bold text-stone-900 uppercase tracking-wide " +
      FontService.getInstance().getFontClass("BODY_TEXT"),
    watermark:
      "absolute right-4 bottom-2 text-7xl sm:text-8xl md:text-9xl font-black text-stone-950/[0.03] select-none pointer-events-none tracking-tighter uppercase leading-none " +
      FontService.getInstance().getFontClass("HERO_TITLE"),
  },
});

export default HomeView;
