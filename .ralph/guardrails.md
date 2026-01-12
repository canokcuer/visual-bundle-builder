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

## Learned Signs (Add new ones below as mistakes happen)

<!--
When Ralph makes a mistake, add a sign here:

### Sign: [Short description]
- Iteration: [When this was learned]
- Problem: [What went wrong]
- Rule: [What to do instead]
-->
