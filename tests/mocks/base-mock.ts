import {BrowserContext} from "@playwright/test";

export class BaseMock {
    context: BrowserContext
    mockRoute: string = ''
    headers: { [key: string]: string }
    body: any

    constructor(context: BrowserContext) {
        this.context = context
        this.headers = {
            'Content-Type': 'application/json',
        }
    }

    async buildOkResponse(isConvertJson: boolean = true) {
        console.log('intercepting ' + this.mockRoute)
        await this.context.route(this.mockRoute, (route) => {
            route.fulfill({
                status: 200,
                headers: this.headers,
                body: isConvertJson ? JSON.stringify(this.body) : this.body,
            })
        })
    }

    //  TODO implement other responses

}