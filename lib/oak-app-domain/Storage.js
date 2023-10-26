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
const Storage_18 = require("./Bridge/Storage");
const Storage_19 = require("./Captcha/Storage");
const Storage_20 = require("./ChangePasswordTemp/Storage");
const Storage_21 = require("./Domain/Storage");
const Storage_22 = require("./Email/Storage");
const Storage_23 = require("./ExtraFile/Storage");
const Storage_24 = require("./Livestream/Storage");
const Storage_25 = require("./Message/Storage");
const Storage_26 = require("./MessageSystem/Storage");
const Storage_27 = require("./MessageType/Storage");
const Storage_28 = require("./MessageTypeSmsTemplate/Storage");
const Storage_29 = require("./MessageTypeTemplate/Storage");
const Storage_30 = require("./Mobile/Storage");
const Storage_31 = require("./Notification/Storage");
const Storage_32 = require("./Parasite/Storage");
const Storage_33 = require("./Platform/Storage");
const Storage_34 = require("./ReadRemark/Storage");
const Storage_35 = require("./Session/Storage");
const Storage_36 = require("./SessionMessage/Storage");
const Storage_37 = require("./SmsTemplate/Storage");
const Storage_38 = require("./Station/Storage");
const Storage_39 = require("./Subscription/Storage");
const Storage_40 = require("./Subway/Storage");
const Storage_41 = require("./SubwayStation/Storage");
const Storage_42 = require("./System/Storage");
const Storage_43 = require("./ToDo/Storage");
const Storage_44 = require("./Token/Storage");
const Storage_45 = require("./UserSystem/Storage");
const Storage_46 = require("./UserWechatPublicTag/Storage");
const Storage_47 = require("./WechatLogin/Storage");
const Storage_48 = require("./WechatMenu/Storage");
const Storage_49 = require("./wechatPublicAutoReply/Storage");
const Storage_50 = require("./WechatPublicTag/Storage");
const Storage_51 = require("./WechatPublicTemplate/Storage");
const Storage_52 = require("./WechatQrCode/Storage");
const Storage_53 = require("./WechatUser/Storage");
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
    bridge: Storage_18.desc,
    captcha: Storage_19.desc,
    changePasswordTemp: Storage_20.desc,
    domain: Storage_21.desc,
    email: Storage_22.desc,
    extraFile: Storage_23.desc,
    livestream: Storage_24.desc,
    message: Storage_25.desc,
    messageSystem: Storage_26.desc,
    messageType: Storage_27.desc,
    messageTypeSmsTemplate: Storage_28.desc,
    messageTypeTemplate: Storage_29.desc,
    mobile: Storage_30.desc,
    notification: Storage_31.desc,
    parasite: Storage_32.desc,
    platform: Storage_33.desc,
    readRemark: Storage_34.desc,
    session: Storage_35.desc,
    sessionMessage: Storage_36.desc,
    smsTemplate: Storage_37.desc,
    station: Storage_38.desc,
    subscription: Storage_39.desc,
    subway: Storage_40.desc,
    subwayStation: Storage_41.desc,
    system: Storage_42.desc,
    toDo: Storage_43.desc,
    token: Storage_44.desc,
    userSystem: Storage_45.desc,
    userWechatPublicTag: Storage_46.desc,
    wechatLogin: Storage_47.desc,
    wechatMenu: Storage_48.desc,
    wechatPublicAutoReply: Storage_49.desc,
    wechatPublicTag: Storage_50.desc,
    wechatPublicTemplate: Storage_51.desc,
    wechatQrCode: Storage_52.desc,
    wechatUser: Storage_53.desc
};
