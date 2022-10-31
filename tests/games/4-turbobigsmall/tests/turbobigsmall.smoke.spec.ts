import { TurboBigSmallLocators } from "../locators/turbobigsmall-locators";
import { TurboBigSmallConfigs } from "../turbobigsmall-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class TurboBigSmallSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [TurboBigSmallConfigs.choices[0]],
            gameConfiguration: TurboBigSmallConfigs,
            locators: TurboBigSmallLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 5000,
        };
        super(smokeOptions);
    }

    protected override ticketHistoryTests(): void {}
}

new TurboBigSmallSmokeSpec().start();
