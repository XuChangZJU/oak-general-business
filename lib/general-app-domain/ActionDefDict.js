"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
var Action_1 = require("./Modi/Action");
var Action_2 = require("./Article/Action");
var Action_3 = require("./Captcha/Action");
var Action_4 = require("./Email/Action");
var Action_5 = require("./Message/Action");
var Action_6 = require("./MessageSent/Action");
var Action_7 = require("./Mobile/Action");
var Action_8 = require("./Token/Action");
var Action_9 = require("./User/Action");
var Action_10 = require("./UserEntityGrant/Action");
exports.ActionDefDict = {
    modi: Action_1.ActionDefDict,
    article: Action_2.ActionDefDict,
    captcha: Action_3.ActionDefDict,
    email: Action_4.ActionDefDict,
    message: Action_5.ActionDefDict,
    messageSent: Action_6.ActionDefDict,
    mobile: Action_7.ActionDefDict,
    token: Action_8.ActionDefDict,
    user: Action_9.ActionDefDict,
    userEntityGrant: Action_10.ActionDefDict
};
