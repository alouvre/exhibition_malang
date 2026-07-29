/**
 * Utility parser for Anti-Gravity Design System styling.
 * Supports React-Native-like nested JavaScript object syntax.
 */

type StyleEntry = string | number | undefined | null | boolean;
export type StyleGroup = Record<string, StyleEntry>;

export type CompiledStyle<T extends StyleGroup> = string & T;

export const StyleSheet = {
  /**
   * Creates a type-safe nested style object where top-level keys
   * automatically resolve to combined Tailwind class strings when used in JSX className,
   * while preserving modular property-level access to nested attributes.
   * 
   * @example
   * const styles = StyleSheet.create({
   *   container: {
   *     layout: "flex flex-col justify-between",
   *     background: COLORS.canvasBg,
   *     radius: RADIUS.shellContainer,
   *   }
   * });
   * 
   * // Usage in TSX:
   * // <div className={styles.container}> -> combines all properties
   * // <div className={styles.container.layout}> -> returns specific property
   */
  create<T extends Record<string, StyleGroup>>(stylesObj: T): { [K in keyof T]: CompiledStyle<T[K]> } {
    const result: Record<string, any> = {};

    for (const key of Object.keys(stylesObj)) {
      const group = stylesObj[key];
      const combinedString = Object.values(group)
        .filter((val): val is string => typeof val === "string" && val.trim().length > 0)
        .join(" ");

      const strObject = new String(combinedString);
      Object.assign(strObject, group);
      result[key] = strObject;
    }

    return result as { [K in keyof T]: CompiledStyle<T[K]> };
  }
};

export default StyleSheet;
