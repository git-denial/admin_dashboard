import { AUTH_TOKEN } from '@/lib/constants';
import { test, expect } from '@playwright/test';

const URL = "http://localhost:3000"

test('1st time', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/Login/);
});

test('Login success', async ({ page }) => {

  const context = page.context()
  
  await page.goto(`${URL}/login`);
  await expect(page).toHaveTitle(/Login/);

  const username = await page.locator("[name='username']").fill("master")
  const password = await page.locator("[name='password']").fill(" ")
  const loginBtn = await page.locator("[id='login']").click()

  await page.waitForTimeout(3000);

  let token = (await context.cookies()).find(c=> c.name === AUTH_TOKEN)?.value;
  expect(token).toBeDefined()

  let currenturl = page.url()
  expect(currenturl).toContain('/users')

});

test('Login fail', async ({ page }) => {
  const context = page.context()
  
  await page.goto(`${URL}/login`);
  await expect(page).toHaveTitle(/Login/);

  const username = await page.locator("[name='username']").fill("restam")
  const password = await page.locator("[name='password']").fill("passss")
  const loginBtn = await page.locator("[id='login']").click()

  await page.waitForTimeout(3000);

  let token = (await context.cookies()).find(c=> c.name === AUTH_TOKEN)?.value;
  expect(token).toBeUndefined()

  let currenturl = page.url()

  await expect(page.getByText("Something wrong")).toBeVisible()

});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
