import { expect } from "@playwright/test";

expect.extend({
    toHaveApproriateBetOptions(settlementResult: any, betOptions: Array<string>) {
        const settlementBetOptions = Object.keys(settlementResult);

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
});
