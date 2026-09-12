import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { RADIUS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MMI_MOCK_INFO } from "@/domain/models/museum.model";

export const MissionVisionSection: React.FC = () => {
  const sectionHeaderClass = useFontRole("SECTION_HEADER");
  const editorialNeueClass = useFontRole("EDITORIAL_NEUE");
  const bodyTextClass = useFontRole("BODY_TEXT");
  const badgeTagClass = useFontRole("BADGE_TAG");
  const swissDisplayClass = useFontRole("SWISS_DISPLAY");

  return (
    <section className={styles.sectionContainer} aria-labelledby="mission-vision-title">
      <div className={styles.topGrid}>
        {/* Curatorial Vision */}
        <div className={styles.visionCard}>
          <div className={styles.cardHeader}>
            <span className={`${styles.badge} ${badgeTagClass}`}>VISI KURATORIAL</span>
            <h2 id="mission-vision-title" className={`${styles.sectionTitle} ${sectionHeaderClass}`}>
              Preservasi Bunyi & Ingatan Kolektif
            </h2>
          </div>
          <p className={`${styles.visionStatement} ${editorialNeueClass}`}>
            "{MMI_MOCK_INFO.vision}"
          </p>
        </div>

        {/* Curatorial Mission List */}
        <div className={styles.missionCard}>
          <h3 className={`${styles.missionTitle} ${sectionHeaderClass}`}>Misi & Fokus Preservasi</h3>
          <ul className={styles.missionList}>
            {MMI_MOCK_INFO.mission.map((item, idx) => (
              <li key={idx} className={styles.missionItem}>
                <div className={styles.bulletIcon}>
                  <Icon name="Check" size={14} className="text-[#CD001F]" aria-hidden="true" />
                </div>
                <span className={`${styles.missionText} ${bodyTextClass}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collection Metrics Grid */}
      <div className={styles.metricsWrapper}>
        <h3 className="sr-only">Statistik Koleksi Museum</h3>
        <div className={styles.metricsGrid}>
          {MMI_MOCK_INFO.metrics.map((metric) => (
            <div key={metric.id} className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Icon name={metric.iconName} size={22} className="text-[#CD001F]" aria-hidden="true" />
              </div>
              <div className={`${styles.metricValue} ${swissDisplayClass}`}>{metric.value}</div>
              <div className={`${styles.metricLabel} ${sectionHeaderClass}`}>{metric.label}</div>
              <p className={`${styles.metricDesc} ${bodyTextClass}`}>{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    layout: "w-full flex flex-col gap-8 py-6 border-b border-slate-200/80",
  },
  topGrid: {
    layout: "grid grid-cols-1 lg:grid-cols-2 gap-6",
  },
  visionCard: {
    layout: "flex flex-col justify-between p-6 sm:p-8 bg-white/80 border border-slate-200/90 shadow-sm",
    radius: RADIUS.lg,
  },
  cardHeader: {
    layout: "flex flex-col items-start gap-2 mb-4",
  },
  badge: {
    layout: "text-[11px] font-bold tracking-widest text-[#CD001F] uppercase",
  },
  sectionTitle: {
    layout: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  },
  visionStatement: {
    layout: "text-base sm:text-lg text-slate-700 italic leading-relaxed border-l-2 border-[#CD001F] pl-4 my-2",
  },
  missionCard: {
    layout: "flex flex-col p-6 sm:p-8 bg-slate-900 text-white shadow-md",
    radius: RADIUS.lg,
  },
  missionTitle: {
    layout: "text-xl font-bold text-white mb-4 tracking-tight",
  },
  missionList: {
    layout: "flex flex-col gap-3",
  },
  missionItem: {
    layout: "flex items-start gap-3",
  },
  bulletIcon: {
    layout: "flex-shrink-0 w-6 h-6 rounded-full bg-[#CD001F]/20 flex items-center justify-center mt-0.5",
  },
  missionText: {
    layout: "text-sm text-slate-300 leading-normal",
  },
  metricsWrapper: {
    layout: "w-full mt-2",
  },
  metricsGrid: {
    layout: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  },
  metricCard: {
    layout: "flex flex-col p-5 bg-white/60 border border-slate-200/70 hover:border-[#CD001F]/40 transition-all",
    radius: RADIUS.md,
  },
  metricIconBox: {
    layout: "w-10 h-10 rounded-lg bg-[#CD001F]/10 flex items-center justify-center mb-3",
  },
  metricValue: {
    layout: "text-2xl font-black text-slate-900 tracking-tight",
  },
  metricLabel: {
    layout: "text-sm font-bold text-slate-800 mt-1",
  },
  metricDesc: {
    layout: "text-xs text-slate-500 mt-1 leading-normal",
  },
});

export default MissionVisionSection;
