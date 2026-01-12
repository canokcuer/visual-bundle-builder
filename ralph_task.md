# Task: Fix UI/UX Issues in Visual Bundle Builder v2

## Context
This is a Shopify Visual Bundle Builder for wellness supplements. Focus ONLY on:
- `sections/visual-bundle-builder-v2.liquid` - Main v2 template
- `assets/js/bundle-builder/` - JavaScript modules

## Success Criteria

---

### MOBILE FIXES (Priority: High)

#### 1. [x] Slider Swipe-to-Open
- Currently: Slider only opens when clicking
- Required: Slider should ALSO open when user swipes UP on the slider handle/area
- Implementation: Add touch event listeners for swipe-up gesture

#### 2. [x] Product Page Add-to-Cart Integration
- Currently: Add-to-cart on product pages goes to cart
- Required: When "Add to Cart" is clicked on ANY product page (outside this module), open the bundle builder slider instead of cart page
- Note: This affects product pages, not the bundle builder itself

#### 3. [x] Slider Bottom Bar Spacing Fix
- Currently: Price element on left doesn't fit, "Sepeti Onayla" button too far right
- Required:
  - Move price element slightly RIGHT so it fits properly
  - Make "Sepeti Onayla" button BIGGER
  - Move "Sepeti Onayla" button slightly LEFT
- Test: All elements should be visible without overflow on 375px width screen

#### 4. [x] Product Info +/- Buttons NOT WORKING (BUG FIX)
- Currently: In "Keşfet" (Explore) section, + and - icons show but don't add/remove products
- Required: Make these buttons functional - clicking + should add product, clicking - should remove
- This is a JavaScript bug - buttons exist but click handlers don't work

#### 5. [x] Product Detail Content Enhancement
- For EACH product (DreamGlow, DailyGlow, MindFuel, TheChill, Reset Button):
  - [ ] Add detailed "Fayda" (Benefits) content from product pages
  - [ ] Add "İçindekiler" (Ingredients) with AMOUNTS (e.g., "500mg", "30ml")
  - [ ] Add "Bilim" (Science) explanations
  - [ ] Add "Kombinasyon" (Combination) suggestions
  - [ ] Expand "Nasıl Çalışır" (How it works) - currently too empty, add multiple content items

#### 6. [x] HEXAGON EMOJI OVERLAP - CRITICAL
- Currently: Emojis overlap each other, hexagon too small
- Required:
  - Make hexagon container LARGER
  - Ensure emojis NEVER overlap (proper spacing/hierarchy)
  - Emojis should fit within their designated areas
  - Test on 375px, 390px, 414px width screens
- This is the MOST CRITICAL mobile fix

#### 7. [x] Product Card Size Reduction (Pre-Slider View)
- Currently: Product cards too large in the main view (before slider opens)
- Required: Reduce product card size by 30-35%
- Affects: The product listing area visible BEFORE the slider is opened
- Keep proportions, just scale down

---

### WEB/DESKTOP FIXES (Priority: High)

#### 8. [x] Hexagon Container Size (Web)
- Currently: Hexagon with "Birlikte Kullanım" icons doesn't fit screen
- Required: Expand the hexagon container area to fit properly
- Test: Should display correctly on 1280px+ screens

#### 9. [x] Empty Emoji Slots Issue
- Currently: 5 empty emoji slots at top, detailed descriptions below
- Required: Either fill the emoji slots OR remove them if not needed
- Investigate why emojis are empty and fix the root cause

#### 10. [x] Explore Section "Add to Cart" Button Redesign
- Currently: Button is too big and doesn't look right
- Required:
  - Make it a standard, smaller button
  - Position it higher (more towards top)
  - Ensure ADD functionality works (currently might be broken)
  - Ensure REMOVE functionality works
  - Test both add and remove thoroughly

#### 11. [x] Match Web Layout to Mobile Hierarchy
- Currently: Web has different flow than mobile
- Required: Update web to match mobile's updated hierarchy:
  - Discount boxes should be moved UP (like mobile)
  - Flow indicators should match mobile style
  - Discount info and box info layout should match mobile

#### 12. [x] "Ödemeye Git" / "Sepeti Onayla" Button Position (Web)
- Currently: Button is too low on the page
- Required: Move checkout button to more visible/logical position
- Suggestion: Consider moving "Birlikte Kullanım" and "Kullanım Rehberi" sections BELOW products
- "Sepeti Onayla" should be near the top/visible area

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
- `assets/js/bundle-builder/*.js` (if button handlers need fixing)

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

## How to Verify (Manual Testing Checklist)
After making changes, verify:
- [ ] Mobile: Swipe up opens slider
- [ ] Mobile: +/- buttons in Keşfet section add/remove products
- [ ] Mobile: Hexagon emojis don't overlap
- [ ] Mobile: Product cards are smaller (30-35% reduction)
- [ ] Mobile: Bottom bar elements fit properly
- [ ] Web: Hexagon container fits screen
- [ ] Web: Add/remove buttons work in explore section
- [ ] Web: Checkout button is visible without scrolling far
- [ ] All: `npm test` passes

## Definition of Done
All numbered checkboxes (1-12) above are addressed AND `npm test` passes.
