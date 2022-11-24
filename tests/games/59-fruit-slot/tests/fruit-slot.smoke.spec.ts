import { FruitSlotLocators } from "../locators/fruit-slot-locators";
import { FruitSlotConfigs } from "../fruit-slot-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

// import { GameConfiguration } from "../game-configuration";
// import { ImageLocator } from "../base-image-locator";

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

    //Remove or update these code below if you want use these test cases from base or add more test case code.
    protected override inGameDealerTests(): void {}
}

new FruitSlotSmokeSpec().start();
