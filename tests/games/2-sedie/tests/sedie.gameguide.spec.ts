import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class SedieGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: SedieConfigs,
            locators: SedieLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [SedieConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieGameGuideSpec().start();
