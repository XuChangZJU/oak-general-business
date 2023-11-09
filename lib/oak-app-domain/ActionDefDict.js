"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
const Action_1 = require("./Modi/Action");
const Action_2 = require("./Account/Action");
const Action_3 = require("./Captcha/Action");
const Action_4 = require("./Email/Action");
const Action_5 = require("./Message/Action");
const Action_6 = require("./Mobile/Action");
const Action_7 = require("./Notification/Action");
const Action_8 = require("./Parasite/Action");
const Action_9 = require("./ToDo/Action");
const Action_10 = require("./Token/Action");
const Action_11 = require("./User/Action");
const Action_12 = require("./UserEntityGrant/Action");
const Action_13 = require("./UserWechatPublicTag/Action");
const Action_14 = require("./WechatLogin/Action");
const Action_15 = require("./WechatMenu/Action");
const Action_16 = require("./WechatPublicTag/Action");
exports.ActionDefDict = {
    modi: Action_1.ActionDefDict,
    account: Action_2.ActionDefDict,
    captcha: Action_3.ActionDefDict,
    email: Action_4.ActionDefDict,
    message: Action_5.ActionDefDict,
    mobile: Action_6.ActionDefDict,
    notification: Action_7.ActionDefDict,
    parasite: Action_8.ActionDefDict,
    toDo: Action_9.ActionDefDict,
    token: Action_10.ActionDefDict,
    user: Action_11.ActionDefDict,
    userEntityGrant: Action_12.ActionDefDict,
    userWechatPublicTag: Action_13.ActionDefDict,
    wechatLogin: Action_14.ActionDefDict,
    wechatMenu: Action_15.ActionDefDict,
    wechatPublicTag: Action_16.ActionDefDict
};
