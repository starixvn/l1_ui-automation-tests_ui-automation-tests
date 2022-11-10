import { GameConfiguration } from "../../core/game-configuration";
export const FPCConfigs: GameConfiguration = {
    id: 1,
    name: "FISH PRAWN CRAB",
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
        big: 1.96,
        small: 1.96,
    },
    betBoard: true,
    socketName: "fishprawncrab"
};
