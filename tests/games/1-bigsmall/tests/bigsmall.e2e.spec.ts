import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { BigSmallLocators } from "../locators/bigsmall-locators";
import { BigSmallConfigs } from "../bigsmall-configs";
import { IBaseOptions, BalancedBettingGameBase } from "../../../core/e2e-game-bases";

class BigSmallE2ESpec extends BalancedBettingGameBase {
    constructor() {
        const E2EOptions: IBaseOptions = {
            placeBetChoices: [BigSmallConfigs.choices[0]],
            gameConfiguration: BigSmallConfigs,
            locators: BigSmallLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(E2EOptions);
    }

    protected test1(): void {
        test("test1", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            console.log('done');
            
        });
    }
}


new BigSmallE2ESpec().start();
