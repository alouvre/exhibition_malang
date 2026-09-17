/**
 * Anti-Gravity Design System: Typography Domain Models
 * Type-safe definitions for modern font families and UI typography roles.
 */

export type FontFamily =
  | "satoshi"
  | "generalsans"
  | "jakarta"
  | "syne"
  | "helvetica"
  | "helveticaNeue"
  | "bodoni"
  | "inter"
  | "roboto"
  | "default"
  | (string & {});

export type FontRole =
  | "HERO_TITLE"
  | "SECTION_HEADER"
  | "CARD_NAME"
  | "BODY_TEXT"
  | "BADGE_TAG"
  | "SWISS_DISPLAY"
  | "EDITORIAL_NEUE"
  | (string & {});

export type CuratorialPresetKey =
  | "DEFAULT"
  | "SWISS_MINIMAL"
  | "EDITORIAL_CLASSIC"
  | "NEO_GROTESK"
  | (string & {});

export interface CuratorialMetaToken {
  id: string;
  catalogRef: string;
  exhibitionRoom: string;
  role: FontRole;
  fontFamily: FontFamily;
}

export interface FontDefinition {
  family: FontFamily;
  utilityClass: string;
  fontStack: string;
  isCustomWebFont?: boolean;
}

export interface FontConfig {
  family: FontFamily;
  className: string;
  fontCSSVariable?: string;
}

export type FontRoleMapping = Record<string, FontFamily>;

