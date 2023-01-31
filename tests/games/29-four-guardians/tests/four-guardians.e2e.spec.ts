import { FourGuardiansLocators } from "../locators/four-guardians-locators";
import { FourGuardiansConfigs } from "../four-guardians-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";

class FourGuardiansSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const e2eOptions: IBaseOptions = {
            placeBetChoices: [FourGuardiansConfigs.choices[0],FourGuardiansConfigs.choices[1],FourGuardiansConfigs.choices[2],FourGuardiansConfigs.choices[3]],
            gameConfiguration: FourGuardiansConfigs,
            locators: FourGuardiansLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(e2eOptions);
    }   

}

new FourGuardiansSmokeSpec().start();
