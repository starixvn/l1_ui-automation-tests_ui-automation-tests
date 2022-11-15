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
        single: 3,
        double: 3.6,
        triple: 7,
        anyTriple: 34,
        mountain: 1.98,
        ocean: 1.98,
    },
    betBoard: false,
};
