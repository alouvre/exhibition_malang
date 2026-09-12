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
// import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import {
  HomeVinylHero,
  HomeShowcaseSection,
  HomeTimelineSection,
  HomeFooter,
} from "../components";

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
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

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

  // 2.b Footer Section Visibility Observer to conditionally hide OverlayNavbar
  useEffect(() => {
    const footerElement = document.getElementById("footer-section");
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: containerRef.current || null,
        threshold: 0.05,
      },
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

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

  const musicians: MusicianIcon[] = musiciansRegistry;
  const totalMaestros = musicians?.length || 0;

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 1. HERO SECTION Component */}
      <HomeVinylHero
        isHeroVisible={isHeroVisible}
        onMenuClick={handleMenuClick}
        onStartJourney={handleStartJourney}
      />

      {/* REUSABLE FLOATING BOTTOM OVERLAY NAVBAR (NO ICONS) */}
      <OverlayNavbar visible={!isHeroVisible && !isFooterVisible} />

      {/* 2. ICONS SECTION Component */}
      <HomeShowcaseSection
        sectionRef={iconsSectionRef}
        totalMaestros={totalMaestros}
        musicians={musicians}
        onExploreExtendedArchive={handleExploreExtendedArchive}
        onMusicianClick={handleMusicianClick}
      />

      {/* 3. CULTURAL TIMELINE ARCHIVE SECTION */}
      <HomeTimelineSection />

      {/* 4. FOOTER SECTION */}
      <HomeFooter />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout:
      "flex flex-col flex-1 h-full overflow-y-auto select-none " +
      DESIGN_TOKENS.utility.scrollbar,
    background: COLORS.canvasBg,
    text: "text-stone-900",
  },
});

export default HomeView;
