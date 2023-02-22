import { test, expect } from "../base-fixture";
import { GameEvent } from "../../_shared/events";
import { BasePlayer, BaseGame } from "..";
import IBaseOptions from "./base-options";
import { CSLocatorNames } from "../base-classic-slot-locator";
import { Page } from "@playwright/test";

// const fs = require('fs');

export interface SlotGameOptions extends IBaseOptions {
    placeBetChoices: string[];
    placeBetAmount?: number;
}

export class SlotGameBase {
    game: BaseGame;
    player: BasePlayer;

    constructor(protected options: SlotGameOptions) {}

    protected inGameTests() {
        test("Verify Odds", async () => {
            // Assert
            await test.step(`Verify ODD should be correct`, async () => {
                expect(this.game.odds).toStrictEqual(this.options.gameConfiguration.odds);
            });
        });
    }

    protected UIGeneral() {
        test("Verify game name", async () => {
            await this.game.verifyImageExist(CSLocatorNames.imgGameName);
        });

        test("Verify RoundID is empty", async () => {
            await this.game.verifyImageExist(CSLocatorNames.lblRoundID);
        });

        test("Verify payline number in right & left column", async () => {
            await this.game.verifyImageExist(CSLocatorNames.imgLeftNumbersColumn);
            await this.game.verifyImageExist( CSLocatorNames.imgRightNumbersColumn);
        });
    }

    protected PayLine() {
        test("Verify default paylines when opening game", async () => {
            await this.game.verifyImageExist(CSLocatorNames.btnPayline);
        });

        test("Verify UI of Payline", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await openPayLineBoard(this.game);
            for (const placeBetChoice of this.options.placeBetChoices) {
                //Act 1
                await selectBetChoice(this.game, `btn${placeBetChoice}`);

                let betChoice = await this.game.captureLocator(`tbl${placeBetChoice}`);
                // Assert
                expect(betChoice.image).toMatchSnapshot(betChoice.name);

                //Act 2
                await closePayLineBoard(this.game);
                await openPayLineBoard(this.game);
                // Assert2
                expect(betChoice.image).toMatchSnapshot(betChoice.name);
            }
        });

        test("Verify Submit bet is disabled when no choice is selected", async () => {
            // Act submit button is disabled
            await this.game.clickLocator(CSLocatorNames.btnClearPayline);
            await this.game.waitForTimeout(2000);
            await this.game.verifyImageExist(CSLocatorNames.imgConfirmPaylineDisabled);

            //Post-Condition
            await closePayLineBoard(this.game);
        });
    }

    protected BetTotalBetStake() {
        test("Verify Stake button when opening game", async () => {});

        test("Verify list stake menu", async () => {});

        test("Verify selecting bet stake 0.5/1/5", async () => {});

        test("Verify total stake", async () => {});
    }

    protected AutoSpinTest() {
        test("Verify UI of auto spin", async () => {
            // test.setTimeout(this.options.gameConfiguration.maxTimeout);
            // // Act
            // await this.game.clickLocator("autoSpin");
            // const autospinboard = await this.game.captureLocator("autoSpinBoard");
            // // Assert
            // expect(autospinboard.image).toMatchSnapshot(autospinboard.name);
            // await this.game.clickLocator("autoSpinTurbo");
            // await this.game.clickLocator("autoSpinStart");
            // // await waitUntilImageExisted(this.game, "autoSpinBoard.png", 15);
        });

        test("Verify user can stop auto spin", async () => {});

        test("Verify case user select 10 auto spins. Wait for finishing 10 auto spins", async () => {});

        test("Verify buttons: Paylines & Stake is disabled when game is auto spinning", async () => {});
    }

    protected TurboTest() {
        test("THEN player able to turn on/ off turbo mode", async () => {
            // Verify default turbo off state
            const turboOff = await this.game.captureLocator(CSLocatorNames.imgTurboOFF);

            // Assert Turbo Off
            expect(turboOff.image).toMatchSnapshot(turboOff.name);

            // Turbo ON
            await clickTurbo(this.game);
            const turboOn = await this.game.captureLocator(CSLocatorNames.imgTurboOn);

            // Assert turbo On
            expect(turboOn.image).toMatchSnapshot(turboOn.name);

            // Turbo OFF
            await clickTurbo(this.game);

            // Assert Turbo Off
            expect(turboOff.image).toMatchSnapshot(turboOff.name);
        });
    }

    protected SpinByKeys() {
        test("Verify user able spin by space with turbo mode OFF", async () => {});

        test("Verify user able spin by enter key with turbo mode OFF", async () => {});

        test("Verify user able spin by space with turbo mode ON", async () => {});

        test("Verify user able spin by enter key with turbo mode ON", async () => {});

        test("Verify user can not spin by keys when payline is displayed", async () => {});

        test("Verify user can not spin by keys when autospin board is displayed", async () => {});

        test("Verify user can not spin by keys when history is displayed", async () => {});
    }

    
// const logmsg = async(page:Page) {
//     page.on('websocket', ws => {
//         console.log(`WebSocket opened: ${ws.url()}>`);
//         ws.on('framesent', event => console.log(event.payload));
//         ws.on('framereceived', event => console.log(event.payload));
//         ws.on('close', () => console.log('WebSocket closed'));
//       });

// }

    protected placeBetAndSettleTests() {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);   
            const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric" });         
            const bet = { choice: `btn${this.options.placeBetChoices[0]}`, amount: CSLocatorNames.lblBetLevel1 };
            let bettime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBetClassicSlot(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();

            // Assert
            expect(settledResults.endBet).toBe(bet.amount * parseInt(bet.choice));
            expect(bet).toMatchWinningSlotsGame(settledResults);

            // Post-Act
            const settledata = {
                roundID: await getRoundId(this.game),
                betwin: settledResults.winAmount.toString(),
                bet: bet.amount.toString(),
                line: bet.choice,
                bettime: bettime,
                betdate: today,
            };
            global.settledata = settledata;
        });
    }

    protected ticketHistoryTests() {
        test("AND player could open history popup", async () => {
            // Act
            await this.game.clickLocator(CSLocatorNames.mnuHamburger);
            await this.game.clickLocator(CSLocatorNames.icoHistory);

            // Assert
            await verifyticketdata(this.game, global.settledata);

            await openRoundDetail(this.game);
            let roundID = await getRoundId(this.game, CSLocatorNames.lblHistoryDetailRoundId);
            expect(roundID).toEqual(global.settledata.roundID);

            //Post-Act
            await this.game.clickLocator(CSLocatorNames.btnClosePopup);
            await this.game.waitForTimeout(500);
            await this.game.clickLocator(CSLocatorNames.btnClosePopup);
            await this.game.waitForTimeout(500);
        });
    }

    protected GuideTests() {
        test("AND player could open guide and clarify appropriate content", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.clickLocator(CSLocatorNames.mnuHamburger);
            await this.game.clickLocator(CSLocatorNames.icoGuide);
            await this.game.waitForTimeout(1000)
            // let guidecontent = await this.game.getGuideContent();
            // await this.game.mouseDragDrop({xPos:1136, yPos:173},{xPos:1136, yPos:400})
            // await this.game.mouseWhell({xPos:1139, yPos:597})
            await this.game.elementCapture("")
            // console.log(typeof guidecontent);
            // await fs.writeFileSync('guide.txt', guidecontent)
            // Assert
            // expect(this.options.gameConfiguration.guidecontent, "verify guide content").toEqual(guidecontent);
            await this.game.clickLocator(CSLocatorNames.btnClosePopup);
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

        test.describe.serial(`${this.options.gameConfiguration.name} E2E Testing`, () => {
            test.beforeAll(async ({ baseGame }) => {
                this.game = baseGame;
                this.player = new BasePlayer(this.game);
            });

            this.runScenario();
        });
    }

    protected runScenario() {
        this.inGameTests();
        this.UIGeneral();
        // this.PayLine();
        // this.BetTotalBetStake();
        // this.AutoSpinTest();
        // this.TurboTest();
        // this.SpinByKeys();
        // this.placeBetAndSettleTests();
        // this.ticketHistoryTests();
        this.GuideTests();
    }
}

const openPayLineBoard = async (game: any) => {
    await game.clickLocator(CSLocatorNames.btnPayline);
    await game.waitForTimeout(2000);
};

const selectBetChoice = async (game: any, choice: string) => {
    await game.waitForTimeout(500);
    await game.clickLocator(CSLocatorNames.btnClearPayline);
    await game.clickLocator(choice);
    await game.waitForTimeout(500);
};

const closePayLineBoard = async (game: any) => {
    await game.clickLocator(CSLocatorNames.btnClosePopup);
    await game.waitForTimeout(1000);
};

const clickTurbo = async (game: any) => {
    await game.clickLocator(CSLocatorNames.btnTurbo);
    await game.waitForTimeout(500);
};

const getRoundId = async (game: any, elementname: string = CSLocatorNames.lblRoundID) => {
    await game.waitForTimeout(500);
    let roundId = await game.getTextLocator(elementname);

    return typeof roundId != null ? roundId.replace(/[^0-9.]/g, "") : roundId;
};

const getDataFistRowHistory = async (game: any, elementname: string = CSLocatorNames.lblHistoryFirstRow) => {
    let tempdata = await game.getTextLocator(elementname);
    tempdata = await tempdata.split(" ");
    return {
        bettime: tempdata[0].toString(),
        betdate: tempdata[1].toString(),
        roundID: tempdata[2].toString(),
        bet: tempdata[3].toString(),
        line: tempdata[4].toString(),
        totalbet: tempdata[5].toString(),
        betwin: tempdata[6].trim(),
    };
};

const openRoundDetail = async (game: any) => {
    await game.clickLocator(CSLocatorNames.locHistoryRoundId);
    await game.waitForTimeout(500);
};

const verifyticketdata = async (game: any, expectdata: any) => {
    let betStake = expectdata.bet.replace(/[^0-9.]/g, "");
    let payline = expectdata.line.replace(/[^0-9.]/g, "");
    await game.waitForTimeout(500);
    const ticketdata = await getDataFistRowHistory(game);
    expect(ticketdata.betdate, "verify bet date").toEqual(expectdata.betdate);
    expect(ticketdata.bet).toEqual(betStake);
    expect(ticketdata.line, "verify bet bet choice").toEqual(payline);
    expect(ticketdata.betwin, "verify bet win").toEqual(expectdata.betwin);
};

const selectPayline = async (game: any, payline: string) => {
    await game.clickLocator(CSLocatorNames.btnPayline);
    await game.waitForTimeout(500);
    await game.clickLocator(CSLocatorNames.btnClearPayline);
    await game.clickLocator(payline);
    await game.clickLocator(CSLocatorNames.btnConfirmPayline);
    await game.waitForTimeout(500);
};

const selectBetStake = async (game: any, betLevel: string) => {
    await game.clickLocator(CSLocatorNames.cboBetLevel);
    await game.waitForTimeout(100);
    await game.clickLocator(betLevel);
    await game.waitForTimeout(500);
};

const clickSpin = async (game: any) => {
    await game.clickLocator(CSLocatorNames.btnSpin);
    await game.waitForTimeout(500);
};

