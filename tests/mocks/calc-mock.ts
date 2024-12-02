import {BaseMock} from "./base-mock";
import {BrowserContext} from "@playwright/test";

export class CalcMock extends BaseMock {

    constructor(context: BrowserContext) {
        super(context);
        this.mockRoute = '**/api/loan-calc?amount=*&period=*'
    }

    async applyOk(value: number): Promise<void> {
        this.body = {
            paymentAmountMonthly: value,
        }
        await this.buildOkResponse()
    }

}