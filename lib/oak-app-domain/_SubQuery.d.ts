import * as ActionAuth from "./ActionAuth/Schema";
import * as I18n from "./I18n/Schema";
import * as Modi from "./Modi/Schema";
import * as ModiEntity from "./ModiEntity/Schema";
import * as Oper from "./Oper/Schema";
import * as OperEntity from "./OperEntity/Schema";
import * as Path from "./Path/Schema";
import * as Relation from "./Relation/Schema";
import * as RelationAuth from "./RelationAuth/Schema";
import * as User from "./User/Schema";
import * as UserEntityClaim from "./UserEntityClaim/Schema";
import * as UserEntityGrant from "./UserEntityGrant/Schema";
import * as UserRelation from "./UserRelation/Schema";
import * as Account from "./Account/Schema";
import * as Address from "./Address/Schema";
import * as Application from "./Application/Schema";
import * as Area from "./Area/Schema";
import * as Article from "./Article/Schema";
import * as ArticleMenu from "./ArticleMenu/Schema";
import * as Captcha from "./Captcha/Schema";
import * as ChangePasswordTemp from "./ChangePasswordTemp/Schema";
import * as Domain from "./Domain/Schema";
import * as Email from "./Email/Schema";
import * as ExtraFile from "./ExtraFile/Schema";
import * as Livestream from "./Livestream/Schema";
import * as Message from "./Message/Schema";
import * as MessageSystem from "./MessageSystem/Schema";
import * as MessageType from "./MessageType/Schema";
import * as MessageTypeSmsTemplate from "./MessageTypeSmsTemplate/Schema";
import * as MessageTypeTemplate from "./MessageTypeTemplate/Schema";
import * as Mobile from "./Mobile/Schema";
import * as Notification from "./Notification/Schema";
import * as Parasite from "./Parasite/Schema";
import * as Platform from "./Platform/Schema";
import * as ReadRemark from "./ReadRemark/Schema";
import * as Session from "./Session/Schema";
import * as SessionMessage from "./SessionMessage/Schema";
import * as SmsTemplate from "./SmsTemplate/Schema";
import * as Station from "./Station/Schema";
import * as Subscription from "./Subscription/Schema";
import * as Subway from "./Subway/Schema";
import * as SubwayStation from "./SubwayStation/Schema";
import * as System from "./System/Schema";
import * as ToDo from "./ToDo/Schema";
import * as Token from "./Token/Schema";
import * as UserSystem from "./UserSystem/Schema";
import * as UserWechatPublicTag from "./UserWechatPublicTag/Schema";
import * as WechatLogin from "./WechatLogin/Schema";
import * as WechatMenu from "./WechatMenu/Schema";
import * as WechatMpJump from "./WechatMpJump/Schema";
import * as WechatPublicAutoReply from "./WechatPublicAutoReply/Schema";
import * as WechatPublicTag from "./WechatPublicTag/Schema";
import * as WechatQrCode from "./WechatQrCode/Schema";
import * as WechatTemplate from "./WechatTemplate/Schema";
import * as WechatUser from "./WechatUser/Schema";
export type ActionAuthIdSubQuery = {
    [K in "$in" | "$nin"]?: (ActionAuth.ActionAuthIdSubQuery & {
        entity: "actionAuth";
    }) | any;
};
export type I18nIdSubQuery = {
    [K in "$in" | "$nin"]?: (I18n.I18nIdSubQuery & {
        entity: "i18n";
    }) | any;
};
export type ModiIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.ModiIdSubQuery & {
        entity: "modiEntity";
    }) | (Modi.ModiIdSubQuery & {
        entity: "modi";
    }) | any;
};
export type ModiEntityIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.ModiEntityIdSubQuery & {
        entity: "modiEntity";
    }) | any;
};
export type OperIdSubQuery = {
    [K in "$in" | "$nin"]?: (OperEntity.OperIdSubQuery & {
        entity: "operEntity";
    }) | (Oper.OperIdSubQuery & {
        entity: "oper";
    }) | any;
};
export type OperEntityIdSubQuery = {
    [K in "$in" | "$nin"]?: (OperEntity.OperEntityIdSubQuery & {
        entity: "operEntity";
    }) | any;
};
export type PathIdSubQuery = {
    [K in "$in" | "$nin"]?: (ActionAuth.PathIdSubQuery & {
        entity: "actionAuth";
    }) | (RelationAuth.PathIdSubQuery & {
        entity: "relationAuth";
    }) | (Path.PathIdSubQuery & {
        entity: "path";
    }) | any;
};
export type RelationIdSubQuery = {
    [K in "$in" | "$nin"]?: (ActionAuth.RelationIdSubQuery & {
        entity: "actionAuth";
    }) | (RelationAuth.RelationIdSubQuery & {
        entity: "relationAuth";
    }) | (UserEntityClaim.RelationIdSubQuery & {
        entity: "userEntityClaim";
    }) | (UserRelation.RelationIdSubQuery & {
        entity: "userRelation";
    }) | (Relation.RelationIdSubQuery & {
        entity: "relation";
    }) | any;
};
export type RelationAuthIdSubQuery = {
    [K in "$in" | "$nin"]?: (RelationAuth.RelationAuthIdSubQuery & {
        entity: "relationAuth";
    }) | any;
};
export type UserIdSubQuery = {
    [K in "$in" | "$nin"]?: (Oper.UserIdSubQuery & {
        entity: "oper";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | (UserEntityClaim.UserIdSubQuery & {
        entity: "userEntityClaim";
    }) | (UserRelation.UserIdSubQuery & {
        entity: "userRelation";
    }) | (ChangePasswordTemp.UserIdSubQuery & {
        entity: "changePasswordTemp";
    }) | (Email.UserIdSubQuery & {
        entity: "email";
    }) | (Message.UserIdSubQuery & {
        entity: "message";
    }) | (Mobile.UserIdSubQuery & {
        entity: "mobile";
    }) | (Parasite.UserIdSubQuery & {
        entity: "parasite";
    }) | (ReadRemark.UserIdSubQuery & {
        entity: "readRemark";
    }) | (Session.UserIdSubQuery & {
        entity: "session";
    }) | (SessionMessage.UserIdSubQuery & {
        entity: "sessionMessage";
    }) | (Token.UserIdSubQuery & {
        entity: "token";
    }) | (UserEntityGrant.UserIdSubQuery & {
        entity: "userEntityGrant";
    }) | (UserSystem.UserIdSubQuery & {
        entity: "userSystem";
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
    }) | (Address.UserIdSubQuery & {
        entity: "address";
    }) | (Account.UserIdSubQuery & {
        entity: "account";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | any;
};
export type UserEntityClaimIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserEntityClaim.UserEntityClaimIdSubQuery & {
        entity: "userEntityClaim";
    }) | any;
};
export type UserEntityGrantIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserEntityClaim.UserEntityGrantIdSubQuery & {
        entity: "userEntityClaim";
    }) | (ModiEntity.UserEntityGrantIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserEntityGrantIdSubQuery & {
        entity: "operEntity";
    }) | (WechatQrCode.UserEntityGrantIdSubQuery & {
        entity: "wechatQrCode";
    }) | (UserEntityGrant.UserEntityGrantIdSubQuery & {
        entity: "userEntityGrant";
    }) | any;
};
export type UserRelationIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserEntityClaim.UserRelationIdSubQuery & {
        entity: "userEntityClaim";
    }) | (UserRelation.UserRelationIdSubQuery & {
        entity: "userRelation";
    }) | any;
};
export type AccountIdSubQuery = {
    [K in "$in" | "$nin"]?: (Relation.AccountIdSubQuery & {
        entity: "relation";
    }) | (UserRelation.AccountIdSubQuery & {
        entity: "userRelation";
    }) | (Account.AccountIdSubQuery & {
        entity: "account";
    }) | any;
};
export type AddressIdSubQuery = {
    [K in "$in" | "$nin"]?: (Address.AddressIdSubQuery & {
        entity: "address";
    }) | any;
};
export type ApplicationIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ApplicationIdSubQuery & {
        entity: "extraFile";
    }) | (Notification.ApplicationIdSubQuery & {
        entity: "notification";
    }) | (SessionMessage.ApplicationIdSubQuery & {
        entity: "sessionMessage";
    }) | (Token.ApplicationIdSubQuery & {
        entity: "token";
    }) | (WechatMenu.ApplicationIdSubQuery & {
        entity: "wechatMenu";
    }) | (WechatPublicAutoReply.ApplicationIdSubQuery & {
        entity: "wechatPublicAutoReply";
    }) | (WechatPublicTag.ApplicationIdSubQuery & {
        entity: "wechatPublicTag";
    }) | (WechatQrCode.ApplicationIdSubQuery & {
        entity: "wechatQrCode";
    }) | (WechatTemplate.ApplicationIdSubQuery & {
        entity: "wechatTemplate";
    }) | (WechatUser.ApplicationIdSubQuery & {
        entity: "wechatUser";
    }) | (Session.ApplicationIdSubQuery & {
        entity: "session";
    }) | (Application.ApplicationIdSubQuery & {
        entity: "application";
    }) | any;
};
export type AreaIdSubQuery = {
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
export type ArticleIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ArticleIdSubQuery & {
        entity: "extraFile";
    }) | (Article.ArticleIdSubQuery & {
        entity: "article";
    }) | any;
};
export type ArticleMenuIdSubQuery = {
    [K in "$in" | "$nin"]?: (Article.ArticleMenuIdSubQuery & {
        entity: "article";
    }) | (ArticleMenu.ArticleMenuIdSubQuery & {
        entity: "articleMenu";
    }) | (ExtraFile.ArticleMenuIdSubQuery & {
        entity: "extraFile";
    }) | (ArticleMenu.ArticleMenuIdSubQuery & {
        entity: "articleMenu";
    }) | any;
};
export type CaptchaIdSubQuery = {
    [K in "$in" | "$nin"]?: (Captcha.CaptchaIdSubQuery & {
        entity: "captcha";
    }) | any;
};
export type ChangePasswordTempIdSubQuery = {
    [K in "$in" | "$nin"]?: (ChangePasswordTemp.ChangePasswordTempIdSubQuery & {
        entity: "changePasswordTemp";
    }) | any;
};
export type DomainIdSubQuery = {
    [K in "$in" | "$nin"]?: (Domain.DomainIdSubQuery & {
        entity: "domain";
    }) | any;
};
export type EmailIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.EmailIdSubQuery & {
        entity: "token";
    }) | (Email.EmailIdSubQuery & {
        entity: "email";
    }) | any;
};
export type ExtraFileIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ExtraFileIdSubQuery & {
        entity: "extraFile";
    }) | any;
};
export type LivestreamIdSubQuery = {
    [K in "$in" | "$nin"]?: (Livestream.LivestreamIdSubQuery & {
        entity: "livestream";
    }) | any;
};
export type MessageIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageSystem.MessageIdSubQuery & {
        entity: "messageSystem";
    }) | (WechatMpJump.MessageIdSubQuery & {
        entity: "wechatMpJump";
    }) | (Message.MessageIdSubQuery & {
        entity: "message";
    }) | any;
};
export type MessageSystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (Notification.MessageSystemIdSubQuery & {
        entity: "notification";
    }) | (MessageSystem.MessageSystemIdSubQuery & {
        entity: "messageSystem";
    }) | any;
};
export type MessageTypeIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageType.MessageTypeIdSubQuery & {
        entity: "messageType";
    }) | any;
};
export type MessageTypeSmsTemplateIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeSmsTemplate.MessageTypeSmsTemplateIdSubQuery & {
        entity: "messageTypeSmsTemplate";
    }) | any;
};
export type MessageTypeTemplateIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeTemplate.MessageTypeTemplateIdSubQuery & {
        entity: "messageTypeTemplate";
    }) | any;
};
export type MobileIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.MobileIdSubQuery & {
        entity: "token";
    }) | (Mobile.MobileIdSubQuery & {
        entity: "mobile";
    }) | any;
};
export type NotificationIdSubQuery = {
    [K in "$in" | "$nin"]?: (Notification.NotificationIdSubQuery & {
        entity: "notification";
    }) | any;
};
export type ParasiteIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.ParasiteIdSubQuery & {
        entity: "token";
    }) | (Parasite.ParasiteIdSubQuery & {
        entity: "parasite";
    }) | any;
};
export type PlatformIdSubQuery = {
    [K in "$in" | "$nin"]?: (Message.PlatformIdSubQuery & {
        entity: "message";
    }) | (System.PlatformIdSubQuery & {
        entity: "system";
    }) | (Platform.PlatformIdSubQuery & {
        entity: "platform";
    }) | any;
};
export type ReadRemarkIdSubQuery = {
    [K in "$in" | "$nin"]?: (ReadRemark.ReadRemarkIdSubQuery & {
        entity: "readRemark";
    }) | any;
};
export type SessionIdSubQuery = {
    [K in "$in" | "$nin"]?: (ReadRemark.SessionIdSubQuery & {
        entity: "readRemark";
    }) | (SessionMessage.SessionIdSubQuery & {
        entity: "sessionMessage";
    }) | (Relation.SessionIdSubQuery & {
        entity: "relation";
    }) | (UserRelation.SessionIdSubQuery & {
        entity: "userRelation";
    }) | (Session.SessionIdSubQuery & {
        entity: "session";
    }) | any;
};
export type SessionMessageIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.SessionMessageIdSubQuery & {
        entity: "extraFile";
    }) | (SessionMessage.SessionMessageIdSubQuery & {
        entity: "sessionMessage";
    }) | any;
};
export type SmsTemplateIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeSmsTemplate.SmsTemplateIdSubQuery & {
        entity: "messageTypeSmsTemplate";
    }) | (SmsTemplate.SmsTemplateIdSubQuery & {
        entity: "smsTemplate";
    }) | any;
};
export type StationIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.StationIdSubQuery & {
        entity: "subwayStation";
    }) | (Station.StationIdSubQuery & {
        entity: "station";
    }) | any;
};
export type SubscriptionIdSubQuery = {
    [K in "$in" | "$nin"]?: (Subscription.SubscriptionIdSubQuery & {
        entity: "subscription";
    }) | any;
};
export type SubwayIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.SubwayIdSubQuery & {
        entity: "subwayStation";
    }) | (Subway.SubwayIdSubQuery & {
        entity: "subway";
    }) | any;
};
export type SubwayStationIdSubQuery = {
    [K in "$in" | "$nin"]?: (SubwayStation.SubwayStationIdSubQuery & {
        entity: "subwayStation";
    }) | any;
};
export type SystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (Application.SystemIdSubQuery & {
        entity: "application";
    }) | (Domain.SystemIdSubQuery & {
        entity: "domain";
    }) | (MessageSystem.SystemIdSubQuery & {
        entity: "messageSystem";
    }) | (SmsTemplate.SystemIdSubQuery & {
        entity: "smsTemplate";
    }) | (UserSystem.SystemIdSubQuery & {
        entity: "userSystem";
    }) | (System.SystemIdSubQuery & {
        entity: "system";
    }) | any;
};
export type ToDoIdSubQuery = {
    [K in "$in" | "$nin"]?: (Relation.ToDoIdSubQuery & {
        entity: "relation";
    }) | (UserRelation.ToDoIdSubQuery & {
        entity: "userRelation";
    }) | (ToDo.ToDoIdSubQuery & {
        entity: "toDo";
    }) | any;
};
export type TokenIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.TokenIdSubQuery & {
        entity: "token";
    }) | any;
};
export type UserSystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.UserSystemIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserSystemIdSubQuery & {
        entity: "operEntity";
    }) | (UserSystem.UserSystemIdSubQuery & {
        entity: "userSystem";
    }) | any;
};
export type UserWechatPublicTagIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.UserWechatPublicTagIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.UserWechatPublicTagIdSubQuery & {
        entity: "operEntity";
    }) | (UserWechatPublicTag.UserWechatPublicTagIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | any;
};
export type WechatLoginIdSubQuery = {
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
export type WechatMenuIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatMenuIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatMenuIdSubQuery & {
        entity: "operEntity";
    }) | (WechatMenu.WechatMenuIdSubQuery & {
        entity: "wechatMenu";
    }) | any;
};
export type WechatMpJumpIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatMpJumpIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatMpJumpIdSubQuery & {
        entity: "operEntity";
    }) | (WechatMpJump.WechatMpJumpIdSubQuery & {
        entity: "wechatMpJump";
    }) | any;
};
export type WechatPublicAutoReplyIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatPublicAutoReplyIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatPublicAutoReplyIdSubQuery & {
        entity: "operEntity";
    }) | (WechatPublicAutoReply.WechatPublicAutoReplyIdSubQuery & {
        entity: "wechatPublicAutoReply";
    }) | any;
};
export type WechatPublicTagIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserWechatPublicTag.WechatPublicTagIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | (WechatMenu.WechatPublicTagIdSubQuery & {
        entity: "wechatMenu";
    }) | (ModiEntity.WechatPublicTagIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatPublicTagIdSubQuery & {
        entity: "operEntity";
    }) | (WechatPublicTag.WechatPublicTagIdSubQuery & {
        entity: "wechatPublicTag";
    }) | any;
};
export type WechatQrCodeIdSubQuery = {
    [K in "$in" | "$nin"]?: (ModiEntity.WechatQrCodeIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatQrCodeIdSubQuery & {
        entity: "operEntity";
    }) | (WechatQrCode.WechatQrCodeIdSubQuery & {
        entity: "wechatQrCode";
    }) | any;
};
export type WechatTemplateIdSubQuery = {
    [K in "$in" | "$nin"]?: (MessageTypeTemplate.WechatTemplateIdSubQuery & {
        entity: "messageTypeTemplate";
    }) | (ModiEntity.WechatTemplateIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatTemplateIdSubQuery & {
        entity: "operEntity";
    }) | (WechatTemplate.WechatTemplateIdSubQuery & {
        entity: "wechatTemplate";
    }) | any;
};
export type WechatUserIdSubQuery = {
    [K in "$in" | "$nin"]?: (SessionMessage.WechatUserIdSubQuery & {
        entity: "sessionMessage";
    }) | (UserWechatPublicTag.WechatUserIdSubQuery & {
        entity: "userWechatPublicTag";
    }) | (ModiEntity.WechatUserIdSubQuery & {
        entity: "modiEntity";
    }) | (OperEntity.WechatUserIdSubQuery & {
        entity: "operEntity";
    }) | (Token.WechatUserIdSubQuery & {
        entity: "token";
    }) | (WechatUser.WechatUserIdSubQuery & {
        entity: "wechatUser";
    }) | any;
};
