import { LobbyLocators } from "../locators/lobby-locators";
import { LobbyConfigs } from "../lobby-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";
import { test } from "../../../core/base-fixture";
let shortWait = 3000,
    midWait = 8000,
    longWait = 20000;

class LobbySmokeSpec extends SlotGameBase {
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [LobbyConfigs.choices[0]],
            gameConfiguration: LobbyConfigs,
            locators: LobbyLocators,
            waitBetTimeout: 100,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected testSedie(): void {
        test("Test Game Sedie", async () => {
            // Assert
            await this.imagecheck.imageExist(`imgSedie`);
            await closeGame(this.game, "Sedie");
        });
    }

    protected testSlotsGames(): void {
        const listGames1 = ["FortuneCat", "HeroesSlot", "NightClub", "TreasureIsland", "ForGuardians"];
        const listGames2 = ["WayToGoal", "FruitSlot"];
        for (const iterator of listGames1) {
            test(`test game ${iterator}`, async () => {
                test.setTimeout(180 * 1000);
                await selectGameCategory(this.game, "Slots");
                await openGame(this.game, iterator, longWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }

        for (const iterator2 of listGames2) {
            test(`test game ${iterator2}`, async () => {
                test.setTimeout(180 * 1000);
                await this.game.clickLocator("icoNext");
                await this.game.waitForTimeout(1000);
                await openGame(this.game, iterator2, longWait);
                await this.imagecheck.imageExist(`img${iterator2}`);
                await closeGame(this.game, iterator2);
            });
        }
    }

    protected testKenoLotteryGames(): void {
        const listGames = ["KenoProMax", "Lottery", "MegaKeno"];
        for (const iterator of listGames) {
            test(`test game ${iterator}`, async () => {
                await selectGameCategory(this.game, "Keno");
                await openGame(this.game, iterator, longWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }
    }

    protected testOthersGames(): void {
        const listGames = ["FanTan", "FishPrawnCrab", "BitCoin", "VipFishPrawnCrab", "Roulette"];
        for (const iterator of listGames) {
            test(`test game ${iterator}`, async () => {
                await selectGameCategory(this.game, "Others");
                await openGame(this.game, iterator, midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }
    }

    protected runScenario(): void {
        this.testSedie();
        this.testKenoLotteryGames();
        this.testOthersGames();
        this.testSlotsGames();
    }
}

new LobbySmokeSpec().start();

const closeGame = async (game: any, gameName: string) => {
    await game.clickLocator(`btnHam${gameName}`);
    await game.waitForTimeout(500);
    await game.clickLocator(`btnHome${gameName}`);
    await game.clickLocator(`btnClose${gameName}`);
    await game.waitForTimeout(5000);
};

const openGame = async (game: any, gameName: string, timeout: number = shortWait) => {
    await game.clickLocator(`ico${gameName}`);
    await game.waitForTimeout(timeout);
};

const selectGameCategory = async (game: any, category: string) => {
    await game.clickLocator(`mnu${category}`);
    await game.waitForTimeout(1000);
};
