"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
var Action_1 = require("./Modi/Action");
var Action_2 = require("./Article/Action");
var Action_3 = require("./Captcha/Action");
var Action_4 = require("./Email/Action");
var Action_5 = require("./Mobile/Action");
var Action_6 = require("./Token/Action");
var Action_7 = require("./User/Action");
var Action_8 = require("./UserEntityGrant/Action");
exports.ActionDefDict = {
    modi: Action_1.ActionDefDict,
    article: Action_2.ActionDefDict,
    captcha: Action_3.ActionDefDict,
    email: Action_4.ActionDefDict,
    mobile: Action_5.ActionDefDict,
    token: Action_6.ActionDefDict,
    user: Action_7.ActionDefDict,
    userEntityGrant: Action_8.ActionDefDict
};
