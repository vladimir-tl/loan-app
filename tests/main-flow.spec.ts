import { test, expect } from '@playwright/test';

const serviceURL = 'http://localhost:3000';

// this flow rely on backend but not checking it
test('main flow', async ({ page }) => {
  await page.goto(serviceURL);
  await page.getByTestId('id-small-loan-calculator-field-apply').click();
  await page.getByTestId('login-popup-username-input').click();
  await page.getByTestId('login-popup-username-input').fill('usern');
  await page.getByTestId('login-popup-username-input').press('Tab');
  await page.getByTestId('login-popup-password-input').fill('pwd');
  await page.getByTestId('login-popup-continue-button').click();
  await page.getByTestId('final-page-continue-button').click();
  await page.getByTestId('final-page-success-ok-button').click();
});

// this flow don't rely on backend
test('redirect flow', async ({ page, request }) => {
  await page.goto(serviceURL);
  await page.getByTestId('id-image-element-button-image-1').click();
  await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
  await page.getByTestId('id-image-element-button-image-2').click();
  await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
})

