import { test, expect } from "../base-fixture";
import { GameEvent } from "../../_shared/events";
import { BasePlayer, BaseGame } from "..";
import { GameConfiguration } from "../game-configuration";
import { ImageLocator } from "../base-image-locator";

export interface MiniGameOptions {
    gameConfiguration: GameConfiguration;
    locators: ImageLocator[];
    waitBetTimeout: number;
    placeBetChoices: string[];
    snapshotFolderPath: string;
}

export class MiniGameBase {
    game: BaseGame;
    player: BasePlayer;

    constructor(protected options: MiniGameOptions) {}

    protected inGameBetChoiceTests() {
        test("AND bet choices should be displayed on table", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.waitUntilNextRound();
            await this.game.waitForTimeout(this.options.waitBetTimeout);

            for (const placeBetChoice of this.options.placeBetChoices) {
                // Act
                const betChoice = await this.game.captureChoice(placeBetChoice);

                // Assert
                expect(betChoice.image).toMatchSnapshot(betChoice.name);
            }
        });
    }

    protected inGameOddsTests() {
        test("AND odds should be correct", async () => {
            // Assert
            expect(this.game.odds).toStrictEqual(this.options.gameConfiguration.odds);
        });
    }

    protected placeBetAndSettleTests() {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();

            // Assert
            expect(placeBetResponse.endBet).toBe(bet.amount);           
            expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
            expect(bet).toMatchWinning(settledResults);
        });
    }

    protected hedgeBetTests() {
        test("THEN player should get error when they hedge their bets", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);

            // Act
            await this.player.placeHedgeBet(this.options.gameConfiguration.hedgeBetGroups[0], 1);
            const error = await this.game.captureErrorMessage();

            // Assert
            expect(error.image).toMatchSnapshot(error.name);
        });
    }

    protected ticketHistoryTests() {
        test("AND player could open history popup", async () => {
            // Arrange
            const historyPayload = await this.player.openHistory();

            // Act
            const historySnapshot = await this.game.captureHistory();

            // Assert
            expect(historyPayload.history.betLogs.length).toBeGreaterThan(0);
            expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
        });
    }

    start(): void {
        test.beforeEach(async ({}, testInfo) => {
            testInfo.snapshotPath = (name: string) => {
                const snapshotPath = `${this.options.snapshotFolderPath}-snapshots\\${name}`;

                return snapshotPath;
            };
        });

        test.use({
            gameConfigurations: this.options.gameConfiguration,
            locators: this.options.locators,
        });

        test.describe.serial(`${this.options.gameConfiguration.name} Smoke Tests`, () => {
            test.beforeAll(async ({ baseGame }) => {
                this.game = baseGame;
                this.player = new BasePlayer(this.game);
            });

            this.inGameBetChoiceTests();
            this.inGameOddsTests();
            this.placeBetAndSettleTests();
            this.hedgeBetTests();
            this.ticketHistoryTests();
        });
    }
}
