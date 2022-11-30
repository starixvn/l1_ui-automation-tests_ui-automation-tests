import { GameConfiguration } from "../../core/game-configuration";
export const VipBaccaratConfigs: GameConfiguration = {
    id: 27,
    name: "VipBaccarat",
    durations: {
        wholeRound: 45 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 10 * 1000,
    },
    choices: ["player", "banker", "tie", "big", "small", "playerPair", "bankerPair", "natural"],
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        player: 2,
        banker: 1.95,
        big: 1.54,
        small: 2.5,
        tie: 9,
        playerPair: 12,
        bankerPair: 12,
    },
    betBoard: false,
};
