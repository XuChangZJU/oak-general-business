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
var Storage_9 = require("./Article/Storage");
var Storage_10 = require("./Captcha/Storage");
var Storage_11 = require("./Domain/Storage");
var Storage_12 = require("./Email/Storage");
var Storage_13 = require("./ExtraFile/Storage");
var Storage_14 = require("./Mobile/Storage");
var Storage_15 = require("./UserRole/Storage");
var Storage_16 = require("./Role/Storage");
var Storage_17 = require("./UserSystem/Storage");
var Storage_18 = require("./System/Storage");
var Storage_19 = require("./Token/Storage");
var Storage_20 = require("./UserEntityGrant/Storage");
var Storage_21 = require("./WechatQrCode/Storage");
var Storage_22 = require("./WechatUser/Storage");
exports.storageSchema = {
    modi: Storage_1.desc,
    modiEntity: Storage_2.desc,
    oper: Storage_3.desc,
    operEntity: Storage_4.desc,
    user: Storage_5.desc,
    address: Storage_6.desc,
    application: Storage_7.desc,
    area: Storage_8.desc,
    article: Storage_9.desc,
    captcha: Storage_10.desc,
    domain: Storage_11.desc,
    email: Storage_12.desc,
    extraFile: Storage_13.desc,
    mobile: Storage_14.desc,
    userRole: Storage_15.desc,
    role: Storage_16.desc,
    userSystem: Storage_17.desc,
    system: Storage_18.desc,
    token: Storage_19.desc,
    userEntityGrant: Storage_20.desc,
    wechatQrCode: Storage_21.desc,
    wechatUser: Storage_22.desc
};
