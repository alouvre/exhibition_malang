import React, { useState, useEffect, useRef } from "react";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS, COLORS } from "../styles/theme";
import { DESIGN_TOKENS } from "../styles/theme";

/* ==========================================================================
   SIDEBAR DROPDOWN TYPES & REUSABLE SUB-COMPONENT (Modular Extraction)
   ========================================================================== */
export interface SidebarDropdownItem {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  isDanger?: boolean;
  hasArrowRight?: boolean;
}

export interface SidebarDropdownSection {
  id: string;
  items: SidebarDropdownItem[];
}

export interface SidebarDropdownProps {
  isOpen: boolean;
  sections: SidebarDropdownSection[];
  headerTitle?: string;
  className?: string;
}

/**
 * Reusable Contextual Floating Dropdown Menu component.
 * Adheres to Swiss Design & Stark Minimalism standards.
 */
export const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  isOpen,
  sections,
  headerTitle,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={
        className ||
        `absolute bottom-0 left-full ml-6 -mb-2 w-64 ${COLORS.secondaryBg} backdrop-blur-xl border border-black/[0.05] rounded-lg shadow-2xl shadow-black/10 z-50 animate-fade-in select-none font-sans`
      }
      role="menu"
      aria-orientation="vertical"
    >
      {headerTitle && (
        <div className="px-3.5 pt-3 pb-2 border-b border-black/[0.05]">
          <span className="text-[10px] font-bold tracking-widest text-[#FF1F00] uppercase font-sans">
            {headerTitle}
          </span>
        </div>
      )}

      {sections.map((section, sectionIdx) => (
        <div
          key={section.id || sectionIdx}
          className={`flex flex-col gap-0.5 p-1.5 ${
            sectionIdx < sections.length - 1
              ? "border-b border-black/[0.05]"
              : ""
          }`}
        >
          {section.items.map((item) => {
            const isDanger = item.isDanger;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer w-full text-left font-sans ${
                  isDanger
                    ? "justify-between text-rose-600 hover:bg-rose-50/[0.6]"
                    : "text-stone-800 hover:bg-black/[0.04]"
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-3">
                  <i
                    data-lucide={item.icon}
                    className={`w-4 h-4 ${isDanger ? "text-rose-600" : "text-stone-600"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.hasArrowRight && (
                  <i
                    data-lucide="arrow-right"
                    className="w-3.5 h-3.5 text-rose-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* ==========================================================================
   SIDEBAR COMPONENT
   ========================================================================== */
interface SidebarProps {
  activeTab: string;
  isSidebarOpen: boolean;
  onTabSelect: (tabName: string) => void;
  onToggleSidebar: () => void;
  onOpenOperationalGuide?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  isSidebarOpen,
  onTabSelect,
  onToggleSidebar,
  onOpenOperationalGuide,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  // Click outside & Escape key listeners to close popovers automatically
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (settingsRef.current && !settingsRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
      if (guideRef.current && !guideRef.current.contains(target)) {
        setIsGuideOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
        setIsGuideOpen(false);
      }
    };

    if (isSettingsOpen || isGuideOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      safeInitializeIcons();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen, isGuideOpen]);

  const handleSettingsClick = () => {
    setIsGuideOpen(false);
    setIsSettingsOpen((prev) => !prev);
  };

  const handleGuideClick = () => {
    setIsSettingsOpen(false);
    setIsGuideOpen((prev) => !prev);
  };

  const handleDropdownAction = (actionLabel: string) => {
    setIsSettingsOpen(false);
    setIsGuideOpen(false);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {})
        .catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {})
          .catch(() => {});
      }
    }
    setIsSettingsOpen(false);
    setIsGuideOpen(false);
  };

  // 1. Settings Dropdown Configuration
  const settingsSections: SidebarDropdownSection[] = [
    {
      id: "settings-main",
      items: [
        {
          id: "profile",
          label: "Profile",
          icon: "user",
          onClick: () => handleDropdownAction("Profile"),
        },
        {
          id: "fullscreen",
          label: "Fullscreen",
          icon: "sliders",
          onClick: handleToggleFullscreen,
        },
        {
          id: "updates",
          label: "Updates",
          icon: "bell",
          onClick: () => handleDropdownAction("Updates"),
        },
      ],
    },
    {
      id: "settings-account",
      items: [
        {
          id: "signout",
          label: "Sign out",
          icon: "log-out",
          onClick: () => handleDropdownAction("Sign out"),
          isDanger: true,
          hasArrowRight: true,
        },
      ],
    },
  ];

  // 2. Staff Playbook & Operational Guide Dropdown Configuration
  const staffPlaybookSections: SidebarDropdownSection[] = [
    {
      id: "guide-kiosk-ops",
      items: [
        {
          id: "activate-kiosk",
          label: "Fullscreen Activation Guide",
          icon: "sliders",
          onClick: () => {
            // handleToggleFullscreen();
          },
        },
        {
          id: "reset-player",
          label: "System Reset Guide",
          icon: "rotate-ccw",
          onClick: () => {
            // window.dispatchEvent(
            //   new CustomEvent("show-toast", {
            //     detail: "OPERATOR ACTION: Visual Archive Player Reset",
            //   }),
            // );
            setIsGuideOpen(false);
          },
        },
        {
          id: "tech-contact",
          label: "Technical Support",
          icon: "info",
          onClick: () => {
            if (onOpenOperationalGuide) {
              onOpenOperationalGuide();
            } else {
              // window.dispatchEvent(
              //   new CustomEvent("show-toast", {
              //     detail: "STAFF HELP: FM11 Tech Support (+62 812-3456-7890)",
              //   }),
              // );
            }
            setIsGuideOpen(false);
          },
        },
      ],
    },
  ];

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
          {/* 1. Exhibition Operational Guide / Staff Playbook Gateway */}
          <div
            ref={guideRef}
            className="relative flex items-center justify-center"
          >
            <button
              id="exhibition-guide-btn"
              onClick={handleGuideClick}
              className={`${styles.iconBtn} ${
                isGuideOpen ? "bg-black/5 text-stone-900" : ""
              }`}
              aria-label="Exhibition Operational Guide"
              title="Operational manual for gallery staff (e.g., Kiosk Fullscreen activation guide)"
            >
              <i
                data-lucide="help-circle"
                className={`w-4 h-4 transition-colors ${
                  isGuideOpen
                    ? "text-[#FF1F00]"
                    : "text-slate-500 hover:text-[#FF1F00]"
                }`}
              ></i>
            </button>

            {/* Reusable SidebarDropdown Instance 2: Staff Playbook */}
            <SidebarDropdown
              isOpen={isGuideOpen}
              headerTitle="STAFF GUIDELINE"
              sections={staffPlaybookSections}
            />
          </div>

          {/* 2. Contextual Floating Dropdown Trigger Container (Settings) */}
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

            {/* Reusable SidebarDropdown Instance 1: Settings Contextual Menu */}
            <SidebarDropdown
              isOpen={isSettingsOpen}
              sections={settingsSections}
            />
          </div>

          {/* 3. User Profile Button */}
          <button className={styles.profileBtn} aria-label="Profile">
            <img
              src="/assets/avatar.jpg"
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
