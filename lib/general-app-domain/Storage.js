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
var Storage_14 = require("./Livestream/Storage");
var Storage_15 = require("./MessageType/Storage");
var Storage_16 = require("./Mobile/Storage");
var Storage_17 = require("./Platform/Storage");
var Storage_18 = require("./UserRole/Storage");
var Storage_19 = require("./Role/Storage");
var Storage_20 = require("./System/Storage");
var Storage_21 = require("./Token/Storage");
var Storage_22 = require("./UserEntityGrant/Storage");
var Storage_23 = require("./WechatQrCode/Storage");
var Storage_24 = require("./WechatUser/Storage");
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
    livestream: Storage_14.desc,
    messageType: Storage_15.desc,
    mobile: Storage_16.desc,
    platform: Storage_17.desc,
    userRole: Storage_18.desc,
    role: Storage_19.desc,
    system: Storage_20.desc,
    token: Storage_21.desc,
    userEntityGrant: Storage_22.desc,
    wechatQrCode: Storage_23.desc,
    wechatUser: Storage_24.desc
};
