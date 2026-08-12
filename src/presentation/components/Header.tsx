import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS } from "../styles/theme";
import { Icon } from "../../infrastructure/services/IconService";
import { FontService } from "../../infrastructure/services/FontService";

export interface HeaderNavItem {
  id: string;
  label: string;
  targetId?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  leftActionType?: "menu" | "back" | "custom";
  onLeftActionClick?: () => void;
  leftActionLabel?: string;
  rightTextLeft?: string;
  rightTextRight?: string;
  showCenterText?: boolean;
  isSticky?: boolean;
  className?: string;
  /** Optional custom middle navigation links for views like MusicianDetailView */
  customNavItems?: HeaderNavItem[];
  /** Currently active navigation item ID */
  activeNavItemId?: string;
  /** Event handler triggered when a custom nav item is clicked */
  onNavItemClick?: (item: HeaderNavItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  leftActionType = "menu",
  onLeftActionClick,
  leftActionLabel,
  rightTextLeft = "FM 11 MALANG MENYALA",
  rightTextRight = "FESTIVAL MBOIS 11",
  showCenterText = true,
  isSticky = false,
  className,
  customNavItems,
  activeNavItemId,
  onNavItemClick,
}) => {
  const navigate = useNavigate();
  const fontService = FontService.getInstance();
  const fontBadge = fontService.getFontClass("BADGE_TAG");

  useEffect(() => {
    safeInitializeIcons();
  }, [leftActionType]);

  const handleAction = () => {
    if (onLeftActionClick) {
      onLeftActionClick();
    } else if (leftActionType === "back") {
      navigate("/#showcase-icons");
    }
  };

  const handleNavItemClick = (e: React.MouseEvent, item: HeaderNavItem) => {
    e.preventDefault();
    if (item.onClick) {
      item.onClick();
    }
    if (onNavItemClick) {
      onNavItemClick(item);
    }
    if (item.targetId) {
      const element = document.getElementById(item.targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const renderLeftAction = () => {
    if (leftActionType === "menu") {
      return (
        <button
          onClick={handleAction}
          className={`${styles.header.addBtn} mr-24`}
          aria-label="Open Navigation Menu"
        >
          <i data-lucide="menu" className="w-5 h-5 text-black block"></i>
        </button>
      );
    }

    if (leftActionType === "back") {
      return (
        <button
          onClick={handleAction}
          className={`${styles.header.backBtn} ${fontBadge}`}
          aria-label="Return to Showcase"
        >
          <Icon
            name="arrow-up-left"
            className="w-4 h-4 tracking-[0.2em] text-stone-600 block group-hover:text-[#FF1F00] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
          {leftActionLabel || "Return to Showcase"}
        </button>
      );
    }

    return (
      <button
        onClick={handleAction}
        className={`${styles.header.addBtn} ${fontBadge}`}
        aria-label="Action"
      >
        {leftActionLabel || "ACTION"}
      </button>
    );
  };

  const dynamicStickyClass = isSticky
    ? "sticky top-0 z-50 w-full backdrop-blur-md bg-[#F6F4EE]/90"
    : "relative w-full z-20 bg-[#F6F4EE]";

  const hasCustomNav = customNavItems && customNavItems.length > 0;

  return (
    <header
      className={`${styles.header.container} ${dynamicStickyClass}${className ? ` ${className}` : ""}`}
    >
      {renderLeftAction()}

      {/* Custom Middle Navigation Menu (centered between left and right elements) */}
      {hasCustomNav ? (
        <nav
          aria-label="Header Navigation"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 sm:gap-8 z-10 select-none"
        >
          {customNavItems.map((item) => {
            const isActive = activeNavItemId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleNavItemClick(e, item)}
                className={`text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer ${fontBadge} ${
                  isActive
                    ? "text-zinc-950 font-bold border-b-2 border-[#FF1F00] pb-0.5"
                    : "text-stone-400 hover:text-stone-700 font-medium"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      ) : null}

      {/* Default Right Text (Only rendered if no customNavItems are passed) */}
      {!hasCustomNav && showCenterText && rightTextLeft ? (
        <div className={`${styles.header.ticketBtn} ${fontBadge}`}>
          {rightTextLeft}
        </div>
      ) : null}
      {!hasCustomNav && showCenterText && rightTextRight ? (
        <div className={`${styles.header.ticketBtn} ${fontBadge}`}>
          {rightTextRight}
        </div>
      ) : null}
    </header>
  );
};

/* ==========================================================================
   NESTED STYLESHEET DEFINITION (Header Component Standard)
   ========================================================================== */
const styles = StyleSheet.create({
  header: {
    container:
      "flex items-center justify-between px-6 py-4 border-b border-black/10 relative",
    addBtn:
      "w-8 h-8 hover:bg-black/5 " +
      RADIUS.full +
      " text-stone-800 transition-all flex items-center justify-center cursor-pointer",
    backBtn:
      "w-auto h-8 text-xs font-bold tracking-widest text-stone-800 hover:text-[#FF1F00] transition-colors cursor-pointer uppercase flex items-center gap-2 group",
    logo: "text-3xl font-normal text-stone-900 font-cursive",
    ticketBtn:
      "text-stone-800 hover:text-black text-xs font-bold tracking-widest transition-colors cursor-pointer",
  },
});

export default Header;
