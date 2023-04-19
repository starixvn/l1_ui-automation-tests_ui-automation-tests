import { FruitSlotLocators } from "../locators/fruit-slot-locators";
import { FruitSlotConfigs } from "../fruit-slot-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";


class FruitSlotGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const SmokeOptions: IBaseOptions = {
            gameConfiguration: FruitSlotConfigs,
            placeBetChoices: [FruitSlotConfigs.choices[8]],
            waitBetTimeout: 10000,
            locators: FruitSlotLocators,
            snapshotFolderPath: __filename,
        };

        super(SmokeOptions);
    }
}

new FruitSlotGameGuideSpec().start();
