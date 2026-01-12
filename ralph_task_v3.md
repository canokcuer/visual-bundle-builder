# Task: V3 Bug Fixes - Visual Bundle Builder

## Context
Fixing 6 persistent bugs from v2. Focus ONLY on bug fixes, no new features.
File: `sections/visual-bundle-builder-v2.liquid`

## Success Criteria

### P1: Backdrop Fix (HIGH)
1. [ ] Change z-index from -1 to 998 in .wa-dock--expanded::before (~line 755)
2. [ ] Test: Dark backdrop visible on mobile when slider opens

### P2: Hexagon Emoji Fix (HIGH)
3. [ ] Distribute emojis at 25%, 50%, 75% along Bezier curve using quadratic formula
4. [ ] Reduce emoji size from 22px to 18px
5. [ ] Test: Zero emoji overlap on 375px screen

### P3: Add-to-Cart Position (MEDIUM)
6. [ ] Change from top: 50% + transform to bottom: 0.75rem, right: 0.75rem
7. [ ] Remove transform: translateY(-50%)
8. [ ] Test: Button in natural bottom-right position

### P4: Sepeti Onayla Fit (MEDIUM)
9. [ ] Reduce min-width from 120px to 90px
10. [ ] Add @media (max-width: 375px) with min-width: 80px, smaller padding/font
11. [ ] Test: Button fully visible on 375px screen

### P5: Bilim Section Collapse (MEDIUM)
12. [ ] Add CSS: max-height: 100px, overflow: hidden on .wa-science-content
13. [ ] Add .wa-science-content.expanded { max-height: 500px }
14. [ ] Add "Devamini Oku..." toggle button
15. [ ] Add click handler to toggle expanded class
16. [ ] Test: Long science text is collapsed by default with toggle

### P6: Product Page Intercept (HIGH)
17. [ ] Change == to === with String() coercion for variantId comparison
18. [ ] Use matchHandle() function for consistent handle normalization
19. [ ] Add null checks for variantId before comparison
20. [ ] Test: Product page add-to-cart opens bundle builder

### Final
21. [ ] All 84 unit tests pass (npm test)
22. [ ] Git commit with all fixes

## Test Command
```bash
npm test
```

## Files to Modify
- sections/visual-bundle-builder-v2.liquid (main file)

## Files to Read Before Each Iteration
- .ralph/v3/guardrails.md
- .ralph/v3/progress.md

## Constraints
- Keep ALL Turkish content intact
- Don't break existing functionality
- Run npm test after EVERY change
- Bug fixes only - no new features
- Don't modify test files
