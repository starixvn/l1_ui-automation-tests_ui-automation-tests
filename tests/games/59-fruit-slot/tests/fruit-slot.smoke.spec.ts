import { FruitSlotLocators } from "../locators/fruit-slot-locators";
import { FruitSlotConfigs } from "../fruit-slot-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";


class FruitSlotSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: FruitSlotConfigs,
            placeBetChoices: [FruitSlotConfigs.choices[8]],
            waitBetTimeout: 10000,
            locators: FruitSlotLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected override inGameDealerTests(): void {}
}

new FruitSlotSmokeSpec().start();
