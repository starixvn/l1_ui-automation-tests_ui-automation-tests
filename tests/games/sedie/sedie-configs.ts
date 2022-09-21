export const SedieConfigs = {
    id: 2,
    name: "SeDie",
    durations: {
        wholeRound: 39,
        placingBets: 30,
        lockingBet: 5,
        shakeThePlateDuration: 2,
    },
    choices: ["even", "odd", "red3", "red4", "white3", "white4", "red2"],
    hedgeBetGroups: [["even", "odd"]],
    maxTimeout: 45 * 1000, // miliseconds
};
