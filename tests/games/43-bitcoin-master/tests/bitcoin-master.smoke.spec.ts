import {test, expect} from '../../../core/base-fixture'
import {GameEvent} from '../../../_shared/events'
import { BitCoinMasterLocators } from "../locators/bitcoin-master-locators";
import { BitCoinMasterConfigs } from "../bitcoin-master-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class BitCoinMasterSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [BitCoinMasterConfigs.choices[0]],
            gameConfiguration: BitCoinMasterConfigs,
            locators: BitCoinMasterLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected placeBetAndSettleTests(): void {
    }
}

new BitCoinMasterSmokeSpec().start();
