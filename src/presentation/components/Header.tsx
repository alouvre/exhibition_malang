import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS } from "../styles/theme";
import { Icon } from "../../infrastructure/services/IconService";

export interface HeaderProps {
  leftActionType?: "menu" | "back" | "custom";
  onLeftActionClick?: () => void;
  leftActionLabel?: string;
  rightTextLeft?: string;
  rightTextRight?: string;
  showCenterText?: boolean;
  isSticky?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  leftActionType = "menu",
  onLeftActionClick,
  leftActionLabel,
  rightTextLeft = "FM 11 MALANG MENYALA",
  rightTextRight = "EXHIBITION 2026",
  showCenterText = true,
  isSticky = false,
  className,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    safeInitializeIcons();
  }, [leftActionType]);

  const handleAction = () => {
    if (onLeftActionClick) {
      onLeftActionClick();
    } else if (leftActionType === "back") {
      navigate("/showcase-icons");
    }
  };

  const renderLeftAction = () => {
    if (leftActionType === "menu") {
      return (
        <button
          onClick={handleAction}
          className={`${styles.header.addBtn} mr-4`}
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
          className={styles.header.backBtn}
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
        className={styles.header.addBtn}
        aria-label="Action"
      >
        {leftActionLabel || "ACTION"}
      </button>
    );
  };

  const dynamicStickyClass = isSticky
    ? "sticky top-0 z-50 w-full backdrop-blur-md bg-[#F6F4EE]/90"
    : "relative w-full z-20 bg-[#F6F4EE]";

  return (
    <header
      className={`${styles.header.container} ${dynamicStickyClass}${className ? ` ${className}` : ""}`}
    >
      {renderLeftAction()}
      {showCenterText && rightTextLeft ? (
        <div className={styles.header.ticketBtn}>{rightTextLeft}</div>
      ) : null}
      {showCenterText && rightTextRight ? (
        <div className={styles.header.ticketBtn}>{rightTextRight}</div>
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
      "flex items-center justify-between px-6 py-4 border-b border-black/10",
    addBtn:
      "w-8 h-8 hover:bg-black/5 " +
      RADIUS.full +
      " text-slate-800 transition-all flex items-center justify-center cursor-pointer",
    backBtn:
      "w-auto h-8 text-xs font-bold tracking-widest text-slate-800 hover:text-[#FF1F00] transition-colors cursor-pointer font-sans uppercase flex items-center gap-2 group",
    logo: "text-3xl font-normal text-slate-900 font-cursive",
    ticketBtn:
      "text-slate-800 hover:text-black text-xs font-bold tracking-widest transition-colors cursor-pointer font-sans",
  },
});

export default Header;
