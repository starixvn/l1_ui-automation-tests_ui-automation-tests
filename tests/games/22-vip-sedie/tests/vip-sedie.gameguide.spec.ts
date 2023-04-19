import { VipSedieLocators } from "../locators/vip-sedie-locators";
import { VipSedieConfigs } from "../vip-sedie-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class VipSedieGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [VipSedieConfigs.choices[1]],
            placeBetAmount: 10,
            waitBetTimeout: 10000,
            gameConfiguration: VipSedieConfigs,
            locators: VipSedieLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new VipSedieGameGuideSpec().start();
