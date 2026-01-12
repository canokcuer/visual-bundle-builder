# V3 Guardrails - Bug Fixes Only

## Critical Rules

### Always run tests after changes
- Before marking anything done, run `npm test`
- All 84 tests must pass

### Don't modify test files
- Tests define expected behavior
- Changing tests to make them pass is not allowed

### Keep Turkish content intact
- All user-facing strings are in Turkish
- Don't translate or modify Turkish text

### Focus on v2 file ONLY
- Only modify `visual-bundle-builder-v2.liquid`
- Do NOT touch v1 or other files

### Bug fixes only - no new features
- This is a bug fix iteration
- Don't add new functionality
- Don't refactor unrelated code

## V3 Bug-Specific Rules

### Sign: z-index must be positive for visible overlays
- Problem: z-index: -1 puts backdrop behind page content
- Rule: Use z-index 998+ for overlays that need to be visible

### Sign: Distribute emojis along curves, not clustered
- Problem: Same position offset causes emoji overlap
- Rule: Use different curve positions (25%, 50%, 75%)

### Sign: Buttons should be in natural shopping positions
- Problem: Center-right positioning looks unnatural
- Rule: Add-to-cart buttons go bottom-right

### Sign: Test on smallest screen first (375px)
- Problem: Fixed sizes overflow on small screens
- Rule: Use relative units and media queries for small screens

### Sign: Use strict equality for ID comparisons
- Problem: Loose equality (==) causes type coercion bugs
- Rule: Always use String(a) === String(b) for variant IDs
