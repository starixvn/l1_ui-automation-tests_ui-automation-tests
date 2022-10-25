import { GameConfiguration } from "../../core/game-configuration";
export const BigSmallConfigs: GameConfiguration = {
    id: 1,
    name: "BigSmall",
    durations: {
        wholeRound: 61 * 1000,
        placingBets: 50 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 5 * 1000,
    },
    choices: ["big", "small"],
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        big: 1.98,
        small: 1.98,
    },
};
