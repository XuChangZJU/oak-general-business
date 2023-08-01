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
var Storage_15 = require("./ArticleMenu/Storage");
var Storage_16 = require("./Captcha/Storage");
var Storage_17 = require("./Domain/Storage");
var Storage_18 = require("./Email/Storage");
var Storage_19 = require("./ExtraFile/Storage");
var Storage_20 = require("./Livestream/Storage");
var Storage_21 = require("./Message/Storage");
var Storage_22 = require("./MessageSystem/Storage");
var Storage_23 = require("./MessageType/Storage");
var Storage_24 = require("./MessageTypeTemplateId/Storage");
var Storage_25 = require("./Mobile/Storage");
var Storage_26 = require("./Notification/Storage");
var Storage_27 = require("./Parasite/Storage");
var Storage_28 = require("./Platform/Storage");
var Storage_29 = require("./UserRole/Storage");
var Storage_30 = require("./Role/Storage");
var Storage_31 = require("./Station/Storage");
var Storage_32 = require("./Subscription/Storage");
var Storage_33 = require("./Subway/Storage");
var Storage_34 = require("./SubwayStation/Storage");
var Storage_35 = require("./System/Storage");
var Storage_36 = require("./Token/Storage");
var Storage_37 = require("./UserSystem/Storage");
var Storage_38 = require("./UserWechatPublicTag/Storage");
var Storage_39 = require("./WechatLogin/Storage");
var Storage_40 = require("./WechatPublicTag/Storage");
var Storage_41 = require("./WechatQrCode/Storage");
var Storage_42 = require("./WechatUser/Storage");
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
    articleMenu: Storage_15.desc,
    captcha: Storage_16.desc,
    domain: Storage_17.desc,
    email: Storage_18.desc,
    extraFile: Storage_19.desc,
    livestream: Storage_20.desc,
    message: Storage_21.desc,
    messageSystem: Storage_22.desc,
    messageType: Storage_23.desc,
    messageTypeTemplateId: Storage_24.desc,
    mobile: Storage_25.desc,
    notification: Storage_26.desc,
    parasite: Storage_27.desc,
    platform: Storage_28.desc,
    userRole: Storage_29.desc,
    role: Storage_30.desc,
    station: Storage_31.desc,
    subscription: Storage_32.desc,
    subway: Storage_33.desc,
    subwayStation: Storage_34.desc,
    system: Storage_35.desc,
    token: Storage_36.desc,
    userSystem: Storage_37.desc,
    userWechatPublicTag: Storage_38.desc,
    wechatLogin: Storage_39.desc,
    wechatPublicTag: Storage_40.desc,
    wechatQrCode: Storage_41.desc,
    wechatUser: Storage_42.desc
};
