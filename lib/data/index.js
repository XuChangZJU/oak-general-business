"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userRole_1 = require("./userRole");
var area_1 = require("./area");
var application_1 = require("./application");
var system_1 = require("./system");
var platform_1 = require("./platform");
exports.default = {
    user: userRole_1.users,
    role: userRole_1.roles,
    mobile: userRole_1.mobiles,
    token: userRole_1.tokens,
    application: application_1.applications,
    system: system_1.systems,
    platform: platform_1.platforms,
    area: area_1.area,
};
