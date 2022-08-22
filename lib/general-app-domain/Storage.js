"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./Modi/Storage");
var Storage_2 = require("./ModiEntity/Storage");
var Storage_3 = require("./Oper/Storage");
var Storage_4 = require("./OperEntity/Storage");
var Storage_5 = require("./User/Storage");
var Storage_6 = require("./Address/Storage");
var Storage_7 = require("./Application/Storage");
var Storage_8 = require("./Area/Storage");
var Storage_9 = require("./Captcha/Storage");
var Storage_10 = require("./Domain/Storage");
var Storage_11 = require("./Email/Storage");
var Storage_12 = require("./ExtraFile/Storage");
var Storage_13 = require("./Mobile/Storage");
var Storage_14 = require("./UserRole/Storage");
var Storage_15 = require("./Role/Storage");
var Storage_16 = require("./UserSystem/Storage");
var Storage_17 = require("./System/Storage");
var Storage_18 = require("./Token/Storage");
var Storage_19 = require("./UserEntityGrant/Storage");
var Storage_20 = require("./WechatQrCode/Storage");
var Storage_21 = require("./WechatUser/Storage");
exports.storageSchema = {
    modi: Storage_1.desc,
    modiEntity: Storage_2.desc,
    oper: Storage_3.desc,
    operEntity: Storage_4.desc,
    user: Storage_5.desc,
    address: Storage_6.desc,
    application: Storage_7.desc,
    area: Storage_8.desc,
    captcha: Storage_9.desc,
    domain: Storage_10.desc,
    email: Storage_11.desc,
    extraFile: Storage_12.desc,
    mobile: Storage_13.desc,
    userRole: Storage_14.desc,
    role: Storage_15.desc,
    userSystem: Storage_16.desc,
    system: Storage_17.desc,
    token: Storage_18.desc,
    userEntityGrant: Storage_19.desc,
    wechatQrCode: Storage_20.desc,
    wechatUser: Storage_21.desc
};
