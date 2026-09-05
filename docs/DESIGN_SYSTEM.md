# Museum Exhibition Design System & Visual Specification

## 1. Design Philosophy & Editorial Aesthetic

The visual language of **Music Gallery Vision** is rooted in **Swiss Editorial Typography** combined with **Minimalist Museum Archival Design**. The system evokes an immersive museum gallery experience with high-contrast monochrome palettes, warm paper canvas backgrounds (`#F6F4EE`), crimson accents (`#FF1F00`), and glassmorphic floating panels.

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

## 2. Design Tokens (`src/presentation/styles/theme.ts` & `src/presentation/utils/dom.ts`)

### 2.1 Color Palette

| Token Name | Hex / Class | Visual Role |
| :--- | :--- | :--- |
| **Canvas Warm Paper** | `#F6F4EE` | Main exhibition background canvas |
| **Monochrome Slate Heavy** | `stone-950` (`#0C0A09`) | Primary editorial headers & high-contrast cards |
| **Monochrome Slate Light** | `stone-100` (`#F5F5F4`) | Card backgrounds & subtle borders |
| **Museum Crimson Accent** | `#FF1F00` | Primary brand accent, active badges & play indicators |
| **Translucent Glass** | `rgba(255, 255, 255, 0.40)` | Glassmorphism floating panels with `backdrop-blur-xl` |

### 2.2 Canonical Media Fallback Token
Declared in [`src/presentation/utils/dom.ts`](file:///d:/Workspace/Music_Gallery_Vision/src/presentation/utils/dom.ts):

```typescript
export const DEFAULT_FALLBACK_IMAGE = "/assets/vinyl_record.jpg";
```

### 2.3 Shared UI Component Catalog
All shared components are centralized under [`src/presentation/shared/components/`](file:///d:/Workspace/Music_Gallery_Vision/src/presentation/shared/components/):

- `ErrorBoundary`: Fallback error container for unexpected runtime exceptions.
- `Header`: Editorial navigation bar with menu button, catalog titles, and route back handlers.
- `Sidebar`: Sliding desktop drawer menu for navigation and exhibition guides.
- `OverlayNavbar`: Floating bottom capsule navigation for smooth anchor jumps (`#showcase-icons`, `#timeline-section`).
- `InfoModal`: Minimalist modal dialog for onboarding instructions and exhibition metadata.
- `OnboardingCoachmark`: Interactive 3-step tour guide for exhibition visitors.
- `MobileFallbackScreen`: Mobile layout guard screen.
- `MusicianCard`: High-contrast card with editorial overlapping typography and full-bleed image.

---

## 3. Motion Specs & Micro-Interactions

### 3.1 Vinyl Turntable Physics (`VinylHero.tsx`)
- **Spinning Disc**: Rotates at `33 RPM` using continuous CSS keyframe animation (`animate-spin-slow`, `spin 20s linear infinite`).
- **Tonearm Needle Placement**: Smooth spring transition moving the needle arm onto the vinyl record when playback starts:
  ```css
  transform-origin: top right;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  ```

### 3.2 Collapsible Tracklist Transition (`TracklistTable.tsx`)
- **Auto-Collapse Timer**: 3-second auto-collapse timer on track completion or idle state to keep artist profiles clutter-free.
- **Accordion Transition**: Height expand/collapse driven by CSS transition using `cubic-bezier(0.16, 1, 0.3, 1)`.

### 3.3 Card Micro-Interactions & Asset Loading (`MusicianCard.tsx`)
- Hover state: `hover:-translate-y-1.5 hover:shadow-2xl`
- Active tap state: `active:scale-95`
- Image loading optimization: `<img loading="lazy" decoding="async" onError={handleImageError} />`
