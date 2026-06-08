---
"@gurgelio/react-map": major
---

**Breaking change:** removed the `colors` prop in favor of `pathClassName` and `pathStyle`.

Styling is now applied directly to each `<path>` using standard React patterns:

- **`pathStyle`** — inline styles (`React.CSSProperties`) or a function receiving `{ state, isHovered, isSelected }`. Merges on top of the library defaults.
- **`pathClassName`** — CSS classes (string or function with the same params). Works well with Tailwind via `data-hovered` and `data-selected` attributes on each path.

**Migration:**

```tsx
// Before
<SingleSelectMap map={world} colors={{ fill: '#e2e8f0', stroke: '#64748b' }} />
<SingleSelectMap map={world} colors={{ fill: ({ isSelected }) => (isSelected ? '#2563eb' : '#e2e8f0') }} />

// After
<SingleSelectMap map={world} pathStyle={{ fill: '#e2e8f0', stroke: '#64748b' }} />
<SingleSelectMap map={world} pathStyle={({ isSelected }) => ({ fill: isSelected ? '#2563eb' : '#e2e8f0' })} />

// Tailwind
<SingleSelectMap
  map={world}
  pathClassName="fill-slate-200 stroke-slate-400 hover:fill-sky-300 data-selected:fill-sky-600"
/>
```
