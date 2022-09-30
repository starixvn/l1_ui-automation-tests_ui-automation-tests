import { test, expect } from "@playwright/test";
import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { BaseGame } from "../../../core/base-game";
import { GameEvent } from "../../../_shared/events";

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

    test.beforeEach(async ({}, testInfo) => {
        testInfo.snapshotPath = (name: string) => `${testInfo.file}-snapshots/${name}`;
    });

    test("GIVEN dealer are displayed", async () => {
        // Arrange

        // Act
        const dealerSnapshot = await game.captureDealer();

        // Assert
        expect(dealerSnapshot.image).toMatchSnapshot(dealerSnapshot.name);
    });

    test("AND bet choices should be displayed on table", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);
        await game.waitUntilNextRound();
        await game.waitForTimeout(5000);

        // Act
        const evenChoice = await game.captureChoice("even");

        // Assert
        expect(evenChoice.image).toMatchSnapshot(evenChoice.name, { maxDiffPixelRatio: 0.06 });
    });

    test("THEN player able to place a bet", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);
        await game.waitUntilPlaceBet();

        // Act
        await game.clickToChoice("even");
        const endBet = await game.waitForEndBet();
        const ownbetSnapshot = await game.captureOwnbet("even");
        const message = await game.waitForSettlement();

        // Assert
        expect(endBet).not.toBeNull();
        expect(message.finish.settlementResult).not.toBeNull();
        expect(message.resultHash).not.toBeNull();
        expect(ownbetSnapshot.image).toMatchSnapshot(ownbetSnapshot.name, { maxDiffPixelRatio: 0.06 });
    });

    test("AND player could open history popup", async () => {
        // Arrange
        const eventMessage = await game.openHistory();

        // Act
        const historySnapshot = await game.captureHistory();

        // Assert
        expect(eventMessage.history.betLogs).not.toBeNull();
        expect(eventMessage.history.betLogs.length).toBeGreaterThan(0);
        expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name, { maxDiffPixelRatio: 0.06 });
    });
});
