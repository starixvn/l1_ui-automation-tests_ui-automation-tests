import {test} from '../../../core/base-fixture'
import { FourGuardiansLocators } from "../locators/four-guardians-locators";
import { FourGuardiansConfigs } from "../four-guardians-configs";
import { SlotGameOptions, SlotGameBase } from "../../../core/smoke-game-bases/slot-game-base.spec";

class FourGuardiansSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: SlotGameOptions = {
            placeBetChoices: [FourGuardiansConfigs.choices[0]],
            gameConfiguration: FourGuardiansConfigs,
            locators: FourGuardiansLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new FourGuardiansSmokeSpec().start();
