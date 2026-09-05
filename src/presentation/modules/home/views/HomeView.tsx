import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { safeInitializeIcons, injectStylesheet } from "@/presentation/utils/dom";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { OverlayNavbar } from "@/presentation/components/OverlayNavbar";
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

      {/* 4. FOOTER SECTION */}
      <footer id="footer-section" className={styles.footerSection.layout}>
        <div className={styles.footerSection.gridContainer}>
          {/* Kolom 1: Kurasi & Pernyataan Identitas */}
          <div className={styles.footerSection.brandBlock}>
            <div className="flex items-center gap-2">
              <h3 className={styles.footerSection.brandTitle}>
                MUSEUM MUSIK INDONESIA
              </h3>
            </div>
            <p className={styles.footerSection.brandText}>
              MUSEUM MUSIK INDONESIA ADALAH PLATFORM KURASI ARSIP DAN APRESIASI
              SEJARAH MUSIK TERBESAR DI JAWA TIMUR. MERAYAKAN SATU ABAD STADION
              GAJAYANA, STATUS KOTA MALANG SEBAGAI UNESCO CREATIVE CITY OF MEDIA
              ARTS, SERTA KEMERDEKAAN REPUBLIK INDONESIA.
            </p>

            {/* Social Media QR Trigger Buttons */}
            <div className="flex items-center gap-3 pt-3">
              {/* Instagram Button */}
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
                className="group flex items-center gap-2 px-3.5 py-1.5 border border-black/10 rounded-full hover:border-[#FF1F00] hover:bg-black/[0.03] transition-all duration-300 cursor-pointer"
                aria-label="Tampilkan QR Code Instagram"
              >
                <svg
                  className="w-3.5 h-3.5 text-stone-700 group-hover:text-[#FF1F00] transition-colors"
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
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-700 group-hover:text-[#FF1F00] uppercase transition-colors">
                  INSTAGRAM
                </span>
              </button>

              {/* TikTok Button */}
              <button
                type="button"
                onClick={() =>
                  setSocialModal({
                    platform: "tiktok",
                    title: "OFFICIAL TIKTOK",
                    handle: "@festivalmbois11",
                    url: "https://www.tiktok.com/@festivalmbois11",
                    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent("https://www.tiktok.com/@festivalmbois11")}`,
                  })
                }
                className="group flex items-center gap-2 px-3.5 py-1.5 border border-black/10 rounded-full hover:border-[#FF1F00] hover:bg-black/[0.03] transition-all duration-300 cursor-pointer"
                aria-label="Tampilkan QR Code TikTok"
              >
                <svg
                  className="w-3.5 h-3.5 text-stone-700 group-hover:text-[#FF1F00] transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-700 group-hover:text-[#FF1F00] uppercase transition-colors">
                  TIKTOK
                </span>
              </button>
            </div>
          </div>

          {/* Kolom 2: Metadata Pameran & Status Langsung */}
          <div className={styles.footerSection.detailsBlock}>
            <span className={styles.footerSection.subtitle}>
              FESTIVAL DETAILS
            </span>
            <div className={styles.footerSection.table}>
              <div className={styles.footerSection.tableRow}>
                <span className={styles.footerSection.tableLabel}>STATUS</span>
                <span className={styles.footerSection.tableValueActive}>
                  <span className="w-1.5 h-1.5 mr-1 rounded-full bg-[#FF1F00] animate-pulse inline-block" />
                  LIVE NOW • DAY 2 OF 3
                </span>
              </div>
              <div className={styles.footerSection.tableRow}>
                <span className={styles.footerSection.tableLabel}>
                  LOCATION
                </span>
                <span className={styles.footerSection.tableValue}>
                  STADION GAJAYANA, MALANG
                </span>
              </div>
              <div className={styles.footerSection.tableRow}>
                <span className={styles.footerSection.tableLabel}>
                  DURATION
                </span>
                <span className={styles.footerSection.tableValue}>
                  21 - 23 AGUSTUS 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Faded Watermark dengan Masking Halus */}
        <div className={styles.footerSection.watermark}>MBOIS 2026</div>
      </footer>

      {/* Centered QR Code Modal */}
      {socialModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSocialModal(null)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSocialModal(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Tutup popup"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="space-y-1 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-700">
                  {socialModal.title}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 tracking-tight font-mono">
                {socialModal.handle}
              </h4>
            </div>

            {/* QR Code Container */}
            <div className="flex justify-center p-4 bg-stone-50 rounded-xl border border-dashed border-stone-300">
              <img
                src={socialModal.qrUrl}
                alt={`QR Code ${socialModal.title}`}
                className="w-52 h-52 object-contain rounded-lg shadow-sm"
                loading="eager"
              />
            </div>

            {/* Direct Link Option */}
            <div className="pt-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-[#FF1F00] hover:underline"
              >
                <span>Pindai dengan kamera ponsel</span>
              </a>
            </div>
          </div>
        </div>
      )}
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
      "px-6 sm:px-12 md:px-16 py-[clamp(8rem,18vh,16rem)] border-b border-black/10 flex flex-col gap-12 bg-[#F6F4EE]",
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
