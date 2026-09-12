import React from "react";
import { Link } from "react-router-dom";
import { useFontRole } from "@/infrastructure/services/FontService";
import { RADIUS, SPACING } from "@/presentation/styles/theme";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { MMI_MOCK_INFO } from "@/domain/models/museum.model";

export const AboutHeroSection: React.FC = () => {
  const swissDisplayClass = useFontRole("SWISS_DISPLAY");
  const badgeTagClass = useFontRole("BADGE_TAG");
  const editorialNeueClass = useFontRole("EDITORIAL_NEUE");

  return (
    <section className={styles.sectionContainer} aria-labelledby="about-hero-title">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className={`flex items-center gap-2 text-xs text-slate-400 ${badgeTagClass}`}>
          <li>
            <Link to="/" className="hover:text-slate-700 transition-colors">
              Galeri
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">/</li>
          <li className="text-slate-800 font-semibold" aria-current="page">
            Tentang MMI
          </li>
        </ol>
      </nav>

      {/* Header Content Wrapper */}
      <div className={styles.headerWrapper}>
        <div className={styles.badgeWrapper}>
          <span className={`${styles.badge} ${badgeTagClass}`}>
            HERITAGE ARCHIVE // MALANG EXHIBITION
          </span>
          <span className={styles.registryStamp}>
            REG: {MMI_MOCK_INFO.catalogRegistryId}
          </span>
        </div>

        <h1 id="about-hero-title" className={`${styles.title} ${swissDisplayClass}`}>
          {MMI_MOCK_INFO.name.toUpperCase()}
        </h1>

        <p className={`${styles.subtitle} ${editorialNeueClass}`}>
          {MMI_MOCK_INFO.tagline}
        </p>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    layout: "w-full flex flex-col pt-4 pb-8 border-b border-slate-200/80",
  },
  headerWrapper: {
    layout: "flex flex-col items-start max-w-4xl",
    gap: SPACING.gap.sm,
  },
  badgeWrapper: {
    layout: "flex flex-wrap items-center gap-3 mb-1",
  },
  badge: {
    layout: "px-3 py-1 bg-[#CD001F]/10 border border-[#CD001F]/20 text-[#CD001F] text-xs font-semibold tracking-wider uppercase",
    radius: RADIUS.full,
  },
  registryStamp: {
    layout: "text-[11px] font-mono text-slate-400 tracking-wider uppercase",
  },
  title: {
    layout: "text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]",
  },
  subtitle: {
    layout: "text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mt-2",
  },
});

export default AboutHeroSection;
