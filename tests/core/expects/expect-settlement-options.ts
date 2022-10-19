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
        const expectedAmount = settledResult.settlementResult[bet.choice] ? bet.amount * settledResult.odds[bet.choice] : bet.amount;

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
