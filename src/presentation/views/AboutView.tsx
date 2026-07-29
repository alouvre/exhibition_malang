import React from "react";
import { StyleSheet } from "../utils/stylesheet";
import { COLORS, SPACING, RADIUS, DESIGN_TOKENS } from "../styles/theme";

export const AboutView: React.FC = () => {
  return (
    <div className={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    layout: "flex flex-col items-center justify-center text-center flex-1 h-full select-none animate-fade-in",
    padding: SPACING.padding.xl,
    background: "glass-panel",
    radius: RADIUS.shellContainer,
  },
  wrapper: {
    layout: "flex flex-col items-center max-w-md",
    gap: SPACING.gap.md,
  },
  iconContainer: {
    sizing: "w-16 h-16",
    background: COLORS.slate[50],
    color: "text-blue-600",
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
