import { GameConfiguration } from "../../core/game-configuration";
export const DragonTigerConfigs: GameConfiguration = {
    id: 7,
    name: "dragontiger",
    durations: {
        wholeRound: 36 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 3 * 1000,
    },
    choices: ["dragon", "tiger", "tie"],
    hedgeBetGroups: [["dragon", "tiger"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        dragon: 2,
        tiger: 2,
        tie: 11,
    },
    betBoard: false,
};
