import { test, expect } from "./../../../core/base-fixture";
import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { GameEvent } from "../../../_shared/events";
import { BasePlayer, BaseGame } from "../../../core";

test.use({ gameConfigurations: SedieConfigs });
test.use({ locators: SedieLocators });

test.describe("Sedie Smoke Tests", () => {
    let game: BaseGame;
    let player: BasePlayer;

    test.beforeAll(async ({ baseGame }) => {
        game = baseGame;
        player = new BasePlayer(game);
    });

    test("GIVEN player joined game and saw dealer", async () => {
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

    test("AND odds should be correct", async () => {
        // Assert
        expect(game.odds).toStrictEqual(SedieConfigs.odds);
    });

    test.only("THEN player able to place a bet and settle", async () => {
        // Arrange
        const betChoice = "even";
        test.setTimeout(SedieConfigs.maxTimeout);
        game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

        // Act
        const endBet = await player.placeBet(betChoice, 1);
        const ownbetSnapshot = await game.captureOwnbet(betChoice);
        const message = await game.waitForSettlement();

        // Assert
        expect(endBet).not.toBeNull();
        expect(ownbetSnapshot.image).toMatchSnapshot(ownbetSnapshot.name);

        expect(message.resultHash).not.toBeNull();

        expect(message.finish.settlementResult).not.toBeNull();
        expect(message.finish.settlementResult).toHaveApproriateBetOptions(SedieConfigs.choices);

        if (message.finish.settlementResult[betChoice]) {
            const winningByChoice = game.latestCaptureEvent(GameEvent.WinStatus);

            expect(winningByChoice.status.bet).toBeGreaterThan(0);
        }
    });

    test("THEN player should get error when they hedge their bets", async () => {
        // Arrange
        test.setTimeout(SedieConfigs.maxTimeout);

        // Act
        await player.placeHedgeBet(SedieConfigs.hedgeBetGroups[0], 1);
        const error = await game.captureErrorMessage();

        // Assert
        expect(error.image).toMatchSnapshot(error.name);
    });

    test("AND player could open history popup", async () => {
        // Arrange
        const historyPayload = await player.openHistory();

        // Act
        const historySnapshot = await game.captureHistory();

        // Assert
        expect(historyPayload.history.betLogs.length).toBeGreaterThan(0);
        expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
    });
});
