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
  /** Header color variant for light canvas or dark/transparent backgrounds */
  variant?: "light" | "dark" | "transparent";
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
  variant = "light",
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

  const isDarkOrTransparent = variant === "dark" || variant === "transparent";

  const renderLeftAction = () => {
    if (leftActionType === "menu") {
      return (
        <button
          onClick={handleAction}
          className={`w-8 h-8 ${isDarkOrTransparent ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-stone-800"} ${RADIUS.full} transition-all flex items-center justify-center cursor-pointer`}
          aria-label="Open Navigation Menu"
        >
          <i
            data-lucide="menu"
            className={`w-5 h-5 ${isDarkOrTransparent ? "text-white" : "text-black"} block`}
          ></i>
        </button>
      );
    }

    if (leftActionType === "back") {
      return (
        <button
          onClick={handleAction}
          className={`w-auto h-8 text-[11px] sm:text-xs font-bold tracking-widest transition-colors cursor-pointer uppercase flex items-center gap-1.5 sm:gap-2 group shrink-0 z-20 ${fontBadge} ${
            isDarkOrTransparent
              ? "text-white hover:text-[#FF1F00]"
              : "text-stone-800 hover:text-[#FF1F00]"
          }`}
          aria-label="Return to Showcase"
        >
          <Icon
            name="arrow-up-left"
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 tracking-[0.2em] block group-hover:text-[#FF1F00] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${
              isDarkOrTransparent ? "text-white/80" : "text-stone-600"
            }`}
          />
          {leftActionLabel || (
            <>
              <span className="inline sm:hidden">RETURN</span>
              <span className="hidden sm:inline">RETURN TO SHOWCASE</span>
            </>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={handleAction}
        className={`w-8 h-8 ${isDarkOrTransparent ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-stone-800"} ${RADIUS.full} ${fontBadge}`}
        aria-label="Action"
      >
        {leftActionLabel || "ACTION"}
      </button>
    );
  };

  let variantBgClass = "bg-[#F6F4EE] border-b border-black/10";
  if (isSticky) {
    if (variant === "dark") {
      variantBgClass =
        "bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm border-b border-white/10";
    } else if (variant === "transparent") {
      variantBgClass = "bg-transparent border-b border-transparent";
    } else {
      variantBgClass =
        "backdrop-blur-md bg-[#F6F4EE]/90 border-b border-black/10";
    }
  } else {
    if (variant === "dark") {
      variantBgClass =
        "bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-white/10";
    } else if (variant === "transparent") {
      variantBgClass = "bg-transparent border-b border-transparent";
    } else {
      variantBgClass = "bg-[#F6F4EE] border-b border-black/10";
    }
  }

  const dynamicStickyClass = isSticky
    ? `sticky top-0 z-50 w-full ${variantBgClass}`
    : `relative w-full z-20 ${variantBgClass}`;

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
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-6 md:gap-8 z-10 select-none"
        >
          {customNavItems.map((item) => {
            const isActive = activeNavItemId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleNavItemClick(e, item)}
                className={`text-[11px] sm:text-xs md:text-sm tracking-wider uppercase transition-colors cursor-pointer ${fontBadge} ${
                  isActive
                    ? `${isDarkOrTransparent ? "text-white" : "text-zinc-950"} font-bold border-b-2 border-[#FF1F00] pb-0.5`
                    : `${isDarkOrTransparent ? "text-white/60 hover:text-white" : "text-stone-400 hover:text-stone-700"} font-medium`
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
        <div
          className={`${isDarkOrTransparent ? "text-white/80 hover:text-white" : "text-stone-800 hover:text-black"} text-xs font-bold tracking-widest transition-colors cursor-pointer ${fontBadge}`}
        >
          {rightTextLeft}
        </div>
      ) : null}
      {!hasCustomNav && showCenterText && rightTextRight ? (
        <div
          className={`${isDarkOrTransparent ? "text-white/80 hover:text-white" : "text-stone-800 hover:text-black"} text-xs font-bold tracking-widest transition-colors cursor-pointer ${fontBadge}`}
        >
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
      "flex items-center justify-between px-4 sm:px-6 md:px-9 py-0 pt-4 sm:pt-7 pb-3 sm:pb-4 relative",
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
