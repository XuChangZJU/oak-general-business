"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
var Action_1 = require("./Modi/Action");
var Action_2 = require("./Captcha/Action");
var Action_3 = require("./Email/Action");
var Action_4 = require("./Message/Action");
var Action_5 = require("./Mobile/Action");
var Action_6 = require("./Notification/Action");
var Action_7 = require("./Parasite/Action");
var Action_8 = require("./Token/Action");
var Action_9 = require("./User/Action");
var Action_10 = require("./UserEntityGrant/Action");
var Action_11 = require("./WechatLogin/Action");
exports.ActionDefDict = {
    modi: Action_1.ActionDefDict,
    captcha: Action_2.ActionDefDict,
    email: Action_3.ActionDefDict,
    message: Action_4.ActionDefDict,
    mobile: Action_5.ActionDefDict,
    notification: Action_6.ActionDefDict,
    parasite: Action_7.ActionDefDict,
    token: Action_8.ActionDefDict,
    user: Action_9.ActionDefDict,
    userEntityGrant: Action_10.ActionDefDict,
    wechatLogin: Action_11.ActionDefDict
};
