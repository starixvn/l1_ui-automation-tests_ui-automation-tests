import type { Page } from "@playwright/test";
import { imageType, formatScreenshotFile, formatName } from "./../_shared/screenshot-helpers";

export class ImageLocator {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;

    constructor(name: string, x: number, y: number, width: number, height: number) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    rect(): any {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    async snapshot(page: Page): Promise<any> {
        const imageName = formatName(this.name);
        const image = await page.screenshot({
            clip: this.rect(),
            path: formatScreenshotFile(this.name),
            type: imageType,
        });

        return { name: imageName, image };
    }

    async click(page: Page): Promise<void> {
        await page.mouse.click(this.x, this.y);
    }
}
