import { GameConfiguration } from "../../core/game-configuration";
export const FPCConfigs: GameConfiguration = {
    id: 3,
    name: "FISH PRAWN CRAB",
    durations: {
        wholeRound: 40 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 5 * 1000,
    },
    choices: ["fish", "crab"],
    hedgeBetGroups: [["fish", "crab"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        single: 3,
        double: 3.6,
        triple: 7
    },
    betBoard: true,
    socketName: "fishprawncrab"
};
