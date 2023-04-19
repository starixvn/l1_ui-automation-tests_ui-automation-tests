import { FourGuardiansLocators } from "../locators/four-guardians-locators";
import { FourGuardiansConfigs } from "../four-guardians-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class FourGuardiansGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: FourGuardiansConfigs,
            locators: FourGuardiansLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [FourGuardiansConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new FourGuardiansGameGuideSpec().start();
