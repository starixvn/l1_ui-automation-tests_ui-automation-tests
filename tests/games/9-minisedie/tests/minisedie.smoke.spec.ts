import { MiniSedieLocators } from "../locators/minisedie-locators";
import { MiniSedieConfigs } from "../minisedie-configs";
import { MultiMiniGameOptions, MultiMiniGameBase } from "../../../core/smoke-game-bases/multiple-mini-game-base.spec";

class MultiMiniSedieSmokeSpec extends MultiMiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MultiMiniGameOptions = {
            placeBetChoices: [MiniSedieConfigs.choices[0]],
            gameConfiguration: MiniSedieConfigs,
            locators: MiniSedieLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new MultiMiniSedieSmokeSpec().start();
