"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const crud_1 = require("./crud");
const aspectDict = {
    loginByPassword: token_1.loginByPassword,
    loginMp: token_1.loginMp,
    operate: crud_1.operate,
    select: crud_1.select,
};
exports.default = aspectDict;
