import { expect } from "@playwright/test";

expect.extend({
    toMatchBetOptions(settlementResult: any, betOptions: Array<string>) {
        const settlementBetOptions = settlementResult ? Object.keys(settlementResult) : [];

        if (settlementBetOptions.toString() === betOptions.toString()) {
            return {
                message: () => "passed",
                pass: true,
            };
        }

        return {
            message: () => "failed",
            pass: false,
        };
    },

    toMatchWinning(bet: any, settledResult: any) {
        const odds = settledResult.settlementResult[bet.choice] ? settledResult.odds[bet.choice] : 1;
        const expectedAmount = bet.amount * odds;

        if (expectedAmount === settledResult.winAmount) {
            return {
                message: () => "passed",
                pass: true,
            };
        }

        return {
            message: () => `failed. Expected ${expectedAmount} but received ${settledResult.winAmount}`,
            pass: false,
        };
    },
});
