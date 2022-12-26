import { WayToGoalLocators } from "../locators/way-to-goal-locators";
import { WayToGoalConfigs } from "../way-to-goal-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class WayToGoalSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [WayToGoalConfigs.choices[0]],
            gameConfiguration: WayToGoalConfigs,
            locators: WayToGoalLocators,
            waitBetTimeout: 8000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new WayToGoalSmokeSpec().start();
