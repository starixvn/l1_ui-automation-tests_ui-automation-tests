import * as local from "./config.local";
import * as local2 from "./config.local2";

export const configs = {
    local: { ...local.default },
    local2: { ...local2.default },
};
