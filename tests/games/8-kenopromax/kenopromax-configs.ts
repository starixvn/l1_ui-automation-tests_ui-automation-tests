import { GameConfiguration } from "../../core/game-configuration";
export const KenoProMaxConfigs: GameConfiguration = {
    id: 8,
    name: "kenopromax",
    durations: {
        wholeRound: 39 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 4 * 1000,
    },
    choices: ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"],
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        big: 1.96,
        small: 1.96,
        even: 1.96,
        odd: 1.96,
        earth: 9.2,
        fire: 4.6,
        gold: 9.2,
        water: 2.4,
        wood: 4.6,
    },
    betBoard: false,
};
