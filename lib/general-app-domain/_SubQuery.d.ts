import * as Modi from "./Modi/Schema";
import * as ModiEntity from "./ModiEntity/Schema";
import * as Oper from "./Oper/Schema";
import * as OperEntity from "./OperEntity/Schema";
import * as User from "./User/Schema";
import * as Address from "./Address/Schema";
import * as Application from "./Application/Schema";
import * as Area from "./Area/Schema";
import * as Captcha from "./Captcha/Schema";
import * as Domain from "./Domain/Schema";
import * as Email from "./Email/Schema";
import * as ExtraFile from "./ExtraFile/Schema";
import * as Mobile from "./Mobile/Schema";
import * as UserRole from "./UserRole/Schema";
import * as Role from "./Role/Schema";
import * as UserSystem from "./UserSystem/Schema";
import * as System from "./System/Schema";
import * as Token from "./Token/Schema";
import * as UserEntityGrant from "./UserEntityGrant/Schema";
import * as WechatQrCode from "./WechatQrCode/Schema";
import * as WechatUser from "./WechatUser/Schema";
export declare type ModiIdSubQuery = {
    [K in "$in" | "$nin"]?: (Modi.ModiIdSubQuery & {
        entity: "modi";
    }) | (ModiEntity.ModiIdSubQuery & {
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
export declare type UserIdSubQuery = {
    [K in "$in" | "$nin"]?: (Oper.UserIdSubQuery & {
        entity: "oper";
    }) | (Email.UserIdSubQuery & {
        entity: "email";
    }) | (Mobile.UserIdSubQuery & {
        entity: "mobile";
    }) | (UserRole.UserIdSubQuery & {
        entity: "userRole";
    }) | (UserSystem.UserIdSubQuery & {
        entity: "userSystem";
    }) | (Token.UserIdSubQuery & {
        entity: "token";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | (UserEntityGrant.UserIdSubQuery & {
        entity: "userEntityGrant";
    }) | (WechatUser.UserIdSubQuery & {
        entity: "wechatUser";
    }) | (User.UserIdSubQuery & {
        entity: "user";
    }) | any;
};
export declare type AddressIdSubQuery = {
    [K in "$in" | "$nin"]?: (Address.AddressIdSubQuery & {
        entity: "address";
    }) | any;
};
export declare type ApplicationIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.ApplicationIdSubQuery & {
        entity: "token";
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
    }) | (Area.AreaIdSubQuery & {
        entity: "area";
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
    [K in "$in" | "$nin"]?: (Email.EmailIdSubQuery & {
        entity: "email";
    }) | any;
};
export declare type ExtraFileIdSubQuery = {
    [K in "$in" | "$nin"]?: (ExtraFile.ExtraFileIdSubQuery & {
        entity: "extraFile";
    }) | any;
};
export declare type MobileIdSubQuery = {
    [K in "$in" | "$nin"]?: (Mobile.MobileIdSubQuery & {
        entity: "mobile";
    }) | any;
};
export declare type UserRoleIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserRole.UserRoleIdSubQuery & {
        entity: "userRole";
    }) | any;
};
export declare type RoleIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserRole.RoleIdSubQuery & {
        entity: "userRole";
    }) | (Role.RoleIdSubQuery & {
        entity: "role";
    }) | any;
};
export declare type UserSystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserSystem.UserSystemIdSubQuery & {
        entity: "userSystem";
    }) | any;
};
export declare type SystemIdSubQuery = {
    [K in "$in" | "$nin"]?: (Application.SystemIdSubQuery & {
        entity: "application";
    }) | (Domain.SystemIdSubQuery & {
        entity: "domain";
    }) | (UserSystem.SystemIdSubQuery & {
        entity: "userSystem";
    }) | (User.SystemIdSubQuery & {
        entity: "user";
    }) | (System.SystemIdSubQuery & {
        entity: "system";
    }) | any;
};
export declare type TokenIdSubQuery = {
    [K in "$in" | "$nin"]?: (Token.TokenIdSubQuery & {
        entity: "token";
    }) | any;
};
export declare type UserEntityGrantIdSubQuery = {
    [K in "$in" | "$nin"]?: (UserEntityGrant.UserEntityGrantIdSubQuery & {
        entity: "userEntityGrant";
    }) | any;
};
export declare type WechatQrCodeIdSubQuery = {
    [K in "$in" | "$nin"]?: (WechatQrCode.WechatQrCodeIdSubQuery & {
        entity: "wechatQrCode";
    }) | any;
};
export declare type WechatUserIdSubQuery = {
    [K in "$in" | "$nin"]?: (WechatUser.WechatUserIdSubQuery & {
        entity: "wechatUser";
    }) | any;
};
