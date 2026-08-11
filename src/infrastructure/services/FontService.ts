import {
  FontFamily,
  FontRole,
  FontRoleMapping,
} from "../../domain/models/typography.model";

/**
 * Registry mapping FontFamily to Tailwind CSS utility classes.
 */
export const FONT_UTILITY_MAP: Record<FontFamily, string> = {
  satoshi: "font-satoshi",
  generalsans: "font-generalsans",
  jakarta: "font-jakarta",
  syne: "font-syne",
  default: "font-sans",
};

/**
 * Default Typography Role Mappings for Music Gallery Vision UI.
 * Can be reconfigured centrally at runtime or design time.
 */
export const DEFAULT_ROLE_MAPPING: FontRoleMapping = {
  HERO_TITLE: "syne",
  SECTION_HEADER: "satoshi",
  CARD_NAME: "generalsans",
  BODY_TEXT: "jakarta",
  BADGE_TAG: "jakarta",
};

/**
 * Lead Front-End Systems Architect: FontService Singleton
 * Centralized, Type-Safe Typography Management Service.
 */
export class FontService {
  private static instance: FontService;
  private roleMapping: FontRoleMapping = { ...DEFAULT_ROLE_MAPPING };

  private constructor() {}

  /**
   * Retrieves the Singleton instance of FontService.
   */
  public static getInstance(): FontService {
    if (!FontService.instance) {
      FontService.instance = new FontService();
    }
    return FontService.instance;
  }

  /**
   * Returns the Tailwind utility class (e.g. 'font-satoshi') for a given FontFamily key.
   */
  public getFontFamily(fontKey: FontFamily): string {
    return FONT_UTILITY_MAP[fontKey] || FONT_UTILITY_MAP.default;
  }

  /**
   * Returns the Tailwind utility class assigned to a specific UI FontRole.
   */
  public getFontClass(role: FontRole): string {
    const familyKey = this.roleMapping[role] || "default";
    return this.getFontFamily(familyKey);
  }

  /**
   * Configures or overrides the font family assigned to a specific FontRole.
   */
  public setRoleFont(role: FontRole, fontKey: FontFamily): void {
    this.roleMapping[role] = fontKey;
  }

  /**
   * Resets all role mappings back to system defaults.
   */
  public resetToDefaults(): void {
    this.roleMapping = { ...DEFAULT_ROLE_MAPPING };
  }

  /**
   * Returns the current role mappings dictionary.
   */
  public getRoleMappings(): Readonly<FontRoleMapping> {
    return { ...this.roleMapping };
  }
}

export default FontService;
