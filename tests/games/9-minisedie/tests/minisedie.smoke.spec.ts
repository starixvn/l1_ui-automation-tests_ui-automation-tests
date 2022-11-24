import { MiniSedieLocators } from "../locators/minisedie-locators";
import { MiniSedie1Configs, MiniSedie2Configs, MiniSedie3Configs, MiniSedie4Configs } from "../minisedie-configs";
import { MultiplayGameOptions, MultiplayGameBase } from "../../../core/smoke-game-bases";

class MultiMiniSedieSmokeSpec extends MultiplayGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MultiplayGameOptions = {
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
