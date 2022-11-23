import { GameConfiguration } from "../../core/game-configuration";
export const SpecialSedieConfigs: GameConfiguration = {
    id: 24,
    name: "SpecialSeDie", //specialsedie
    durations: {
        wholeRound: 39 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 4 * 1000,
    },
    choices: ["even", "odd"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 150 * 1000, // miliseconds,
    odds: {
        even: 1.96,
        odd: 1.96,
    },
    betBoard: true,
};
