import React from "react";
import { Header } from "@/presentation/shared/components";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS, SPACING, RADIUS, DESIGN_TOKENS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";

export interface AboutViewProps {
  onToggleSidebar?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onToggleSidebar }) => {
  useDocumentTitle("Tentang Museum Musik Indonesia");
  return (
    <div className={styles.container}>
      {/* Integrated Unified Header matching HomeView */}
      <Header leftActionType="menu" onLeftActionClick={onToggleSidebar} />

      <div className={styles.contentArea}>
        <div className={styles.wrapper}>
          <div className={styles.iconContainer}>
            <i data-lucide="info" className={styles.icon}></i>
          </div>
          <h3 className={styles.title}>About Us</h3>
          <p className={styles.description}>
            About Us View Content Coming Soon. Learn about the history, exhibitions, and curation crew of the Gallery Music Museum.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout: "w-full h-full flex flex-col select-none animate-fade-in " + COLORS.canvasBg,
  },
  contentArea: {
    layout: "flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-12",
  },
  wrapper: {
    layout: "flex flex-col items-center max-w-md",
    gap: SPACING.gap.md,
  },
  iconContainer: {
    sizing: "w-16 h-16",
    background: COLORS.slate[50],
    color: "text-[#FF1F00]",
    radius: RADIUS.full,
    border: "shadow-sm",
    display: DESIGN_TOKENS.utility.flexCenter,
  },
  icon: {
    sizing: "w-8 h-8",
  },
  title: {
    text: DESIGN_TOKENS.text.heading,
  },
  description: {
    text: "text-sm text-slate-500 leading-relaxed font-sans",
  },
});

export default AboutView;
