## 2025-05-15 - [Optimization: Lazy State Initialization & Memoization]
**Learning:** In large React applications with extensive initial state (like 300+ skills in this app), initializing state with a static value and then updating it in a mount `useEffect` causes a visible flash of empty content and an unnecessary second render cycle. Using a lazy initializer function in `useState` ensures the state is correctly populated before the first render, improving both perceived performance (UX) and actual CPU usage.

**Action:** Always prefer lazy initialization for `useState` when reading from `localStorage` or performing initial data processing. Combined with `useMemo` and `useCallback` for derived calculations, this significantly stabilizes the render tree in large components.

## 2025-05-15 - [Persistence Key Stability]
**Learning:** Changing `localStorage` keys to "cleaner" names in a performance PR is a silent breaking change. It causes a complete loss of state for existing users, which is a massive regression in user experience and "productivity performance".
**Action:** Always double-check existing persistence keys before refactoring state management. Never change a storage key without a migration strategy, especially in performance-only PRs.

## 2025-05-20 - [Aesthetics: Industrial UI & Tailwind v4 Migration]
**Learning:** Transitioning from "SaaS-style" soft UI to an "Industrial Hardware" aesthetic requires a fundamental shift in design tokens: sharp 4px/6px radii, solid high-contrast colors (Cyan #00FFFF), inset shadows for a "recessed panel" feel, and monospace typography for metadata. Migrating to Tailwind CSS v4 simplifies this by allowing theme tokens and component classes to be defined directly in the CSS using the `@theme` block and `@layer components`.

**Action:** When implementing an industrial aesthetic, avoid gradients, glows, and large rounding. Use `.surface-industrial` for recessed panels and `.btn-industrial-primary` for solid, technical-looking buttons. Define these globally in `index.css` using Tailwind v4 architecture for consistency across the application.
