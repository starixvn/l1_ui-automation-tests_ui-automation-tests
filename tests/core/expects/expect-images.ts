import { expect } from "@playwright/test";
import { BaseGame } from "../base-game";

export class ImageCheck {
    readonly game: BaseGame;

    constructor(game: BaseGame) {
        this.game = game;
    }

    async imageExist(image: string): Promise<void> {
        const captureimage = await this.game.captureLocator(image);
        expect(captureimage.image, `verify ${image}`).toMatchSnapshot(image+'.png');
    }

    async guideImages(): Promise<void> {
        let totalItems = await this.game.getCountFrameLocator("xpath=//*[@id='container-guide']//li[@class='guide-item']");
        for (let index = 1; index <= totalItems; index++) {
            let tempimage = await this.game.captureFrameLocator(
                `xpath=//*[@id='container-guide']//li[@class='guide-item'][${index}]`,
                `screenshots/imgGuide${index}.png`
            );
            expect(tempimage).toMatchSnapshot(`imgGuide${index}.png`);
        }
    }
}
