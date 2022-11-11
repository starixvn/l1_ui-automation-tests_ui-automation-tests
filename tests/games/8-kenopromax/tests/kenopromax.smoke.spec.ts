import { KenoProMaxLocators } from "../locators/kenopromax-locators";
import { KenoProMaxConfigs } from "../kenopromax-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class KenoProMaxSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
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
