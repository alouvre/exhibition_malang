import React from "react";
import { Icon } from "@/infrastructure/services/IconService";
import { useFontRole } from "@/infrastructure/services/FontService";
import { RADIUS, SPACING } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MMI_CURATORS } from "@/domain/models/museum.model";

export const CuratorialTeamSection: React.FC = () => {
  const sectionHeaderClass = useFontRole("SECTION_HEADER");
  const cardNameClass = useFontRole("CARD_NAME");
  const badgeTagClass = useFontRole("BADGE_TAG");

  return (
    <section className={styles.sectionContainer} aria-labelledby="curatorial-team-title">
      <div className={styles.headerWrapper}>
        <span className={`${styles.kicker} ${badgeTagClass}`}>DEWAN ARSIP & KURATOR</span>
        <h2 id="curatorial-team-title" className={`${styles.title} ${sectionHeaderClass}`}>
          Tim Kuratorial & Pengarsip
        </h2>
        <p className={styles.description}>
          Para pakar preservasi analog, etnomusikolog, dan arsitek pengalaman digital di balik Museum Musik Indonesia.
        </p>
      </div>

      {/* Curator Cards Grid */}
      <div className={styles.curatorsGrid}>
        {MMI_CURATORS.map((curator) => (
          <div key={curator.id} className={styles.curatorCard}>
            <div className={styles.avatarBox}>
              <Icon name="User" size={28} className="text-[#CD001F]" aria-hidden="true" />
            </div>

            <div className={styles.cardBody}>
              <span className={`${styles.curatorRole} ${badgeTagClass}`}>{curator.role}</span>
              <h3 className={`${styles.curatorName} ${cardNameClass}`}>{curator.name}</h3>
              <p className={styles.curatorBio}>{curator.bio}</p>

              <div className={`${styles.specialtyTag} ${badgeTagClass}`}>
                <Icon name="BookOpen" size={12} className="text-slate-400" aria-hidden="true" />
                <span>{curator.specialty}</span>
              </div>
            </div>
          </div>
        ))}
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
  curatorsGrid: {
    layout: "grid grid-cols-1 md:grid-cols-3 gap-6",
  },
  curatorCard: {
    layout: "flex flex-col p-6 bg-white/80 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#CD001F]/30 transition-all",
    radius: RADIUS.lg,
  },
  avatarBox: {
    layout: "w-14 h-14 rounded-full bg-[#CD001F]/10 border border-[#CD001F]/20 flex items-center justify-center mb-4",
  },
  cardBody: {
    layout: "flex flex-col flex-1 justify-between",
  },
  curatorRole: {
    layout: "text-[11px] font-semibold text-[#CD001F] tracking-wider uppercase mb-1",
  },
  curatorName: {
    layout: "text-lg font-bold text-slate-900 tracking-tight mb-2",
  },
  curatorBio: {
    layout: "text-xs text-slate-600 leading-relaxed mb-4 flex-1",
  },
  specialtyTag: {
    layout: "flex items-center gap-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-500",
  },
});

export default CuratorialTeamSection;
