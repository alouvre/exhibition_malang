# Sound of Malang — Museum Musik Indonesia (MMI) Digital Exhibition

> A production-grade digital exhibition web application honoring legendary musicians from Malang, East Java, hosted by Museum Musik Indonesia (MMI).

---

## 1. Project Identity & Architecture

**Music Gallery Vision** is built using **Clean Architecture** and **Feature-Driven Modular Presentation**. The codebase splits presentation views into 4 domain-driven feature modules, unifies shared UI controls under `src/presentation/shared/components/`, leverages dynamic route code-splitting via `React.lazy()`, and features a persistent YouTube audio engine singleton.

### Tech Stack
- **Framework**: React 18 (TypeScript)
- **Bundler & Tooling**: Vite 5
- **Routing**: React Router DOM v6 (with `<ErrorBoundary>` and wildcard 404 fallback)
- **State & Domain**: Clean Domain Models (`src/domain/models/Musician.ts`), Custom Hooks (`useMusicianFilter`, `useDocumentTitle`)
- **Styling & System**: Tailwind CSS, Custom Glassmorphism Theme Tokens
- **Icons & Motion**: Lucide React, Framer Motion
- **Media Engine**: YouTube IFrame API Singleton Engine

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
│   ├── domain/                         # Core domain entities & models
│   │   └── models/                     # Musician.ts entity schemas & index.ts barrel
│   ├── infrastructure/                 # Third-party integrations (FontService, IconService)
│   ├── presentation/
│   │   ├── context/                    # Persistent AudioPlayerContext engine
│   │   ├── data/                       # Musician static registries (musiciansRegistry.ts)
│   │   ├── hooks/                      # Shared presentation hooks (useDocumentTitle)
│   │   ├── modules/                    # Feature-driven domain modules
│   │   │   ├── home/                   # Vinyl hero & showcase section
│   │   │   ├── musician-profile/       # Bio, tracklist, archival gallery modal
│   │   │   ├── artist-catalog/         # Roster grid, multi-parameter filter hook
│   │   │   └── about/                  # MMI curatorial statement
│   │   ├── shared/                     # Unified shared UI components & barrel export
│   │   │   └── components/             # Header, Sidebar, ErrorBoundary, MusicianCard, etc.
│   │   ├── styles/                     # Design tokens & global Tailwind CSS
│   │   ├── utils/                      # DOM helpers, stylesheet engine, resolveAssetPath
│   │   ├── views/                      # MainView orchestrator & NotFoundView 404
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

## 4. Key Resiliency & Architectural Features

- **Route-Level Error Isolation**: All routes are protected inside `<ErrorBoundary>` containers to prevent unhandled component crashes from taking down the app shell.
- **404 Not Found Handling**: Invalid URLs and unknown artist slugs trigger an editorial [`NotFoundView`](file:///d:/Workspace/Music_Gallery_Vision/src/presentation/views/NotFoundView.tsx) fallback screen.
- **Dynamic SEO Tab Titles**: `useDocumentTitle` updates browser tab titles dynamically on page navigation.
- **Zero-Regression Refactoring Policy**: Strict preservation of HTML anchor IDs (`#showcase-icons`, `#custom-placeholder-view`), Tailwind utility classes, and persistent audio engine state.
