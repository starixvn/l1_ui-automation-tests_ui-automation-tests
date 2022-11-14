import { SpecialSedieLocators } from "../locators/special-sedie-locators";
import { SpecialSedieConfigs } from "../special-sedie-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class SpecialSedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
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
