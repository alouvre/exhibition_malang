/**
 * Anti-Gravity Design System: Typography Domain Models
 * Type-safe definitions for modern font families and UI typography roles.
 */

export type FontFamily =
  | "satoshi"
  | "generalsans"
  | "jakarta"
  | "syne"
  | "default";

export type FontRole =
  | "HERO_TITLE"
  | "SECTION_HEADER"
  | "CARD_NAME"
  | "BODY_TEXT"
  | "BADGE_TAG";

export interface FontConfig {
  family: FontFamily;
  className: string;
  fontCSSVariable?: string;
}

export type FontRoleMapping = Record<FontRole, FontFamily>;
