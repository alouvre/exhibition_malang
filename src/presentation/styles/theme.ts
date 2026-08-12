import { FontService } from "../../infrastructure/services/FontService";

/**
 * Anti-Gravity Design System Pattern
 * Centralized, strictly-typed design tokens for Music Gallery Vision.
 *
 * Core Theme Pillars:
 * 1. Editorial Typography Look (Bodoni Moda / Inter / Outfit high-fashion aesthetics)
 * 2. Neo-Minimalism / Stark Minimalist (High-contrast obsidian & red on off-white)
 * 3. Auditorial Look (Acoustic rhythm, sound wave cues & cultural character)
 * 4. Off-white Canvas Palette (#F6F4EE luxury paper canvas base)
 * 5. Asymmetric Spatial Layout (Dynamic, artistic non-symmetrical balance)
 * 6. Multi-layer Depth / Overlapping Layer (Dimensional z-index glass & artwork layering)
 * 7. Swiss Design Influence (Disciplined grid alignment & unadorned functionality)
 */

/* ==========================================================================
   1. COLOR SYSTEM
   ========================================================================== */
export const COLORS = {
  // Brand & Accent Colors
  primary: "#FF1F00",
  primaryText: "text-[#FF1F00]",
  primaryBg: "bg-[#FF1F00]",
  primaryBorder: "border-[#FF1F00]",

  // Canvas & Background Colors
  canvas: "#F6F4EE",
  canvasBg: "bg-[#F6F4EE]",
  ivory: "#FBFBF9",
  ivoryBg: "bg-[#FBFBF9]",
  dark: "#111111",
  darkBg: "bg-[#111111]",
  secondaryBg: "bg-[#FFFFFF]",

  // Neutrals (Slate Palette)
  slate: {
    50: "bg-slate-50",
    100: "bg-slate-100",
    200: "bg-slate-200/80",
    300: "text-slate-300",
    400: "text-slate-400",
    500: "text-slate-500",
    600: "text-slate-600",
    700: "text-slate-700",
    800: "text-slate-800",
    900: "text-slate-900",
    950: "text-slate-950",
  },

  // Translucent / Glass Opacity Helpers
  opacity: {
    glassBorder: "rgba(255, 255, 255, 0.65)",
    white40: "bg-white/40",
    white50: "bg-white/50",
    white60: "bg-white/60",
    white70: "bg-white/70",
    white80: "bg-white/80",
    white90: "bg-white/90",
    black5: "bg-black/5",
    black10: "bg-black/10",
  },
} as const;

const fontService = FontService.getInstance();

/* ==========================================================================
   2. TYPOGRAPHY SYSTEM (FONTS & WEIGHTS)
   ========================================================================== */
export const TYPOGRAPHY = {
  fontFamilies: {
    sans: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Bodoni Moda', 'Poppins', Georgia, serif",
    cursive: "'Pinyon Script', cursive",
    satoshi: "'Satoshi', sans-serif",
    generalsans: "'General Sans', sans-serif",
    jakarta: "'Plus Jakarta Sans', sans-serif",
    syne: "'Syne', sans-serif",
  },
  fontClasses: {
    sans: "font-sans",
    display: "font-display",
    cursive: "font-cursive",
    satoshi: fontService.getFontFamily("satoshi"),
    generalsans: fontService.getFontFamily("generalsans"),
    jakarta: fontService.getFontFamily("jakarta"),
    syne: fontService.getFontFamily("syne"),
  },
  roles: {
    heroTitle: fontService.getFontClass("HERO_TITLE"),
    sectionHeader: fontService.getFontClass("SECTION_HEADER"),
    cardName: fontService.getFontClass("CARD_NAME"),
    bodyText: fontService.getFontClass("BODY_TEXT"),
    badgeTag: fontService.getFontClass("BADGE_TAG"),
  },
  weights: {
    light: "font-light", // 300
    regular: "font-normal", // 400
    medium: "font-medium", // 500
    semibold: "font-semibold", // 600
    bold: "font-bold", // 700
    extrabold: "font-extrabold", // 800
    black: "font-black", // 900
  },
} as const;

/* ==========================================================================
   3. SPACING & LAYOUT SYSTEM
   ========================================================================== */
export const SPACING = {
  padding: {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
    responsiveContainer: "p-6 md:p-8",
  },
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
    layoutGap: "gap-2 md:gap-4",
  },
} as const;

/* ==========================================================================
   4. RADIUS SYSTEM
   ========================================================================== */
export const RADIUS = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-[24px]",
  shellContainer: "rounded-[32px]",
  full: "rounded-full",
} as const;

/* ==========================================================================
   5. DESIGN TOKEN SYSTEM (ALIAS TOKENS FOR COMPONENTS)
   ========================================================================== */
export const DESIGN_TOKENS = {
  layout: {
    mainWrapper:
      "flex select-none w-full h-full max-w-[1440px] max-h-[850px] relative overflow-hidden",
    sidebarWrapper:
      "relative h-full flex-shrink-0 transition-all duration-300 ease-in-out z-30",
  },
  panel: {
    glass: `glass-panel ${RADIUS.shellContainer} select-none animate-fade-in`,
    floating: `glass-floating-panel ${RADIUS.lg} shadow-lg select-none`,
    card: `glass-card transition-all duration-350`,
    inputContainer: `glass-input-container ${RADIUS.lg}`,
  },
  button: {
    glass: `glass-btn cursor-pointer transition-all`,
    primary: `${COLORS.primaryBg} text-white ${RADIUS.md} shadow-md shadow-[#FF1F00]/25 cursor-pointer transition-all`,
    upgrade: `px-4 py-2 border border-[#FF1F00]/30 rounded-full text-xs font-semibold text-[#FF1F00] hover:bg-[#FF1F00]/10 shadow-sm glass-btn cursor-pointer transition-all font-sans`,
  },
  text: {
    heading: "text-2xl font-bold text-slate-800 tracking-tight font-sans",
    subheading: "text-sm font-semibold text-slate-500 font-sans",
    body: "text-xs text-slate-400 font-medium font-sans",
    description: "text-sm text-slate-500 leading-relaxed font-sans",
    truncate: "truncate",
  },
  utility: {
    flexCenter: "flex items-center justify-center",
    scrollbar: "custom-scrollbar",
    transitionAll: "transition-all duration-300 ease-in-out",
  },
} as const;

/* ==========================================================================
   6. BACKWARD COMPATIBILITY BRIDGE (LEGACY THEME OBJECT)
   ========================================================================== */
export const THEME = {
  glassPanel: DESIGN_TOKENS.panel.glass,
  glassFloatingPanel: DESIGN_TOKENS.panel.floating,
  glassCard: DESIGN_TOKENS.panel.card,
  glassButton: DESIGN_TOKENS.button.glass,
  flexCenter: DESIGN_TOKENS.utility.flexCenter,
  textTruncate: DESIGN_TOKENS.text.truncate,
  customScrollbar: DESIGN_TOKENS.utility.scrollbar,
  transitionAll: DESIGN_TOKENS.utility.transitionAll,
} as const;

export default THEME;
