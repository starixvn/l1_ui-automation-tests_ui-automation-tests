import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { BaseGame } from "..";

export class ImageCheck {
    readonly page: Page;
    game: BaseGame;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyImageExist(image: string): Promise<void> {
        console.log(image);

        // const captureimage = await this.game.captureLocator(image);
        // expect(captureimage.image, `verify ${image}`).toMatchSnapshot(captureimage.name);
    }

    async verifyGuideImages(path: string): Promise<void> {
        console.log(path);
        let totalItems = await this.page
            .frameLocator("iframe")
            .locator("xpath=//*[@id='container-guide']//li[@class='guide-item']")
            .count();
        for (let index = 1; index <= totalItems; index++) {
            let tempimage = await this.page
                .frameLocator("iframe")
                .locator(`xpath=//*[@id='container-guide']//li[@class='guide-item'][${index}]`)
                .screenshot({ path: `screenshots/imgGuide${index}.png` });
            expect(tempimage).toMatchSnapshot(`imgGuide${index}.png`);
        }
    }
}
