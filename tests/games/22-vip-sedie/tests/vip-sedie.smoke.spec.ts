import { VipSedieLocators } from "../locators/vip-sedie-locators";
import { VipSedieConfigs } from "../vip-sedie-configs";
import { TableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class VipSedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: TableGameOptions = {
            placeBetChoices: [
                {
                    choice: VipSedieConfigs.choices[1],
                    amount: 10,
                },
            ],
            gameConfiguration: VipSedieConfigs,
            locators: VipSedieLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    //Remove or update these code below if you want use these test cases from base or add more test case code.
    protected override hedgeBetTests(): void {}

    protected override ticketHistoryTests(): void {}

    protected override placeBetAndSettleTests(): void {}
}

new VipSedieSmokeSpec().start();
