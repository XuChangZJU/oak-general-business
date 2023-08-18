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
var Storage_17 = require("./ChangePasswordTemp/Storage");
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
var Storage_30 = require("./UserRole/Storage");
var Storage_31 = require("./Role/Storage");
var Storage_32 = require("./Station/Storage");
var Storage_33 = require("./Subscription/Storage");
var Storage_34 = require("./Subway/Storage");
var Storage_35 = require("./SubwayStation/Storage");
var Storage_36 = require("./System/Storage");
var Storage_37 = require("./Token/Storage");
var Storage_38 = require("./UserSystem/Storage");
var Storage_39 = require("./UserWechatPublicTag/Storage");
var Storage_40 = require("./WechatLogin/Storage");
var Storage_41 = require("./WechatPublicTag/Storage");
var Storage_42 = require("./WechatQrCode/Storage");
var Storage_43 = require("./WechatUser/Storage");
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
    changePasswordTemp: Storage_17.desc,
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
    userRole: Storage_30.desc,
    role: Storage_31.desc,
    station: Storage_32.desc,
    subscription: Storage_33.desc,
    subway: Storage_34.desc,
    subwayStation: Storage_35.desc,
    system: Storage_36.desc,
    token: Storage_37.desc,
    userSystem: Storage_38.desc,
    userWechatPublicTag: Storage_39.desc,
    wechatLogin: Storage_40.desc,
    wechatPublicTag: Storage_41.desc,
    wechatQrCode: Storage_42.desc,
    wechatUser: Storage_43.desc
};
