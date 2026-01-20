# Cyrasoul Visual Bundle Builder

An interactive Shopify bundle builder for wellness supplements with gamification, synergy visualization, and tiered discounts.

![Tests](https://img.shields.io/badge/tests-84%20passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Core Functionality
- **Product Cards Grid** - Mobile-first responsive 2-column layout with lazy-loaded images
- **Kesfet Modal** - Full-screen product info with 4 tabs (Benefits, Ingredients, Science, Combinations)
- **Synergy Map** - SVG pentagon visualization with animated connection lines and emoji icons
- **Tiered Discounts** - 5-level discount system (15-30% based on quantity)
- **Achievement System** - 5 gamification achievements with unlock animations and confetti
- **Smart Recommendations** - Dynamic product suggestions based on current cart contents
- **Ritual Guide** - Time-based usage instructions (morning/noon/night)

### Mobile Experience
- **Collapsible Dock** - Bottom slider with swipe-up/down gestures
- **Safe Area Support** - Proper padding for notched devices
- **Touch Optimized** - Swipe gestures, haptic feedback, optimistic UI updates

### Desktop Experience
- **Sticky Sidebar** - Always-visible bundle overview alongside product grid
- **Hover States** - Rich interactions for product cards and buttons

### Integrations
- **Product Page Intercept** - Captures add-to-cart clicks on product pages
- **Cart Icon Intercept** - Mobile cart icon opens bundle builder instead of cart drawer
- **URL Parameter Auto-Add** - Deep linking with `?add=handle`
- **Shopify Cart Sync** - Real-time synchronization with Shopify cart API

### Synergy Map (Living Orbit)
- **Interactive Badges** - Clickable +/✓ badges on each product node
- **Grayscale States** - Unselected products shown in grayscale
- **Pentagon Layout** - 5 products arranged in visual pentagon formation
- **Connection Lines** - Animated dashed lines showing active synergies

## Screenshots

*Coming soon - Mobile dock, desktop sidebar, and synergy map visualizations*

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Shopify Liquid | Templating and theme integration |
| Vanilla JavaScript | Zero-dependency runtime |
| CSS Custom Properties | Theming and responsive design |
| Jest | Unit testing (84 tests) |
| Playwright | End-to-end testing |

## Installation

### 1. Add Section File
Copy `sections/visual-bundle-builder-v2.liquid` to your Shopify theme's `sections/` directory.

### 2. Configure in Theme Customizer
1. Go to **Online Store > Themes > Customize**
2. Add the "Bundle Builder v2" section to your desired page(s)
3. Select your product collection
4. Customize text labels (Turkish by default)

### 3. Add to Pages
The bundle builder can be added to:
- Home page
- Product pages (will intercept add-to-cart clicks)
- Dedicated bundle page

See [BUNDLE-BUILDER-SETUP.md](./BUNDLE-BUILDER-SETUP.md) for detailed setup instructions.

## Architecture

```
cyra1/
├── sections/
│   └── visual-bundle-builder-v2.liquid   # Main implementation (~4300 lines)
├── assets/js/bundle-builder/
│   ├── pricing.js                        # Discount calculations
│   ├── achievements.js                   # Gamification logic
│   ├── synergy.js                        # Product synergy detection
│   └── utils.js                          # Helper functions
├── tests/
│   ├── unit/                             # Jest unit tests
│   └── e2e/                              # Playwright E2E tests
└── .ralph/                               # Ralph methodology files
```

### State Management
```javascript
state = {
  items: [],           // Products in bundle
  isExpanded: false,   // Mobile dock expansion
  isMobile: boolean    // Responsive breakpoint
}
```

### Cart Integration
- `POST /cart/add.js` - Add items to cart
- `POST /cart/change.js` - Update quantities
- `GET /cart.js` - Sync state on page load

## The Ralph Methodology

This project was built using **Ralph** - an iterative AI-assisted development methodology designed for:

- **Progressive Problem-Solving** - Work through issues in focused iterations
- **Learning from Mistakes** - Document guardrails to prevent repeating errors
- **Persistent Progress** - Track state across multiple Claude Code sessions
- **Quality Gates** - All 84 tests must pass before marking work complete

### How Ralph Works

1. **Task Definition** - Define issues in `ralph_task.md`
2. **Guardrails** - Document rules learned from mistakes in `guardrails.md`
3. **Iteration** - Run `ralph.sh` to execute task with Claude Code
4. **Verification** - Tests run automatically after each iteration
5. **Progress Tracking** - Mark completed items in `progress.md`

### Guardrails Examples
```markdown
- Always run tests after changes (`npm test`)
- Keep Turkish content intact (ş, ğ, ü, ö, ç, ı, İ)
- Mobile-first approach (test at 375px first)
- Slider must block page scroll when open
```

## Testing

### Run Unit Tests
```bash
npm test              # Run all 84 unit tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

### Run E2E Tests
```bash
npm run test:e2e         # Headless browser tests
npm run test:e2e:headed  # Visible browser tests
npm run test:e2e:debug   # Debug mode
```

### Test Coverage
- **Target**: 80% coverage (branches, functions, lines, statements)
- **Categories**: Pricing, Achievements, Synergy
- **Devices**: iPhone 13, Pixel 5, Chrome, Safari

## Product Configuration

The bundle builder is configured for 5 Cyrasoul wellness products:

| Product | Category | Timing |
|---------|----------|--------|
| DailyGlow | Skin Care | Morning |
| MindFuel | Focus | Morning |
| DreamGlow | Sleep | Night |
| TheChill | Relaxation | Night |
| Reset Button | Detox | Noon |

## Discount Tiers

| Items | Discount | Turkish Badge |
|-------|----------|---------------|
| 1 | 0% | Başlangıç |
| 2 | 15% | %15 İkili Güç |
| 3 | 30% | %30 Popüler |
| 4 | 33% | %33 Pro |
| 5 | 35% | %35 Efsane |

**Quantity Discounts:** 3-5 of same product = 30% off, 6+ of same product = 35% off

## Synergy System

10 product pair synergies with unique benefits:

- **DailyGlow + DreamGlow** - "24 Saat Cilt" (24-Hour Skin)
- **DailyGlow + MindFuel** - "Power Morning" (Strong Morning)
- **DreamGlow + TheChill** - "Derin Uyku" (Deep Sleep)
- **MindFuel + TheChill** - "Denge Formulu" (Balance Formula)
- *...and 6 more combinations*

Each synergy displays:
- Animated connection line on synergy map
- Color-coded icon and label
- Detailed benefit explanation

## Achievement System

5 unlockable achievements with animations:

| Achievement | Requirement | Emoji |
|-------------|-------------|-------|
| First Step | Add 1 product | 🌱 |
| Power Duo | Add 2 products | ⚡ |
| Triple Threat | Add 3 products | 🔥 |
| Ritual Master | Add 4 products | ✨ |
| Wellness Architect | Add 5 products | 🏆 |

## Contributing

1. Run tests before committing: `npm test`
2. Follow the Ralph methodology for iterations
3. Turkish language for UI text, English for code/comments
4. Mobile-first development (test at 375px width)

## Version History

- **V16** - Synergy Map UX improvements (clickable badges, badge positioning, remove animations)
- **V15** - Cart icon redirect to bundle builder, Living Orbit grayscale states
- **V14** - Updated discount tiers (30%, 33%, 35%)
- **V13** - Mobile UX fixes (button positioning, scroll blocking)
- **V12** - Web scroll, styling, slider hierarchy
- **V11** - Same-page add-to-cart intercept
- **V3-V10** - Bug fixes and refinements
- **V2** - Complete rebuild with Kesfet cards, synergy map, achievements
- **V1** - Initial bundle builder

## License

MIT License - See [LICENSE](./LICENSE) for details.

---

Built with the Ralph Methodology using Claude Code
