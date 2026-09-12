import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { RADIUS, SPACING } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MMI_MILESTONES } from "@/domain/models/museum.model";

export const TimelineHistorySection: React.FC = () => {
  const sectionHeaderClass = useFontRole("SECTION_HEADER");
  const badgeTagClass = useFontRole("BADGE_TAG");
  const bodyTextClass = useFontRole("BODY_TEXT");

  return (
    <section className={styles.sectionContainer} aria-labelledby="timeline-history-title">
      <div className={styles.headerWrapper}>
        <span className={`${styles.kicker} ${badgeTagClass}`}>REKAM JEJAK SEJARAH</span>
        <h2 id="timeline-history-title" className={`${styles.title} ${sectionHeaderClass}`}>
          Perjalanan Museum Musik Indonesia
        </h2>
        <p className={`${styles.description} ${bodyTextClass}`}>
          Dari inisiatif komunitas kolektor lokal hingga museum musik fisik terdaftar dan platform preservasi digital Vision 2026.
        </p>
      </div>

      {/* Timeline List */}
      <div className={styles.timelineWrapper}>
        <div className={styles.timelineLine} aria-hidden="true" />

        <div className={styles.milestonesList}>
          {MMI_MILESTONES.map((ms) => (
            <div key={ms.id} className={styles.milestoneItem}>
              {/* Timeline Indicator Marker */}
              <div className={styles.markerContainer}>
                <div className={styles.markerCircle}>
                  <Icon name={ms.iconName} size={16} className="text-[#CD001F]" aria-hidden="true" />
                </div>
              </div>

              {/* Content Box */}
              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <span className={`${styles.yearBadge} ${badgeTagClass}`}>{ms.year}</span>
                  <span className={`${styles.curatorialTag} ${badgeTagClass}`}>{ms.curatorialTag}</span>
                </div>
                <h3 className={`${styles.itemTitle} ${sectionHeaderClass}`}>{ms.title}</h3>
                <p className={`${styles.itemDesc} ${bodyTextClass}`}>{ms.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    layout: "w-full flex flex-col py-6 border-b border-slate-200/80",
    gap: SPACING.gap.lg,
  },
  headerWrapper: {
    layout: "flex flex-col items-start gap-1 max-w-2xl",
  },
  kicker: {
    layout: "text-xs font-bold tracking-widest text-[#CD001F] uppercase",
  },
  title: {
    layout: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  },
  description: {
    layout: "text-sm text-slate-600 leading-relaxed mt-1",
  },
  timelineWrapper: {
    layout: "relative pl-4 sm:pl-8 mt-4",
  },
  timelineLine: {
    layout: "absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2",
  },
  milestonesList: {
    layout: "flex flex-col gap-6 relative z-10",
  },
  milestoneItem: {
    layout: "flex items-start gap-4 sm:gap-6 group",
  },
  markerContainer: {
    layout: "flex-shrink-0 relative z-10 mt-1",
  },
  markerCircle: {
    layout: "w-8 h-8 rounded-full bg-white border-2 border-[#CD001F] shadow-sm flex items-center justify-center transition-transform group-hover:scale-110",
  },
  contentCard: {
    layout: "flex-1 p-5 bg-white/70 border border-slate-200/80 shadow-sm hover:shadow-md transition-all",
    radius: RADIUS.md,
  },
  cardHeader: {
    layout: "flex items-center gap-3 mb-2",
  },
  yearBadge: {
    layout: "text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded",
  },
  curatorialTag: {
    layout: "text-[10px] font-semibold tracking-wider text-[#CD001F] uppercase",
  },
  itemTitle: {
    layout: "text-base font-bold text-slate-900 tracking-tight",
  },
  itemDesc: {
    layout: "text-xs sm:text-sm text-slate-600 leading-relaxed mt-1",
  },
});

export default TimelineHistorySection;
