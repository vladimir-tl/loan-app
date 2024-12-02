import { test, expect } from '@playwright/test';
import {CalcMock} from "./mocks/calc-mock";

const routeToMock = '**/api/loan-calc?amount=*&period=*'

test('open and verify default calculation', async ({ context }) => {

    const valueMock = 33.44
    const calcMock = new CalcMock(context)
    await calcMock.applyOk(valueMock)

    const page = await context.newPage()
    await page.goto('http://localhost:3000/small-loan');

    // we have to wait until response received to be displayed
    await page.waitForResponse(routeToMock)

    const amountText = await page
        .getByTestId('ib-small-loan-calculator-field-monthlyPayment')
        .textContent();

    expect(amountText).toBe(valueMock + ' €');
});
