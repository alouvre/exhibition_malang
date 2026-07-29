import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { HomeView } from "./HomeView";
import { AboutView } from "./AboutView";
import { MusicianDetailView } from "./MusicianDetailView";
import { ExtendedArtistsView } from "./ExtendedArtistsView";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS, DESIGN_TOKENS } from "../styles/theme";

type TabName = "home" | "about";

export const MainView: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const navigate = useNavigate();
  const location = useLocation();

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

  // const showToast = (message: string) => {
  //   setToastMessage(message);
  // };

  const handleTabSelect = (tab: string) => {
    if (tab === "home") navigate("/");
    else if (tab === "playlist") navigate("/playlist");
    else if (tab === "about") navigate("/about");
    // showToast(`Switched navigation: ${tab.toUpperCase()}`);
  };

  const tabs: Array<{ id: string; name: TabName; icon: string }> = [
    { id: "mobile-nav-home", name: "home", icon: "home" },
    { id: "mobile-nav-about", name: "about", icon: "info" },
  ];

  return (
    <main
      className={styles.mainWrapper}
      style={{ height: "calc(100vh - 24px)" }}
    >
      {/* Sidebar - Desktop Only */}
      {!isMobile && (
        <Sidebar
          activeTab={activeTab}
          isSidebarOpen={isSidebarOpen}
          onTabSelect={handleTabSelect}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      {/* Main viewport area */}
      <div
        id="custom-placeholder-view"
        className="flex-1 h-full overflow-hidden"
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            }
          />
          <Route path="/musician/:slug" element={<MusicianDetailView />} />
          <Route path="/extended-archive" element={<ExtendedArtistsView />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>
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
    background: "bg-blue-600",
    color: "text-white",
    radius: RADIUS.md,
    interactive:
      "shadow-md shadow-blue-500/20 cursor-pointer transition-all duration-300",
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
