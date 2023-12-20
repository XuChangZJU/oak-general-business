"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRole_1 = require("./userRole");
const area_1 = tslib_1.__importDefault(require("./area"));
const subway_1 = tslib_1.__importDefault(require("./subway"));
const station_1 = tslib_1.__importDefault(require("./station"));
const subwayStation_1 = tslib_1.__importDefault(require("./subwayStation"));
const actionAuth_1 = tslib_1.__importDefault(require("./actionAuth"));
const path_1 = tslib_1.__importDefault(require("./path"));
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
exports.default = {
    user: userRole_1.users,
    mobile: userRole_1.mobiles,
    token: userRole_1.tokens,
    area: area_1.default,
    subway: subway_1.default,
    station: station_1.default,
    subwayStation: subwayStation_1.default,
    actionAuth: actionAuth_1.default,
    path: path_1.default,
    i18n: i18n_1.default,
};
