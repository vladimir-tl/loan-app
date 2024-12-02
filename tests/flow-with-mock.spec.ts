import { test, expect } from '@playwright/test';

const routeToMock = '**/api/loan-calc?amount=*&period=*'

test('open and verify default calculation (using body)', async ({ page }) => {

    const valueMock = 11.22
    await page.route(routeToMock, async (route) => {
        const mockResponse = {
            paymentAmountMonthly: valueMock,
        };
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockResponse),
        });
    });

    await page.goto('http://localhost:3000/small-loan');

    // we have to wait until response received to be displayed
    await page.waitForResponse(routeToMock)

    const amountText = await page
        .getByTestId('ib-small-loan-calculator-field-monthlyPayment')
        .textContent();

    expect(amountText).toBe(valueMock + ' €');
});

test('open and verify default calculation (using json)', async ({ page }) => {

    const valueMock = 111.222

    await page.route(routeToMock, async (route) => {
        const responseBody = { paymentAmountMonthly: valueMock }
        await route.fulfill({
            status: 200,
            json: responseBody,
        })
    })

    await page.goto('http://localhost:3000/small-loan')

    // we have to wait until response received to be displayed
    await page.waitForResponse(routeToMock)

    const amountText = await page
        .getByTestId('ib-small-loan-calculator-field-monthlyPayment')
        .textContent();

    expect(amountText).toBe(valueMock + ' €');
})

// test('open and verify error due to code 400', async ({ page }) => {
//
//     // TODO implement actions
//     await expect( page.getByTestId('id-small-loan-calculator-field-error') ).toBeVisible()
// })
//
// test('open and verify error due to code 500 and error body', async ({ page }) => {
//
//     // TODO implement actions
//     await expect( page.getByTestId('id-small-loan-calculator-field-error') ).toBeVisible()
// })

test('open and verify with invalid contract', async ({ page }) => {
    await page.route('**/api/loan-calc?amount=*&period=*', async (route) => {
        await route.fulfill({
            status: 200,
            // incorrect key in json
            body: JSON.stringify({ amount: 11.22 }),
        })
    })

    await page.goto('http://localhost:3000/small-loan')

    await page.waitForResponse(routeToMock)

    expect (await page
        .getByTestId('ib-small-loan-calculator-field-monthlyPayment')
        .textContent()).toContain('undefined')
})