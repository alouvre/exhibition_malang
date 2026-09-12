import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { RADIUS } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MMI_COLOPHON } from "@/domain/models/museum.model";

export const ColophonSection: React.FC = () => {
  const sectionHeaderClass = useFontRole("SECTION_HEADER");
  const badgeTagClass = useFontRole("BADGE_TAG");
  const editorialNeueClass = useFontRole("EDITORIAL_NEUE");

  return (
    <section className={styles.sectionContainer} aria-labelledby="colophon-title">
      <div className={styles.colophonCard}>
        <div className={styles.headerBox}>
          <div className={styles.badgeLine}>
            <span className={`${styles.kicker} ${badgeTagClass}`}>KOLOFON SPESIFIKASI TEKNIS</span>
            <span className={`${styles.licenseBadge} ${badgeTagClass}`}>SWISS DESIGN SYSTEM</span>
          </div>

          <h3 id="colophon-title" className={`${styles.title} ${sectionHeaderClass}`}>
            {MMI_COLOPHON.title}
          </h3>
          <p className={`${styles.description} ${editorialNeueClass}`}>{MMI_COLOPHON.description}</p>
        </div>

        {/* Typeface Pairings Grid */}
        <div className={styles.typefaceGrid}>
          {MMI_COLOPHON.typefacePairings.map((tf, index) => (
            <div key={index} className={styles.typefaceItem}>
              <div className={`${styles.typeRole} ${badgeTagClass}`}>{tf.role}</div>
              <div className={`${styles.typeFontName} ${editorialNeueClass}`}>{tf.fontName}</div>
              <div className={styles.typeDesc}>{tf.description}</div>
            </div>
          ))}
        </div>

        {/* Footer Accreditation */}
        <div className={`${styles.footerBox} ${badgeTagClass}`}>
          <div className={styles.accreditationInfo}>
            <Icon name="check-circle" size={16} className="text-[#CD001F]" aria-hidden="true" />
            <span>{MMI_COLOPHON.grantAccreditation}</span>
          </div>
          <span className={styles.creditTag}>{MMI_COLOPHON.curatorialTeamCredit}</span>
        </div>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    layout: "w-full my-8",
  },
  colophonCard: {
    layout: "w-full bg-slate-900 text-slate-100 p-6 sm:p-8 flex flex-col gap-6 select-none",
    radius: RADIUS.shellContainer,
  },
  headerBox: {
    layout: "flex flex-col items-start gap-2 border-b border-slate-800 pb-6",
  },
  badgeLine: {
    layout: "flex items-center gap-3 mb-1",
  },
  kicker: {
    layout: "text-xs font-bold tracking-widest text-[#CD001F] uppercase",
  },
  licenseBadge: {
    layout: "text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded uppercase tracking-wider",
  },
  title: {
    layout: "text-xl sm:text-2xl font-bold text-white tracking-tight",
  },
  description: {
    layout: "text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl",
  },
  typefaceGrid: {
    layout: "grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800 pb-6",
  },
  typefaceItem: {
    layout: "flex flex-col p-4 bg-slate-800/50 border border-slate-700/60 rounded-lg",
  },
  typeRole: {
    layout: "text-[10px] text-[#CD001F] font-bold uppercase tracking-wider",
  },
  typeFontName: {
    layout: "text-sm font-bold text-white mt-1",
  },
  typeDesc: {
    layout: "text-xs text-slate-400 mt-1 leading-normal",
  },
  footerBox: {
    layout: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400",
  },
  accreditationInfo: {
    layout: "flex items-center gap-2",
  },
  creditTag: {
    layout: "text-slate-500",
  },
});

export default ColophonSection;
