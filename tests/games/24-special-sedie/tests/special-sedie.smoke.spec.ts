import { SpecialSedieLocators } from "../locators/special-sedie-locators";
import { SpecialSedieConfigs } from "../special-sedie-configs";
import { IBaseOptions, BalancedBettingGameBase } from "../../../core/smoke-game-bases";

class SpecialSedieSmokeSpec extends BalancedBettingGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: SpecialSedieConfigs,
            locators: SpecialSedieLocators,
            waitBetTimeout: 6000,
            placeBetChoices: [SpecialSedieConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SpecialSedieSmokeSpec().start();
