# Guardrails - Read Before Every Iteration

These are rules learned from past mistakes. Follow them to avoid repeating errors.

## Critical Rules

### Always run tests after changes
- Before marking anything done, run `npm test`
- If tests fail, fix them before moving on

### Don't modify test files
- Tests define expected behavior
- Changing tests to make them pass is not allowed

### Keep Turkish content intact
- All user-facing strings are in Turkish
- Don't translate or modify Turkish text
- Turkish special characters: ş, ğ, ü, ö, ç, ı, İ

### Preserve public API
- Don't rename exported functions in JS modules
- Don't change function signatures

### Focus on v2 ONLY
- Only modify `visual-bundle-builder-v2.liquid`
- Do NOT touch `visual-bundle-builder.liquid` (v1)

### Mobile-first approach
- Test on 375px width first
- Common mobile widths: 375px, 390px, 414px
- Desktop widths: 1280px, 1440px

### Hexagon is CRITICAL
- The hexagon emoji overlap issue is the #1 priority
- Make hexagon larger, ensure no emoji overlap
- Test thoroughly on multiple screen sizes

## Learned Signs (Round 2)

### Sign: Don't over-shrink elements
- Iteration: Round 1 -> Round 2
- Problem: Product cards were made too small on both web and mobile
- Rule: When reducing size, check that elements remain usable and readable

### Sign: Slider must block page scroll
- Iteration: Round 2
- Problem: When slider is open, background page still scrolls on touch
- Rule: Add `overflow: hidden` to body when slider is expanded, use `e.preventDefault()` on touch events

### Sign: Height matters as much as width
- Iteration: Round 2
- Problem: Mobile cards made wide but squished in height
- Rule: Maintain natural aspect ratios when resizing elements

### Sign: Test swipe on real devices
- Iteration: Round 2
- Problem: Swipe gestures interfere with page scroll
- Rule: Swipe-to-open should capture touch events completely, not compete with page scroll

### Sign: Check safe areas on mobile
- Iteration: Round 2
- Problem: "Sepeti Onayla" button cut off by screen edge curves
- Rule: Use safe-area-inset padding for elements near screen edges

### Sign: Optimize before shipping
- Iteration: Round 2
- Problem: +/- buttons feel slow even though they work
- Rule: Show immediate UI feedback, debounce API calls separately
