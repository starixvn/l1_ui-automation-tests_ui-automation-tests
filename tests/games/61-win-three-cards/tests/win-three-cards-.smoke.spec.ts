import { winthreecardsLocators } from "../locators/win-three-cards-locators";
import { winthreecardsConfigs } from "../win-three-cards-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class winthreecardsSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: winthreecardsConfigs,
            placeBetChoices: [winthreecardsConfigs.choices[0], winthreecardsConfigs.choices[1]],
            waitBetTimeout: 10000,
            locators: winthreecardsLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected override inGameDealerTests(): void {}

}

new winthreecardsSmokeSpec().start();
