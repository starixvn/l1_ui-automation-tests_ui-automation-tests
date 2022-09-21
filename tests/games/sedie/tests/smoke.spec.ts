import { test, expect } from "@playwright/test";
import { SedieLocators } from "./../locators/sedie-locators.ts";
import { SedieConfigs } from "./../sedie-configs.ts";
import { BaseGame } from "./../../../core/base-game.ts";

test.describe("Sedie Smoke Tests", () => {
    let game: BaseGame;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        game = new BaseGame(page, SedieLocators, SedieConfigs);
        await game.login();
    });

    test.afterAll(async ({ browser }) => {
        await browser.close();
    });

    test("dealer should be displayed", async () => {
        // Arrange

        // Act
        const dealerSnapshot = await game.captureDealer();

        // Assert
        expect(dealerSnapshot.image).toMatchSnapshot(dealerSnapshot.name);
    });

    test("bet choices should be displayed", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);
        await game.waitUntilNextRound();
        await game.waitForTimeout(5000);

        // Act
        const evenChoice = await game.captureChoice("even");

        // Assert
        expect(evenChoice.image).toMatchSnapshot(evenChoice.name);
    });

    test("player could bet on even", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);
        await game.waitUntilPlaceBet();

        // Act
        await game.clickToChoice("even");
        const ownbetSnapshot = await game.captureOwnbet("even");

        // Assert
        expect(ownbetSnapshot.image).toMatchSnapshot(ownbetSnapshot.name, { maxDiffPixelRatio: 0.06 });
    });
});
