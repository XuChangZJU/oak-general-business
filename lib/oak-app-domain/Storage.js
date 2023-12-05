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
const Storage_20 = require("./Captcha/Storage");
const Storage_21 = require("./ChangePasswordTemp/Storage");
const Storage_22 = require("./Domain/Storage");
const Storage_23 = require("./Email/Storage");
const Storage_24 = require("./ExtraFile/Storage");
const Storage_25 = require("./Livestream/Storage");
const Storage_26 = require("./Message/Storage");
const Storage_27 = require("./MessageSystem/Storage");
const Storage_28 = require("./MessageType/Storage");
const Storage_29 = require("./MessageTypeSmsTemplate/Storage");
const Storage_30 = require("./MessageTypeTemplate/Storage");
const Storage_31 = require("./Mobile/Storage");
const Storage_32 = require("./Notification/Storage");
const Storage_33 = require("./Parasite/Storage");
const Storage_34 = require("./Platform/Storage");
const Storage_35 = require("./ReadRemark/Storage");
const Storage_36 = require("./Session/Storage");
const Storage_37 = require("./SessionMessage/Storage");
const Storage_38 = require("./SmsTemplate/Storage");
const Storage_39 = require("./Station/Storage");
const Storage_40 = require("./Subscription/Storage");
const Storage_41 = require("./Subway/Storage");
const Storage_42 = require("./SubwayStation/Storage");
const Storage_43 = require("./System/Storage");
const Storage_44 = require("./ToDo/Storage");
const Storage_45 = require("./Token/Storage");
const Storage_46 = require("./UserSystem/Storage");
const Storage_47 = require("./UserWechatPublicTag/Storage");
const Storage_48 = require("./WechatLogin/Storage");
const Storage_49 = require("./WechatMenu/Storage");
const Storage_50 = require("./WechatMpJump/Storage");
const Storage_51 = require("./WechatPublicAutoReply/Storage");
const Storage_52 = require("./WechatPublicTag/Storage");
const Storage_53 = require("./WechatQrCode/Storage");
const Storage_54 = require("./WechatTemplate/Storage");
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
    captcha: Storage_20.desc,
    changePasswordTemp: Storage_21.desc,
    domain: Storage_22.desc,
    email: Storage_23.desc,
    extraFile: Storage_24.desc,
    livestream: Storage_25.desc,
    message: Storage_26.desc,
    messageSystem: Storage_27.desc,
    messageType: Storage_28.desc,
    messageTypeSmsTemplate: Storage_29.desc,
    messageTypeTemplate: Storage_30.desc,
    mobile: Storage_31.desc,
    notification: Storage_32.desc,
    parasite: Storage_33.desc,
    platform: Storage_34.desc,
    readRemark: Storage_35.desc,
    session: Storage_36.desc,
    sessionMessage: Storage_37.desc,
    smsTemplate: Storage_38.desc,
    station: Storage_39.desc,
    subscription: Storage_40.desc,
    subway: Storage_41.desc,
    subwayStation: Storage_42.desc,
    system: Storage_43.desc,
    toDo: Storage_44.desc,
    token: Storage_45.desc,
    userSystem: Storage_46.desc,
    userWechatPublicTag: Storage_47.desc,
    wechatLogin: Storage_48.desc,
    wechatMenu: Storage_49.desc,
    wechatMpJump: Storage_50.desc,
    wechatPublicAutoReply: Storage_51.desc,
    wechatPublicTag: Storage_52.desc,
    wechatQrCode: Storage_53.desc,
    wechatTemplate: Storage_54.desc,
    wechatUser: Storage_55.desc
};
