# Design System Specification & Core Theme Pillars

This document establishes the foundational design system keywords, visual directives, and implementation principles for **Music Gallery Vision**. All UI components, page layouts, asset curation, and styling tokens must adhere to these 7 core pillars.

---

## Core Theme Keywords & Visual Directives

### 1. Editorial Typography Look (Estetika Tata Letak Majalah High-Fashion & Seni Rupa)
- **Concept**: High-impact editorial aesthetics inspired by high-fashion print magazines and fine art exhibition catalogs.
- **Typography Pairing**:
  - **Display / Editorial**: `Bodoni Moda` (Serif elegance) & `Inter` (Bold authoritative headline stance).
  - **Functional / Body**: `Outfit` (Clean, geometric, accessible sans-serif).
  - **Accent / Signature**: `Pinyon Script` (Luxury curation signature touches).
- **Implementation**: Dramatic typographic hierarchy, large headline scales, oversized drop caps, tight/loose letter spacing balance (tracking), and expressive headline treatments.

### 2. Neo-Minimalism / Stark Minimalist (Minimalis Berani dengan Kontras Tinggi)
- **Concept**: Bold, confident minimalism that eliminates non-essential visual noise while emphasizing sharp contrast and intentional negative space.
- **Visual Stance**: Stark black and off-white contrast punctuated by single high-intensity accent focal points (`#FF1F00` / Gallery Red).
- **Implementation**: Clean borders, high contrast ratios, deliberate whitespace, geometric simplicity, and uncluttered functional components.

### 3. Auditorial Look (Kesan Visual "Berbunyi" & Karakter Musik Kultural)
- **Concept**: Visual design elements that evoke acoustic textures, musical rhythm, sound waves, and cultural heritage resonance.
- **Visual Cues**: Sound wave micro-patterns, equalizer motion indicators, vinyl groove motifs, typographic rhythm, and cultural heritage acoustic references (e.g., *Sound of Malang*).
- **Implementation**: Interactive audio visualizers, rhythmic hover state micro-animations, audio wave SVG accents, and sound-inspired state indicators.

### 4. Off-White Canvas Palette (Skema Warna Kertas/Majalah Vintage Mewah)
- **Concept**: Tactile, organic background foundations reminiscent of premium vintage paper, newsprint, and art book canvas.
- **Color Palette**:
  - **Canvas Base**: `#F6F4EE` (Warm Off-White / Fine Paper Canvas).
  - **Stark Contrast Dark**: `#111111` (Deep Obsidian Ink).
  - **Primary Brand Accent**: `#FF1F00` (Vivid Gallery Red).
  - **Slate Neutral Stack**: `#1E293B` to `#94A3B8` (Refined Ink Shades).
  - **Glass Borders**: `rgba(255, 255, 255, 0.65)` to `rgba(255, 255, 255, 0.85)`.

### 5. Asymmetric Spatial Layout (Keseimbangan Dinamis & Ketegangan Visual Artistik)
- **Concept**: Breaking away from standard rigid left-to-right symmetry in favor of dynamic asymmetric balance that creates artistic visual tension.
- **Spatial Grid**: Off-center headline alignments, staggered card columns, asymmetrical split-screens, and floating offset hero elements.
- **Implementation**: Use asymmetric CSS grid structures, offset margins, varying element proportions, and dynamic diagonal visual paths.

### 6. Multi-Layer Depth / Overlapping Layer (Penumpukan Objek Visual Sumbu Z-Index)
- **Concept**: Dimensional layering where elements float, overlap, and intersect across z-index planes to form visual richness and tactile depth.
- **Layering Hierarchy**:
  1. Base Off-White Canvas & Subtle Mesh Gradients (`z-0`)
  2. Background Editorial Typography & Full-bleed Imagery (`z-10`)
  3. Glassmorphic Panels & Translucent Shells (`z-20`)
  4. Floating Action Cards, Overlapping Artwork & Badges (`z-30`)
  5. Interactive Overlay Drawers, Modals & Floating Tooltips (`z-50`)

### 7. Swiss Design Influence (Grid Disiplin & Fungsionalitas Murni)
- **Concept**: Rooted in International Typographic Style (Swiss Style)—strict grid alignment, high legibility, clean spatial hierarchy, and pure unadorned functionality.
- **Rules**:
  - Rigid baseline and grid alignment despite asymmetric compositions.
  - Objective visual communication without superfluous decoration.
  - Clear structural grid system guiding content navigation and scanning.

---

## Asset Curation & Codebase Guidelines

- **Image & Visual Assets**: High-contrast, monochromatic or richly toned editorial portraiture, vinyl textures, and acoustic instrument photography.
- **UI Components**: Must leverage standardized tokens from `src/presentation/styles/theme.ts` and `src/presentation/styles/main.css`.
- **Documentation**: Refer to this specification for all future UI additions, refactoring tasks, and component design token creations.
