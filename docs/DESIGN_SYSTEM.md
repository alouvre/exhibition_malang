# Museum Exhibition Design System & Visual Specification

## 1. Design Philosophy & Editorial Aesthetic

The visual language of **Music Gallery Vision** is rooted in **Swiss Editorial Typography** combined with **Minimalist Museum Archival Design**. The system evokes an immersive museum gallery experience with high-contrast monochrome palettes, warm paper canvas backgrounds (`#F6F4EE`), crimson accents, and glassmorphic floating panels.

```
+-----------------------------------------------------------------------+
|  [EDITORIAL HEADER] Museum Musik Indonesia — Sound of Malang         |
+-----------------------------------------------------------------------+
|  [VINYL HERO CANVAS] Warm Canvas #F6F4EE / Interactive Turntable     |
+-----------------------------------------------------------------------+
|  [HALL OF LEGENDS SHOWCASE] High-Contrast Cards & Crimson Badges      |
+-----------------------------------------------------------------------+
|  [FLOATING PILL PLAYER] Glassmorphic Translucent Bottom Navigation    |
+-----------------------------------------------------------------------+
```

---

## 2. Design Tokens (`src/presentation/styles/theme.ts`)

### 2.1 Color Palette

| Token Name | Hex / Class | Visual Role |
| :--- | :--- | :--- |
| **Canvas Warm Paper** | `#F6F4EE` | Main exhibition background canvas |
| **Monochrome Slate Heavy** | `stone-900` (`#1C1917`) | Primary editorial headers & high-contrast cards |
| **Monochrome Slate Light** | `stone-100` (`#F5F5F4`) | Subtle card backgrounds & borders |
| **Museum Crimson Accent** | `#FF1F00` / `#EF4444` | Primary brand accent, active badges & play indicators |
| **Translucent Glass** | `rgba(255, 255, 255, 0.85)` | Glassmorphism floating panels with `backdrop-blur-md` |
| **Muted Metadata Text** | `stone-500` (`#78716C`) | Subtitles, catalog IDs, and technical dates |

### 2.2 Typography Scale

- **Display Serif Heading**: Editorial display serif (`font-serif`, e.g., Playfair Display / Georgia) for artist names, quote blocks, and curatorial headers.
- **Sans-Serif Body**: Clean, high-legibility sans-serif (`font-sans`, Inter / system-ui) for biography narratives and UI labels.
- **Monospace Technical Metadata**: Monospace font (`font-mono`) for track durations, museum inventory IDs, catalog year badges, and filter counters.

---

## 3. Component Catalog & Motion Specs

### 3.1 Vinyl Turntable Physics (`VinylHero.tsx`)
- **Spinning Disc**: Rotates at `33 RPM` using continuous CSS keyframe animation (`animate-spin-slow`, `spin 20s linear infinite`).
- **Tonearm Needle Placement**: Smooth spring transition moving the needle arm onto the vinyl record when playback starts:
  ```css
  transform-origin: top right;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  ```

### 3.2 Collapsible Tracklist Transition (`TracklistTable.tsx`)
- **Auto-Collapse Timer**: 3-second auto-collapse timer on track completion or idle state to keep the artist profile clutter-free.
- **Accordion Transition**: Height expand/collapse driven by CSS transition using `cubic-bezier(0.16, 1, 0.3, 1)`.

### 3.3 Interactive Cards & Buttons
- **Hover & Active Feedback**: Micro-interactions enforce tactile responsiveness:
  - Hover state: `hover:-translate-y-1 hover:shadow-lg`
  - Active tap state: `active:scale-95`
- **Focus Rings**: Accessible focus indicators (`focus-visible:ring-2 focus-visible:ring-[#FF1F00]`).

---

## 4. Icon Pipeline Standards

- All application icons use **Lucide React SVG** components (or safe dynamic initializers via `safeInitializeIcons()`).
- Icons are strictly sized in standard steps: `w-4 h-4` (small buttons/badges), `w-5 h-5` (navigation/actions), `w-6 h-6` (modal titles).
