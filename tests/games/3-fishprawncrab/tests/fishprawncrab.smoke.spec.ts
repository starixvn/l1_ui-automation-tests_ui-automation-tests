import { FPCLocators } from "../locators/fishprawncrab-locators";
import { FPCConfigs } from "../fishprawncrab-configs";
import {IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class FPCSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [FPCConfigs.choices[3]],
            gameConfiguration: FPCConfigs,
            locators: FPCLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected override hedgeBetTests(): void {}
}

new FPCSmokeSpec().start();
