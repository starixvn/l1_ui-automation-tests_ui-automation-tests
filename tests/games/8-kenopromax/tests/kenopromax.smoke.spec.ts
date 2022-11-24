import { KenoProMaxLocators } from "../locators/kenopromax-locators";
import { KenoProMaxConfigs } from "../kenopromax-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class KenoProMaxSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [KenoProMaxConfigs.choices[0]],
            gameConfiguration: KenoProMaxConfigs,
            locators: KenoProMaxLocators,
            waitBetTimeout: 9000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected inGameDealerTests(): void {}
}

new KenoProMaxSmokeSpec().start();
