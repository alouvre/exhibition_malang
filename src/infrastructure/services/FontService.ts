import { useState, useEffect } from "react";
import {
  FontFamily,
  FontRole,
  FontRoleMapping,
  CuratorialPresetKey,
} from "../../domain/models/typography.model";

/**
 * Initial registry mapping FontFamily to Tailwind CSS utility classes.
 */
export const INITIAL_FONT_UTILITIES: Record<string, string> = {
  satoshi: "font-satoshi",
  generalsans: "font-generalsans",
  jakarta: "font-jakarta",
  syne: "font-syne",
  helvetica: "font-helvetica",
  helveticaNeue: "font-helvetica",
  bodoni: "font-display",
  inter: "font-inter",
  roboto: "font-roboto",
  default: "font-sans",
};

/**
 * Default Typography Role Mappings for Music Gallery Vision UI.
 * Can be reconfigured centrally at runtime or design time.
 */
export const DEFAULT_ROLE_MAPPING: FontRoleMapping = {
  HERO_TITLE: "syne",
  HERO_DISPLAY: "default",
  HERO_LEAD: "jakarta",
  HERO_EYEBROW: "helvetica",

  SECTION_HEADER: "jakarta",
  CARD_NAME: "helveticaNeue",
  BODY_TEXT: "jakarta",
  BADGE_TAG: "jakarta",
};

/**
 * Predefined Curatorial Typography Presets.
 */
export const FONT_PRESETS: Record<CuratorialPresetKey, FontRoleMapping> = {
  DEFAULT: { ...DEFAULT_ROLE_MAPPING },
  SWISS_MINIMAL: {
    HERO_TITLE: "helvetica",
    SECTION_HEADER: "helveticaNeue",
    CARD_NAME: "helvetica",
    BODY_TEXT: "helveticaNeue",
    BADGE_TAG: "helvetica",
    SWISS_DISPLAY: "helvetica",
    EDITORIAL_NEUE: "helveticaNeue",
  },
  EDITORIAL_CLASSIC: {
    HERO_TITLE: "bodoni",
    SECTION_HEADER: "syne",
    CARD_NAME: "bodoni",
    BODY_TEXT: "jakarta",
    BADGE_TAG: "generalsans",
    SWISS_DISPLAY: "helvetica",
    EDITORIAL_NEUE: "bodoni",
  },
  NEO_GROTESK: {
    HERO_TITLE: "satoshi",
    SECTION_HEADER: "generalsans",
    CARD_NAME: "satoshi",
    BODY_TEXT: "satoshi",
    BADGE_TAG: "generalsans",
    SWISS_DISPLAY: "satoshi",
    EDITORIAL_NEUE: "generalsans",
  },
};

/**
 * Dynamic, Type-Safe FontService Singleton.
 * Manages runtime font family registration, role binding, utility class resolution, and observer notifications.
 */
export class FontService {
  private static instance: FontService;
  private utilityMap: Map<string, string> = new Map(
    Object.entries(INITIAL_FONT_UTILITIES),
  );
  private roleMapping: FontRoleMapping = { ...DEFAULT_ROLE_MAPPING };
  private listeners: Set<() => void> = new Set();

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
   * Subscribes a listener callback to FontService state changes.
   * Returns an unsubscribe function.
   */
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifies all active subscribers of a configuration or role change.
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error("[FontService Listener Error]:", err);
      }
    });
  }

  /**
   * Dynamically registers a new font family key and associated Tailwind utility class.
   */
  public registerFontFamily(fontKey: string, utilityClass: string): void {
    this.utilityMap.set(fontKey, utilityClass);
    this.notifyListeners();
  }

  /**
   * Returns the Tailwind utility class (e.g. 'font-satoshi') for a given FontFamily key.
   */
  public getFontFamily(fontKey: FontFamily): string {
    return (
      this.utilityMap.get(fontKey) ||
      this.utilityMap.get("default") ||
      "font-sans"
    );
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
    this.notifyListeners();
  }

  /**
   * Alias method for dynamic single-role override.
   */
  public overrideRole(role: FontRole, fontKey: FontFamily): void {
    this.setRoleFont(role, fontKey);
  }

  /**
   * Dynamically registers or updates a FontRole mapping.
   */
  public registerRole(role: FontRole, fontKey: FontFamily): void {
    this.roleMapping[role] = fontKey;
    this.notifyListeners();
  }

  /**
   * Batch updates role mappings.
   */
  public setRoleMapping(newMapping: Partial<FontRoleMapping>): void {
    this.roleMapping = {
      ...this.roleMapping,
      ...newMapping,
    } as FontRoleMapping;
    this.notifyListeners();
  }

  /**
   * Switches to a predefined curatorial typography preset.
   */
  public setPreset(presetKey: CuratorialPresetKey): void {
    const preset = FONT_PRESETS[presetKey];
    if (preset) {
      this.roleMapping = { ...preset };
      this.notifyListeners();
    }
  }

  /**
   * Resets all role mappings and utility registrations back to system defaults.
   */
  public resetToDefaults(): void {
    this.utilityMap = new Map(Object.entries(INITIAL_FONT_UTILITIES));
    this.roleMapping = { ...DEFAULT_ROLE_MAPPING };
    this.notifyListeners();
  }

  /**
   * Returns the current role mappings dictionary.
   */
  public getRoleMappings(): Readonly<FontRoleMapping> {
    return { ...this.roleMapping };
  }
}

/**
 * Custom React Hook: Resolves and reactively updates the font utility class for a given UI FontRole.
 */
export function useFontRole(role: FontRole): string {
  const fontService = FontService.getInstance();
  const [fontClass, setFontClass] = useState(() =>
    fontService.getFontClass(role),
  );

  useEffect(() => {
    return fontService.subscribe(() => {
      setFontClass(fontService.getFontClass(role));
    });
  }, [role]);

  return fontClass;
}

/**
 * Custom React Hook: Resolves and reactively updates the font utility class for a given FontFamily key.
 */
export function useFontFamily(fontKey: FontFamily): string {
  const fontService = FontService.getInstance();
  const [fontClass, setFontClass] = useState(() =>
    fontService.getFontFamily(fontKey),
  );

  useEffect(() => {
    return fontService.subscribe(() => {
      setFontClass(fontService.getFontFamily(fontKey));
    });
  }, [fontKey]);

  return fontClass;
}

/**
 * Custom React Hook: Returns a reactive dictionary of all resolved font classes by role.
 */
export function useTypography(): Record<FontRole, string> {
  const fontService = FontService.getInstance();
  const getResolved = () => ({
    HERO_TITLE: fontService.getFontClass("HERO_TITLE"),
    SECTION_HEADER: fontService.getFontClass("SECTION_HEADER"),
    CARD_NAME: fontService.getFontClass("CARD_NAME"),
    BODY_TEXT: fontService.getFontClass("BODY_TEXT"),
    BADGE_TAG: fontService.getFontClass("BADGE_TAG"),
    SWISS_DISPLAY: fontService.getFontClass("SWISS_DISPLAY"),
    EDITORIAL_NEUE: fontService.getFontClass("EDITORIAL_NEUE"),
  });

  const [roles, setRoles] = useState(getResolved);

  useEffect(() => {
    return fontService.subscribe(() => {
      setRoles(getResolved());
    });
  }, []);

  return roles;
}

export default FontService;
