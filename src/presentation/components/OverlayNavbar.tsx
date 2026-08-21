import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
 * OverlayNavbar - Reusable Floating Bottom Capsule Navbar (iOS Segmented Control & Dynamic Island Aesthetic)
 * Text-driven high-fashion minimalism with active state indicator and smooth motion transition.
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
  const [localActiveId, setLocalActiveId] = useState<string>(
    activeLinkId || navLinks[0]?.id || ""
  );

  const fontService = FontService.getInstance();
  const fontBadge = fontService.getFontClass("BADGE_TAG");

  const currentActiveId = activeLinkId || localActiveId;

  // Sync external activeLinkId if provided
  useEffect(() => {
    if (activeLinkId) {
      setLocalActiveId(activeLinkId);
    }
  }, [activeLinkId]);

  // Scroll visibility check
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero-section");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 180);
      } else {
        setIsVisible(window.scrollY > 350);
      }
    };

    const heroElement = document.getElementById("hero-section");
    const scrollContainer = heroElement?.closest(".overflow-y-auto") || window;

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // IntersectionObserver for automatic section highlighting on scroll
  useEffect(() => {
    const sections = navLinks
      .map((link) => {
        if (link.href && link.href.startsWith("#")) {
          return document.getElementById(link.href.replace("#", ""));
        }
        return null;
      })
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchingLink = navLinks.find(
            (link) => link.href === `#${entry.target.id}`
          );
          if (matchingLink) {
            setLocalActiveId(matchingLink.id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navLinks]);

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
    setLocalActiveId(link.id);

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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100vw-24px)] sm:max-w-xl inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-black/50 dark:bg-black/65 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 select-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-95 pointer-events-none"
      } ${className}`}
    >
      {/* 1. Left Brand Badge (Clickable Logo Badge -> Scrolls to #hero-section) */}
      <div className="flex items-center pl-0.5 sm:pl-1">
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Scroll to top (Hero Section)"
          className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${fontBadge}`}
        >
          {brandText}
        </button>
      </div>

      {/* Subtle vertical divider */}
      <div className="h-4 w-px bg-white/15 mx-0.5" />

      {/* 2. iOS Segmented Control Pill Navigation Items */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {navLinks.map((link) => {
          const isActive = currentActiveId === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={(e) => handleLinkClick(e, link)}
              className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer select-none ${fontBadge} ${
                isActive
                  ? "text-stone-950 font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {link.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F00] shadow-[0_0_6px_rgba(255,31,0,0.8)]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Optional Right Action Pill Button (Only rendered if actionLabel is provided) */}
      {actionLabel && (
        <>
          <div className="h-4 w-px bg-white/15 mx-0.5" />
          <button
            type="button"
            onClick={onActionClick}
            className={`bg-white hover:bg-stone-200 text-black font-bold rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer ${fontBadge}`}
          >
            {actionLabel}
          </button>
        </>
      )}
    </nav>
  );
};

export default OverlayNavbar;

