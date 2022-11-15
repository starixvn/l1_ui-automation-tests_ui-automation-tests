import { GameConfiguration } from "../../core/game-configuration";
export const BlockchainBaccaratConfigs: GameConfiguration = {
    id: 48,
    name: "BlockchainBaccarat",
    durations: {
        wholeRound: 48 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 13 * 1000,
    },
    choices: ["player", "banker", "tie", "big", "small", "playerPair", "bankerPair", "natural"],
    hedgeBetGroups: [["player", "banker"]],
    maxTimeout: 300 * 1000, // miliseconds,
    odds: {
        player: 2.5,
        banker: 1.96,
        big: 1.54,
        small: 2.5,
        tie: 9,
        playerPair: 12,
        bankerPair: 12,
    },
    betBoard: false,
};
