import React from "react";
import {
  createIcons,
  IconNode,
  // Navigation & Shell
  Home,
  Info,
  Menu,
  Settings,
  ChevronLeft,
  ChevronDown,
  // Action & Control Deck
  Sliders,
  SlidersHorizontal,
  Search,
  SearchX,
  X,
  Check,
  Circle,
  RotateCcw,
  // Staff Playbook & User Profile
  HelpCircle,
  BookOpen,
  User,
  Bell,
  LogOut,
  // Arrows & Links
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUpLeft,
  ExternalLink,
  // Exhibition Domain Media & Heritage
  Mic,
  Disc,
  Music,
  ListMusic,
  Heart,
  // Playback Controls
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
} from "lucide";

/**
 * Anti-Gravity Design System: Core Gallery Icon Registry
 *
 * Maps type-safe Lucide icon nodes for DOM-based parsing via `createIcons`.
 * Standardized for Malang Exhibition Gallery Vision 2026.
 */
export const ICON_MAP = {
  // Navigation & Shell
  Home,
  Info,
  Menu,
  Settings,
  ChevronLeft,
  ChevronDown,

  // Action & Control Deck Filters
  Sliders,
  SlidersHorizontal,
  Search,
  SearchX,
  X,
  Check,
  Circle,
  RotateCcw,

  // Staff Playbook & User Profile
  HelpCircle,
  BookOpen,
  User,
  Bell,
  LogOut,

  // Directional & External Links
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUpLeft,
  "arrow-up-left": ArrowUpLeft,
  ExternalLink,

  // Exhibition Heritage & Audio Domain
  Mic,
  Disc,
  Music,
  ListMusic,
  Heart,

  // Audio Player Controls
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
} satisfies Record<string, IconNode>;

export const GALLERY_ICON_REGISTRY: Record<string, IconNode> = ICON_MAP;

export type IconRegistry = typeof ICON_MAP;
export type IconName = keyof IconRegistry;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName | (string & {});
  size?: number | string;
}

/**
 * Pure React Icon component that renders Lucide IconNodes directly in the Virtual DOM.
 * Eliminates DOM mutation collisions caused by imperative `createIcons()` replacements.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size,
  className = "",
  ...rest
}) => {
  if (!name) return null;

  const normalizedSearch = name.toLowerCase().replace(/[-_]/g, "");
  const registryKey = Object.keys(GALLERY_ICON_REGISTRY).find(
    (key) => key.toLowerCase() === normalizedSearch,
  );

  const iconNode: IconNode | undefined = registryKey
    ? GALLERY_ICON_REGISTRY[registryKey]
    : undefined;

  if (!iconNode) {
    return null;
  }

  const [tag, defaultAttrs, children] = iconNode;

  const width = size ?? defaultAttrs.width ?? 24;
  const height = size ?? defaultAttrs.height ?? 24;

  const combinedClassName = [defaultAttrs.class, className]
    .filter(Boolean)
    .join(" ");

  return React.createElement(
    tag,
    {
      ...defaultAttrs,
      width,
      height,
      className: combinedClassName,
      ...rest,
    },
    children?.map(([childTag, childAttrs], idx) =>
      React.createElement(childTag, { key: idx, ...childAttrs }),
    ),
  );
};

/**
 * Service Integrity & Icon Dependency Manager.
 * Handles DOM parsing and Lucide SVG injection safely across all view components.
 */
export class IconService {
  /**
   * Initializes and parses all registered Lucide SVG icon nodes in the DOM.
   */
  static initialize(): void {
    try {
      createIcons({
        icons: GALLERY_ICON_REGISTRY,
      });
    } catch (err) {
      console.warn("IconService initialization warning:", err);
    }
  }

  /**
   * Returns a list of all currently registered icon keys in the design system.
   */
  static getRegisteredIconNames(): string[] {
    return Object.keys(GALLERY_ICON_REGISTRY);
  }

  /**
   * Verifies whether a specific icon is registered in the service.
   */
  static isRegistered(iconName: string): boolean {
    if (!iconName) return false;
    const normalizedSearch = iconName.toLowerCase().replace(/[-_]/g, "");
    return Object.keys(GALLERY_ICON_REGISTRY).some(
      (key) => key.toLowerCase() === normalizedSearch,
    );
  }
}

export default IconService;
