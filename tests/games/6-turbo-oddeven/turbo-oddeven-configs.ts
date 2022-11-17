import { GameConfiguration } from "../../core/game-configuration";
export const TurboOddEvenConfigs: GameConfiguration = {
    id: 6,
    name: "OETurbo",
    durations: {
        wholeRound: 37 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 2 * 1000,
    },
    choices: ["odd", "even"],
    hedgeBetGroups: [["odd", "even"]],
    maxTimeout: 300 * 1000, // miliseconds,
    odds: {
        odd: 1.96,
        even: 1.96,
    },
    socketName: "turbooddeven",
    betBoard: true,

};
