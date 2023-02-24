import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BaseGame } from "../base-game";

export class ImageCheck {
    readonly page: Page;
    readonly game: BaseGame;

    constructor(game: BaseGame, page: Page) {
        this.game = game;
        this.page = page;
    }

    async verifyImageExist(image: string): Promise<void> {
        const captureimage = await this.game.captureLocator(image);
        expect(captureimage.image, `verify ${image}`).toMatchSnapshot(captureimage.name);
    }

    async verifyGuideImages(path: string): Promise<void> {
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
