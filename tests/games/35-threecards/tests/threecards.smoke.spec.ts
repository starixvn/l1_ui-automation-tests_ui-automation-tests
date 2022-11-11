import { ThreeCardsLocators } from "../locators/threecards-locators";
import { ThreeCardsConfigs } from "../threecards-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class ThreeCardsSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
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
