import React, { useState, useEffect } from "react";
import { FontService } from "../../infrastructure/services/FontService";

export interface NavLinkItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface OverlayNavbarProps {
  /** Logo text / brand initials to display inside the left circular badge */
  brandText?: string;
  /** Optional click handler for the left logo badge (defaults to scrolling to #hero-section) */
  onLogoClick?: () => void;
  /** Navigation menu items */
  navLinks?: NavLinkItem[];
  /** Optional label for right CTA button (if provided) */
  actionLabel?: string;
  /** Optional event handler triggered when clicking right CTA button */
  onActionClick?: () => void;
  /** Event handler triggered when clicking any navigation link */
  onNavClick?: (link: NavLinkItem) => void;
  /** Active link ID for highlighting active state */
  activeLinkId?: string;
  /** Additional custom Tailwind CSS classes */
  className?: string;
}

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { id: "icons", label: "ICONS", href: "#showcase-icons" },
  { id: "evolution", label: "EVOLUTION", href: "#timeline-section" },
  { id: "details", label: "DETAILS", href: "#footer-section" },
];

/**
 * OverlayNavbar - Reusable Floating Bottom Capsule Navbar
 * Text-driven high-fashion minimalism. NO ICONS, NO EMAIL, FLOATING BOTTOM.
 * Logo clicks scroll to #hero-section, DETAILS scrolls to #footer-section.
 */
export const OverlayNavbar: React.FC<OverlayNavbarProps> = ({
  brandText = "FM11",
  onLogoClick,
  navLinks = DEFAULT_NAV_LINKS,
  actionLabel,
  onActionClick,
  onNavClick,
  activeLinkId,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const fontService = FontService.getInstance();
  const fontBadge = fontService.getFontClass("BADGE_TAG");

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero-section");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // Triggers hide earlier (heroBottom < 180) when scrolling back up towards Hero
        setIsVisible(heroBottom < 180);
      } else {
        // Fallback if hero-section id is not found: show after scrolling 350px
        setIsVisible(window.scrollY > 350);
      }
    };

    // Attach scroll listeners to window and overflow scroll containers
    const heroElement = document.getElementById("hero-section");
    const scrollContainer = heroElement?.closest(".overflow-y-auto") || window;

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial position check on mount
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      e.preventDefault();
      const heroElement = document.getElementById("hero-section");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent, link: NavLinkItem) => {
    if (link.onClick) {
      link.onClick();
    } else if (onNavClick) {
      onNavClick(link);
    } else if (link.href && link.href.startsWith("#")) {
      e.preventDefault();
      const targetId = link.href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav
      aria-label="Bottom Navigation Overlay"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-xl bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl shadow-black/50 px-3 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between gap-4 sm:gap-6 transition-all select-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto duration-500 ease-out"
          : "opacity-0 translate-y-6 scale-95 pointer-events-none duration-100 ease-out"
      } ${className}`}
    >
      {/* 1. Left Brand Badge (Clickable Logo Badge -> Scrolls to #hero-section) */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Scroll to top (Hero Section)"
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white font-bold text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${fontBadge}`}
        >
          {brandText}
        </button>
      </div>

      {/* Subtle vertical divider */}
      <div className="h-4 w-px bg-white/15" />

      {/* 2. Center/Right Navigation Links (Pure Text Menu Items) */}
      <div className="flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => {
          const isActive = activeLinkId === link.id;
          return (
            <a
              key={link.id}
              href={link.href || "#"}
              onClick={(e) => handleLinkClick(e, link)}
              className={`text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 ${fontBadge} ${
                isActive
                  ? "text-white border-b-2 border-[#FF1F00] pb-0.5"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* 3. Optional Right Action Pill Button (Only rendered if actionLabel is provided) */}
      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className={`bg-white hover:bg-stone-200 text-black font-bold rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer ml-2 ${fontBadge}`}
        >
          {actionLabel}
        </button>
      )}
    </nav>
  );
};

export default OverlayNavbar;
