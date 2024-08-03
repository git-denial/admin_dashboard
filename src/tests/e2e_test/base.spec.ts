import { AUTH_TOKEN } from '@/lib/constants';
import { test, expect } from '@playwright/test';

const URL = "http://localhost:3000"

test('1st time', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/Login/);
});