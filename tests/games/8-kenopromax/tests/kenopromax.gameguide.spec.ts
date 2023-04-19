import { KenoProMaxLocators } from "../locators/kenopromax-locators";
import { KenoProMaxConfigs } from "../kenopromax-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class KenoProMaxGameGuideSpec extends GameGuideBase {
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

new KenoProMaxGameGuideSpec().start();
