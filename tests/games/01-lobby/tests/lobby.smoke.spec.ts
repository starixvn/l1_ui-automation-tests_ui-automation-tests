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

    protected testBigSmall(): void {
        test("Test Game BigSmall", async () => {
            // Assert
            await this.imagecheck.imageExist(`imgBigSmall`);
            await closeGame(this.game, "BigSmall");
        });
    }

    protected testSedieGames(): void {
        const listGames = ["Sedie", "VipSedie", "SedieWar", "SpecialSedie", "MiniSedie"];
        for (const iterator of listGames) {
            test(`test game ${iterator}`, async () => {
                test.setTimeout(150 * 1000);
                await selectGameCategory(this.game, "Sedie");
                await openGame(this.game, iterator, longWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }
    }

    protected testBigSmallGames(): void {
        const listGames = ["SicBo", "TurboBigSmall", "BigSmallCity", "TurboOddEven"];
        for (const iterator of listGames) {
            test(`test game ${iterator}`, async () => {
                await selectGameCategory(this.game, "BigSmall");
                await openGame(this.game, iterator, midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }
    }

    protected testCardsGames(): void {
        const listGames = ["VipBaccarat", "Baccarat", "DragonTiger", "BlackJack", "ThreeCards", "CasinoHem", "HiLo"];
        for (const iterator of listGames) {
            test(`test game ${iterator}`, async () => {
                test.setTimeout(150 * 1000);
                await selectGameCategory(this.game, "Cards");
                await openGame(this.game, iterator, midWait);
                await this.imagecheck.imageExist(`img${iterator}`);
                await closeGame(this.game, iterator);
            });
        }
        test(`test game TexasHem`, async () => {
            await openGame(this.game, "TexasHem", midWait);
            await this.game.clickLocator("btnSkipTexasHem");
            await this.imagecheck.imageExist(`imgTexasHem`);
            await closeGame(this.game, "TexasHem");
        });
    }

    protected runScenario(): void {
        this.testBigSmall();
        this.testSedieGames();
        this.testBigSmallGames();
        this.testCardsGames();
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
