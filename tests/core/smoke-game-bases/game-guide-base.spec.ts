import { test, expect } from "../base-fixture";
import { BasePlayer, BaseGame, ImageCheck } from "..";
import IBaseOptions from "./base-options";
import { ssoToGame } from "../../lobby/lobby";
import { basename } from "path";
import { LobbyLocator} from "../../lobby/locators";

let langopt = process.env.npm_config_langopt ?? "vn";
if (langopt == "all"){langopt = "vn"}
export class GameGuideBase {
    game: BaseGame;
    player: BasePlayer;
    imageCheck: ImageCheck;

    constructor(protected options: IBaseOptions) {}

    protected gameGuideTest() {
        test("Game guide should be correct in " + LobbyLocator[`${langopt}LangOption`], async () => {
            await this.game.clickGuide();
            await this.imageCheck.guideImages();
        });
    }

    protected gameGuideTestbyLanguage(lang: string = "vn") {
         test("Game guide should be correct in " + LobbyLocator[`${lang}LangOption`], async () => {
            process.env.npm_config_langopt = lang;
            langopt = lang;
            await this.game.login();
            await this.game.clickGuide();
            await this.imageCheck.guideImages();
        });

        }
    

    
    start(): void {
        test.beforeEach(async ({}, testInfo) => {
            testInfo.snapshotPath = (name: string) => {
                const snapshotPath = (langopt === "vn")? this.options.snapshotFolderPath + "-snapshots/" + name : this.options.snapshotFolderPath + "-snapshots/" + langopt+'/'+ name

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
                this.imageCheck = new ImageCheck(this.game)
            });

            this.runScenario();
        });
    }

    protected runScenario() {
        if(process.env.npm_config_langopt == "all" && process.env.npm_config_env?.includes("local")){
            this.gameGuideTest();
            this.gameGuideTestbyLanguage("en");
            this.gameGuideTestbyLanguage("id");
            this.gameGuideTestbyLanguage("th");
            this.gameGuideTestbyLanguage("tw");
            this.gameGuideTestbyLanguage("cn");
        }
        else if (process.env.npm_config_langopt == "all"&& process.env.npm_config_env?.includes("pro")){
            this.gameGuideTest();
            this.gameGuideTestbyLanguage("en");
            this.gameGuideTestbyLanguage("tw");
        }
        else
            this.gameGuideTest();
    }
}
