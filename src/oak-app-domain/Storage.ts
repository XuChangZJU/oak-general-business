import { StorageSchema } from "oak-domain/lib/types/Storage";
import { EntityDict } from "./EntityDict";
import { desc as actionAuthDesc } from "./ActionAuth/Storage";
import { desc as i18nDesc } from "./I18n/Storage";
import { desc as modiDesc } from "./Modi/Storage";
import { desc as modiEntityDesc } from "./ModiEntity/Storage";
import { desc as operDesc } from "./Oper/Storage";
import { desc as operEntityDesc } from "./OperEntity/Storage";
import { desc as relationDesc } from "./Relation/Storage";
import { desc as relationAuthDesc } from "./RelationAuth/Storage";
import { desc as userDesc } from "./User/Storage";
import { desc as userEntityGrantDesc } from "./UserEntityGrant/Storage";
import { desc as userRelationDesc } from "./UserRelation/Storage";
import { desc as addressDesc } from "./Address/Storage";
import { desc as applicationDesc } from "./Application/Storage";
import { desc as areaDesc } from "./Area/Storage";
import { desc as articleDesc } from "./Article/Storage";
import { desc as articleMenuDesc } from "./ArticleMenu/Storage";
import { desc as captchaDesc } from "./Captcha/Storage";
import { desc as domainDesc } from "./Domain/Storage";
import { desc as emailDesc } from "./Email/Storage";
import { desc as extraFileDesc } from "./ExtraFile/Storage";
import { desc as livestreamDesc } from "./Livestream/Storage";
import { desc as messageDesc } from "./Message/Storage";
import { desc as messageSystemDesc } from "./MessageSystem/Storage";
import { desc as messageTypeDesc } from "./MessageType/Storage";
import { desc as messageTypeTemplateIdDesc } from "./MessageTypeTemplateId/Storage";
import { desc as mobileDesc } from "./Mobile/Storage";
import { desc as notificationDesc } from "./Notification/Storage";
import { desc as parasiteDesc } from "./Parasite/Storage";
import { desc as platformDesc } from "./Platform/Storage";
import { desc as stationDesc } from "./Station/Storage";
import { desc as subscriptionDesc } from "./Subscription/Storage";
import { desc as subwayDesc } from "./Subway/Storage";
import { desc as subwayStationDesc } from "./SubwayStation/Storage";
import { desc as systemDesc } from "./System/Storage";
import { desc as tokenDesc } from "./Token/Storage";
import { desc as userSystemDesc } from "./UserSystem/Storage";
import { desc as userWechatPublicTagDesc } from "./UserWechatPublicTag/Storage";
import { desc as wechatLoginDesc } from "./WechatLogin/Storage";
import { desc as wechatPublicTagDesc } from "./WechatPublicTag/Storage";
import { desc as wechatQrCodeDesc } from "./WechatQrCode/Storage";
import { desc as wechatUserDesc } from "./WechatUser/Storage";
export const storageSchema: StorageSchema<EntityDict> = {
    actionAuth: actionAuthDesc,
    i18n: i18nDesc,
    modi: modiDesc,
    modiEntity: modiEntityDesc,
    oper: operDesc,
    operEntity: operEntityDesc,
    relation: relationDesc,
    relationAuth: relationAuthDesc,
    user: userDesc,
    userEntityGrant: userEntityGrantDesc,
    userRelation: userRelationDesc,
    address: addressDesc,
    application: applicationDesc,
    area: areaDesc,
    article: articleDesc,
    articleMenu: articleMenuDesc,
    captcha: captchaDesc,
    domain: domainDesc,
    email: emailDesc,
    extraFile: extraFileDesc,
    livestream: livestreamDesc,
    message: messageDesc,
    messageSystem: messageSystemDesc,
    messageType: messageTypeDesc,
    messageTypeTemplateId: messageTypeTemplateIdDesc,
    mobile: mobileDesc,
    notification: notificationDesc,
    parasite: parasiteDesc,
    platform: platformDesc,
    station: stationDesc,
    subscription: subscriptionDesc,
    subway: subwayDesc,
    subwayStation: subwayStationDesc,
    system: systemDesc,
    token: tokenDesc,
    userSystem: userSystemDesc,
    userWechatPublicTag: userWechatPublicTagDesc,
    wechatLogin: wechatLoginDesc,
    wechatPublicTag: wechatPublicTagDesc,
    wechatQrCode: wechatQrCodeDesc,
    wechatUser: wechatUserDesc
};