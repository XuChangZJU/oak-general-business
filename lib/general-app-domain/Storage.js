"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./ActionAuth/Storage");
var Storage_2 = require("./DirectActionAuth/Storage");
var Storage_3 = require("./FreeActionAuth/Storage");
var Storage_4 = require("./Modi/Storage");
var Storage_5 = require("./ModiEntity/Storage");
var Storage_6 = require("./Oper/Storage");
var Storage_7 = require("./OperEntity/Storage");
var Storage_8 = require("./Relation/Storage");
var Storage_9 = require("./RelationAuth/Storage");
var Storage_10 = require("./User/Storage");
var Storage_11 = require("./UserEntityGrant/Storage");
var Storage_12 = require("./UserRelation/Storage");
var Storage_13 = require("./Address/Storage");
var Storage_14 = require("./Application/Storage");
var Storage_15 = require("./Area/Storage");
var Storage_16 = require("./Article/Storage");
var Storage_17 = require("./Captcha/Storage");
var Storage_18 = require("./Domain/Storage");
var Storage_19 = require("./Email/Storage");
var Storage_20 = require("./ExtraFile/Storage");
var Storage_21 = require("./Livestream/Storage");
var Storage_22 = require("./Message/Storage");
var Storage_23 = require("./MessageSystem/Storage");
var Storage_24 = require("./MessageType/Storage");
var Storage_25 = require("./MessageTypeTemplateId/Storage");
var Storage_26 = require("./Mobile/Storage");
var Storage_27 = require("./Notification/Storage");
var Storage_28 = require("./Platform/Storage");
var Storage_29 = require("./Role/Storage");
var Storage_30 = require("./Station/Storage");
var Storage_31 = require("./Subscription/Storage");
var Storage_32 = require("./Subway/Storage");
var Storage_33 = require("./SubwayStation/Storage");
var Storage_34 = require("./System/Storage");
var Storage_35 = require("./Token/Storage");
var Storage_36 = require("./UserSystem/Storage");
var Storage_37 = require("./UserWechatPublicTag/Storage");
var Storage_38 = require("./WechatPublicTag/Storage");
var Storage_39 = require("./WechatQrCode/Storage");
var Storage_40 = require("./WechatUser/Storage");
exports.storageSchema = {
    actionAuth: Storage_1.desc,
    directActionAuth: Storage_2.desc,
    freeActionAuth: Storage_3.desc,
    modi: Storage_4.desc,
    modiEntity: Storage_5.desc,
    oper: Storage_6.desc,
    operEntity: Storage_7.desc,
    relation: Storage_8.desc,
    relationAuth: Storage_9.desc,
    user: Storage_10.desc,
    userEntityGrant: Storage_11.desc,
    userRelation: Storage_12.desc,
    address: Storage_13.desc,
    application: Storage_14.desc,
    area: Storage_15.desc,
    article: Storage_16.desc,
    captcha: Storage_17.desc,
    domain: Storage_18.desc,
    email: Storage_19.desc,
    extraFile: Storage_20.desc,
    livestream: Storage_21.desc,
    message: Storage_22.desc,
    messageSystem: Storage_23.desc,
    messageType: Storage_24.desc,
    messageTypeTemplateId: Storage_25.desc,
    mobile: Storage_26.desc,
    notification: Storage_27.desc,
    platform: Storage_28.desc,
    role: Storage_29.desc,
    station: Storage_30.desc,
    subscription: Storage_31.desc,
    subway: Storage_32.desc,
    subwayStation: Storage_33.desc,
    system: Storage_34.desc,
    token: Storage_35.desc,
    userSystem: Storage_36.desc,
    userWechatPublicTag: Storage_37.desc,
    wechatPublicTag: Storage_38.desc,
    wechatQrCode: Storage_39.desc,
    wechatUser: Storage_40.desc
};
