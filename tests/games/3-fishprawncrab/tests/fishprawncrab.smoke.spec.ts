import { FPCLocators } from "../locators/fishprawncrab-locators";
import { FPCConfigs } from "../fishprawncrab-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class FPCSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [FPCConfigs.choices[0]],
            gameConfiguration: FPCConfigs,
            locators: FPCLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new FPCSmokeSpec().start();
