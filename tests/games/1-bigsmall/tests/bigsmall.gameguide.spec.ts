import { BigSmallLocators } from "../locators/bigsmall-locators";
import { BigSmallConfigs } from "../bigsmall-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class BigSmallGameGuideSpec extends GameGuideBase {
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [BigSmallConfigs.choices[0]],
            gameConfiguration: BigSmallConfigs,
            locators: BigSmallLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new BigSmallGameGuideSpec().start();
