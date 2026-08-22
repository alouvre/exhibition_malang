import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { safeInitializeIcons, injectStylesheet } from "../utils/dom";
import { Icon } from "../../infrastructure/services/IconService";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, DESIGN_TOKENS } from "../styles/theme";
import { Header } from "../components/Header";
import { OverlayNavbar } from "../components/OverlayNavbar";
import { MusicianCard, MusicianIcon } from "../components/MusicianCard";
import { musiciansRegistry } from "../data/musiciansRegistry";
import { FontService } from "../../infrastructure/services/FontService";

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
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
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
      } else {
        // showGlobalToast("Toggling Navigation Menu");
      }
    }
  };

  const handleMusicianClick = (musician: MusicianIcon) => {
    const slugName = musician.name.toLowerCase().replace(/\s+/g, "-");
    // showGlobalToast(`Curated Archive: ${musician.name} (${musician.year})`);
    if (onSelectMusician) {
      onSelectMusician(musician);
    }
    navigate(`/musician/${slugName}`, { state: { musician, from: "home" } });
  };

  // 🏛️ Navigation Gateway Action Handler to Extended Roster / Archive Exhibition
  const handleExploreExtendedArchive = () => {
    // showGlobalToast("Opening Extended Archive & Musician Roster");
    navigate("/extended-archive", { state: { showInfoModal: true } });
  };

  const handleTimelineClick = (_decade: string, _category: string) => {
    // showGlobalToast(`Exploring Era ${_decade}: ${_category}`);
  };

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
      {/* 1. HERO SECTION: Kanvas Khusus Layout Layer Berlapis */}
      <section
        id="hero-section"
        data-hero-visible={isHeroVisible}
        className={styles.heroSection.layout}
      >
        {/* Integrated Static Non-Sticky Header */}
        <Header leftActionType="menu" onLeftActionClick={handleMenuClick} />

        {/* Hero Body Layout */}
        <div className={styles.heroSection.contentWrapper}>
          {/* BACKGROUND LAYER: Vinyl Record Centered Absolut (z-0) */}
          <div className={styles.vinylWrapper.container}>
            <div className={styles.vinylWrapper.disk}>
              <img
                src="/assets/vinyl_record.jpg"
                alt="Vinyl Record"
                className={styles.vinylWrapper.img}
              />
              <div className={styles.vinylWrapper.centerLabel}>
                <div className={styles.vinylWrapper.spindleHole} />
              </div>
            </div>

            {/* Circular Black Action Button Floating Near Vinyl */}
            <button
              id="tour-step-1-start-journey"
              onClick={handleStartJourney}
              className={styles.ticketBtn.circular}
              aria-label="Start Journey"
            >
              <span className={styles.ticketBtn.labelTop}>START</span>
              <span className={styles.ticketBtn.labelBottom}>JOURNEY</span>
            </button>
          </div>

          {/* FOREGROUND LAYER: Typography Aligned to the Bottom, Overlapping The Vinyl (z-10) */}
          <div className={styles.heroSection.textGrid}>
            {/* Left Lower Headline: THE SOUND (Rata Kiri bawah) */}
            <div
              className={`${styles.heroSection.typographyLeft} ${FontService.getInstance().getFontClass("HERO_TITLE")}`}
              style={{
                fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              <div>
                THE <br /> SOUND
              </div>
            </div>

            {/* Right Lower Headline: OF MALANG (Rata Kanan bawah) */}
            <div
              className={`${styles.heroSection.typographyRight} ${FontService.getInstance().getFontClass("HERO_TITLE")}`}
              style={{
                fontSize: "clamp(3.5rem, 8.5vw + 1rem, 9.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              <div>
                OF <br /> MALANG
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REUSABLE FLOATING BOTTOM OVERLAY NAVBAR (NO ICONS) */}
      <OverlayNavbar />

      {/* 2. ICONS SECTION: Lebar Penuh (Max-W 7xl) & Grid Editorial Transisi Mikro Asimetris */}
      <section
        id="showcase-icons"
        ref={iconsSectionRef}
        className={styles.iconsSection.layout}
      >
        {/* Header Group dengan Swiss Alignment (Opsi A: Header Action Alignment) */}
        <div className={styles.iconsSection.headerGroup}>
          <div>
            <h2
              className={styles.iconsSection.title}
              style={{
                fontSize: "clamp(2.25rem, 4.5vw + 0.5rem, 4.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.95",
              }}
            >
              HALL OF LEGENDS
            </h2>
          </div>

          {/* 🏛️ OPSI A: Tombol Editorial Samping Judul (Header Action Alignment) */}
          <div className="flex flex-col items-start sm:items-end self-start sm:self-auto mb-1">
            <span
              className={`text-[10px] sm:text-[10px] font-medium tracking-wider text-stone-500/60 uppercase mb-2 ${FontService.getInstance().getFontClass("BODY_TEXT")}`}
            >
              Showcasing {totalMaestros} maestros
            </span>
            <button
              onClick={handleExploreExtendedArchive}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 hover:border-[#FF1F00]/50 bg-stone-900/[0.02] hover:bg-[#FF1F00]/[0.05] transition-all duration-300 cursor-pointer"
              aria-label="Explore Extended Archive"
            >
              <span
                className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-stone-600 group-hover:text-[#FF1F00] transition-colors duration-300 ${FontService.getInstance().getFontClass("BADGE_TAG")}`}
              >
                EXPLORE HERE
              </span>
              <Icon
                name="arrow-up-right"
                className="w-4 h-4 text-stone-500 group-hover:text-[#FF1F00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </button>
          </div>
        </div>

        <div className={styles.iconsSection.grid}>
          {(musicians ?? []).slice(0, 5).map((musician, index) => (
            <MusicianCard
              key={musician.id || index}
              musician={musician}
              index={index}
              onClick={() => handleMusicianClick(musician)}
            />
          ))}
        </div>
      </section>

      {/* 3. TIMELINE SECTION: Asymmetric Left-Aligned Studio Look */}
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

      {/* 4. FOOTER SECTION: Penataan Struktur 3-Kolom Seimbang & Lapisan Watermark Terpisah */}
      <footer id="footer-section" className={styles.footerSection.layout}>
        <div className={styles.footerSection.gridContainer}>
          {/* Kolom 1: Kurasi & Pernyataan Identitas */}
          <div className={styles.footerSection.brandBlock}>
            <div className="flex items-center gap-2">
              {/* <span className="w-2 h-2 bg-[#FF1F00] rounded-full" /> */}
              <h3 className={styles.footerSection.brandTitle}>
                FM11 • MALANG MENYALA
              </h3>
            </div>
            <p className={styles.footerSection.brandText}>
              FESTIVAL MBOIS EDISI KE-11 ADALAH PLATFORM KOLABORASI EKONOMI
              KREATIF TERBESAR DI JAWA TIMUR. MERAYAKAN SATU ABAD STADION
              GAJAYANA, STATUS KOTA MALANG SEBAGAI UNESCO CREATIVE CITY OF MEDIA
              ARTS, SERTA KEMERDEKAAN REPUBLIK INDONESIA.
            </p>
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
              <div className={styles.footerSection.tableRow}>
                {/* <span className={styles.footerSection.tableLabel}>
                  ADMISSION
                </span> */}
                {/* <span className={styles.footerSection.tableValue}>
                  FREE ENTRY • PUBLIC SHOWCASE
                </span> */}
              </div>
            </div>
          </div>

          {/* Kolom 3: Arsip & Navigasi Cepat (Pengganti Blok Kosong) */}
          {/* <div className="flex flex-col justify-between h-full gap-6">
            <div className="flex flex-col gap-3">
              <span className={styles.footerSection.subtitle}>
                CURATORIAL ARCHIVE
              </span>
              <p className="text-[11px] font-mono text-stone-500 uppercase leading-relaxed tracking-wider">
                DIKURASI OLEH TIM ARSIP MUSIK MALANG RAYA UNTUK MERAWAT WARISAN
                BUNYI DAN SEJARAH MUSIK LOKAL.
              </p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="self-start group inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-stone-900 uppercase hover:text-[#FF1F00] transition-colors cursor-pointer border-b border-black/20 pb-0.5"
            >
              <span>KEMBALI KE ATAS</span>
              <span className="transform group-hover:-translate-y-0.5 transition-transform">
                ↑
              </span>
            </button>
          </div> */}
        </div>

        {/* Faded Watermark dengan Masking Halus */}
        <div className={styles.footerSection.watermark}>MBOIS 2026</div>
      </footer>
    </div>
  );
};

/* ==========================================================================
   NESTED STYLESHEET DEFINITION (Asymmetric Editorial & Swiss Design Standard)
   ========================================================================== */
const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none animate-fade-in " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-stone-900",
    // paddingTop: 0,
    // paddingLeft: SPACING.padding.sm,
    // paddingRight: SPACING.padding.sm,
  },

  // CHARACTER 1: Kontainer Khusus Bertinggi Penuh Viewport Untuk Layering Center
  heroSection: {
    layout:
      "relative w-full max-w-full px-0 pt-0 pb-12 md:pb-16 overflow-hidden flex flex-col justify-between min-h-screen md:min-h-[750px] border-b border-black/10 " +
      COLORS.canvasBg,
    contentWrapper:
      "relative w-full max-w-7xl mx-auto px-6 py-8 md:px-16 md:py-0 lg:px-16 lg:py-0 flex flex-col justify-end items-center flex-1 min-h-[70px]",
    textGrid:
      "w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-[clamp(2rem,5vh,6rem)] md:gap-0 z-10 pointer-events-none mix-blend-darken",
    typographyLeft:
      "flex flex-col items-center text-center md:items-start md:text-left text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
    typographyRight:
      "flex flex-col items-center text-center md:items-end md:text-right text-stone-950 font-black leading-[0.8] tracking-tighter w-full md:w-auto",
  },

  vinylWrapper: {
    container:
      "relative w-[32rem] h-[32rem] sm:w-[38rem] sm:h-[38rem] md:w-[38rem] md:h-[38rem] lg:w-[44rem] lg:h-[44rem] my-6 md:my-0 flex items-center justify-center z-10 flex-shrink-0 pointer-events-auto",
    disk: "relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-black/20 transform hover:rotate-90 transition-transform duration-1000 ease-out flex items-center justify-center cursor-pointer",
    img: "w-full h-full object-cover rounded-full",
    centerLabel:
      "absolute w-28 h-28 sm:w-36 sm:h-36 md:w-[12rem] md:h-[12rem] lg:w-[14rem] lg:h-[14rem] rounded-full bg-[#F4EFE6] border-2 border-stone-800/20 shadow-inner flex items-center justify-center z-20 pointer-events-none",
    spindleHole:
      "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-30 lg:h-30  rounded-full bg-[#FF1F00] border border-black/30",
  },

  ticketBtn: {
    circular:
      "absolute bottom-75 w-20 h-20 md:w-26 md:h-26 rounded-full bg-black text-white hover:scale-105 active:scale-95 transition-full duration-300 flex flex-col items-center justify-center cursor-pointer shadow-2xl z-30 border-2 border-stone-200/30",
    labelTop:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none text-stone-200 ",
    labelBottom:
      "text-[9px] md:text-[10px] font-black tracking-widest leading-none mt-1 ",
  },

  // CHARACTER 2: Kontainer Melebar Luas (Max-W 7xl) Dengan Penataan Grid 4-Kolom Desktop & Fluid Padding Vertikal
  iconsSection: {
    layout:
      "px-6 sm:px-12 md:px-16 py-[clamp(6rem,15vh,14rem)] border-b border-black/10 flex flex-col gap-8 max-w-7xl mx-auto w-full " +
      COLORS.canvasBg,
    headerGroup:
      "flex flex-col sm:flex-row sm:items-end justify-between gap-4 pl-4 border-l-2 border-stone-900/20",
    subtitle:
      "text-[10px] font-bold tracking-widest " +
      COLORS.primaryText +
      " uppercase " +
      FontService.getInstance().getFontClass("BADGE_TAG"),
    title:
      "font-black tracking-tight text-stone-950 uppercase " +
      FontService.getInstance().getFontClass("SECTION_HEADER"),
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4",
    card: "relative group w-full bg-[#F6F4EE] hover:bg-white border border-black/10 hover:border-black/30 cursor-pointer p-5 sm:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between select-none",
    cardImg:
      "w-full h-full object-cover grayscale contrast-[1.15] brightness-95 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out",
  },

  // CHARACTER 3: Asymmetrical Studio Timeline (Rata Kiri Penuh + Red Accent Border + Fluid Padding Vertikal)
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

  // CHARACTER 4: Penataan Kotak Informasi Terbagi Rapi Menggunakan Grid 3-Kolom Seimbang & Fluid Padding Top
  footerSection: {
    layout:
      "px-6 sm:px-12 md:px-16 pt-[clamp(6rem,12vh,12rem)] pb-24 border-t border-black/10 bg-[#F6F4EE] relative overflow-hidden min-h-[350px] flex flex-col justify-between",
    gridContainer:
      "w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start z-10",
    brandBlock: "flex flex-col gap-3 max-w-sm",
    brandTitle:
      "text-lg font-black tracking-widest uppercase text-stone-950 leading-none " +
      FontService.getInstance().getFontClass("SECTION_HEADER"),
    brandText:
      "text-[10px] md:text-xs text-stone-500 leading-relaxed uppercase tracking-wide font-medium " +
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
      "font-bold text-stone-400 uppercase tracking-wider " +
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
