import { VIPFPCLocators } from "../locators/vip-fishprawncrab-locators";
import { VIPFPCConfigs } from "../vip-fishprawncrab-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class VIPFPCSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [VIPFPCConfigs.choices[7]],
            gameConfiguration: VIPFPCConfigs,
            locators: VIPFPCLocators,
            waitBetTimeout: 12000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new VIPFPCSmokeSpec().start();
