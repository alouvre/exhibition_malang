import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { safeInitializeIcons } from "../utils/dom";
import { StyleSheet } from "../utils/stylesheet";
import { RADIUS } from "../styles/theme";

export interface HeaderProps {
  leftActionType?: "menu" | "back" | "custom";
  onLeftActionClick?: () => void;
  leftActionLabel?: string;
  rightTextLeft?: string;
  rightTextRight?: string;
  showCenterText?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  leftActionType = "menu",
  onLeftActionClick,
  leftActionLabel,
  rightTextLeft = "FM 11 MALANG MENYALA",
  rightTextRight = "EXHIBITION 2026",
  showCenterText = true,
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
      navigate("/#showcase-icons");
    }
  };

  const renderLeftAction = () => {
    if (leftActionType === "menu") {
      return (
        <button
          onClick={handleAction}
          className={styles.header.addBtn}
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
          <i data-lucide="arrow-left" className="w-5 h-5 text-black block"></i>
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

  return (
    <div
      className={styles.header.container + (className ? ` ${className}` : "")}
    >
      {renderLeftAction()}
      {showCenterText && rightTextLeft ? (
        <div className={styles.header.ticketBtn}>{rightTextLeft}</div>
      ) : null}
      {showCenterText && rightTextRight ? (
        <div className={styles.header.ticketBtn}>{rightTextRight}</div>
      ) : null}
    </div>
  );
};

/* ==========================================================================
   NESTED STYLESHEET DEFINITION (Header Component Standard)
   ========================================================================== */
const styles = StyleSheet.create({
  header: {
    container:
      "flex items-center justify-between z-20 px-6 py-4 w-full border-b border-black/10 bg-[#F6F4EE]",
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
