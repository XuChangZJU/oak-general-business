"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
const Storage_1 = require("./ActionAuth/Storage");
const Storage_2 = require("./I18n/Storage");
const Storage_3 = require("./Modi/Storage");
const Storage_4 = require("./ModiEntity/Storage");
const Storage_5 = require("./Oper/Storage");
const Storage_6 = require("./OperEntity/Storage");
const Storage_7 = require("./Relation/Storage");
const Storage_8 = require("./RelationAuth/Storage");
const Storage_9 = require("./User/Storage");
const Storage_10 = require("./UserEntityGrant/Storage");
const Storage_11 = require("./UserRelation/Storage");
const Storage_12 = require("./Account/Storage");
const Storage_13 = require("./Address/Storage");
const Storage_14 = require("./Application/Storage");
const Storage_15 = require("./Area/Storage");
const Storage_16 = require("./Article/Storage");
const Storage_17 = require("./ArticleMenu/Storage");
const Storage_18 = require("./Captcha/Storage");
const Storage_19 = require("./ChangePasswordTemp/Storage");
const Storage_20 = require("./Domain/Storage");
const Storage_21 = require("./Email/Storage");
const Storage_22 = require("./ExtraFile/Storage");
const Storage_23 = require("./Livestream/Storage");
const Storage_24 = require("./Message/Storage");
const Storage_25 = require("./MessageSystem/Storage");
const Storage_26 = require("./MessageType/Storage");
const Storage_27 = require("./MessageTypeTemplate/Storage");
const Storage_28 = require("./Mobile/Storage");
const Storage_29 = require("./Notification/Storage");
const Storage_30 = require("./Parasite/Storage");
const Storage_31 = require("./Platform/Storage");
const Storage_32 = require("./ReadRemark/Storage");
const Storage_33 = require("./Session/Storage");
const Storage_34 = require("./SessionMessage/Storage");
const Storage_35 = require("./Station/Storage");
const Storage_36 = require("./Subscription/Storage");
const Storage_37 = require("./Subway/Storage");
const Storage_38 = require("./SubwayStation/Storage");
const Storage_39 = require("./System/Storage");
const Storage_40 = require("./Token/Storage");
const Storage_41 = require("./UserSystem/Storage");
const Storage_42 = require("./UserWechatPublicTag/Storage");
const Storage_43 = require("./WechatLogin/Storage");
const Storage_44 = require("./WechatMenu/Storage");
const Storage_45 = require("./wechatPublicAutoReply/Storage");
const Storage_46 = require("./WechatPublicTag/Storage");
const Storage_47 = require("./WechatPublicTemplate/Storage");
const Storage_48 = require("./WechatQrCode/Storage");
const Storage_49 = require("./WechatUser/Storage");
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
    account: Storage_12.desc,
    address: Storage_13.desc,
    application: Storage_14.desc,
    area: Storage_15.desc,
    article: Storage_16.desc,
    articleMenu: Storage_17.desc,
    captcha: Storage_18.desc,
    changePasswordTemp: Storage_19.desc,
    domain: Storage_20.desc,
    email: Storage_21.desc,
    extraFile: Storage_22.desc,
    livestream: Storage_23.desc,
    message: Storage_24.desc,
    messageSystem: Storage_25.desc,
    messageType: Storage_26.desc,
    messageTypeTemplate: Storage_27.desc,
    mobile: Storage_28.desc,
    notification: Storage_29.desc,
    parasite: Storage_30.desc,
    platform: Storage_31.desc,
    readRemark: Storage_32.desc,
    session: Storage_33.desc,
    sessionMessage: Storage_34.desc,
    station: Storage_35.desc,
    subscription: Storage_36.desc,
    subway: Storage_37.desc,
    subwayStation: Storage_38.desc,
    system: Storage_39.desc,
    token: Storage_40.desc,
    userSystem: Storage_41.desc,
    userWechatPublicTag: Storage_42.desc,
    wechatLogin: Storage_43.desc,
    wechatMenu: Storage_44.desc,
    wechatPublicAutoReply: Storage_45.desc,
    wechatPublicTag: Storage_46.desc,
    wechatPublicTemplate: Storage_47.desc,
    wechatQrCode: Storage_48.desc,
    wechatUser: Storage_49.desc
};
