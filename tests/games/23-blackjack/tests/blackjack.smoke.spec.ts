import { BlackJackLocators } from "../locators/blackjack-locators";
import { BlackJackConfigs } from "../blackjack-configs";
import { IBaseOptions, CardGameBase } from "../../../core/smoke-game-bases";

class BlackJackSmokeSpec extends CardGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [BlackJackConfigs.choices[0],BlackJackConfigs.choices[1],BlackJackConfigs.choices[2]],
            gameConfiguration: BlackJackConfigs,
            locators: BlackJackLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

}


new BlackJackSmokeSpec().start();
