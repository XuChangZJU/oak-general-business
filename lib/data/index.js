"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userRole_1 = require("./userRole");
var area_1 = tslib_1.__importDefault(require("./area"));
var subway_1 = tslib_1.__importDefault(require("./subway"));
var station_1 = tslib_1.__importDefault(require("./station"));
var subwayStation_1 = tslib_1.__importDefault(require("./subwayStation"));
var actionAuth_1 = tslib_1.__importDefault(require("./actionAuth"));
exports.default = {
    user: userRole_1.users,
    mobile: userRole_1.mobiles,
    token: userRole_1.tokens,
    area: area_1.default,
    subway: subway_1.default,
    station: station_1.default,
    subwayStation: subwayStation_1.default,
    actionAuth: actionAuth_1.default,
};
