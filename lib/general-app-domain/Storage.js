"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./Modi/Storage");
var Storage_2 = require("./ModiEntity/Storage");
var Storage_3 = require("./Oper/Storage");
var Storage_4 = require("./OperEntity/Storage");
var Storage_5 = require("./User/Storage");
var Storage_6 = require("./UserEntityGrant/Storage");
var Storage_7 = require("./Address/Storage");
var Storage_8 = require("./Application/Storage");
var Storage_9 = require("./Area/Storage");
var Storage_10 = require("./Article/Storage");
var Storage_11 = require("./Captcha/Storage");
var Storage_12 = require("./Domain/Storage");
var Storage_13 = require("./Email/Storage");
var Storage_14 = require("./ExtraFile/Storage");
var Storage_15 = require("./Livestream/Storage");
var Storage_16 = require("./Message/Storage");
var Storage_17 = require("./MessageSent/Storage");
var Storage_18 = require("./MessageSystem/Storage");
var Storage_19 = require("./Mobile/Storage");
var Storage_20 = require("./Platform/Storage");
var Storage_21 = require("./UserRole/Storage");
var Storage_22 = require("./Role/Storage");
var Storage_23 = require("./Subscription/Storage");
var Storage_24 = require("./System/Storage");
var Storage_25 = require("./Token/Storage");
var Storage_26 = require("./UserSystem/Storage");
var Storage_27 = require("./UserWechatPublicTag/Storage");
var Storage_28 = require("./WechatPublicTag/Storage");
var Storage_29 = require("./WechatQrCode/Storage");
var Storage_30 = require("./WechatUser/Storage");
exports.storageSchema = {
    modi: Storage_1.desc,
    modiEntity: Storage_2.desc,
    oper: Storage_3.desc,
    operEntity: Storage_4.desc,
    user: Storage_5.desc,
    userEntityGrant: Storage_6.desc,
    address: Storage_7.desc,
    application: Storage_8.desc,
    area: Storage_9.desc,
    article: Storage_10.desc,
    captcha: Storage_11.desc,
    domain: Storage_12.desc,
    email: Storage_13.desc,
    extraFile: Storage_14.desc,
    livestream: Storage_15.desc,
    message: Storage_16.desc,
    messageSent: Storage_17.desc,
    messageSystem: Storage_18.desc,
    mobile: Storage_19.desc,
    platform: Storage_20.desc,
    userRole: Storage_21.desc,
    role: Storage_22.desc,
    subscription: Storage_23.desc,
    system: Storage_24.desc,
    token: Storage_25.desc,
    userSystem: Storage_26.desc,
    userWechatPublicTag: Storage_27.desc,
    wechatPublicTag: Storage_28.desc,
    wechatQrCode: Storage_29.desc,
    wechatUser: Storage_30.desc
};
