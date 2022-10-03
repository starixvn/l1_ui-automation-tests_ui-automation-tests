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
        expect(evenChoice.image).toMatchSnapshot(evenChoice.name);
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
        expect(ownbetSnapshot.image).toMatchSnapshot(ownbetSnapshot.name);
    });

    test.only("THEN player should get error when they hedge their bets", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);
        await game.waitUntilPlaceBet();

        // Act
        await game.clickToChoice("even");
        await game.waitForEndBet();

        await game.clickToChoice("odd");
        await game.waitForEndBet();

        const error = await game.locator("errorMessage")?.snapshot(game.page);

        // Assert
        expect(error.image).toMatchSnapshot(error.name, { maxDiffPixelRatio: 0.06 });
    });

    test("AND player could open history popup", async () => {
        // Arrange
        const historyPayload = await game.openHistory();

        // Act
        const historySnapshot = await game.captureHistory();

        // Assert
        expect(historyPayload.history.betLogs.length).toBeGreaterThan(0);
        expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
    });
});
