"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./ActionAuth/Storage");
var Storage_2 = require("./DirectActionAuth/Storage");
var Storage_3 = require("./DirectRelationAuth/Storage");
var Storage_4 = require("./FreeActionAuth/Storage");
var Storage_5 = require("./Modi/Storage");
var Storage_6 = require("./ModiEntity/Storage");
var Storage_7 = require("./Oper/Storage");
var Storage_8 = require("./OperEntity/Storage");
var Storage_9 = require("./Relation/Storage");
var Storage_10 = require("./RelationAuth/Storage");
var Storage_11 = require("./User/Storage");
var Storage_12 = require("./UserEntityGrant/Storage");
var Storage_13 = require("./UserRelation/Storage");
var Storage_14 = require("./Address/Storage");
var Storage_15 = require("./Application/Storage");
var Storage_16 = require("./Area/Storage");
var Storage_17 = require("./Article/Storage");
var Storage_18 = require("./Captcha/Storage");
var Storage_19 = require("./Domain/Storage");
var Storage_20 = require("./Email/Storage");
var Storage_21 = require("./ExtraFile/Storage");
var Storage_22 = require("./Livestream/Storage");
var Storage_23 = require("./Message/Storage");
var Storage_24 = require("./MessageSystem/Storage");
var Storage_25 = require("./MessageType/Storage");
var Storage_26 = require("./MessageTypeTemplateId/Storage");
var Storage_27 = require("./Mobile/Storage");
var Storage_28 = require("./Notification/Storage");
var Storage_29 = require("./Platform/Storage");
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
    directRelationAuth: Storage_3.desc,
    freeActionAuth: Storage_4.desc,
    modi: Storage_5.desc,
    modiEntity: Storage_6.desc,
    oper: Storage_7.desc,
    operEntity: Storage_8.desc,
    relation: Storage_9.desc,
    relationAuth: Storage_10.desc,
    user: Storage_11.desc,
    userEntityGrant: Storage_12.desc,
    userRelation: Storage_13.desc,
    address: Storage_14.desc,
    application: Storage_15.desc,
    area: Storage_16.desc,
    article: Storage_17.desc,
    captcha: Storage_18.desc,
    domain: Storage_19.desc,
    email: Storage_20.desc,
    extraFile: Storage_21.desc,
    livestream: Storage_22.desc,
    message: Storage_23.desc,
    messageSystem: Storage_24.desc,
    messageType: Storage_25.desc,
    messageTypeTemplateId: Storage_26.desc,
    mobile: Storage_27.desc,
    notification: Storage_28.desc,
    platform: Storage_29.desc,
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
