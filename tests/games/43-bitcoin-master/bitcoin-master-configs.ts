import { GameConfiguration } from "../../core/game-configuration";
export const BitCoinMasterConfigs: GameConfiguration = {
    id: 43,
    name: "bitcoinmaster",
    durations: {
        wholeRound: 119 * 1000,
        placingBets: 45 * 1000,
        lockingBet: 60 * 1000,
        shakeThePlateDuration: 15 * 1000,
    },
    choices: ["up", "down", "odd", "even"],
    hedgeBetGroups: [["up", "down"]],
    maxTimeout: 900 * 1000, // miliseconds,
    odds: {
        up: 1.98,
        down: 1.98,
        odd: 1.98,
        even: 1.98,
    },
    betBoard: true,
};
