# Task: Fix UI/UX Issues in Visual Bundle Builder v2 - Round 2

## Context
This is a Shopify Visual Bundle Builder for wellness supplements. Focus ONLY on:
- `sections/visual-bundle-builder-v2.liquid` - Main v2 template
- `assets/js/bundle-builder/` - JavaScript modules

## Success Criteria

---

### WEB FIXES (Priority: High)

#### 1. [ ] "Nasil Calisir" (How It Works) Section Overflow - WEB
- Currently: Benefits don't fit in the small box, content overflows
- Required:
  - Split benefits into multiple smaller pieces for each product
  - Each benefit should fit properly in its container
  - Clean, simple UI/UX - more minimalist design
  - Consider tabs or accordion for multiple benefits per product
- Test: All benefit text should be fully visible without overflow on 1280px+ screens

#### 2. [ ] Web Product Card Size Too Small
- Currently: The 2+2+1 product cards on the left (before slider) are too small
- Required:
  - Enlarge product card size on web/desktop
  - Cards were over-shrunk in previous iteration
  - Keep readable, balanced proportions
- Test: Product cards should be clearly visible and readable on 1280px+ screens

---

### GENERAL FIXES (Both Web & Mobile)

#### 3. [ ] Achievement/Unlock System Rework
- Currently: 5 generic unlock animations that aren't meaningful
- Required:
  - REMOVE the 5 generic unlock achievements (first-step, power-duo, etc.)
  - KEEP ONLY the meaningful emoji-based synergy unlocks:
    - "Zen Performans" (DreamGlow + TheChill)
    - "Berrak Zihin" (MindFuel + TheChill)
    - "Sabah Enerjisi" (DailyGlow + MindFuel)
    - etc.
  - These are the ones shown at the bottom with emoji descriptions
- Test: Only meaningful synergy combinations should trigger unlock animations

#### 4. [ ] Product Description Header Styling
- Currently: Title and description text use same font/style
- Required:
  - Make headers BOLD
  - Add relevant EMOJI next to each header
  - Clear visual distinction between title and description
  - Applies to both single product descriptions AND combination descriptions
- Example: "DailyGlow - Gunduz enerji ve cilt destegi" should have bold "DailyGlow" with emoji
- Test: Headers should be visually distinct from description text

---

### MOBILE FIXES (Priority: High)

#### 5. [ ] "Nasil Calisir" (How It Works) Section Overflow - MOBILE
- Currently: Benefits don't fit in the small box, content overflows
- Required:
  - Same as web fix - split benefits into smaller pieces
  - Ensure proper fit on mobile screens (375px, 390px, 414px)
  - Clean, simple, readable UI

#### 6. [ ] Mobile Product Card Proportions
- Currently: Cards are too wide but height is too short (squished)
- Required:
  - Increase HEIGHT of product cards (not just width)
  - More natural, balanced proportions
  - Not huge, but properly proportioned
  - Cards should feel natural in vertical scroll flow
- Test: Product cards should have balanced width:height ratio on 375px screens

#### 7. [ ] Kesfet +/- Button Response Speed
- Currently: Adding/removing products via +/- is very slow
- Required:
  - Optimize the quantity change response time
  - Instant visual feedback on button press
  - Debounce cart updates but show immediate UI change
- Test: +/- buttons should feel instant (< 100ms visual response)

#### 8. [ ] "Sepeti Onayla" Button Fit in Slider
- Currently: Button doesn't fit properly, screen edge is slightly curved/flat
- Required:
  - Shift button slightly LEFT to fit within safe area
  - Account for device screen edge curves (notch area)
  - Ensure full button visibility on all mobile devices
- Test: Button fully visible and tappable on iPhone (with notch) and Android devices

#### 9. [ ] Hexagon Emoji Overlap - CRITICAL
- Currently: Emojis still overlap each other despite previous fixes
- Required:
  - Implement proper spacing/sizing to prevent ANY emoji overlap
  - Consider: smaller emoji size, larger hexagon, different positioning
  - Ensure clear visibility of each emoji
- Test: Zero emoji overlap on 375px, 390px, 414px screens

#### 10. [ ] Slider Swipe Behavior - CRITICAL
- Currently: Multiple swipe issues:
  - When slider is OPEN and swiping DOWN, the BACKGROUND PAGE scrolls (wrong)
  - When slider is CLOSED and swiping UP, the PAGE scrolls instead of opening slider
  - Overall swipe gesture feels unnatural and hard to use
- Required:
  - When slider is OPEN: Block background page scroll completely
  - When slider is CLOSED: Swipe UP should ONLY open slider, not scroll page
  - Smooth, natural animation for open/close
  - Clear gesture boundaries
- Implementation hints:
  - Add `overflow: hidden` to body when slider is expanded
  - Use `e.preventDefault()` on touch events when appropriate
  - Consider touch-action CSS property
- Test: Slider should open/close smoothly without any background page scroll interference

---

## Test Commands
```bash
# Run unit tests (MUST PASS after every change)
npm test

# Check for JS syntax errors
node --check assets/js/bundle-builder/*.js
```

## Files to Focus On
- `sections/visual-bundle-builder-v2.liquid` (main file - HTML/CSS/JS)
- `assets/js/bundle-builder/*.js` (if needed for performance/logic)

## Files to IGNORE
- `sections/visual-bundle-builder.liquid` (v1 - deprecated)
- `sections/cart-bundle-upsell.liquid`
- `tests/` (don't modify tests)
- `package.json`, `node_modules/`

## Constraints
- Keep ALL existing Turkish language content
- Don't break existing functionality
- Run `npm test` after EVERY change
- Test on mobile widths: 375px, 390px, 414px
- Test on desktop widths: 1280px, 1440px

## Priority Order
1. Slider swipe behavior (#10) - Most impactful UX issue
2. Hexagon emoji overlap (#9) - Visual clarity
3. Mobile product card proportions (#6) - Core layout
4. "Sepeti Onayla" button fit (#8) - Usability
5. Kesfet +/- speed (#7) - Performance feel
6. "Nasil Calisir" overflow (#1, #5) - Content fit
7. Web product card size (#2) - Desktop layout
8. Product header styling (#4) - Visual polish
9. Achievement rework (#3) - Feature refinement

## Definition of Done
All numbered checkboxes (1-10) above are addressed AND `npm test` passes.
