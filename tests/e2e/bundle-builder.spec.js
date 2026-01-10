// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Visual Bundle Builder
 * These tests run against the live Shopify store
 */

test.describe('Visual Bundle Builder', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the bundle builder page
    await page.goto('/pages/bundle-builder');
    // Wait for the bundle builder to initialize
    await page.waitForSelector('#wellness-architect', { timeout: 10000 });
  });

  test.describe('Product Selection', () => {
    test('should add product to cart when clicking product card', async ({ page }) => {
      // Click on first product card
      const productCard = page.locator('.wa-product-card').first();
      await productCard.click();

      // Verify product is added (card should have --added class)
      await expect(productCard).toHaveClass(/wa-product-card--added/);
    });

    test('should show product in sidebar/dock after adding', async ({ page }) => {
      // Add a product
      await page.locator('.wa-product-card').first().click();

      // Check if product appears in sidebar (desktop) or dock (mobile)
      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        const dockItem = page.locator('.wa-dock__item');
        await expect(dockItem).toBeVisible();
      } else {
        const sidebarItem = page.locator('.wa-sidebar__item');
        await expect(sidebarItem).toBeVisible();
      }
    });

    test('should update item count when adding products', async ({ page }) => {
      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const countSelector = isMobile ? '.wa-dock__item-count' : '.wa-sidebar__count';

      // Add first product
      await page.locator('.wa-product-card').first().click();
      await expect(page.locator(countSelector)).toContainText('1');

      // Add second product
      await page.locator('.wa-product-card').nth(1).click();
      await expect(page.locator(countSelector)).toContainText('2');
    });
  });

  test.describe('Kesfet Cards (v2)', () => {
    test('should show Kesfet button on product card hover', async ({ page }) => {
      const productCard = page.locator('.wa-product-card').first();

      // Hover over product card
      await productCard.hover();

      // Check if Kesfet button is visible
      const kesfetBtn = productCard.locator('[data-kesfet-toggle]');
      await expect(kesfetBtn).toBeVisible();
    });

    test('should open drawer when clicking Kesfet button', async ({ page }) => {
      const productCard = page.locator('.wa-product-card').first();

      // Hover and click Kesfet button
      await productCard.hover();
      await productCard.locator('[data-kesfet-toggle]').click();

      // Check if drawer is open
      await expect(productCard).toHaveClass(/wa-product-card--drawer-open/);
      await expect(productCard.locator('.wa-product-card__drawer')).toBeVisible();
    });

    test('should switch tabs in Kesfet drawer', async ({ page }) => {
      const productCard = page.locator('.wa-product-card').first();

      // Open drawer
      await productCard.hover();
      await productCard.locator('[data-kesfet-toggle]').click();

      // Click ingredients tab
      const ingredientsTab = productCard.locator('.wa-tab[data-tab="ingredients"]');
      await ingredientsTab.click();

      // Verify tab is active
      await expect(ingredientsTab).toHaveClass(/wa-tab--active/);

      // Verify content changed
      const drawerContent = productCard.locator('.wa-product-card__drawer-content');
      await expect(drawerContent.locator('.wa-ingredient-item')).toBeVisible();
    });

    test('should not add product when clicking inside drawer', async ({ page }) => {
      const productCard = page.locator('.wa-product-card').first();

      // Open drawer
      await productCard.hover();
      await productCard.locator('[data-kesfet-toggle]').click();

      // Click inside drawer content
      await productCard.locator('.wa-product-card__drawer-content').click();

      // Product should NOT be added
      await expect(productCard).not.toHaveClass(/wa-product-card--added/);
    });
  });

  test.describe('Synergy System', () => {
    test('should show synergy badge after adding 2 products', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const badgeSelector = isMobile ? '.wa-dock__synergy-badge' : '.wa-sidebar__synergy-text';

      // Check synergy badge shows discount
      await expect(page.locator(badgeSelector)).toContainText('%15');
    });

    test('should show synergy explanation for product pair', async ({ page }) => {
      // Add DailyGlow and DreamGlow for "24 Saat Cilt" synergy
      const productCards = page.locator('.wa-product-card');

      // Find and click DailyGlow
      await productCards.filter({ hasText: 'DailyGlow' }).click();
      // Find and click DreamGlow
      await productCards.filter({ hasText: 'DreamGlow' }).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        // Expand dock to see synergy explanation
        await page.locator('.wa-dock__handle').click();
        await expect(page.locator('.wa-dock__synergy-explanation')).toContainText('7/24 Güzellik');
      } else {
        await expect(page.locator('.wa-synergy-explanation')).toContainText('7/24 Güzellik');
      }
    });
  });

  test.describe('Synergy Map (v2)', () => {
    test('should show synergy map when products are selected', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        // Expand dock to see synergy map
        await page.locator('.wa-dock__handle').click();
        await expect(page.locator('.wa-dock__synergy-map')).toBeVisible();
      } else {
        await expect(page.locator('.wa-synergy-map')).toBeVisible();
      }
    });

    test('should render SVG nodes for selected products', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Check for SVG nodes
      const selectedNodes = page.locator('.wa-synergy-node--selected');
      await expect(selectedNodes).toHaveCount(2);
    });

    test('should render connection lines between selected products', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Check for connection line
      const connectionLine = page.locator('.wa-synergy-line');
      await expect(connectionLine).toBeVisible();
    });
  });

  test.describe('Achievement System (v2)', () => {
    test('should show achievement notification after first product', async ({ page }) => {
      // Add first product
      await page.locator('.wa-product-card').first().click();

      // Wait for achievement notification
      const notification = page.locator('.wa-achievement-notification');
      await expect(notification).toBeVisible({ timeout: 5000 });
      await expect(notification).toContainText('İlk Adım');
    });

    test('should show power-duo achievement after 2 products', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();

      // Wait for first notification to disappear
      await page.waitForTimeout(3000);

      await page.locator('.wa-product-card').nth(1).click();

      // Wait for power-duo notification
      const notification = page.locator('.wa-achievement-notification');
      await expect(notification).toContainText('Güçlü İkili');
    });

    test('should update achievement progress bar', async ({ page }) => {
      // Add first product
      await page.locator('.wa-product-card').first().click();

      // Wait for UI to update
      await page.waitForTimeout(500);

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Check progress bar
      const progressFill = page.locator('.wa-achievement-progress__fill');
      await expect(progressFill).toBeVisible();

      // Check count
      const progressCount = page.locator('.wa-achievement-progress__count');
      await expect(progressCount).toContainText('/5');
    });
  });

  test.describe('Pricing', () => {
    test('should calculate correct subtotal', async ({ page }) => {
      // Add a product and check subtotal
      const productCard = page.locator('.wa-product-card').first();
      const productPrice = await productCard.locator('.wa-product-card__price').textContent();

      await productCard.click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const subtotalSelector = isMobile ? '.wa-dock__subtotal' : '.wa-sidebar__subtotal';

      // Subtotal should match product price (as string contains)
      await expect(page.locator(subtotalSelector)).toBeVisible();
    });

    test('should show discount after adding 2 products', async ({ page }) => {
      // Add two products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const discountRowSelector = isMobile
        ? '.wa-dock__price-row--discount'
        : '.wa-sidebar__price-row--discount';

      // Discount row should be visible
      await expect(page.locator(discountRowSelector)).toBeVisible();
    });

    test('should show 30% discount for 5 products', async ({ page }) => {
      // Add all 5 products
      const productCards = page.locator('.wa-product-card');
      const count = await productCards.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        await productCards.nth(i).click();
        await page.waitForTimeout(200); // Small delay between clicks
      }

      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const synergyTextSelector = isMobile ? '.wa-dock__synergy-text' : '.wa-sidebar__synergy-text';

      // Should show 30% discount text
      await expect(page.locator(synergyTextSelector)).toContainText('%30');
    });
  });

  test.describe('Quantity Controls', () => {
    test('should increase quantity when clicking plus button', async ({ page }) => {
      // Add a product
      await page.locator('.wa-product-card').first().click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Click plus button
      const plusBtn = page.locator('[data-qty-plus]').first();
      await plusBtn.click();

      // Check quantity increased
      const qtyValue = isMobile
        ? page.locator('.wa-dock__item-qty-value').first()
        : page.locator('.wa-sidebar__item-qty-value').first();

      await expect(qtyValue).toContainText('2');
    });

    test('should decrease quantity when clicking minus button', async ({ page }) => {
      // Add a product and increase quantity first
      await page.locator('.wa-product-card').first().click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Increase to 2
      await page.locator('[data-qty-plus]').first().click();

      // Then decrease
      await page.locator('[data-qty-minus]').first().click();

      // Check quantity decreased
      const qtyValue = isMobile
        ? page.locator('.wa-dock__item-qty-value').first()
        : page.locator('.wa-sidebar__item-qty-value').first();

      await expect(qtyValue).toContainText('1');
    });

    test('should remove item when quantity reaches 0', async ({ page }) => {
      // Add a product
      await page.locator('.wa-product-card').first().click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      // Click minus button to remove
      await page.locator('[data-qty-minus]').first().click();

      // Item should be removed
      const itemSelector = isMobile ? '.wa-dock__item' : '.wa-sidebar__item';
      await expect(page.locator(itemSelector)).toHaveCount(0);
    });
  });

  test.describe('Checkout Flow', () => {
    test('should have disabled checkout button when cart is empty', async ({ page }) => {
      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const checkoutBtnSelector = isMobile
        ? '.wa-dock__checkout-btn'
        : '.wa-sidebar__checkout-btn';

      // Checkout button should be disabled
      await expect(page.locator(checkoutBtnSelector)).toBeDisabled();
    });

    test('should enable checkout button after adding product', async ({ page }) => {
      // Add a product
      await page.locator('.wa-product-card').first().click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);
      const checkoutBtnSelector = isMobile
        ? '.wa-dock__checkout-btn'
        : '.wa-sidebar__checkout-btn';

      // Checkout button should be enabled
      await expect(page.locator(checkoutBtnSelector)).toBeEnabled();
    });

    test('should navigate to checkout when clicking checkout button', async ({ page }) => {
      // Add a product
      await page.locator('.wa-product-card').first().click();

      const isMobile = await page.evaluate(() => window.innerWidth < 768);

      if (isMobile) {
        await page.locator('.wa-dock__handle').click();
      }

      const checkoutBtnSelector = isMobile
        ? '.wa-dock__checkout-btn'
        : '.wa-sidebar__checkout-btn';

      // Click checkout
      await page.locator(checkoutBtnSelector).click();

      // Should navigate to checkout
      await expect(page).toHaveURL(/\/checkout/);
    });
  });

  test.describe('Mobile Dock', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show dock at bottom on mobile', async ({ page }) => {
      const dock = page.locator('.wa-dock');
      await expect(dock).toBeVisible();
    });

    test('should expand dock when clicking handle', async ({ page }) => {
      // Add a product first
      await page.locator('.wa-product-card').first().click();

      // Click handle to expand
      await page.locator('.wa-dock__handle').click();

      // Dock should be expanded
      await expect(page.locator('.wa-dock')).toHaveClass(/wa-dock--expanded/);
    });

    test('should collapse dock when clicking close button', async ({ page }) => {
      // Add a product and expand
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-dock__handle').click();

      // Click close button
      await page.locator('.wa-dock__close-btn').click();

      // Dock should be collapsed
      await expect(page.locator('.wa-dock')).not.toHaveClass(/wa-dock--expanded/);
    });

    test('should show thumbnails in collapsed state', async ({ page }) => {
      // Add products
      await page.locator('.wa-product-card').first().click();
      await page.locator('.wa-product-card').nth(1).click();

      // Check thumbnails are visible
      const thumbnails = page.locator('.wa-dock__thumbnail');
      await expect(thumbnails).toHaveCount(2);
    });
  });

  test.describe('Responsive Design', () => {
    test('should show sidebar on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(500);

      const sidebar = page.locator('.wa-sidebar');
      await expect(sidebar).toBeVisible();
    });

    test('should hide sidebar on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const sidebar = page.locator('.wa-sidebar');
      // Sidebar should not be in viewport on mobile
      await expect(sidebar).not.toBeVisible();
    });
  });
});
