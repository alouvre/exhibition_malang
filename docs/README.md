# Sound of Malang — Museum Musik Indonesia (MMI) Digital Exhibition

> A production-grade digital exhibition web application honoring legendary musicians from Malang, East Java, hosted by Museum Musik Indonesia (MMI).

---

## 1. Project Identity & Architecture

**Music Gallery Vision** is built using **Clean Architecture** and **Feature-Driven Modular Presentation**. The codebase splits presentation views into 4 domain-driven feature modules, leverages dynamic route code-splitting via `React.lazy()`, and features a persistent YouTube audio engine singleton.

### Tech Stack
- **Framework**: React 18 (TypeScript)
- **Bundler & Tooling**: Vite 5
- **Routing**: React Router DOM v6
- **Styling & System**: Tailwind CSS, Custom Glassmorphism Theme Tokens
- **Icons & Motion**: Lucide React, Framer Motion
- **Media Engine**: YouTube IFrame API Singleton

---

## 2. Directory Structure

```
Music_Gallery_Vision/
├── docs/                               # Production technical documentation
│   ├── ARCHITECTURE.md                 # System architecture & lifecycle specs
│   ├── BACKEND_DATA_MODEL.md           # Schema definitions & REST API contract
│   ├── DATA_MODELS_AND_STORES.md       # Custom hooks & state contracts
│   ├── DESIGN_SYSTEM.md                # Design tokens, typography & motion specs
│   └── README.md                       # Project overview & developer guide
├── public/                             # Static public assets
│   └── assets/                         # Musician archival images & logos
├── src/
│   ├── infrastructure/                 # Third-party integrations (IconService)
│   ├── presentation/
│   │   ├── components/                 # Global UI shell components (Sidebar, Header, etc.)
│   │   ├── context/                    # Persistent AudioPlayerContext engine
│   │   ├── data/                       # Musician static registries & mock stores
│   │   ├── modules/                    # Feature-driven domain modules
│   │   │   ├── home/                   # Vinyl hero & showcase section
│   │   │   ├── musician-profile/       # Bio, tracklist, archival gallery modal
│   │   │   ├── artist-catalog/         # Roster grid, multi-parameter filter hook
│   │   │   └── about/                  # MMI curatorial statement
│   │   ├── shared/                     # Cross-module shared components (MusicianCard)
│   │   ├── styles/                     # Design tokens & global Tailwind CSS
│   │   ├── utils/                     # DOM helpers & stylesheet engine
│   │   ├── views/                      # MainView shell orchestrator
│   │   └── main.tsx                    # Lifecycle entry point with readyState guard
│   └── index.css                       # Base CSS entry
├── package.json                        # Scripts & dependencies
├── tsconfig.json                       # TypeScript compiler settings & `@/*` path alias
└── vite.config.ts                      # Vite build configuration
```

---

## 3. Getting Started

### Environment Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
```bash
# Clone repository and install dependencies
git clone https://github.com/alouvre/exhibition_malang.git
cd Music_Gallery_Vision
npm install
```

### Development Server
```bash
# Launch local development server with HMR
npm run dev
```

### Type Checking & Production Build
```bash
# Run TypeScript compilation dry-run check
npx tsc --noEmit

# Build production bundle with route code-splitting
npm run build
```

---

## 4. Development & Refactoring Guidelines

- **Zero UI & Logic Regression Policy**: Any structural refactoring must preserve exact HTML IDs (`#showcase-icons`, `#custom-placeholder-view`), Tailwind CSS classes, routing handoffs (`location.state`), and persistent audio playback state.
- **Path Alias Standard**: Always use `@/*` path aliases (e.g., `@/presentation/modules/home`) instead of deep relative paths (`../../..`).
- **Commit Conventions**: Follow Conventional Commits format (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
