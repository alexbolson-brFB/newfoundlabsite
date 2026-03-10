# Copilot Instructions for websiteFoundLAb-main

This is a React 19 project built with Vite, TypeScript, and Tailwind CSS. It is a modern, animation-heavy marketing website for "FoundLab Infrastructure".

## 1. Architecture & Core Technologies
- **Framework**: React 19 (Hooks, Functional Components) with Vite 6.
- **Language**: TypeScript 5.8 (Target ES2022). Strict typing is enforced.
- **Styling**: Tailwind CSS 3.4.
  - **Theme**: Custom 'navy', 'gold', and 'slate' color palettes in `tailwind.config.js`.
  - **Fonts**: 'Inter' (sans) and 'Cormorant Garamond' (serif).
  - **Icons**: `lucide-react`.
- **Animation**: `framer-motion` (v12) is used extensively for complex, staggered, and scroll-linked animations.
- **Routing**: `react-router-dom` v7.
  - **Hybrid Approach**: The homepage (`HomeContent` in `App.tsx`) uses Hash navigation (`#section-id`) for scrolling to sections. Dedicated pages (e.g., `/about`) use standard route paths.
- **State Management**: React Context API.
  - `LanguageContext`: Handles internationalization (EN/PT) and exposes a typed `t` object for translations.

## 2. Project Structure
- `App.tsx`: Main entry point. Contains the root layout (`Layout`), global providers, and routing logic.
- `components/`: Reusable UI components and landing page sections (e.g., `NewHero.tsx`, `CommandMenu.tsx`).
- `contexts/`: React Context definitions (e.g., `LanguageContext.tsx`).
- `pages/`: Standalone page components (e.g., `StaticPage.tsx`).
- `routes/`: Route definitions (`pageRoutes.ts`).
- `public/`: Static assets (images, logos).

## 3. Key Conventions & Patterns
- **Imports**: 
  - Supports path alias `@/*` resolving to root `./*`, but relative imports (`../`) are also common.
  - Images can be imported directly (e.g., `import heroVisual from '../images/hero_visual.png'`) or referenced from public (e.g., `'/google_select_badge.png'`).
- **Styling Strategy**: 
  - Use Tailwind utility classes for layout, spacing, and typography.
  - Use `bg-navy-950` or `bg-[#050a14]` for deep dark backgrounds.
  - Use `text-gold-400` or `text-slate-200` for text hierarchy.
- **Animation Pattern**:
  - Define `Variants` outside the component when possible for cleaner code.
  - Use `AnimatePresence` for mounting/unmounting transitions.
  - Leverage `staggerChildren` for sequential text/element reveals.
- **Internationalization (i18n)**:
  - Do NOT hardcode text in components.
  - Use `const { t } = useLanguage()` to access translations.
  - Define new interfaces in `LanguageContext.tsx` when adding new text sections.
- **Navigation**:
  - For on-page navigation, use `handleNav('#id')` which implements smooth scrolling.
  - The `CommandMenu` component (`Ctrl+K`) acts as a global navigation controller.

## 4. Development Workflow
- **Run**: `npm run dev` (starts Vite server on port 3000).
- **Build**: `npm run build` (outputs to `dist/`).
- **Environment**: `GEMINI_API_KEY` is configured in `vite.config.ts` via `define` (exposed as `process.env.GEMINI_API_KEY`).

## 5. Critical Files
- `tailwind.config.js`: Consult for custom colors (`navy`, `gold`) and animations (`shimmer`, `scan`).
- `contexts/LanguageContext.tsx`: The source of truth for all text content.
- `App.tsx`: Controls the global layout structure (`PrivacyBlur`, `Header`, `Footer`).
