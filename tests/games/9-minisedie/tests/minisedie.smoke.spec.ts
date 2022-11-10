import { MiniSedieLocators } from "../locators/minisedie-locators";
import { MiniSedie1Configs, MiniSedie2Configs, MiniSedie3Configs, MiniSedie4Configs } from "../minisedie-configs";
import { MultiMiniGameOptions, MultiMiniGameBase } from "../../../core/smoke-game-bases/multiple-mini-game-base.spec";

class MultiMiniSedieSmokeSpec extends MultiMiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MultiMiniGameOptions = {
            placeBetChoices: [MiniSedie1Configs.choices[0], MiniSedie2Configs.choices[0]],
            gameConfiguration: MiniSedie1Configs,
            subGameConfigurations: [MiniSedie2Configs, MiniSedie3Configs, MiniSedie4Configs],
            locators: MiniSedieLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected override ticketHistoryTests(): void {}

}

new MultiMiniSedieSmokeSpec().start();
