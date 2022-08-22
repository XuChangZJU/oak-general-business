"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./Modi/Storage");
var Storage_2 = require("./ModiEntity/Storage");
var Storage_3 = require("./Oper/Storage");
var Storage_4 = require("./OperEntity/Storage");
var Storage_5 = require("./Address/Storage");
var Storage_6 = require("./Application/Storage");
var Storage_7 = require("./Area/Storage");
var Storage_8 = require("./Captcha/Storage");
var Storage_9 = require("./Domain/Storage");
var Storage_10 = require("./Email/Storage");
var Storage_11 = require("./ExtraFile/Storage");
var Storage_12 = require("./Mobile/Storage");
var Storage_13 = require("./UserRole/Storage");
var Storage_14 = require("./Role/Storage");
var Storage_15 = require("./UserSystem/Storage");
var Storage_16 = require("./System/Storage");
var Storage_17 = require("./Token/Storage");
var Storage_18 = require("./User/Storage");
var Storage_19 = require("./UserEntityGrant/Storage");
var Storage_20 = require("./WechatQrCode/Storage");
var Storage_21 = require("./WechatUser/Storage");
exports.storageSchema = {
    modi: Storage_1.desc,
    modiEntity: Storage_2.desc,
    oper: Storage_3.desc,
    operEntity: Storage_4.desc,
    address: Storage_5.desc,
    application: Storage_6.desc,
    area: Storage_7.desc,
    captcha: Storage_8.desc,
    domain: Storage_9.desc,
    email: Storage_10.desc,
    extraFile: Storage_11.desc,
    mobile: Storage_12.desc,
    userRole: Storage_13.desc,
    role: Storage_14.desc,
    userSystem: Storage_15.desc,
    system: Storage_16.desc,
    token: Storage_17.desc,
    user: Storage_18.desc,
    userEntityGrant: Storage_19.desc,
    wechatQrCode: Storage_20.desc,
    wechatUser: Storage_21.desc
};
