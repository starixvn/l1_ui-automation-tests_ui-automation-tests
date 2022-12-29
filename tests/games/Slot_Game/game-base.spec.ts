import { test, expect } from "../base-fixture";
import { GameEvent } from "../../_shared/events";
import { BasePlayer, BaseGame } from "..";
import IBaseOptions from "./base-options";

export class MiniGameBase {
    game: BaseGame;
    player: BasePlayer;

    constructor(protected options: IBaseOptions) {}

    protected function1() {
        test("1", async () => {
            // Arrange
            console.log(1);
            
        });
    }

    start(): void {
        test.beforeEach(async ({}, testInfo) => {
            testInfo.snapshotPath = (name: string) => {
                const snapshotPath = this.options.snapshotFolderPath + "-snapshots/" + name;

                return snapshotPath;
            };
        });

        test.use({
            gameConfigurations: this.options.gameConfiguration,
            locators: this.options.locators,
        });

        test.describe.serial(`${this.options.gameConfiguration.name} Smoke Tests`, () => {
            test.beforeAll(async ({ baseGame }) => {
                this.game = baseGame;
                this.player = new BasePlayer(this.game);
            });
            
            this.runScenario();
        });
    }

    protected runScenario() {
        this.function1();
}
}