import {expect, test} from '@playwright/test';

const serviceURL = 'http://localhost:3000';

test.skip('default flow with mock', async ({page}) => {
    // we have to define mock before navigation to the page
    // our json response is
    // {"paymentAmountMonthly":42.8}
    // response code is 200
    // response headers is application/json
    // route to intercept is https:

    // I have to define the response body as json object

    const amountResponse = { paymentAmountMonthly: 12.3 };

    // intercept the route only for specific query parameters (default values)
    await page.route('**/api/loan-calc?amount=500&period=12', async route => {
        await route.fulfill({
            json: amountResponse,
            // status: 200 by default
            // status: 400 in case of error
        });
    });


    await page.goto(serviceURL);
    await expect(page.getByTestId('ib-small-loan-calculator-field-monthlyPayment')).toBeVisible()
})


test('main flow', async ({page}) => {
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

test('scroll to view flow', async ({page, request}) => {
    await page.goto(serviceURL);
    await page.getByTestId('id-image-element-button-image-1').click();
    await expect(page.getByTestId('id-small-loan-calculator-field-apply')).toBeInViewport()
    await page.getByTestId('id-image-element-button-image-2').click();
    await expect(page.getByTestId('id-small-loan-calculator-field-apply')).toBeInViewport()
})

