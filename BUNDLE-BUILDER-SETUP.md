# Cyrasoul Visual Bundle Builder - Setup Guide

## Quick Start

### 1. Upload Files
Upload these files to your Shopify theme:
- `sections/visual-bundle-builder-v2.liquid` → Theme > Edit Code > Sections

### 2. Add Product Tags
Add these tags to your products in Shopify Admin > Products:

| Product | Tag to Add |
|---------|------------|
| DreamGlow | `category:Uyku & Güzellik` |
| DailyGlow | `category:Güzellik & Enerji` |
| MindFuel | `category:Odaklanma & Enerji` |
| TheChill | `category:Sakinlik & Denge` |
| Reset Button | `category:Detoks` |

### 3. Create a Collection
1. Go to Products > Collections
2. Create a new collection called "Bundle Products" (handle: `bundle-products`)
3. Add all 5 Cyrasoul products to this collection

### 4. Add Section to Theme
**Option A - Add to Homepage:**
1. Online Store > Themes > Customize
2. Add section > "Visual Bundle Builder"
3. Select your "Bundle Products" collection
4. Save

**Option B - Create Dedicated Page:**
1. Create a new page template
2. Add the Visual Bundle Builder section
3. Assign template to a new page

---

## Customization

### Section Settings (Theme Editor)
- **Eyebrow Text**: Small text above title (e.g., "Ritüelinizi Oluşturun")
- **Title**: Main heading (e.g., "Wellness Architect")
- **Subtitle**: Description text
- **Collection**: Select your bundle products collection
- **Product Limit**: 3-12 products to display

### Synergy Discounts
Edit the `SYNERGY_CONFIG` in the JavaScript to change discount tiers:

```javascript
const SYNERGY_CONFIG = {
  1: { percent: 20, text: 'Başlangıç', discount: 0 },
  2: { percent: 40, text: '%15 İkili Güç', discount: 0.15 },
  3: { percent: 60, text: '%30 Popüler', discount: 0.30 },
  4: { percent: 80, text: '%33 Pro', discount: 0.33 },
  5: { percent: 100, text: '%35 Efsane', discount: 0.35 }
};
```

### Color Customization
Update CSS variables at the top of the style block:

```css
:root {
  --wa-amber: #D97706;        /* Primary brand color */
  --wa-amber-light: #F59E0B;  /* Lighter accent */
  --wa-amber-dark: #B45309;   /* Darker accent */
  --wa-dark: #1F2937;         /* Text color */
  --wa-success: #10B981;      /* Discount/success color */
}
```

### Turkish Translations
Replace these English strings in the HTML:

| English | Turkish |
|---------|---------|
| "Start Your Ritual" | "Ritüelinize Başlayın" |
| "Your Ritual Box" | "Ritüel Kutunuz" |
| "Drag products here" | "Ürünleri buraya sürükleyin" |
| "Synergy Level" | "Sinerji Seviyesi" |
| "Start Your Journey" | "Yolculuğunuza Başlayın" |
| "Good Start" | "İyi Başlangıç" |
| "Better Together" | "Birlikte Daha İyi" |
| "Ultimate Ritual" | "Mükemmel Ritüel" |
| "Subtotal" | "Ara Toplam" |
| "Bundle Discount" | "Paket İndirimi" |
| "Total" | "Toplam" |
| "Add to Cart" | "Sepete Ekle" |

---

## Features

### Mobile (< 768px)
- 2-column product grid
- Tap-to-add interaction
- Flying bottle animation
- Sticky bottom dock
- Expandable cart summary
- Haptic feedback (on supported devices)

### Desktop (≥ 768px)
- 3-column product grid
- Drag-and-drop interaction
- Animated box flaps
- Sticky sidebar cart
- Hover effects on products

### Gamification
- Visual synergy progress bar
- Tiered discount messaging
- Particle celebration at 100%
- Maximum 3 products per bundle

---

## Troubleshooting

### Products not showing?
- Verify collection handle matches section setting
- Check that collection is published
- Ensure products have images

### Flying animation not working?
- Check browser console for JavaScript errors
- Ensure no CSS conflicts with `position: fixed`

### Discounts not applying?
- Discounts are visual only in the bundle builder
- For actual checkout discounts, create a Shopify Script or use discount codes
- Consider using Shopify's automatic discount feature for bundles

### Mobile dock hidden?
- Check z-index conflicts with other elements
- Verify no `overflow: hidden` on parent containers

---

## Advanced: Actual Discount Implementation

The bundle builder shows visual discounts. To apply real discounts at checkout:

### Option 1: Discount Codes
Create automatic discount codes:
- `BUNDLE2` - 10% off 2+ items
- `BUNDLE3` - 15% off 3+ items

### Option 2: Shopify Scripts (Plus only)
```ruby
DISCOUNTS = {
  2 => 10,
  3 => 15
}

bundle_count = Input.cart.line_items.count { |li| li.variant.product.tags.include?('bundle-eligible') }

if bundle_count >= 2
  discount = DISCOUNTS[bundle_count] || DISCOUNTS[3]
  Input.cart.line_items.each do |li|
    if li.variant.product.tags.include?('bundle-eligible')
      li.change_line_price(li.line_price * (1 - discount/100.0), message: "Bundle discount")
    end
  end
end
```

### Option 3: Cart Transform Function (Checkout Extensions)
For Shopify Plus stores using checkout extensibility.

---

## Performance Notes

- Uses vanilla JavaScript (no heavy frameworks)
- CSS animations use `transform` and `opacity` for 60fps
- Images lazy-loaded
- Minimal DOM manipulation
- requestAnimationFrame for smooth animations

---

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Chrome for Android 80+
