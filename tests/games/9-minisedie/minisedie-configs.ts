import { GameConfiguration } from "../../core/game-configuration";
export const MiniSedie1Configs: GameConfiguration = {
    id: 9,
    name: "MiniSeDie",
    durations: {
        wholeRound: 38 * 1000,
        placingBets: 28 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 5 * 1000,
    },
    choices: ["odd", "even", "red3", "red4", "white3", "white4"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        even: 1.96,
        odd: 1.96,
        red3: 3.75,
        white3: 3.75,
        red4: 14.4,
        white4: 14.4,
    },
    socketName: "minisedie",
}

export const MiniSedie2Configs: GameConfiguration = {
    id: 9,
    name: "MiniSeDie2",
    durations: {
        wholeRound: 38 * 1000,
        placingBets: 28 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 5 * 1000,
    },
    choices: ["odd", "even"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 100 * 1000, // miliseconds,
    odds: {
        even: 1.96,
        odd: 1.96,
        red3: 3.75,
        white3: 3.75,
        red4: 14.4,
        white4: 14.4,
    },
    socketName: "minisedie",
}
