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
var Storage_17 = require("./MessageSystem/Storage");
var Storage_18 = require("./MessageType/Storage");
var Storage_19 = require("./MessageTypeTemplateId/Storage");
var Storage_20 = require("./Mobile/Storage");
var Storage_21 = require("./Notification/Storage");
var Storage_22 = require("./Platform/Storage");
var Storage_23 = require("./UserRole/Storage");
var Storage_24 = require("./Role/Storage");
var Storage_25 = require("./Subscription/Storage");
var Storage_26 = require("./System/Storage");
var Storage_27 = require("./Token/Storage");
var Storage_28 = require("./UserSystem/Storage");
var Storage_29 = require("./UserWechatPublicTag/Storage");
var Storage_30 = require("./WechatPublicTag/Storage");
var Storage_31 = require("./WechatQrCode/Storage");
var Storage_32 = require("./WechatUser/Storage");
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
    messageSystem: Storage_17.desc,
    messageType: Storage_18.desc,
    messageTypeTemplateId: Storage_19.desc,
    mobile: Storage_20.desc,
    notification: Storage_21.desc,
    platform: Storage_22.desc,
    userRole: Storage_23.desc,
    role: Storage_24.desc,
    subscription: Storage_25.desc,
    system: Storage_26.desc,
    token: Storage_27.desc,
    userSystem: Storage_28.desc,
    userWechatPublicTag: Storage_29.desc,
    wechatPublicTag: Storage_30.desc,
    wechatQrCode: Storage_31.desc,
    wechatUser: Storage_32.desc
};
