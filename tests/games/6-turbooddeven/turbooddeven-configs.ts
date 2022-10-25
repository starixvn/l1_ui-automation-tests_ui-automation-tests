import { GameConfiguration } from "../../core/game-configuration";
export const TurboOddEvenConfigs: GameConfiguration = {
    id: 6,
    name: "OETurbo",
    durations: {
        wholeRound: 37 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 3 * 1000,
        shakeThePlateDuration: 3 * 1000,
    },
    choices: ["odd", "even"],
    hedgeBetGroups: [["odd", "even"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        odd: 1.94,
        even: 1.95,
    },
    socketName: "turbooddeven",
};
