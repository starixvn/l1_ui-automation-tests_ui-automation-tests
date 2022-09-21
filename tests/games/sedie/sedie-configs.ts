import { GameConfiguration } from "../../core/game-configuration.ts";
export const SedieConfigs: GameConfiguration = {
    id: 2,
    name: "SeDie",
    durations: {
        wholeRound: 39 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 2 * 1000,
    },
    choices: ["even", "odd", "red3", "red4", "white3", "white4", "red2"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 45 * 1000, // miliseconds
};
