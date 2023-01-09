import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { AppendOnlyAction } from "oak-domain/lib/actions/action";
import * as Oper from "../Oper/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type OpSchema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
    oper: Oper.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    userSystem?: UserSystem.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.OperEntityIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    operId: Q_StringValue | SubQuery.OperIdSubQuery;
    oper: Oper.Filter;
    entity: E;
    entityId: Q_StringValue;
    user: User.Filter;
    userEntityGrant: UserEntityGrant.Filter;
    userSystem: UserSystem.Filter;
    wechatQrCode: WechatQrCode.Filter;
    wechatUser: WechatUser.Filter;
};
export declare type Filter<E = Q_EnumValue<"user" | "userEntityGrant" | "userSystem" | "wechatQrCode" | "wechatUser" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    operId?: number;
    oper?: Oper.Projection;
    entity?: number;
    entityId?: number;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    userSystem?: UserSystem.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    operId?: string;
    oper?: Oper.ExportProjection;
    entity?: string;
    entityId?: string;
    user?: User.ExportProjection;
    userEntityGrant?: UserEntityGrant.ExportProjection;
    userSystem?: UserSystem.ExportProjection;
    wechatQrCode?: WechatQrCode.ExportProjection;
    wechatUser?: WechatUser.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type OperEntityIdProjection = OneOf<{
    id: number;
}>;
declare type OperIdProjection = OneOf<{
    operId: number;
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
    operId: number;
} | {
    oper: Oper.SortAttr;
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
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = Omit<DeduceAggregation<Schema, Projection, Filter, Sorter>, "id">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    operId?: never;
    oper: Oper.CreateSingleOperation;
} | {
    operId: String<64>;
})) & ({
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: String<64>;
    user: User.UpdateOperation;
} | {
    entity: "user";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
    userEntityGrant: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    userSystem: UserSystem.CreateSingleOperation;
} | {
    entity: "userSystem";
    entityId: String<64>;
    userSystem: UserSystem.UpdateOperation;
} | {
    entity: "userSystem";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    wechatQrCode: WechatQrCode.CreateSingleOperation;
} | {
    entity: "wechatQrCode";
    entityId: String<64>;
    wechatQrCode: WechatQrCode.UpdateOperation;
} | {
    entity: "wechatQrCode";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
    wechatUser: WechatUser.UpdateOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    oper: Oper.CreateSingleOperation;
    operId?: never;
} | {
    oper?: never;
    operId?: String<64> | null;
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
    wechatQrCode?: WechatQrCode.CreateSingleOperation | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("user" | "userEntityGrant" | "userSystem" | "wechatQrCode" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    userEntityGrant?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
} | {
    userSystem?: UserSystem.UpdateOperation | UserSystem.RemoveOperation;
} | {
    wechatQrCode?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type OperIdSubQuery = Selection<OperIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type OperEntityIdSubQuery = Selection<OperEntityIdProjection>;
export declare type NativeAttr = OpAttr | `oper.${Oper.NativeAttr}` | `entity.${User.NativeAttr}` | `entity.${UserEntityGrant.NativeAttr}` | `entity.${UserSystem.NativeAttr}` | `entity.${WechatQrCode.NativeAttr}` | `entity.${WechatUser.NativeAttr}`;
export declare type FullAttr = NativeAttr;
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
