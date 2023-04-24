"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userRole_1 = require("./userRole");
var area_1 = require("./area");
var subway_1 = require("./subway");
var station_1 = require("./station");
var subwayStation_1 = require("./subwayStation");
exports.default = {
    user: userRole_1.users,
    role: userRole_1.roles,
    mobile: userRole_1.mobiles,
    token: userRole_1.tokens,
    area: area_1.area,
    subway: subway_1.subway,
    station: station_1.station,
    subwayStation: subwayStation_1.subwayStation,
};
