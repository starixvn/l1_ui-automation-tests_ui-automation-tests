import { local } from "./config.local.ts";
import { local as local2 } from "./config.local2.ts";

export const configs = {
    local: { ...local },
    local2: { ...local2 },
};
