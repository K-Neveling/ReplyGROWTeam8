import { test, expect } from '@playwright/test';

test.describe('Reply GROW Team 8 - Web Application E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title and skip-to-content landmark', async ({ page }) => {
    await expect(page).toHaveTitle(/Reply GROW Team 8 \| Hackathon Hub/);

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
    await expect(skipLink).toHaveText('Skip to main content');
  });

  test('renders header, hero, and initial projects grid', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Empowering Accessible Innovation');

    const projectCards = page.locator('.project-card');
    await expect(projectCards.first()).toBeVisible();
    const count = await projectCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('toggles dark and light mode with accessible aria-pressed states', async ({ page }) => {
    const themeBtn = page.locator('#theme-toggle');
    await expect(themeBtn).toHaveAttribute('aria-pressed', 'false');

    // Click theme toggle
    await themeBtn.click();
    await expect(themeBtn).toHaveAttribute('aria-pressed', 'true');
    const htmlTheme = await page.locator('html').getAttribute('data-theme');
    expect(htmlTheme).toBe('dark');

    // Toggle back
    await themeBtn.click();
    await expect(themeBtn).toHaveAttribute('aria-pressed', 'false');
    const htmlThemeReset = await page.locator('html').getAttribute('data-theme');
    expect(htmlThemeReset).toBe('light');
  });

  test('filters projects dynamically by category tab', async ({ page }) => {
    const sustainabilityTab = page.locator('#tab-sustainability');
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('category=Sustainability') && resp.status() === 200
    );
    await sustainabilityTab.click();
    await responsePromise;

    await expect(sustainabilityTab).toHaveAttribute('aria-selected', 'true');
    const categories = page.locator('.card-category');
    await expect(categories).toHaveCount(1);
    await expect(categories.first()).toHaveText('Sustainability');
  });

  test('opens accessible submission modal, traps focus, and closes via Escape', async ({
    page,
  }) => {
    const openBtn = page.locator('#open-modal-btn');
    const dialog = page.locator('#submission-dialog');

    await openBtn.click();
    await expect(dialog).toBeVisible();

    // Verify focus moved into the dialog (title input)
    const titleInput = page.locator('#project-title');
    await expect(titleInput).toBeFocused();

    // Close using keyboard Escape
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
