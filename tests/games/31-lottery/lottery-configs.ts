import { GameConfiguration } from "../../core/game-configuration";
export const LotteryConfigs: GameConfiguration = {
    id: 31,
    name: "Lottery",
    durations: {
        wholeRound: 54 * 1000,
        placingBets: 45 * 1000,
        lockingBet: 5 * 1000,
        shakeThePlateDuration: 4 * 1000,
    },
    choices: ["4Sets","special","head","tail","27Sets","others","occurrences"] ,
    hedgeBetGroups: [["big", "small"]],
    maxTimeout: 300 * 1000, // miliseconds,
    odds: {
        "4Sets": 24,
        special: 90,
        head: 9,
        others: 1.96,
        tail: 9,
        "27Sets": 3.6,
        parlay2: 13,
        parlay3: 50,
        parlay4: 120,
    },
    betBoard: false,
};

