"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./ActionAuth/Storage");
var Storage_2 = require("./Modi/Storage");
var Storage_3 = require("./ModiEntity/Storage");
var Storage_4 = require("./Oper/Storage");
var Storage_5 = require("./OperEntity/Storage");
var Storage_6 = require("./Relation/Storage");
var Storage_7 = require("./RelationAuth/Storage");
var Storage_8 = require("./User/Storage");
var Storage_9 = require("./UserEntityGrant/Storage");
var Storage_10 = require("./UserRelation/Storage");
var Storage_11 = require("./Address/Storage");
var Storage_12 = require("./Application/Storage");
var Storage_13 = require("./Area/Storage");
var Storage_14 = require("./Article/Storage");
var Storage_15 = require("./Captcha/Storage");
var Storage_16 = require("./Domain/Storage");
var Storage_17 = require("./Email/Storage");
var Storage_18 = require("./ExtraFile/Storage");
var Storage_19 = require("./Livestream/Storage");
var Storage_20 = require("./Message/Storage");
var Storage_21 = require("./MessageSystem/Storage");
var Storage_22 = require("./MessageType/Storage");
var Storage_23 = require("./MessageTypeTemplateId/Storage");
var Storage_24 = require("./Mobile/Storage");
var Storage_25 = require("./Notification/Storage");
var Storage_26 = require("./Platform/Storage");
var Storage_27 = require("./UserRole/Storage");
var Storage_28 = require("./Role/Storage");
var Storage_29 = require("./Station/Storage");
var Storage_30 = require("./Subscription/Storage");
var Storage_31 = require("./Subway/Storage");
var Storage_32 = require("./SubwayStation/Storage");
var Storage_33 = require("./System/Storage");
var Storage_34 = require("./Token/Storage");
var Storage_35 = require("./UserSystem/Storage");
var Storage_36 = require("./UserWechatPublicTag/Storage");
var Storage_37 = require("./WechatPublicTag/Storage");
var Storage_38 = require("./WechatQrCode/Storage");
var Storage_39 = require("./WechatUser/Storage");
exports.storageSchema = {
    actionAuth: Storage_1.desc,
    modi: Storage_2.desc,
    modiEntity: Storage_3.desc,
    oper: Storage_4.desc,
    operEntity: Storage_5.desc,
    relation: Storage_6.desc,
    relationAuth: Storage_7.desc,
    user: Storage_8.desc,
    userEntityGrant: Storage_9.desc,
    userRelation: Storage_10.desc,
    address: Storage_11.desc,
    application: Storage_12.desc,
    area: Storage_13.desc,
    article: Storage_14.desc,
    captcha: Storage_15.desc,
    domain: Storage_16.desc,
    email: Storage_17.desc,
    extraFile: Storage_18.desc,
    livestream: Storage_19.desc,
    message: Storage_20.desc,
    messageSystem: Storage_21.desc,
    messageType: Storage_22.desc,
    messageTypeTemplateId: Storage_23.desc,
    mobile: Storage_24.desc,
    notification: Storage_25.desc,
    platform: Storage_26.desc,
    userRole: Storage_27.desc,
    role: Storage_28.desc,
    station: Storage_29.desc,
    subscription: Storage_30.desc,
    subway: Storage_31.desc,
    subwayStation: Storage_32.desc,
    system: Storage_33.desc,
    token: Storage_34.desc,
    userSystem: Storage_35.desc,
    userWechatPublicTag: Storage_36.desc,
    wechatPublicTag: Storage_37.desc,
    wechatQrCode: Storage_38.desc,
    wechatUser: Storage_39.desc
};
