import { EntityDef as ActionAuth } from "./ActionAuth/Schema";
import { EntityDef as I18n } from "./I18n/Schema";
import { EntityDef as Modi } from "./Modi/Schema";
import { EntityDef as ModiEntity } from "./ModiEntity/Schema";
import { EntityDef as Oper } from "./Oper/Schema";
import { EntityDef as OperEntity } from "./OperEntity/Schema";
import { EntityDef as Relation } from "./Relation/Schema";
import { EntityDef as RelationAuth } from "./RelationAuth/Schema";
import { EntityDef as User } from "./User/Schema";
import { EntityDef as UserEntityGrant } from "./UserEntityGrant/Schema";
import { EntityDef as UserRelation } from "./UserRelation/Schema";
import { EntityDef as Address } from "./Address/Schema";
import { EntityDef as Application } from "./Application/Schema";
import { EntityDef as Area } from "./Area/Schema";
import { EntityDef as Article } from "./Article/Schema";
import { EntityDef as ArticleMenu } from "./ArticleMenu/Schema";
import { EntityDef as Captcha } from "./Captcha/Schema";
import { EntityDef as ChangePasswordTemp } from "./ChangePasswordTemp/Schema";
import { EntityDef as Domain } from "./Domain/Schema";
import { EntityDef as Email } from "./Email/Schema";
import { EntityDef as ExtraFile } from "./ExtraFile/Schema";
import { EntityDef as Livestream } from "./Livestream/Schema";
import { EntityDef as Message } from "./Message/Schema";
import { EntityDef as MessageSystem } from "./MessageSystem/Schema";
import { EntityDef as MessageType } from "./MessageType/Schema";
import { EntityDef as MessageTypeTemplateId } from "./MessageTypeTemplateId/Schema";
import { EntityDef as Mobile } from "./Mobile/Schema";
import { EntityDef as Notification } from "./Notification/Schema";
import { EntityDef as Parasite } from "./Parasite/Schema";
import { EntityDef as Platform } from "./Platform/Schema";
import { EntityDef as Session } from "./Session/Schema";
import { EntityDef as SessionMessage } from "./SessionMessage/Schema";
import { EntityDef as Station } from "./Station/Schema";
import { EntityDef as Subscription } from "./Subscription/Schema";
import { EntityDef as Subway } from "./Subway/Schema";
import { EntityDef as SubwayStation } from "./SubwayStation/Schema";
import { EntityDef as System } from "./System/Schema";
import { EntityDef as Token } from "./Token/Schema";
import { EntityDef as UserSystem } from "./UserSystem/Schema";
import { EntityDef as UserWechatPublicTag } from "./UserWechatPublicTag/Schema";
import { EntityDef as WechatLogin } from "./WechatLogin/Schema";
import { EntityDef as WechatMenu } from "./WechatMenu/Schema";
import { EntityDef as WechatPublicTag } from "./WechatPublicTag/Schema";
import { EntityDef as WechatQrCode } from "./WechatQrCode/Schema";
import { EntityDef as WechatUser } from "./WechatUser/Schema";
export type EntityDict = {
    actionAuth: ActionAuth;
    i18n: I18n;
    modi: Modi;
    modiEntity: ModiEntity;
    oper: Oper;
    operEntity: OperEntity;
    relation: Relation;
    relationAuth: RelationAuth;
    user: User;
    userEntityGrant: UserEntityGrant;
    userRelation: UserRelation;
    address: Address;
    application: Application;
    area: Area;
    article: Article;
    articleMenu: ArticleMenu;
    captcha: Captcha;
    changePasswordTemp: ChangePasswordTemp;
    domain: Domain;
    email: Email;
    extraFile: ExtraFile;
    livestream: Livestream;
    message: Message;
    messageSystem: MessageSystem;
    messageType: MessageType;
    messageTypeTemplateId: MessageTypeTemplateId;
    mobile: Mobile;
    notification: Notification;
    parasite: Parasite;
    platform: Platform;
    session: Session;
    sessionMessage: SessionMessage;
    station: Station;
    subscription: Subscription;
    subway: Subway;
    subwayStation: SubwayStation;
    system: System;
    token: Token;
    userSystem: UserSystem;
    userWechatPublicTag: UserWechatPublicTag;
    wechatLogin: WechatLogin;
    wechatMenu: WechatMenu;
    wechatPublicTag: WechatPublicTag;
    wechatQrCode: WechatQrCode;
    wechatUser: WechatUser;
};
