"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSchema = void 0;
const Storage_1 = require("./ActionAuth/Storage");
const Storage_2 = require("./I18n/Storage");
const Storage_3 = require("./Modi/Storage");
const Storage_4 = require("./ModiEntity/Storage");
const Storage_5 = require("./Oper/Storage");
const Storage_6 = require("./OperEntity/Storage");
const Storage_7 = require("./Path/Storage");
const Storage_8 = require("./Relation/Storage");
const Storage_9 = require("./RelationAuth/Storage");
const Storage_10 = require("./User/Storage");
const Storage_11 = require("./UserEntityClaim/Storage");
const Storage_12 = require("./UserEntityGrant/Storage");
const Storage_13 = require("./UserRelation/Storage");
const Storage_14 = require("./Account/Storage");
const Storage_15 = require("./Address/Storage");
const Storage_16 = require("./Application/Storage");
const Storage_17 = require("./Area/Storage");
const Storage_18 = require("./Article/Storage");
const Storage_19 = require("./ArticleMenu/Storage");
const Storage_20 = require("./Bridge/Storage");
const Storage_21 = require("./Captcha/Storage");
const Storage_22 = require("./ChangePasswordTemp/Storage");
const Storage_23 = require("./Domain/Storage");
const Storage_24 = require("./Email/Storage");
const Storage_25 = require("./ExtraFile/Storage");
const Storage_26 = require("./Livestream/Storage");
const Storage_27 = require("./Message/Storage");
const Storage_28 = require("./MessageSystem/Storage");
const Storage_29 = require("./MessageType/Storage");
const Storage_30 = require("./MessageTypeSmsTemplate/Storage");
const Storage_31 = require("./MessageTypeTemplate/Storage");
const Storage_32 = require("./Mobile/Storage");
const Storage_33 = require("./Notification/Storage");
const Storage_34 = require("./Parasite/Storage");
const Storage_35 = require("./Platform/Storage");
const Storage_36 = require("./ReadRemark/Storage");
const Storage_37 = require("./Session/Storage");
const Storage_38 = require("./SessionMessage/Storage");
const Storage_39 = require("./SmsTemplate/Storage");
const Storage_40 = require("./Station/Storage");
const Storage_41 = require("./Subscription/Storage");
const Storage_42 = require("./Subway/Storage");
const Storage_43 = require("./SubwayStation/Storage");
const Storage_44 = require("./System/Storage");
const Storage_45 = require("./ToDo/Storage");
const Storage_46 = require("./Token/Storage");
const Storage_47 = require("./UserSystem/Storage");
const Storage_48 = require("./UserWechatPublicTag/Storage");
const Storage_49 = require("./WechatLogin/Storage");
const Storage_50 = require("./WechatMenu/Storage");
const Storage_51 = require("./WechatPublicAutoReply/Storage");
const Storage_52 = require("./WechatPublicTag/Storage");
const Storage_53 = require("./WechatPublicTemplate/Storage");
const Storage_54 = require("./WechatQrCode/Storage");
const Storage_55 = require("./WechatUser/Storage");
exports.storageSchema = {
    actionAuth: Storage_1.desc,
    i18n: Storage_2.desc,
    modi: Storage_3.desc,
    modiEntity: Storage_4.desc,
    oper: Storage_5.desc,
    operEntity: Storage_6.desc,
    path: Storage_7.desc,
    relation: Storage_8.desc,
    relationAuth: Storage_9.desc,
    user: Storage_10.desc,
    userEntityClaim: Storage_11.desc,
    userEntityGrant: Storage_12.desc,
    userRelation: Storage_13.desc,
    account: Storage_14.desc,
    address: Storage_15.desc,
    application: Storage_16.desc,
    area: Storage_17.desc,
    article: Storage_18.desc,
    articleMenu: Storage_19.desc,
    bridge: Storage_20.desc,
    captcha: Storage_21.desc,
    changePasswordTemp: Storage_22.desc,
    domain: Storage_23.desc,
    email: Storage_24.desc,
    extraFile: Storage_25.desc,
    livestream: Storage_26.desc,
    message: Storage_27.desc,
    messageSystem: Storage_28.desc,
    messageType: Storage_29.desc,
    messageTypeSmsTemplate: Storage_30.desc,
    messageTypeTemplate: Storage_31.desc,
    mobile: Storage_32.desc,
    notification: Storage_33.desc,
    parasite: Storage_34.desc,
    platform: Storage_35.desc,
    readRemark: Storage_36.desc,
    session: Storage_37.desc,
    sessionMessage: Storage_38.desc,
    smsTemplate: Storage_39.desc,
    station: Storage_40.desc,
    subscription: Storage_41.desc,
    subway: Storage_42.desc,
    subwayStation: Storage_43.desc,
    system: Storage_44.desc,
    toDo: Storage_45.desc,
    token: Storage_46.desc,
    userSystem: Storage_47.desc,
    userWechatPublicTag: Storage_48.desc,
    wechatLogin: Storage_49.desc,
    wechatMenu: Storage_50.desc,
    wechatPublicAutoReply: Storage_51.desc,
    wechatPublicTag: Storage_52.desc,
    wechatPublicTemplate: Storage_53.desc,
    wechatQrCode: Storage_54.desc,
    wechatUser: Storage_55.desc
};
