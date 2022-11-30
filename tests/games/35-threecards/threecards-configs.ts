import { GameConfiguration } from "../../core/game-configuration";
export const ThreeCardsConfigs: GameConfiguration = {
    id: 35,
    name: "threecards",
    durations: {
        wholeRound: 39 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 4 * 1000,
    },
    choices: ["red", "black", "diamonds","hearts", "spades", "clubs"],
    hedgeBetGroups: [["red", "black"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        red: 1.96,
        black: 1.96,
        diamonds: 1.68,
        hearts: 1.68,
        spades: 1.68,
        clubs: 1.68,
    },
    betBoard: false,
};
