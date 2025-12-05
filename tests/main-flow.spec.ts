import { test, expect } from '@playwright/test';

const serviceURL = 'http://localhost:3000';

test('default flow with mock', async ({page}) => {
    // we have to define mock before navigation to the page
    // our json response is
    // {"paymentAmountMonthly":42.8}
    // response code is 200
    // response headers is application/json
    // route to intercept is https:

    // define the response body as json object
    const amountValue: string = '22.3'
    const amountResponse = {paymentAmountMonthly: amountValue};

    // intercept the route only for specific query parameters (default values)
    await page.route('**/api/loan-calc?amount=500&period=12', async route => {
        await route.fulfill({
            json: amountResponse,
            // status: 200 by default
            // status: 400 in case of error
        });
    });

    await page.goto(serviceURL);
    await expect(page.getByTestId('ib-small-loan-calculator-field-monthlyPayment')).toBeVisible();
    const textContentElement = await page.getByTestId('ib-small-loan-calculator-field-monthlyPayment').textContent()
    console.log(textContentElement)
    const monthlyValue = textContentElement?.replace('€', '').trim() ?? ''
    expect(monthlyValue).toBe(amountValue);
})

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

test('redirect flow', async ({ page, request }) => {
  await page.goto(serviceURL);
  await page.getByTestId('id-image-element-button-image-1').click();
  await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
  await page.getByTestId('id-image-element-button-image-2').click();
  await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
})

