import React from "react";
import { Header } from "@/presentation/shared/components";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { COLORS } from "@/presentation/styles/theme";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import {
  AboutHeroSection,
  MissionVisionSection,
  TimelineHistorySection,
  CuratorialTeamSection,
  ColophonSection,
} from "../components";

export interface AboutViewProps {
  onToggleSidebar?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onToggleSidebar }) => {
  useDocumentTitle("Tentang Museum Musik Indonesia - Malang Exhibition");

  return (
    <div className={styles.container}>
      {/* Integrated Unified Header matching HomeView */}
      <Header leftActionType="menu" onLeftActionClick={onToggleSidebar} />

      {/* Main Content Area with Semantic Landmark */}
      <main className={styles.mainContent} id="main-content">
        <div className={styles.contentWrapper}>
          <AboutHeroSection />
          <MissionVisionSection />
          <TimelineHistorySection />
          <CuratorialTeamSection />
          <ColophonSection />
        </div>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    layout: "w-full h-full flex flex-col select-none animate-fade-in min-h-screen",
    background: COLORS.canvasBg,
  },
  mainContent: {
    layout: "flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 md:py-10 custom-scrollbar",
  },
  contentWrapper: {
    layout: "max-w-6xl mx-auto flex flex-col gap-4",
  },
});

export default AboutView;
