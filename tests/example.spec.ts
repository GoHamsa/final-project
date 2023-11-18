import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/cryEx/);
});

test('should login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByLabel('Username').fill('viktor');
  await page.getByLabel('Password').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('http://localhost:3000/profile/viktor');
});

test('should not be able to login with wrong credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByLabel('Username').fill('viktor');
  await page.getByLabel('Password').fill('1235');
  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.locator('.error');
  await expect(errorMessage).toHaveCount(1);
});
