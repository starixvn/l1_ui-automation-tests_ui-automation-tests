import { GameConfiguration } from "../../core/game-configuration";
export const FPCConfigs: GameConfiguration = {
    id: 3,
    name: "fishprawncrab",
    durations: {
        wholeRound: 40 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 7 * 1000,
        shakeThePlateDuration: 3 * 1000,
    },
    choices: ["stag", "gourd", "rooster", "fish", "crab", "prawn"],
    hedgeBetGroups: [["fish", "crab"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        single: 2,
        double: 3.5,
        triple: 6,
    },
    betBoard: false,
};
