import { NightClubLocators } from "../locators/night-club-locators";
import { NightClubConfigs } from "../night-club-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class NightClubGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [NightClubConfigs.choices[0]],
            gameConfiguration: NightClubConfigs,
            locators: NightClubLocators,
            waitBetTimeout: 20000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new NightClubGameGuideSpec().start();
