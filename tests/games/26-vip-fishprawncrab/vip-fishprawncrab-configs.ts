import { GameConfiguration } from "../../core/game-configuration";
export const VIPFPCConfigs: GameConfiguration = {
    id: 26,
    name: "VipFishPrawnCrab",
    durations: {
        wholeRound: 42 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 2 * 1000,
    },
    choices: ["stag", "gourd", "rooster", "fish", "crab", "prawn","anyTriple","mountain","ocean"],
    hedgeBetGroups: [["mountain", "ocean"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        single: 2,
        double: 3.5,
        triple: 6,
        anyTriple: 31,
        mountain: 1.96,
        ocean: 1.96,
    },
    betBoard: false,
};
