"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
var Action_1 = require("./Modi/Action");
var Action_2 = require("./Captcha/Action");
var Action_3 = require("./Email/Action");
var Action_4 = require("./Mobile/Action");
var Action_5 = require("./Token/Action");
var Action_6 = require("./User/Action");
var Action_7 = require("./UserEntityGrant/Action");
exports.ActionDefDict = {
    modi: Action_1.ActionDefDict,
    captcha: Action_2.ActionDefDict,
    email: Action_3.ActionDefDict,
    mobile: Action_4.ActionDefDict,
    token: Action_5.ActionDefDict,
    user: Action_6.ActionDefDict,
    userEntityGrant: Action_7.ActionDefDict
};
