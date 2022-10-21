import { VipSedieLocators } from "../locators/vip-sedie-locators";
import { VipSedieConfigs } from "../vip-sedie-configs";
import { TableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class VipSedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: TableGameOptions = {
            placeBetChoices: [VipSedieConfigs.choices[1]],
            gameConfiguration: VipSedieConfigs,
            locators: VipSedieLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    //Remove this code below if you want to implement testing code.
    protected override hedgeBetTests(): void {}

    protected override inGameOddsTests(): void {}

    protected override ticketHistoryTests(): void {}

    protected override inGameBetChoiceTests(): void {}

    protected override placeBetAndSettleTests(): void {}
}

new VipSedieSmokeSpec().start();
