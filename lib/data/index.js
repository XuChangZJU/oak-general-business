"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userRole_1 = require("./userRole");
var area_1 = require("./area");
var freeActionAuth_1 = tslib_1.__importDefault(require("./freeActionAuth"));
exports.default = {
    user: userRole_1.users,
    mobile: userRole_1.mobiles,
    token: userRole_1.tokens,
    area: area_1.area,
    freeActionAuth: freeActionAuth_1.default,
};
