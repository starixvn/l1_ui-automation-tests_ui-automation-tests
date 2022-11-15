import { BitCoinMasterLocators } from "../locators/bitcoin-master-locators";
import { BitCoinMasterConfigs } from "../bitcoin-master-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class BitCoinMasterSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [BitCoinMasterConfigs.choices[0]],
            gameConfiguration: BitCoinMasterConfigs,
            locators: BitCoinMasterLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected inGameBetChoiceTests(): void {  
    }
}

new BitCoinMasterSmokeSpec().start();
