"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
var Storage_1 = require("./ActionAuth/Storage");
var Storage_2 = require("./I18n/Storage");
var Storage_3 = require("./Modi/Storage");
var Storage_4 = require("./ModiEntity/Storage");
var Storage_5 = require("./Oper/Storage");
var Storage_6 = require("./OperEntity/Storage");
var Storage_7 = require("./Relation/Storage");
var Storage_8 = require("./RelationAuth/Storage");
var Storage_9 = require("./User/Storage");
var Storage_10 = require("./UserEntityGrant/Storage");
var Storage_11 = require("./UserRelation/Storage");
var Storage_12 = require("./Address/Storage");
var Storage_13 = require("./Application/Storage");
var Storage_14 = require("./Area/Storage");
var Storage_15 = require("./Article/Storage");
var Storage_16 = require("./ArticleMenu/Storage");
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
var Storage_28 = require("./Parasite/Storage");
var Storage_29 = require("./Platform/Storage");
var Storage_30 = require("./Station/Storage");
var Storage_31 = require("./Subscription/Storage");
var Storage_32 = require("./Subway/Storage");
var Storage_33 = require("./SubwayStation/Storage");
var Storage_34 = require("./System/Storage");
var Storage_35 = require("./Token/Storage");
var Storage_36 = require("./UserSystem/Storage");
var Storage_37 = require("./UserWechatPublicTag/Storage");
var Storage_38 = require("./WechatLogin/Storage");
var Storage_39 = require("./WechatPublicTag/Storage");
var Storage_40 = require("./WechatQrCode/Storage");
var Storage_41 = require("./WechatUser/Storage");
exports.storageSchema = {
    actionAuth: Storage_1.desc,
    i18n: Storage_2.desc,
    modi: Storage_3.desc,
    modiEntity: Storage_4.desc,
    oper: Storage_5.desc,
    operEntity: Storage_6.desc,
    relation: Storage_7.desc,
    relationAuth: Storage_8.desc,
    user: Storage_9.desc,
    userEntityGrant: Storage_10.desc,
    userRelation: Storage_11.desc,
    address: Storage_12.desc,
    application: Storage_13.desc,
    area: Storage_14.desc,
    article: Storage_15.desc,
    articleMenu: Storage_16.desc,
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
    parasite: Storage_28.desc,
    platform: Storage_29.desc,
    station: Storage_30.desc,
    subscription: Storage_31.desc,
    subway: Storage_32.desc,
    subwayStation: Storage_33.desc,
    system: Storage_34.desc,
    token: Storage_35.desc,
    userSystem: Storage_36.desc,
    userWechatPublicTag: Storage_37.desc,
    wechatLogin: Storage_38.desc,
    wechatPublicTag: Storage_39.desc,
    wechatQrCode: Storage_40.desc,
    wechatUser: Storage_41.desc
};
