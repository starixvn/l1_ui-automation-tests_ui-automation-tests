import * as local from "./config.local";
import * as local1 from "./config.local1";
import * as local2 from "./config.local2";
import * as sit from "./config.sit";
import * as uat from "./config.uat";
import * as prod from "./config.prod";

export const configs = {
    local: { ...local.default },
    local1: { ...local1.default },
    local2: { ...local2.default },
    sit: { ...sit.default },
    uat: { ...uat.default },
    prod: { ...prod.default },
};
