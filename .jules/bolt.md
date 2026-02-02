## 2025-05-15 - [Optimization: Lazy State Initialization & Memoization]
**Learning:** In large React applications with extensive initial state (like 300+ skills in this app), initializing state with a static value and then updating it in a mount `useEffect` causes a visible flash of empty content and an unnecessary second render cycle. Using a lazy initializer function in `useState` ensures the state is correctly populated before the first render, improving both perceived performance (UX) and actual CPU usage.

**Action:** Always prefer lazy initialization for `useState` when reading from `localStorage` or performing initial data processing. Combined with `useMemo` and `useCallback` for derived calculations, this significantly stabilizes the render tree in large components.

## 2025-05-15 - [Persistence Key Stability]
**Learning:** Changing `localStorage` keys to "cleaner" names in a performance PR is a silent breaking change. It causes a complete loss of state for existing users, which is a massive regression in user experience and "productivity performance".
**Action:** Always double-check existing persistence keys before refactoring state management. Never change a storage key without a migration strategy, especially in performance-only PRs.
