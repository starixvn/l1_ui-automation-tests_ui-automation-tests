import { ClassicSlotLocators } from "../locators/four-guardians-e2e-locators";
import { FourGuardiansConfigs } from "../four-guardians-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";

class FourGuardiansE2ESpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const e2eOptions: IBaseOptions = {
            placeBetChoices: [
                FourGuardiansConfigs.choices[0],
                FourGuardiansConfigs.choices[1],
            ],
            gameConfiguration: FourGuardiansConfigs,
            locators: ClassicSlotLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(e2eOptions);
    }
}

new FourGuardiansE2ESpec().start();
