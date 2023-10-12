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
const Storage_12 = require("./Address/Storage");
const Storage_13 = require("./Application/Storage");
const Storage_14 = require("./Area/Storage");
const Storage_15 = require("./Article/Storage");
const Storage_16 = require("./ArticleMenu/Storage");
const Storage_17 = require("./Captcha/Storage");
const Storage_18 = require("./ChangePasswordTemp/Storage");
const Storage_19 = require("./Domain/Storage");
const Storage_20 = require("./Email/Storage");
const Storage_21 = require("./ExtraFile/Storage");
const Storage_22 = require("./Livestream/Storage");
const Storage_23 = require("./Message/Storage");
const Storage_24 = require("./MessageSystem/Storage");
const Storage_25 = require("./MessageType/Storage");
const Storage_26 = require("./MessageTypeTemplate/Storage");
const Storage_27 = require("./Mobile/Storage");
const Storage_28 = require("./Notification/Storage");
const Storage_29 = require("./Parasite/Storage");
const Storage_30 = require("./Platform/Storage");
const Storage_31 = require("./ReadRemark/Storage");
const Storage_32 = require("./Session/Storage");
const Storage_33 = require("./SessionMessage/Storage");
const Storage_34 = require("./Station/Storage");
const Storage_35 = require("./Subscription/Storage");
const Storage_36 = require("./Subway/Storage");
const Storage_37 = require("./SubwayStation/Storage");
const Storage_38 = require("./System/Storage");
const Storage_39 = require("./Token/Storage");
const Storage_40 = require("./UserSystem/Storage");
const Storage_41 = require("./UserWechatPublicTag/Storage");
const Storage_42 = require("./WechatLogin/Storage");
const Storage_43 = require("./WechatMenu/Storage");
const Storage_44 = require("./wechatPublicAutoReply/Storage");
const Storage_45 = require("./WechatPublicTag/Storage");
const Storage_46 = require("./WechatPublicTemplate/Storage");
const Storage_47 = require("./WechatQrCode/Storage");
const Storage_48 = require("./WechatUser/Storage");
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
    changePasswordTemp: Storage_18.desc,
    domain: Storage_19.desc,
    email: Storage_20.desc,
    extraFile: Storage_21.desc,
    livestream: Storage_22.desc,
    message: Storage_23.desc,
    messageSystem: Storage_24.desc,
    messageType: Storage_25.desc,
    messageTypeTemplate: Storage_26.desc,
    mobile: Storage_27.desc,
    notification: Storage_28.desc,
    parasite: Storage_29.desc,
    platform: Storage_30.desc,
    readRemark: Storage_31.desc,
    session: Storage_32.desc,
    sessionMessage: Storage_33.desc,
    station: Storage_34.desc,
    subscription: Storage_35.desc,
    subway: Storage_36.desc,
    subwayStation: Storage_37.desc,
    system: Storage_38.desc,
    token: Storage_39.desc,
    userSystem: Storage_40.desc,
    userWechatPublicTag: Storage_41.desc,
    wechatLogin: Storage_42.desc,
    wechatMenu: Storage_43.desc,
    wechatPublicAutoReply: Storage_44.desc,
    wechatPublicTag: Storage_45.desc,
    wechatPublicTemplate: Storage_46.desc,
    wechatQrCode: Storage_47.desc,
    wechatUser: Storage_48.desc
};
