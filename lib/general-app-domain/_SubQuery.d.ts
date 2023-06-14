import * as ActionAuth from "./ActionAuth/Schema";
import * as Modi from "./Modi/Schema";
import * as ModiEntity from "./ModiEntity/Schema";
import * as Oper from "./Oper/Schema";
import * as OperEntity from "./OperEntity/Schema";
import * as Relation from "./Relation/Schema";
import * as RelationAuth from "./RelationAuth/Schema";
import * as User from "./User/Schema";
import * as UserEntityGrant from "./UserEntityGrant/Schema";
import * as UserRelation from "./UserRelation/Schema";
import * as Address from "./Address/Schema";
import * as Application from "./Application/Schema";
import * as Area from "./Area/Schema";
import * as Article from "./Article/Schema";
import * as Captcha from "./Captcha/Schema";
import * as Domain from "./Domain/Schema";
import * as Email from "./Email/Schema";
import * as ExtraFile from "./ExtraFile/Schema";
import * as Livestream from "./Livestream/Schema";
import * as Message from "./Message/Schema";
import * as MessageSystem from "./MessageSystem/Schema";
import * as MessageType from "./MessageType/Schema";
import * as MessageTypeTemplateId from "./MessageTypeTemplateId/Schema";
import * as Mobile from "./Mobile/Schema";
import * as Notification from "./Notification/Schema";
import * as Platform from "./Platform/Schema";
import * as Station from "./Station/Schema";
import * as Subscription from "./Subscription/Schema";
import * as Subway from "./Subway/Schema";
import * as SubwayStation from "./SubwayStation/Schema";
import * as System from "./System/Schema";
import * as Token from "./Token/Schema";
import * as UserSystem from "./UserSystem/Schema";
import * as UserWechatPublicTag from "./UserWechatPublicTag/Schema";
import * as WechatLogin from "./WechatLogin/Schema";
import * as WechatPublicTag from "./WechatPublicTag/Schema";
import * as WechatQrCode from "./WechatQrCode/Schema";
import * as WechatUser from "./WechatUser/Schema";
export declare type ActionAuthIdSubQuery = {
    [K in "$in" | "$nin"]?: (ActionAuth.ActionAuthIdSubQuery & {
        entity: "actionAuth";
    }) | any;
};
export declare type ModiIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.ModiIdSubQuery & {
        entity: "modiEntity";
    }) | (Modi.ModiIdSubQuery & {
        entity: "modi";
    }) | any;
};
export declare type ModiEntityIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.ModiEntityIdSubQuery & {
        entity: "modiEntity";
    }) | any;
};
export declare type OperIdSubQuery = {
    [K in "$in" | "$nin"]?: (OperEntity.OperIdSubQuery & {
        entity: "operEntity";
    }) | (Oper.OperIdSubQuery & {
        entity: "oper";
    }) | any;
};
export declare type OperEntityIdSubQuery = {
    [K in "$in" | "$nin"]?: (OperEntity.OperEntityIdSubQuery & {
        entity: "operEntity";
    }) | any;
};
export declare type RelationIdSubQuery = {
    [K in "$in" | "$nin"]?: (ActionAuth.RelationIdSubQuery & {
        entity: "actionAuth";
    }) | (RelationAuth.RelationIdSubQuery & {
        entity: "relationAuth";
    }) | (UserEntityGrant.RelationIdSubQuery & {
        entity: "userEntityGrant";
    }) | (UserRelation.RelationIdSubQuery & {
        entity: "userRelation";
    }) | (Relation.RelationIdSubQuery & {
        entity: "relation";
    }) | any;
};
export declare type RelationAuthIdSubQuery = {
    [K in "$in" | "$nin"]?: (RelationAuth.RelationAuthIdSubQuery & {
        entity: "relationAuth";
    }) | any;
};
export declare type UserIdSubQuery = {
    [K in "$in" | "$nin"]?: (Oper.UserIdSubQuery & {
        entity: "oper";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | (UserRelation.UserIdSubQuery & {
        entity: "userRelation";
    }) | (Email.UserIdSubQuery & {
        entity: "email";
    }) | (Message.UserIdSubQuery & {
        entity: "message";
    }) | (Mobile.UserIdSubQuery & {
        entity: "mobile";
    }) | (Token.UserIdSubQuery & {
        entity: "token";
    }) | (UserEntityGrant.UserIdSubQuery & {
        entity: "userEntityGrant";
    }) | (UserSystem.UserIdSubQuery & {
        entity: "userSystem";
    }) | (UserWechatPublicTag.UserIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | (WechatLogin.UserIdSubQuery & {
        entity: "wechatLogin";
    }) | (WechatUser.UserIdSubQuery & {
        entity: "wechatUser";
    }) | (ModiEntity.UserIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserIdSubQuery & {
        entity: "operEntity";
    }) | (ExtraFile.UserIdSubQuery & {
        entity: "extraFile";
    }) | (WechatQrCode.UserIdSubQuery & {
        entity: "wechatQrCode";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | any;
};
export declare type UserEntityGrantIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.UserEntityGrantIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserEntityGrantIdSubQuery & {
        entity: "operEntity";
    }) | (WechatQrCode.UserEntityGrantIdSubQuery & {
        entity: "wechatQrCode";
    }) | (UserEntityGrant.UserEntityGrantIdSubQuery & {
        entity: "userEntityGrant";
    }) | any;
};
export declare type UserRelationIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserRelation.UserRelationIdSubQuery & {
        entity: "userRelation";
    }) | any;
};
export declare type AddressIdSubQuery = {
    [K in "$in" | "$nin"]?: (Address.AddressIdSubQuery & {
        entity: "address";
    }) | any;
};
export declare type ApplicationIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeTemplateId.ApplicationIdSubQuery & {
        entity: "messageTypeTemplateId";
    }) | (Notification.ApplicationIdSubQuery & {
        entity: "notification";
    }) | (Token.ApplicationIdSubQuery & {
        entity: "token";
    }) | (WechatPublicTag.ApplicationIdSubQuery & {
        entity: "wechatPublicTag";
    }) | (WechatQrCode.ApplicationIdSubQuery & {
        entity: "wechatQrCode";
    }) | (WechatUser.ApplicationIdSubQuery & {
        entity: "wechatUser";
    }) | (Application.ApplicationIdSubQuery & {
        entity: "application";
    }) | any;
};
export declare type AreaIdSubQuery = {
    [K in "$in" | "$nin"]?: (Address.AreaIdSubQuery & {
        entity: "address";
    }) | (Area.AreaIdSubQuery & {
        entity: "area";
    }) | (Station.AreaIdSubQuery & {
        entity: "station";
    }) | (Subway.AreaIdSubQuery & {
        entity: "subway";
    }) | (Area.AreaIdSubQuery & {
        entity: "area";
    }) | any;
};
export declare type ArticleIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ArticleIdSubQuery & {
        entity: "extraFile";
    }) | (Article.ArticleIdSubQuery & {
        entity: "article";
    }) | any;
};
export declare type CaptchaIdSubQuery = {
    [K in "$in" | "$nin"]?: (Captcha.CaptchaIdSubQuery & {
        entity: "captcha";
    }) | any;
};
export declare type DomainIdSubQuery = {
    [K in "$in" | "$nin"]?: (Domain.DomainIdSubQuery & {
        entity: "domain";
    }) | any;
};
export declare type EmailIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.EmailIdSubQuery & {
        entity: "token";
    }) | (Email.EmailIdSubQuery & {
        entity: "email";
    }) | any;
};
export declare type ExtraFileIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ExtraFileIdSubQuery & {
        entity: "extraFile";
    }) | any;
};
export declare type LivestreamIdSubQuery = {
    [K in "$in" | "$nin"]?: (Livestream.LivestreamIdSubQuery & {
        entity: "livestream";
    }) | any;
};
export declare type MessageIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageSystem.MessageIdSubQuery & {
        entity: "messageSystem";
    }) | (Message.MessageIdSubQuery & {
        entity: "message";
    }) | any;
};
export declare type MessageSystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (Notification.MessageSystemIdSubQuery & {
        entity: "notification";
    }) | (MessageSystem.MessageSystemIdSubQuery & {
        entity: "messageSystem";
    }) | any;
};
export declare type MessageTypeIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageType.MessageTypeIdSubQuery & {
        entity: "messageType";
    }) | any;
};
export declare type MessageTypeTemplateIdIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeTemplateId.MessageTypeTemplateIdIdSubQuery & {
        entity: "messageTypeTemplateId";
    }) | any;
};
export declare type MobileIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.MobileIdSubQuery & {
        entity: "token";
    }) | (Mobile.MobileIdSubQuery & {
        entity: "mobile";
    }) | any;
};
export declare type NotificationIdSubQuery = {
    [K in "$in" | "$nin"]?: (Notification.NotificationIdSubQuery & {
        entity: "notification";
    }) | any;
};
export declare type PlatformIdSubQuery = {
    [K in "$in" | "$nin"]?: (System.PlatformIdSubQuery & {
        entity: "system";
    }) | (Platform.PlatformIdSubQuery & {
        entity: "platform";
    }) | any;
};
export declare type StationIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.StationIdSubQuery & {
        entity: "subwayStation";
    }) | (Station.StationIdSubQuery & {
        entity: "station";
    }) | any;
};
export declare type SubscriptionIdSubQuery = {
    [K in "$in" | "$nin"]?: (Subscription.SubscriptionIdSubQuery & {
        entity: "subscription";
    }) | any;
};
export declare type SubwayIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.SubwayIdSubQuery & {
        entity: "subwayStation";
    }) | (Subway.SubwayIdSubQuery & {
        entity: "subway";
    }) | any;
};
export declare type SubwayStationIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.SubwayStationIdSubQuery & {
        entity: "subwayStation";
    }) | any;
};
export declare type SystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (Application.SystemIdSubQuery & {
        entity: "application";
    }) | (Domain.SystemIdSubQuery & {
        entity: "domain";
    }) | (MessageSystem.SystemIdSubQuery & {
        entity: "messageSystem";
    }) | (UserSystem.SystemIdSubQuery & {
        entity: "userSystem";
    }) | (System.SystemIdSubQuery & {
        entity: "system";
    }) | any;
};
export declare type TokenIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.TokenIdSubQuery & {
        entity: "token";
    }) | any;
};
export declare type UserSystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.UserSystemIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserSystemIdSubQuery & {
        entity: "operEntity";
    }) | (UserSystem.UserSystemIdSubQuery & {
        entity: "userSystem";
    }) | any;
};
export declare type UserWechatPublicTagIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.UserWechatPublicTagIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserWechatPublicTagIdSubQuery & {
        entity: "operEntity";
    }) | (UserWechatPublicTag.UserWechatPublicTagIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | any;
};
export declare type WechatLoginIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatLoginIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatLoginIdSubQuery & {
        entity: "operEntity";
    }) | (WechatQrCode.WechatLoginIdSubQuery & {
        entity: "wechatQrCode";
    }) | (WechatLogin.WechatLoginIdSubQuery & {
        entity: "wechatLogin";
    }) | any;
};
export declare type WechatPublicTagIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserWechatPublicTag.WechatPublicTagIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | (ModiEntity.WechatPublicTagIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatPublicTagIdSubQuery & {
        entity: "operEntity";
    }) | (WechatPublicTag.WechatPublicTagIdSubQuery & {
        entity: "wechatPublicTag";
    }) | any;
};
export declare type WechatQrCodeIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatQrCodeIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatQrCodeIdSubQuery & {
        entity: "operEntity";
    }) | (WechatQrCode.WechatQrCodeIdSubQuery & {
        entity: "wechatQrCode";
    }) | any;
};
export declare type WechatUserIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatUserIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatUserIdSubQuery & {
        entity: "operEntity";
    }) | (Token.WechatUserIdSubQuery & {
        entity: "token";
    }) | (WechatUser.WechatUserIdSubQuery & {
        entity: "wechatUser";
    }) | any;
};
