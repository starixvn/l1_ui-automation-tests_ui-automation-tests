import { ThreeCardsLocators } from "../locators/threecards-locators";
import { ThreeCardsConfigs } from "../threecards-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class ThreeCardsSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [ThreeCardsConfigs.choices[0]],
            gameConfiguration: ThreeCardsConfigs,
            locators: ThreeCardsLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new ThreeCardsSmokeSpec().start();
