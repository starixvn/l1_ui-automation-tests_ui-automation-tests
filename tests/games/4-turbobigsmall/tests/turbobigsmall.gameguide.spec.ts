import { TurboBigSmallLocators } from "../locators/turbobigsmall-locators";
import { TurboBigSmallConfigs } from "../turbobigsmall-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class TurboBigSmallGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [TurboBigSmallConfigs.choices[0]],
            gameConfiguration: TurboBigSmallConfigs,
            locators: TurboBigSmallLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 5000,
        };
        super(smokeOptions);
    }
}

new TurboBigSmallGuideSpec().start();
