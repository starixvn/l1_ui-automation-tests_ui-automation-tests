import { GameConfiguration } from "../../core/game-configuration";
export const VipSedieConfigs: GameConfiguration = {
    id: 22,
    name: "VipSeDie",
    durations: {
        wholeRound: 39 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 2 * 1000,
    },
    choices: ["odd", "even", "red2", "red3", "red4", "white3", "white4"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 100 * 1000, // miliseconds,
    odds: {
        even: 1.96,
        odd: 1.96,
        red2: 2.5,
        red3: 3.76,
        red4: 14.5,
        white3: 3.76,
        white4: 14.5,
    },
    socketName: "vsedie",
};
