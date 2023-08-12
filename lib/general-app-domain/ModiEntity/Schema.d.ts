import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { AppendOnlyAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Modi from "../Modi/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type OpSchema = EntityShape & {
    modiId: ForeignKey<"modi">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatPublicTag" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    modiId: ForeignKey<"modi">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatPublicTag" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
    modi: Modi.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    userSystem?: UserSystem.Schema;
    userWechatPublicTag?: UserWechatPublicTag.Schema;
    wechatLogin?: WechatLogin.Schema;
    wechatPublicTag?: WechatPublicTag.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    modiId: Q_StringValue;
    modi: Modi.Filter;
    entity: Q_EnumValue<"user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatPublicTag" | "wechatQrCode" | "wechatUser" | string>;
    entityId: Q_StringValue;
    user: User.Filter;
    userEntityGrant: UserEntityGrant.Filter;
    userSystem: UserSystem.Filter;
    userWechatPublicTag: UserWechatPublicTag.Filter;
    wechatLogin: WechatLogin.Filter;
    wechatPublicTag: WechatPublicTag.Filter;
    wechatQrCode: WechatQrCode.Filter;
    wechatUser: WechatUser.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    modiId?: number;
    modi?: Modi.Projection;
    entity?: number;
    entityId?: number;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    userSystem?: UserSystem.Projection;
    userWechatPublicTag?: UserWechatPublicTag.Projection;
    wechatLogin?: WechatLogin.Projection;
    wechatPublicTag?: WechatPublicTag.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr | string>>;
declare type ModiEntityIdProjection = OneOf<{
    id: number;
}>;
declare type ModiIdProjection = OneOf<{
    modiId: number;
}>;
declare type UserIdProjection = OneOf<{
    entityId: number;
}>;
declare type UserEntityGrantIdProjection = OneOf<{
    entityId: number;
}>;
declare type UserSystemIdProjection = OneOf<{
    entityId: number;
}>;
declare type UserWechatPublicTagIdProjection = OneOf<{
    entityId: number;
}>;
declare type WechatLoginIdProjection = OneOf<{
    entityId: number;
}>;
declare type WechatPublicTagIdProjection = OneOf<{
    entityId: number;
}>;
declare type WechatQrCodeIdProjection = OneOf<{
    entityId: number;
}>;
declare type WechatUserIdProjection = OneOf<{
    entityId: number;
}>;
export declare type SortAttr = {
    id: number;
} | {
    $$createAt$$: number;
} | {
    $$seq$$: number;
} | {
    $$updateAt$$: number;
} | {
    modiId: number;
} | {
    modi: Modi.SortAttr;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    user: User.SortAttr;
} | {
    userEntityGrant: UserEntityGrant.SortAttr;
} | {
    userSystem: UserSystem.SortAttr;
} | {
    userWechatPublicTag: UserWechatPublicTag.SortAttr;
} | {
    wechatLogin: WechatLogin.SortAttr;
} | {
    wechatPublicTag: WechatPublicTag.SortAttr;
} | {
    wechatQrCode: WechatQrCode.SortAttr;
} | {
    wechatUser: WechatUser.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "modiId">> & (({
    modiId?: never;
    modi: Modi.CreateSingleOperation;
} | {
    modiId: ForeignKey<"modi">;
    modi?: Modi.UpdateOperation;
} | {
    modiId: ForeignKey<"modi">;
})) & ({
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
} | {
    entity?: never;
    entityId?: never;
    userSystem: UserSystem.CreateSingleOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
    userSystem: UserSystem.UpdateOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
} | {
    entity?: never;
    entityId?: never;
    userWechatPublicTag: UserWechatPublicTag.CreateSingleOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
    userWechatPublicTag: UserWechatPublicTag.UpdateOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
} | {
    entity?: never;
    entityId?: never;
    wechatLogin: WechatLogin.CreateSingleOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin: WechatLogin.UpdateOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
    wechatPublicTag: WechatPublicTag.UpdateOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
} | {
    entity?: never;
    entityId?: never;
    wechatQrCode: WechatQrCode.CreateSingleOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
    wechatQrCode: WechatQrCode.UpdateOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
    wechatUser: WechatUser.UpdateOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "modiId">> & (({
    modi: Modi.CreateSingleOperation;
    modiId?: never;
} | {
    modi: Modi.UpdateOperation;
    modiId?: never;
} | {
    modi: Modi.RemoveOperation;
    modiId?: never;
} | {
    modi?: never;
    modiId?: ForeignKey<"modi"> | null;
})) & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userSystem?: UserSystem.CreateSingleOperation | UserSystem.UpdateOperation | UserSystem.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userWechatPublicTag?: UserWechatPublicTag.CreateSingleOperation | UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatLogin?: WechatLogin.CreateSingleOperation | WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatPublicTag?: WechatPublicTag.CreateSingleOperation | WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatQrCode?: WechatQrCode.CreateSingleOperation | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatPublicTag" | "wechatQrCode" | "wechatUser" | string) | null;
    entityId?: ForeignKey<"User" | "UserEntityGrant" | "UserSystem" | "UserWechatPublicTag" | "WechatLogin" | "WechatPublicTag" | "WechatQrCode" | "WechatUser"> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    modi?: Modi.UpdateOperation | Modi.RemoveOperation;
})) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    userEntityGrant?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
} | {
    userSystem?: UserSystem.UpdateOperation | UserSystem.RemoveOperation;
} | {
    userWechatPublicTag?: UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation;
} | {
    wechatLogin?: WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
} | {
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
} | {
    wechatQrCode?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ModiIdSubQuery = Selection<ModiIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
export declare type UserWechatPublicTagIdSubQuery = Selection<UserWechatPublicTagIdProjection>;
export declare type WechatLoginIdSubQuery = Selection<WechatLoginIdProjection>;
export declare type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type ModiEntityIdSubQuery = Selection<ModiEntityIdProjection>;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<AppendOnlyAction> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
