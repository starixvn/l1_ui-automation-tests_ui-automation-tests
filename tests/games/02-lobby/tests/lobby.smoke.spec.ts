import { LobbyLocators } from "../locators/lobby-locators";
import { LobbyConfigs } from "../lobby-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";
import { test } from "../../../core/base-fixture";
let logmsg = [];
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

    protected testSedieGames(): void {
        test("testSedieGames", async () => {
            test.setTimeout(150 * 1000);
            const listGames = ["Sedie", "VipSedie", "SedieWar", "SpecialSedie", "MiniSedie"];
            await selectGameCategory(this.game, "Sedie");
            for (const iterator of listGames) {
                await openGame(this.game, iterator, longWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            }
        });
    }

    protected testBigSmallGames(): void {
        test("testBigSmallGames", async () => {
            const listGames = ["SicBo", "TurboBigSmall", "BigSmallCity", "TurboOddEven"];
            await selectGameCategory(this.game, "BigSmall");
            for (const iterator of listGames) {
                await openGame(this.game, iterator, midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            }
        });
    }

    protected testCardsGames(): void {
        test("testCardsGames", async () => {
            test.setTimeout(150 * 1000);
            const listGames = ["VipBaccarat", "Baccarat", "DragonTiger", "BlackJack", "ThreeCards", "CasinoHem", "HiLo"];
            await selectGameCategory(this.game, "Cards");
            for (const iterator of listGames) {
                await openGame(this.game, iterator, midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            }

            await openGame(this.game, "TexasHem", midWait);
            await this.game.clickLocator("btnSkipTexasHem");
            await this.imagecheck.imageExist(`imgTexasHem`);
            await closeGame(this.game, "TexasHem");
        });
    }

    protected testSlotsGames(): void {
        test("testSlotsGames", async () => {
            test.setTimeout(300 * 1000);
            const listGames1 = ["FortuneCat", "HeroesSlot", "NightClub", "TreasureIsland", "ForGuardians"];
            const listGames2 = ["WayToGoal", "FruitSlot"];
            await selectGameCategory(this.game, "Slots");
            for (const iterator of listGames1) {
                if (iterator !== "ForGuardians") {
                    await openGame(this.game, iterator, longWait);
                    await this.imagecheck.imageExist(`img${iterator}`);
                    await closeGame(this.game, iterator);  
                }
                else{
                    await openGame(this.game, iterator, longWait+10000);
                    await this.imagecheck.imageExist(`img${iterator}`);
                    await closeGame(this.game, iterator);  
                }

            }

            for (const iterator2 of listGames2) {
                await this.game.clickLocator("icoNext");
                await this.game.waitForTimeout(1000);
                await openGame(this.game, iterator2, longWait);
                await this.imagecheck.imageExist(`img${iterator2}`);
                await closeGame(this.game, iterator2);
            }
        });
    }

    protected testKenoLotteryGames(): void {
        test("testKenoLotteryGames", async () => {
            test.setTimeout(130 * 1000);
            const listGames = ["KenoProMax", "Lottery", "MegaKeno"];
            await selectGameCategory(this.game, "Keno");
            for (const iterator of listGames) {
                await openGame(this.game, iterator,longWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            }
        });
    }

    protected testOthersGames(): void {
        test("testOthersGames", async () => {
            const listGames = ["FanTan", "FishPrawnCrab", "BitCoin", "VipFishPrawnCrab", "Roulette"];
            await selectGameCategory(this.game, "Others");
            for (const iterator of listGames) {
                await openGame(this.game, iterator,midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            }
        });
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
