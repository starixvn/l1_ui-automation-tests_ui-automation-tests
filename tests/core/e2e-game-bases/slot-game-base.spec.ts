import { test, expect } from "../base-fixture";
import { GameEvent } from "../../_shared/events";
import { BasePlayer, BaseGame } from "..";
import IBaseOptions from "./base-options";
// const fs = require('fs');

export interface SlotGameOptions extends IBaseOptions {
    placeBetChoices: string[];
    placeBetAmount?: number;
}

export class SlotGameBase {
    game: BaseGame;
    player: BasePlayer;

    constructor(protected options: SlotGameOptions) {}
    protected inGameOddsTests() {
        test("AND odds should be correct", async () => {
            // Assert
            expect(this.game.odds).toStrictEqual(this.options.gameConfiguration.odds);
        });
    }

    protected inGameTitleTests() {
        test("AND Title of Game should be displayed", async () => {
            // Act
                const titleSnapshot = await this.game.captureTitle();

            // Assert
                expect(titleSnapshot.image).toMatchSnapshot(titleSnapshot.name);
        });
    }

    protected inGameBetChoiceTests() {
        test("AND bet choices should be displayed on table and check highlight state", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await openBetChoiceBoard(this.game);
            for (const placeBetChoice of this.options.placeBetChoices) {
                //Act 1
                await selectBetChoice(this.game, `${placeBetChoice}button`);
                let betChoice = await this.game.captureChoice(placeBetChoice);
                // Assert
                expect(betChoice.image).toMatchSnapshot(betChoice.name);

                //Act 2
                await closeBetChoiceBoard(this.game);
                await openBetChoiceBoard(this.game);
                // Assert2
                expect(betChoice.image).toMatchSnapshot(betChoice.name);
            }
            await closeBetChoiceBoard(this.game);
        });
    }

    protected placeBetAndSettleTests() {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: this.options.placeBetAmount ?? 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);
            let today = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'});

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();
            let bettime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });

            // Assert
            expect(placeBetResponse.endBet).toBe(bet.amount * parseInt(bet.choice));
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
            // Arrange
            await this.player.openHistory();

            // Act
            const historySnapshot = await this.game.captureHistory();

            // Assert
            expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
            await verifyticketdata(this.game, global.settledata)

            await openRoundDetail(this.game);
            let roundID = await getRoundId(this.game, "historyDetail_roundId");
            expect(roundID).toEqual(global.settledata.roundID)

            //Post-Act           
            await this.game.clickOutSide()
            await this.game.waitForTimeout(500);
            await this.game.clickOutSide()
            await this.game.waitForTimeout(500);


        });

    }
     
    protected GuideTests() {
        test("AND player could open guide and clarify appropriate content", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.clickGuide();
            let guidecontent =await this.game.getGuideContent()
            // console.log(typeof guidecontent);
            // await fs.writeFileSync('guide.txt', guidecontent)
             // Assert
            expect(this.options.gameConfiguration.guidecontent,'verify guide content').toEqual(guidecontent);
            await this.game.clickOutSide()
            
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
        this.inGameOddsTests();
        this.inGameBetChoiceTests();
        this.placeBetAndSettleTests();
        this.ticketHistoryTests();
        this.GuideTests()
    }
}

const openBetChoiceBoard = async (game: any) => {
    await game.clickLocator("choiceMenu");
    await game.waitForTimeout(2000);
};

const selectBetChoice = async (game: any, choice: string) => {
    await game.waitForTimeout(500);
    await game.clickLocator("Clearbutton");
    await game.clickLocator(choice);
    await game.waitForTimeout(500);
};

const closeBetChoiceBoard = async (game: any) => {
    await game.clickLocator("submitBetBoard");
    await game.waitForTimeout(500);
};

const getRoundId = async (game: any, elementname: string = "roundId") => {
    await game.waitForTimeout(500);
    let roundId = await game.getTextLocator(elementname);
   
    return typeof roundId != null ? roundId.replace(/[^0-9.]/g, "") : roundId;
};

const getDataFistRowHistory = async (game: any, elementname: string = "history_firstrow") => {
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
    await game.clickLocator("history_roundId");
    await game.waitForTimeout(500);
};

const verifyticketdata = async (game: any, expectdata: any) => {
    await game.waitForTimeout(500);
    const ticketdata = await getDataFistRowHistory(game);      
    expect(ticketdata.betdate,'verify bet date').toEqual(expectdata.betdate);   
    expect(ticketdata.roundID,'verify bet roundId').toEqual(expectdata.roundID);
    expect(ticketdata.bet).toEqual(expectdata.bet);
    expect(ticketdata.line,'verify bet bet choice').toEqual(expectdata.line);
    expect(ticketdata.betwin,'verify bet win').toEqual(expectdata.betwin);  
};
