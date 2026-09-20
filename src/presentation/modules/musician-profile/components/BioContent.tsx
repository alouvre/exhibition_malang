import React from "react";
import { MusicianData } from "@/presentation/data/musiciansRegistry";
import { StyleSheet } from "@/presentation/utils/stylesheet";
import { useFontRole } from "@/infrastructure/services/FontService";

interface BioContentProps {
  musician: MusicianData;
}

export const BioContent: React.FC<BioContentProps> = ({ musician }) => {
  // const heroTitleClass = useFontRole("HERO_TITLE");
  const editorialNeueClass = useFontRole("EDITORIAL_NEUE");
  const bodyTextClass = useFontRole("BODY_TEXT");
  const badgeTagClass = useFontRole("BADGE_TAG");

  return (
    <div className={styles.heroSection.leftCol}>
      {/* Giant Name */}
      <h1
        className={`${styles.heroSection.title} font-sans`}
        style={{
          fontSize: "clamp(2.25rem, 8vw, 7rem)",
          fontWeight: 900,
          fontStyle: "normal",
          letterSpacing: "-0.04em",
          lineHeight: "0.95",
        }}
      >
        {(() => {
          const words = musician.name.split(" ");
          const totalLength = musician.name.length;
          const shouldWrap = words.length > 1 && totalLength > 9;

          if (!shouldWrap) {
            return musician.name;
          }

          return words.map((word, index, array) => (
            <React.Fragment key={index}>
              {word}
              {index < array.length - 1 && <br />}
            </React.Fragment>
          ));
        })()}
      </h1>

      {/* Headline Summary */}
      {musician.headlineSummary && (
        <div className="pl-0 sm:pl-6 lg:pl-16 mr-0">
          <p
            className={`text-sm sm:text-base md:text-xl text-slate-800 leading-snug tracking-tight italic pl-4 sm:pl-10 -mt-2 border-l-2 border-[#7d7d7d] py-0.5 ${editorialNeueClass}`}
          >
            "{musician.headlineSummary}"
          </p>
        </div>
      )}

      {/* Main Biography Text */}
      <p className={`${styles.heroSection.bioText} ${bodyTextClass}`}>
        {musician.biography}
      </p>

      {/* Musical Style, Instruments & Influences */}
      {/* {musician.musicalProfile && (
        <div className="ml-0 sm:ml-6 lg:ml-16 pt-5 sm:pt-6 border-t border-slate-200">
          Section Header
          <div className="flex items-center justify-between gap-4 mb-5">
            <h4
              className={`text-[11px] font-bold tracking-[0.16em] text-slate-900 uppercase ${badgeTagClass}`}
            >
              Musical Profile
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            Primary Instruments
            {musician.musicalProfile.primaryInstruments.length > 0 && (
              <div>
                <span
                  className={`block mb-2.5 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase ${badgeTagClass}`}
                >
                  Primary Instruments
                </span>

                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {musician.musicalProfile.primaryInstruments.map((inst, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-full ${bodyTextClass}`}
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            )}

            Musical Influences
            {musician.musicalProfile.influences &&
              musician.musicalProfile.influences.length > 0 && (
                <div>
                  <span
                    className={`block mb-2.5 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase ${badgeTagClass}`}
                  >
                    Musical Influences
                  </span>

                  <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {musician.musicalProfile.influences.map((inf, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-full ${bodyTextClass}`}
                      >
                        {inf}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )} */}

      {/* Vertical History Timeline */}
      <div className={styles.heroSection.timelineBox}>
        <h4
          className={`${styles.heroSection.timelineHeading} ${badgeTagClass}`}
        >
          HISTORICAL TIMELINE
        </h4>
        <div className="flex flex-col gap-8 py-3 border-l-1 border-slate-300 pl-4 pr-2 sm:pl-4 mt-3">
          {musician.historyTimeline.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-4 relative px-4 group">
              <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white" />
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-black tracking-wider text-slate-900 ${badgeTagClass}`}
                >
                  {item.year}
                </span>
                {item.category &&
                  (Array.isArray(item.category)
                    ? item.category
                    : [item.category]
                  ).map((category, catIdx) => (
                    <span
                      key={catIdx}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white text-slate-900 rounded border border-slate-200 ${badgeTagClass}`}
                    >
                      {category}
                    </span>
                  ))}
              </div>
              <span
                className={`text-xs sm:text-sm md:text-md font-medium text-slate-700 leading-relaxed font-normal tracking-wide normal-case ${bodyTextClass}`}
              >
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Quote / Editorial Motto Blockquote */}
      {/* {musician.signatureQuote && (
        <div className="ml-0 sm:ml-6 lg:ml-16 my-2 p-5 sm:p-8 bg-slate-950 text-white rounded-2xl relative overflow-hidden shadow-xl border border-slate-800">
          <div
            className={`absolute top-2 right-4 text-7xl text-white/10 select-none pointer-events-none ${editorialNeueClass}`}
          >
            “
          </div>
          <p
            className={`text-base sm:text-lg font-medium italic leading-relaxed text-slate-100 relative z-10 ${editorialNeueClass}`}
          >
            "{musician.signatureQuote.text}"
          </p>
          <div
            className={`mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 relative z-10 ${bodyTextClass}`}
          >
            <span
              className={`font-bold text-[#FF1F00] tracking-wide uppercase ${badgeTagClass}`}
            >
              — {musician.signatureQuote.source || musician.name}
            </span>
            {musician.signatureQuote.year && (
              <span className={`text-[10px] text-slate-400 ${badgeTagClass}`}>
                {musician.signatureQuote.year}
              </span>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    leftCol: "lg:col-span-7 flex flex-col gap-8 h-auto",
    title:
      "text-slate-950 font-black not-italic leading-none tracking-tight uppercase pl-0 sm:pl-6 lg:pl-16 break-words",
    bioText:
      "text-sm sm:text-base md:text-md text-slate-700 leading-relaxed font-normal tracking-wide normal-case pl-0 sm:pl-6 lg:pl-16",
    timelineBox: "flex flex-col gap-3 pl-0 sm:pl-6 lg:pl-16",
    timelineHeading:
      "text-[10px] sm:text-base md:text-md font-black tracking-widest text-slate-800 uppercase",
  },
});

export default BioContent;
