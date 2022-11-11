import { GameConfiguration } from "../../core/game-configuration";
export const BaccaratConfigs: GameConfiguration = {
    id: 27,
    name: "baccarat",
    durations: {
        wholeRound: 45 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 9 * 1000,
    },
    choices: ["player", "banker", "tie", "big", "small", "playerPair", "bankerPair", "natural"],
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        player: 2,
        banker: 1.97,
        big: 1.55,
        small: 2.6,
        tie: 10,
        playerPair: 12,
        bankerPair: 12,
    },
    betBoard: false,
};
