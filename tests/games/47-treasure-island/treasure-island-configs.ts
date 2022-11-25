import { GameConfiguration } from "../../core/game-configuration";
export const TreasureIslandConfigs: GameConfiguration = {
    id: 47,
    name: "TreasureIsland",
    choices: ["0.4","25"],
    maxTimeout: 100 * 1000, // miliseconds,
    odds: {
      "symbols": {
        "0": [
          {
            "from": 8,
            "to": 9,
            "odds": 5
          },
          {
            "from": 10,
            "to": 11,
            "odds": 15
          },
          {
            "from": 12,
            "to": 30,
            "odds": 40
          }
        ],
        "1": [
          {
            "from": 8,
            "to": 9,
            "odds": 8
          },
          {
            "from": 10,
            "to": 11,
            "odds": 18
          },
          {
            "from": 12,
            "to": 30,
            "odds": 80
          }
        ],
        "2": [
          {
            "from": 8,
            "to": 9,
            "odds": 10
          },
          {
            "from": 10,
            "to": 11,
            "odds": 20
          },
          {
            "from": 12,
            "to": 30,
            "odds": 100
          }
        ],
        "3": [
          {
            "from": 8,
            "to": 9,
            "odds": 16
          },
          {
            "from": 10,
            "to": 11,
            "odds": 24
          },
          {
            "from": 12,
            "to": 30,
            "odds": 160
          }
        ],
        "4": [
          {
            "from": 8,
            "to": 9,
            "odds": 20
          },
          {
            "from": 10,
            "to": 11,
            "odds": 30
          },
          {
            "from": 12,
            "to": 30,
            "odds": 200
          }
        ],
        "5": [
          {
            "from": 8,
            "to": 9,
            "odds": 30
          },
          {
            "from": 10,
            "to": 11,
            "odds": 40
          },
          {
            "from": 12,
            "to": 30,
            "odds": 240
          }
        ],
        "6": [
          {
            "from": 8,
            "to": 9,
            "odds": 40
          },
          {
            "from": 10,
            "to": 11,
            "odds": 100
          },
          {
            "from": 12,
            "to": 30,
            "odds": 300
          }
        ],
        "7": [
          {
            "from": 8,
            "to": 9,
            "odds": 50
          },
          {
            "from": 10,
            "to": 11,
            "odds": 200
          },
          {
            "from": 12,
            "to": 30,
            "odds": 500
          }
        ],
        "8": [
          {
            "from": 8,
            "to": 9,
            "odds": 200
          },
          {
            "from": 10,
            "to": 11,
            "odds": 500
          },
          {
            "from": 12,
            "to": 30,
            "odds": 1000
          }
        ]
      },
      "freeSpins": {
        "initialOdds": [
          {
            "count": 4,
            "odds": 3
          },
          {
            "count": 5,
            "odds": 6
          },
          {
            "count": 6,
            "odds": 18
          }
        ],
        "additionalOdds": [
          {
            "count": 4,
            "odds": 5
          }
        ]
      }
    },
    slotsgame: true,
};
