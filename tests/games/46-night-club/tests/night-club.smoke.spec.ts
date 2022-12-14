import { NightClubLocators } from "../locators/night-club-locators";
import { NightClubConfigs } from "../night-club-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class NightClubSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [NightClubConfigs.choices[0]],
            gameConfiguration: NightClubConfigs,
            locators: NightClubLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new NightClubSmokeSpec().start();
