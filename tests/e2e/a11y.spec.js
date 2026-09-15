import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Automated Accessibility Audit', () => {
  test('landing page meets WCAG 2.1 AA standards with zero violations', async ({ page }) => {
    await page.goto('/');

    // Wait for dynamic project cards to be populated
    await page.waitForSelector('.project-card');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('accessible submission modal dialog has zero WCAG violations when opened', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('#open-modal-btn');
    await page.waitForSelector('#submission-dialog[open]');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
