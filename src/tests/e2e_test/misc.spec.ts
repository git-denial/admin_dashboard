import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('div').filter({ hasText: /^UsersCardiologistsAdmins$/ }).click();
  await page.getByText('Global column search').click();
  await page.getByRole('link', { name: 'View detail' }).click();
  await page.getByText('-09-24').click();
  await page.getByText('95').click();
  await page.getByRole('link', { name: 'Users', exact: true }).click();
  await page.getByRole('link', { name: 'View detail' }).click();
  await page.getByRole('link', { name: 'users', exact: true }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Dark' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.locator('html').click();
  await page.getByText('UsersGlobal column').click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await page.getByText('UsersGlobal column').click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('menuitemcheckbox', { name: 'phone_num' }).click();
  await page.getByRole('button', { name: 'Height' }).click();
  await page.getByText('Global column searchFilter by').click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('menuitemcheckbox', { name: 'phone_num' }).click();
  await page.getByRole('cell', { name: 'Phone Number' }).click();
  await page.getByRole('row', { name: 'Select row 10 goku go@gos.com' }).getByRole('button').click();
  await page.getByRole('link', { name: 'View detail' }).click();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill('gokusa');
  await page.getByLabel('weight').dblclick();
  await page.getByLabel('weight').click();
  await page.getByLabel('weight').fill('500');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByLabel('height').fill('200');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByLabel('Notifications (F8)').locator('li').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('html').click();
  await page.getByText('500').click();
  await page.getByText('200').click();
  await page.getByText('Weight500Height200').click();
  await page.locator('div').filter({ hasText: 'DetailsFull NamegokusaBirth' }).nth(3).click();
  await page.getByText('ID 10Copy IDCreated: Tue May 03 2022More').click();
  await page.getByRole('link', { name: 'users', exact: true }).click();
  await page.getByRole('button', { name: '>', exact: true }).click();
  await page.getByRole('button', { name: '>>' }).click();
  await page.getByRole('button', { name: '<<' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('heading', { name: 'Create user', exact: true }).click();
  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill('Dandan');
  await page.getByLabel('Full Name').press('Tab');
  await page.getByLabel('Email').fill('dandan@dandan.com');
  await page.getByLabel('Weight').click();
  await page.getByLabel('Weight').fill('45');
  await page.getByLabel('Weight').press('Tab');
  await page.getByLabel('Height').fill('50');
  await page.getByLabel('Height').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('passpass');
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.getByLabel('Confirm Password').fill('passpass');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByLabel('Notifications (F8)').getByRole('status').click();
});