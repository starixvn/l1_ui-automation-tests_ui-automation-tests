import { GameConfiguration } from "../../core/game-configuration";
export const TexasHoldemPokerrConfigs: GameConfiguration = {
    id: 42,
    name: "TexasHoldemPoker",
    choices: ["ante", "call", "turn", "river"],
    maxTimeout: 200 * 1000, // miliseconds,
    odds: {
        call: 2,
        turn: 2,
        river: 2,
        AnteBet_highCard: 1,
        AnteBet_onePair: 1,
        AnteBet_twoPairs: 1,
        AnteBet_threeKind: 1,
        AnteBet_straight: 2,
        AnteBet_flush: 2,
        AnteBet_fullHouse: 2,
        AnteBet_fourKind: 2,
        AnteBet_straightFlush: 2,
        AnteBet_royalFlush: 2,
    },
    cardgame: true,
};
