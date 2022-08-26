import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Oper from "../Oper/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
    oper: Oper.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.OperEntityIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    operId: Q_StringValue | SubQuery.OperIdSubQuery;
    oper: Oper.Filter;
    entity: E;
    entityId: Q_StringValue;
};
export declare type Filter<E = Q_EnumValue<"user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    operId?: 1;
    oper?: Oper.Projection;
    entity?: 1;
    entityId?: 1;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    operId?: string;
    oper?: Oper.ExportProjection;
    entity?: string;
    entityId?: string;
    user?: User.ExportProjection;
    userEntityGrant?: UserEntityGrant.ExportProjection;
    wechatQrCode?: WechatQrCode.ExportProjection;
    wechatUser?: WechatUser.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type OperEntityIdProjection = OneOf<{
    id: 1;
}>;
declare type OperIdProjection = OneOf<{
    operId: 1;
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
    operId: 1;
} | {
    oper: Oper.SortAttr;
} | {
    entity: 1;
} | {
    entityId: 1;
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
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    operId?: never | null;
    oper: Oper.CreateSingleOperation;
} | {
    operId: String<64>;
    oper?: Oper.UpdateOperation;
})) & ({
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
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    oper?: Oper.CreateSingleOperation | Oper.UpdateOperation | Oper.RemoveOperation;
    operId?: undefined;
} | {
    oper?: undefined;
    operId?: String<64> | null;
})) & ({
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
    entity?: ("user" | "userEntityGrant" | "wechatQrCode" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    oper?: Oper.UpdateOperation;
} | {
    oper?: Oper.RemoveOperation;
})) & ({
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
export declare type OperIdSubQuery = Selection<OperIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type OperEntityIdSubQuery = Selection<OperEntityIdProjection>;
export declare type NativeAttr = OpAttr | `oper.${Oper.NativeAttr}` | `entity.${User.NativeAttr}` | `entity.${UserEntityGrant.NativeAttr}` | `entity.${WechatQrCode.NativeAttr}` | `entity.${WechatUser.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
