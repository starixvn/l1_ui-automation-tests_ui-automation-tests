import { WayToGoalLocators } from "../locators/way-to-goal-locators";
import { WayToGoalConfigs } from "../way-to-goal-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class WayToGoalGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: WayToGoalConfigs,
            locators: WayToGoalLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [WayToGoalConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new WayToGoalGameGuideSpec().start();
