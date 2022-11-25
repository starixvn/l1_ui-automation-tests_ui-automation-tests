import { GameConfiguration } from "../../core/game-configuration";
export const BlackJackConfigs: GameConfiguration = {
    id: 23,
    name: "BlackJack",
    choices: [
        "1",
        "2",
        "3",
    ],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        regular: 2,
        blackjack: 2.5,
    },
    cardgame: true,
};
