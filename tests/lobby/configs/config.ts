import local from "./config.local";
import local1 from "./config.local1";
import local2 from "./config.local2";
import local3 from "./config.local3";
import sit from "./config.sit";
import uat from "./config.uat";
import prod from "./config.prod";
import configLocal3 from "./config.local3";
import local1Cors1 from "./config.local1Cors1";
import local1Cors2 from "./config.local1Cors2";


export const configs = {
    local: { ...local },
    local1: { ...local1 },
    local2: { ...local2 },
    local3: { ...local3 },
    sit: { ...sit },
    uat: { ...uat },
    prod: { ...prod },
    local1Cors1: { ...local1Cors1 },
    local1Cors2: { ...local1Cors2 },
};
