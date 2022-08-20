import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Modi from "../Modi/Schema";
import * as Address from "../Address/Schema";
import * as Application from "../Application/Schema";
import * as Area from "../Area/Schema";
import * as Captcha from "../Captcha/Schema";
import * as Domain from "../Domain/Schema";
import * as Email from "../Email/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
import * as Mobile from "../Mobile/Schema";
import * as Role from "../Role/Schema";
import * as System from "../System/Schema";
import * as Token from "../Token/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    modiId: ForeignKey<"modi">;
    entity: "address" | "application" | "area" | "captcha" | "domain" | "email" | "extraFile" | "mobile" | "role" | "system" | "token" | "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    modiId: ForeignKey<"modi">;
    entity: "address" | "application" | "area" | "captcha" | "domain" | "email" | "extraFile" | "mobile" | "role" | "system" | "token" | "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
    modi: Modi.Schema;
    address?: Address.Schema;
    application?: Application.Schema;
    area?: Area.Schema;
    captcha?: Captcha.Schema;
    domain?: Domain.Schema;
    email?: Email.Schema;
    extraFile?: ExtraFile.Schema;
    mobile?: Mobile.Schema;
    role?: Role.Schema;
    system?: System.Schema;
    token?: Token.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.ModiEntityIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    modiId: Q_StringValue | SubQuery.ModiIdSubQuery;
    modi: Modi.Filter;
    entity: E;
    entityId: Q_StringValue;
};
export declare type Filter<E = Q_EnumValue<"address" | "application" | "area" | "captcha" | "domain" | "email" | "extraFile" | "mobile" | "role" | "system" | "token" | "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    modiId?: 1;
    modi?: Modi.Projection;
    entity?: 1;
    entityId?: 1;
    address?: Address.Projection;
    application?: Application.Projection;
    area?: Area.Projection;
    captcha?: Captcha.Projection;
    domain?: Domain.Projection;
    email?: Email.Projection;
    extraFile?: ExtraFile.Projection;
    mobile?: Mobile.Projection;
    role?: Role.Projection;
    system?: System.Projection;
    token?: Token.Projection;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    modiId?: string;
    modi?: Modi.ExportProjection;
    entity?: string;
    entityId?: string;
    address?: Address.ExportProjection;
    application?: Application.ExportProjection;
    area?: Area.ExportProjection;
    captcha?: Captcha.ExportProjection;
    domain?: Domain.ExportProjection;
    email?: Email.ExportProjection;
    extraFile?: ExtraFile.ExportProjection;
    mobile?: Mobile.ExportProjection;
    role?: Role.ExportProjection;
    system?: System.ExportProjection;
    token?: Token.ExportProjection;
    user?: User.ExportProjection;
    userEntityGrant?: UserEntityGrant.ExportProjection;
    wechatQrCode?: WechatQrCode.ExportProjection;
    wechatUser?: WechatUser.ExportProjection;
} & Partial<ExprOp<OpAttr>>;
declare type ModiEntityIdProjection = OneOf<{
    id: 1;
}>;
declare type ModiIdProjection = OneOf<{
    modiId: 1;
}>;
declare type AddressIdProjection = OneOf<{
    entityId: 1;
}>;
declare type ApplicationIdProjection = OneOf<{
    entityId: 1;
}>;
declare type AreaIdProjection = OneOf<{
    entityId: 1;
}>;
declare type CaptchaIdProjection = OneOf<{
    entityId: 1;
}>;
declare type DomainIdProjection = OneOf<{
    entityId: 1;
}>;
declare type EmailIdProjection = OneOf<{
    entityId: 1;
}>;
declare type ExtraFileIdProjection = OneOf<{
    entityId: 1;
}>;
declare type MobileIdProjection = OneOf<{
    entityId: 1;
}>;
declare type RoleIdProjection = OneOf<{
    entityId: 1;
}>;
declare type SystemIdProjection = OneOf<{
    entityId: 1;
}>;
declare type TokenIdProjection = OneOf<{
    entityId: 1;
}>;
declare type UserIdProjection = OneOf<{
    entityId: 1;
}>;
declare type UserEntityGrantIdProjection = OneOf<{
    entityId: 1;
}>;
declare type WechatQrCodeIdProjection = OneOf<{
    entityId: 1;
}>;
declare type WechatUserIdProjection = OneOf<{
    entityId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    modiId: 1;
} | {
    modi: Modi.SortAttr;
} | {
    entity: 1;
} | {
    entityId: 1;
} | {
    address: Address.SortAttr;
} | {
    application: Application.SortAttr;
} | {
    area: Area.SortAttr;
} | {
    captcha: Captcha.SortAttr;
} | {
    domain: Domain.SortAttr;
} | {
    email: Email.SortAttr;
} | {
    extraFile: ExtraFile.SortAttr;
} | {
    mobile: Mobile.SortAttr;
} | {
    role: Role.SortAttr;
} | {
    system: System.SortAttr;
} | {
    token: Token.SortAttr;
} | {
    user: User.SortAttr;
} | {
    userEntityGrant: UserEntityGrant.SortAttr;
} | {
    wechatQrCode: WechatQrCode.SortAttr;
} | {
    wechatUser: WechatUser.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "modiId" | "entityId" | "entity">> & (({
    modiId?: never | null;
    modi: Modi.CreateSingleOperation;
} | {
    modiId: String<64>;
    modi?: Modi.UpdateOperation;
})) & ({
    entity?: never;
    entityId?: never;
    address: Address.CreateSingleOperation;
} | {
    entity: "address";
    entityId: String<64>;
    address?: Address.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    application: Application.CreateSingleOperation;
} | {
    entity: "application";
    entityId: String<64>;
    application?: Application.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    area: Area.CreateSingleOperation;
} | {
    entity: "area";
    entityId: String<64>;
    area?: Area.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    captcha: Captcha.CreateSingleOperation;
} | {
    entity: "captcha";
    entityId: String<64>;
    captcha?: Captcha.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    domain: Domain.CreateSingleOperation;
} | {
    entity: "domain";
    entityId: String<64>;
    domain?: Domain.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    email: Email.CreateSingleOperation;
} | {
    entity: "email";
    entityId: String<64>;
    email?: Email.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    extraFile: ExtraFile.CreateSingleOperation;
} | {
    entity: "extraFile";
    entityId: String<64>;
    extraFile?: ExtraFile.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    mobile: Mobile.CreateSingleOperation;
} | {
    entity: "mobile";
    entityId: String<64>;
    mobile?: Mobile.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    role: Role.CreateSingleOperation;
} | {
    entity: "role";
    entityId: String<64>;
    role?: Role.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    system: System.CreateSingleOperation;
} | {
    entity: "system";
    entityId: String<64>;
    system?: System.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    token: Token.CreateSingleOperation;
} | {
    entity: "token";
    entityId: String<64>;
    token?: Token.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: String<64>;
    user?: User.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    wechatQrCode: WechatQrCode.CreateSingleOperation;
} | {
    entity: "wechatQrCode";
    entityId: String<64>;
    wechatQrCode?: WechatQrCode.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
    wechatUser?: WechatUser.UpdateOperation;
} | {
    [K: string]: any;
}) & {
    [k: string]: any;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "modiId" | "entityId" | "entity">> & (({
    modi?: Modi.CreateSingleOperation | Modi.UpdateOperation | Modi.RemoveOperation;
    modiId?: undefined;
} | {
    modi?: undefined;
    modiId?: String<64> | null;
})) & ({
    address?: Address.CreateSingleOperation | Address.UpdateOperation | Address.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    application?: Application.CreateSingleOperation | Application.UpdateOperation | Application.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    area?: Area.CreateSingleOperation | Area.UpdateOperation | Area.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    captcha?: Captcha.CreateSingleOperation | Captcha.UpdateOperation | Captcha.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    domain?: Domain.CreateSingleOperation | Domain.UpdateOperation | Domain.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    email?: Email.CreateSingleOperation | Email.UpdateOperation | Email.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    extraFile?: ExtraFile.CreateSingleOperation | ExtraFile.UpdateOperation | ExtraFile.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    mobile?: Mobile.CreateSingleOperation | Mobile.UpdateOperation | Mobile.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    role?: Role.CreateSingleOperation | Role.UpdateOperation | Role.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    system?: System.CreateSingleOperation | System.UpdateOperation | System.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    token?: Token.CreateSingleOperation | Token.UpdateOperation | Token.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    wechatQrCode?: WechatQrCode.CreateSingleOperation | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    entity?: ("address" | "application" | "area" | "captcha" | "domain" | "email" | "extraFile" | "mobile" | "role" | "system" | "token" | "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    modi?: Modi.UpdateOperation;
} | {
    modi?: Modi.RemoveOperation;
})) & ({
    address?: Address.UpdateOperation;
} | {
    address?: Address.RemoveOperation;
} | {
    application?: Application.UpdateOperation;
} | {
    application?: Application.RemoveOperation;
} | {
    area?: Area.UpdateOperation;
} | {
    area?: Area.RemoveOperation;
} | {
    captcha?: Captcha.UpdateOperation;
} | {
    captcha?: Captcha.RemoveOperation;
} | {
    domain?: Domain.UpdateOperation;
} | {
    domain?: Domain.RemoveOperation;
} | {
    email?: Email.UpdateOperation;
} | {
    email?: Email.RemoveOperation;
} | {
    extraFile?: ExtraFile.UpdateOperation;
} | {
    extraFile?: ExtraFile.RemoveOperation;
} | {
    mobile?: Mobile.UpdateOperation;
} | {
    mobile?: Mobile.RemoveOperation;
} | {
    role?: Role.UpdateOperation;
} | {
    role?: Role.RemoveOperation;
} | {
    system?: System.UpdateOperation;
} | {
    system?: System.RemoveOperation;
} | {
    token?: Token.UpdateOperation;
} | {
    token?: Token.RemoveOperation;
} | {
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
} | {
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    userEntityGrant?: UserEntityGrant.RemoveOperation;
} | {
    wechatQrCode?: WechatQrCode.UpdateOperation;
} | {
    wechatQrCode?: WechatQrCode.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation;
} | {
    wechatUser?: WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ModiIdSubQuery = Selection<ModiIdProjection>;
export declare type AddressIdSubQuery = Selection<AddressIdProjection>;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type AreaIdSubQuery = Selection<AreaIdProjection>;
export declare type CaptchaIdSubQuery = Selection<CaptchaIdProjection>;
export declare type DomainIdSubQuery = Selection<DomainIdProjection>;
export declare type EmailIdSubQuery = Selection<EmailIdProjection>;
export declare type ExtraFileIdSubQuery = Selection<ExtraFileIdProjection>;
export declare type MobileIdSubQuery = Selection<MobileIdProjection>;
export declare type RoleIdSubQuery = Selection<RoleIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type TokenIdSubQuery = Selection<TokenIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type ModiEntityIdSubQuery = Selection<ModiEntityIdProjection>;
export declare type NativeAttr = OpAttr | `modi.${Modi.NativeAttr}` | `entity.${Address.NativeAttr}` | `entity.${Application.NativeAttr}` | `entity.${Area.NativeAttr}` | `entity.${Captcha.NativeAttr}` | `entity.${Domain.NativeAttr}` | `entity.${Email.NativeAttr}` | `entity.${ExtraFile.NativeAttr}` | `entity.${Mobile.NativeAttr}` | `entity.${Role.NativeAttr}` | `entity.${System.NativeAttr}` | `entity.${Token.NativeAttr}` | `entity.${User.NativeAttr}` | `entity.${UserEntityGrant.NativeAttr}` | `entity.${WechatQrCode.NativeAttr}` | `entity.${WechatUser.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
