import React, { useState, useEffect, useRef } from "react";
// import { showGlobalToast } from "../utils/toast";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS, COLORS } from "../styles/theme";
import { DESIGN_TOKENS } from "../styles/theme";
// import { showGlobalToast } from "../utils/toast";

interface SidebarProps {
  activeTab: string;
  isSidebarOpen: boolean;
  onTabSelect: (tabName: string) => void;
  onToggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  isSidebarOpen,
  onTabSelect,
  onToggleSidebar,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Click outside & Escape key listeners to close popover automatically
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      safeInitializeIcons();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen]);

  const handleSettingsClick = () => {
    setIsSettingsOpen((prev) => !prev);
    // showGlobalToast("Opening application settings...");
  };

  const handleDropdownAction = (actionLabel: string) => {
    // showGlobalToast(`${actionLabel} selected`);
    setIsSettingsOpen(false);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          // showGlobalToast("Entering full screen...");
        })
        .catch(() => {
          // showGlobalToast("Full screen request blocked by browser");
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            // showGlobalToast("Exiting full screen...");
          })
          .catch(() => {
            // showGlobalToast("Exiting full screen failed");
          });
      }
    }
    setIsSettingsOpen(false);
  };

  return (
    <div
      id="sidebar-wrapper"
      className={`${styles.wrapper} ${isSidebarOpen ? "w-16" : "w-0"}`}
    >
      <aside
        id="desktop-sidebar"
        className={`${styles.aside.container} ${
          isSidebarOpen ? styles.aside.open : styles.aside.closed
        }`}
      >
        {/* Top Action Icons */}
        <div className={styles.topSection.layout}>
          {/* Toggle Sidebar Button */}
          <button
            id="sidebar-toggle-btn"
            onClick={onToggleSidebar}
            className={styles.toggleBtn}
            aria-label="Collapse Sidebar"
          >
            <i data-lucide="chevron-left" className="w-4 h-4"></i>
          </button>

          <nav className={styles.navContainer.layout}>
            <button
              onClick={() => onTabSelect("home")}
              className={`${styles.navItem.base} ${
                activeTab === "home"
                  ? styles.navItem.active
                  : styles.navItem.inactive
              }`}
              aria-label="Home"
            >
              <i data-lucide="home" className="w-4 h-4"></i>
              {activeTab === "home" && (
                <span className={styles.activeIndicator.layout}></span>
              )}
            </button>

            <button
              onClick={() => onTabSelect("about")}
              className={`${styles.navItem.base} ${
                activeTab === "about"
                  ? styles.navItem.active
                  : styles.navItem.inactive
              }`}
              aria-label="About Us"
            >
              <i data-lucide="info" className="w-4 h-4"></i>
              {activeTab === "about" && (
                <span className={styles.activeIndicator.layout}></span>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom Settings & Profile Icons */}
        <div className={styles.bottomSection.layout}>
          {/* Contextual Floating Dropdown Trigger Container */}
          <div
            ref={settingsRef}
            className="relative flex items-center justify-center"
          >
            <button
              onClick={handleSettingsClick}
              className={`${styles.iconBtn} ${
                isSettingsOpen ? "bg-black/5 text-stone-900" : ""
              }`}
              aria-label="Settings"
            >
              <i data-lucide="settings" className="w-4 h-4"></i>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF1F00] ring-2 ring-[#F6F4EE]" />
            </button>

            {/* Contextual Floating Dropdown Menu */}
            {isSettingsOpen && (
              <div
                className={styles.popover.container}
                role="menu"
                aria-orientation="vertical"
              >
                {/* Top Block */}
                <div className="flex flex-col gap-0.5 p-1.5 border-b border-black/[0.05]">
                  <button
                    onClick={() => handleDropdownAction("Profile")}
                    className={styles.popover.item}
                    role="menuitem"
                  >
                    <i
                      data-lucide="user"
                      className="w-4 h-4 text-stone-600"
                    ></i>
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={handleToggleFullscreen}
                    className={styles.popover.item}
                    role="menuitem"
                  >
                    <i
                      data-lucide="sliders"
                      className="w-4 h-4 text-stone-600"
                    ></i>
                    <span>Fullscreen</span>
                  </button>

                  <button
                    onClick={() => handleDropdownAction("Updates")}
                    className={styles.popover.item}
                    role="menuitem"
                  >
                    <i
                      data-lucide="bell"
                      className="w-4 h-4 text-stone-600"
                    ></i>
                    <span>Updates</span>
                  </button>
                </div>

                {/* Bottom Block */}
                <div className="flex flex-col gap-0.5 p-1.5">
                  <button
                    onClick={() => handleDropdownAction("Sign out")}
                    className={`${styles.popover.item} justify-between text-rose-600 hover:bg-rose-50/[0.6]`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <i
                        data-lucide="log-out"
                        className="w-4 h-4 text-rose-600"
                      ></i>
                      <span>Sign out</span>
                    </div>
                    <i
                      data-lucide="arrow-right"
                      className="w-3.5 h-3.5 text-rose-400"
                    ></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            // onClick={() => showGlobalToast("Viewing user profile settings")}
            className={styles.profileBtn}
            aria-label="Profile"
          >
            <img
              src="assets/avatar.jpg"
              alt="User Profile"
              className={styles.profileImg.layout}
            />
          </button>
        </div>
      </aside>
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    layout: DESIGN_TOKENS.layout.sidebarWrapper,
  },
  aside: {
    container:
      "hidden md:flex flex-col justify-between items-center py-6 w-14 h-full flex-shrink-0 z-20 transition-all duration-300 ease-in-out font-sans",
    open: "translate-x-0 opacity-100",
    closed: "-translate-x-full opacity-0 pointer-events-none",
  },
  topSection: {
    layout: "flex flex-col items-center gap-[clamp(1.5rem,4vh,6rem)] w-full",
  },
  toggleBtn: {
    sizing: "w-10 h-10",
    radius: RADIUS.full,
    color: "text-slate-500 hover:text-slate-800",
    interactive: "hover:bg-black/5 transition-all cursor-pointer",
    display: DESIGN_TOKENS.utility.flexCenter,
  },
  navContainer: {
    layout: "flex flex-col items-center gap-4 w-full mt-4 relative",
  },
  navItem: {
    base: "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative",
    active: "bg-slate-900 text-[#F6F4EE] shadow-md shadow-black/20",
    inactive: "text-slate-500 hover:text-slate-900 hover:bg-black/5",
  },
  activeIndicator: {
    layout:
      "active-indicator absolute right-0 w-1 h-4 bg-[#FF1F00] rounded-l-md -mr-1",
  },
  bottomSection: {
    layout: "flex flex-col items-center gap-4 w-full",
  },
  iconBtn: {
    sizing: "w-10 h-10 relative",
    radius: RADIUS.full,
    color: "text-slate-500 hover:text-slate-900",
    interactive: "hover:bg-black/5 transition-all cursor-pointer",
    display: DESIGN_TOKENS.utility.flexCenter,
  },
  profileBtn: {
    sizing: "w-10 h-10",
    radius: RADIUS.full,
    border: "border border-black/10 shadow-sm",
    interactive:
      "cursor-pointer transition-all hover:scale-105 overflow-hidden",
  },
  profileImg: {
    layout: "w-full h-full object-cover",
  },

  popover: {
    container: `absolute bottom-0 left-full ml-6 -mb-2 w-56 ${COLORS.secondaryBg} backdrop-blur-xl border border-black/[0.05] rounded-lg shadow-2xl shadow-black/10 z-50 animate-fade-in select-none font-sans`,
    item: "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-stone-800 hover:bg-black/[0.04] transition-all cursor-pointer w-full text-left font-sans",
  },

  floatBtn: {
    layout:
      "absolute top-5 left-5 w-11 h-11 z-30 group transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in",
    radius: RADIUS.full,
    color: "text-slate-800 hover:text-black",
    interactive: "bg-[#F6F4EE] cursor-pointer",
    display: DESIGN_TOKENS.utility.flexCenter,
  },
});

export default Sidebar;
