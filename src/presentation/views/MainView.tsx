import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/presentation/components/Sidebar";
import { OnboardingCoachmark } from "@/presentation/components/OnboardingCoachmark";
import { MobileFallbackScreen } from "@/presentation/components/MobileFallbackScreen";
import { ErrorBoundary } from "@/presentation/components/ErrorBoundary";
import { AudioPlayerProvider } from "@/presentation/context/AudioPlayerContext";
// Dynamic Route Chunk Code-Splitting via React.lazy
const HomeView = React.lazy(() =>
  import("@/presentation/modules/home").then((m) => ({ default: m.HomeView }))
);
const MusicianDetailView = React.lazy(() =>
  import("@/presentation/modules/musician-profile").then((m) => ({
    default: m.MusicianDetailView,
  }))
);
const MusicianDiscographyView = React.lazy(() =>
  import("@/presentation/modules/musician-profile").then((m) => ({
    default: m.MusicianDiscographyView,
  }))
);
const ExtendedArtistsView = React.lazy(() =>
  import("@/presentation/modules/artist-catalog").then((m) => ({
    default: m.ExtendedArtistsView,
  }))
);
const AboutView = React.lazy(() =>
  import("@/presentation/modules/about").then((m) => ({ default: m.AboutView }))
);

const RouteLoadingFallback: React.FC = () => (
  <div className="w-full min-h-screen bg-[#F6F4EE] flex items-center justify-center pointer-events-none">
    <div className="w-6 h-6 border-2 border-stone-300 border-t-[#FF1F00] rounded-full animate-spin" />
  </div>
);

import { safeInitializeIcons } from "@/presentation/utils/dom";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { RADIUS, DESIGN_TOKENS } from "@/presentation/styles/theme";

type TabName = "home" | "about";

export const MainView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isBypassed, setIsBypassed] = useState<boolean>(false);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);

  // 0. ONBOARDING COACHMARK TOUR STATE (Only opens on home route)
  const [isTourOpen, setIsTourOpen] = useState<boolean>(
    () => location.pathname === "/"
  );
  const [tourStep, setTourStep] = useState<number>(1);

  // 5. Route switch listener: Forcibly close sidebar, close tour on non-home, & unlock scroll/pointer locks
  useEffect(() => {
    setIsSidebarOpen(false);
    document.body.style.overflow = "unset";
    if (location.pathname !== "/") {
      setIsTourOpen(false);
    }
  }, [location.pathname]);

  const handleNextTourStep = () => {
    if (tourStep === 1) {
      setIsSidebarOpen(true);
      setTourStep(2);
    } else if (tourStep === 2) {
      setIsSidebarOpen(true);
      setTourStep(3);
    }
  };

  const handlePrevTourStep = () => {
    if (tourStep === 3) {
      setIsSidebarOpen(true);
      setTourStep(2);
    } else if (tourStep === 2) {
      setTourStep(1);
    }
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
    setIsSidebarOpen(false); // Otomatis tutup sidebar pada saat tur selesai atau dilewati
  };

  const getActiveTab = (): TabName => {
    if (
      location.pathname.startsWith("/musician") ||
      location.pathname === "/extended-archive"
    )
      return "home";
    if (location.pathname === "/about") return "about";
    return "home";
  };

  const activeTab = getActiveTab();

  // 1. Monitor window resizing natively in React
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Safely parse Lucide icons upon tab navigation
  useEffect(() => {
    safeInitializeIcons();
  }, [location.pathname]);

  // 3. Listen to global toast notifications
  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
    };
    window.addEventListener("show-toast" as any, handleToast);
    return () => window.removeEventListener("show-toast" as any, handleToast);
  }, []);

  // 4. Automatically auto-dismiss toast alerts after 2.5s
  useEffect(() => {
    let timer: any;
    if (toastMessage) {
      timer = setTimeout(() => setToastMessage(null), 2500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toastMessage]);

  const handleTabSelect = (tab: string) => {
    if (tab === "home") navigate("/");
    else if (tab === "playlist") navigate("/playlist");
    else if (tab === "about") navigate("/about");
  };

  const tabs: Array<{ id: string; name: TabName; icon: string }> = [
    { id: "mobile-nav-home", name: "home", icon: "home" },
    { id: "mobile-nav-about", name: "about", icon: "info" },
  ];

  return (
    <AudioPlayerProvider>
      <main className={styles.mainWrapper}>
        {/* Mobile Device Fallback Guard Screen */}
        {isMobile && !isBypassed && (
          <MobileFallbackScreen onBypass={() => setIsBypassed(true)} />
        )}

        {/* 3-Step Contextual Onboarding Coachmark Tour */}
        <OnboardingCoachmark
          isOpen={isTourOpen && !isMobile}
          isVisible={isHeroVisible}
          currentStep={tourStep}
          totalSteps={3}
          onNextStep={handleNextTourStep}
          onPrevStep={handlePrevTourStep}
          onSkip={handleCloseTour}
          onFinish={handleCloseTour}
        />

        {/* Sidebar - Desktop Only */}
        {!isMobile && (
          <Sidebar
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onTabSelect={handleTabSelect}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            controlledGuideOpen={isTourOpen && tourStep === 2}
            controlledSettingsOpen={isTourOpen && tourStep === 3}
          />
        )}

        {/* Main viewport area */}
        <div
          id="custom-placeholder-view"
          className="flex-1 h-full overflow-hidden"
        >
          <React.Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomeView
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    onHeroVisibilityChange={setIsHeroVisible}
                  />
                }
              />
              <Route path="/musician/:slug" element={<MusicianDetailView />} />
              <Route
                path="/musician/:slug/discography"
                element={<MusicianDiscographyView />}
              />
              <Route
                path="/extended-archive"
                element={
                  <ErrorBoundary>
                    <ExtendedArtistsView />
                  </ErrorBoundary>
                }
              />
              <Route path="/about" element={<AboutView />} />
            </Routes>
          </React.Suspense>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        {isMobile && (
          <nav id="mobile-nav-bar" className={styles.mobileNavBar}>
            {tabs.map((tab) => {
              const isActive = tab.name === activeTab;
              return (
                <button
                  key={tab.id}
                  id={tab.id}
                  onClick={() => handleTabSelect(tab.name)}
                  className={
                    isActive
                      ? styles.mobileNavBtnActive
                      : styles.mobileNavBtnInactive
                  }
                >
                  <i data-lucide={tab.icon} className="w-5 h-5"></i>
                </button>
              );
            })}
          </nav>
        )}

        {/* Toast Alert Popups */}
        {toastMessage && (
          <div className={styles.toastContainer}>{toastMessage}</div>
        )}
      </main>
    </AudioPlayerProvider>
  );
};

const styles = StyleSheet.create({
  // Shell wrapper sizes and flex grids
  mainWrapper: {
    layout: DESIGN_TOKENS.layout.mainWrapper,
  },

  // Mobile navigation bottom panel
  mobileNavBar: {
    layout:
      "flex md:hidden items-center justify-around select-none px-4 z-30 fixed bottom-4 left-4 right-4 h-16 shadow-lg",
    background: "glass-floating-panel",
    radius: RADIUS.lg,
  },
  mobileNavBtnActive: {
    sizing: "w-11 h-11",
    background: "bg-[#FF1F00]",
    color: "text-white",
    radius: RADIUS.md,
    interactive:
      "shadow-md shadow-[#FF1F00]/30 cursor-pointer transition-all duration-300",
    display: DESIGN_TOKENS.utility.flexCenter,
  },
  mobileNavBtnInactive: {
    sizing: "w-11 h-11",
    color: "text-slate-400 hover:text-slate-700",
    radius: RADIUS.md,
    interactive: "cursor-pointer transition-all duration-300",
    display: DESIGN_TOKENS.utility.flexCenter,
  },

  // Toast notifier layout
  toastContainer: {
    layout:
      "custom-toast inline-flex items-center justify-center text-center select-none whitespace-nowrap px-6 py-1.5 z-50 fixed top-6 left-1/2 right-1/2 transform -translate-x-1/2 shadow-md animate-bounce-short",
    background: "glass-floating-panel",
    radius: RADIUS.full,
    text: "text-xs font-semibold text-slate-700 font-sans",
  },
});

export default MainView;
