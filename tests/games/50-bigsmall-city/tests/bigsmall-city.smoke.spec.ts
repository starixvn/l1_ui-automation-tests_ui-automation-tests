import { test, expect } from "../../../core/base-fixture";
import { BigSmallCityLocators } from "../locators/bigsmall-city-locators";
import { BigSmallCity1Configs, BigSmallCity2Configs, BigSmallCity3Configs, BigSmallCity4Configs } from "../bigsmall-city-configs";
import { MultiplayGameOptions, MultiplayGameBase } from "../../../core/smoke-game-bases";

class MultiMiniSedieSmokeSpec extends MultiplayGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MultiplayGameOptions = {
            placeBetChoices: [BigSmallCity1Configs.choices[0], BigSmallCity1Configs.choices[1]],
            gameConfiguration: BigSmallCity1Configs,
            subGameConfigurations: [BigSmallCity2Configs, BigSmallCity3Configs, BigSmallCity4Configs],
            locators: BigSmallCityLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected inGameBetChoiceTests(): void {
        test("AND bet choices should be displayed on table", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.waitUntilNextRound();

            await this.game.clickLocator("closeguide");
            await this.game.waitForTimeout(this.options.waitBetTimeout);
            // Act
            const betChoice = await this.game.captureChoice(this.options.placeBetChoices[0]);
            const gamename1 = await this.game.captureLocator("imgGame1")
            const gamename2 = await this.game.captureLocator("imgGame2")
            const gamename3 = await this.game.captureLocator("imgGame3")
            const gamename4 = await this.game.captureLocator("imgGame4")


            // Assert
            expect(betChoice.image).toMatchSnapshot(betChoice.name);
            expect(gamename1.image).toMatchSnapshot(gamename1.name);
            expect(gamename2.image).toMatchSnapshot(gamename2.name);
            expect(gamename3.image).toMatchSnapshot(gamename3.name);
            expect(gamename4.image).toMatchSnapshot(gamename4.name);

        });
    }

}

new MultiMiniSedieSmokeSpec().start();
