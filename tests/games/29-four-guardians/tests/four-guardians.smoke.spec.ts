import { FourGuardiansLocators } from "../locators/four-guardians-locators";
import { FourGuardiansConfigs } from "../four-guardians-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class FourGuardiansSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: ["1","25"],
            gameConfiguration: FourGuardiansConfigs,
            locators: FourGuardiansLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new FourGuardiansSmokeSpec().start();
