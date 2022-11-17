import { GameConfiguration } from "../../core/game-configuration";
export const TurboBigSmallConfigs: GameConfiguration = {
    id: 4,
    name: "TXTurbo",
    durations: {
        wholeRound: 37 * 1000,
        placingBets: 30 * 1000,
        lockingBet: 3 * 1000,
        shakeThePlateDuration: 3 * 1000,
    },
    choices: ["big", "small"],
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 200 * 1000, // miliseconds, should not over 2 * wholeRound
    odds: {
        big: 1.96,
        small: 1.96,
    },
    socketName: "turbobigsmall",
    betBoard: true,
};
