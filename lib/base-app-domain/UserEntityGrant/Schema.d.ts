import { String, Int, Boolean, Text, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import * as User from "../User/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    granteeId?: ForeignKey<"user"> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    granteeId?: ForeignKey<"user"> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    granter: User.Schema;
    grantee?: User.Schema | null;
    wechatQrCode$entity?: Array<WechatQrCode.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.UserEntityGrantIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    relation: Q_StringValue;
    type: Q_EnumValue<'grant' | 'transfer'>;
    number: Q_NumberValue;
    confirmed: Q_NumberValue;
    remark: Q_StringValue;
    granterId: Q_StringValue | SubQuery.UserIdSubQuery;
    granter: User.Filter;
    granteeId: Q_StringValue | SubQuery.UserIdSubQuery;
    grantee: User.Filter;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    entity?: 1;
    entityId?: 1;
    relation?: 1;
    type?: 1;
    number?: 1;
    confirmed?: 1;
    remark?: 1;
    granterId?: 1;
    granter?: User.Projection;
    granteeId?: 1;
    grantee?: User.Projection;
    expiresAt?: 1;
    expired?: 1;
    wechatQrCode$entity?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    entity?: string;
    entityId?: string;
    relation?: string;
    type?: string;
    number?: string;
    confirmed?: string;
    remark?: string;
    granterId?: string;
    granter?: User.ExportProjection;
    granteeId?: string;
    grantee?: User.ExportProjection;
    expiresAt?: string;
    expired?: string;
    wechatQrCode$entity?: WechatQrCode.Exportation & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr>>;
declare type UserEntityGrantIdProjection = OneOf<{
    id: 1;
}>;
declare type UserIdProjection = OneOf<{
    granterId: 1;
    granteeId: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    entity: 1;
    entityId: 1;
    relation: 1;
    type: 1;
    number: 1;
    confirmed: 1;
    remark: 1;
    granterId: 1;
    granter: User.SortAttr;
    granteeId: 1;
    grantee: User.SortAttr;
    expiresAt: 1;
    expired: 1;
} & ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "granterId" | "granteeId">> & (({
    granterId?: never | null;
    granter: User.CreateSingleOperation;
} | {
    granterId: String<64>;
    granter?: User.UpdateOperation;
}) & ({
    granteeId?: never | null;
    grantee?: User.CreateSingleOperation;
} | {
    granteeId?: String<64>;
    grantee?: User.UpdateOperation;
})) & {
    [k: string]: any;
    wechatQrCode$entity?: OakOperation<"update", Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, WechatQrCode.Filter> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId"> | Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, WechatQrCode.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "granterId" | "granteeId">> & (({
    granter?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    granterId?: undefined;
} | {
    granter?: undefined;
    granterId?: String<64> | null;
}) & ({
    grantee?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    granteeId?: undefined;
} | {
    grantee?: undefined;
    granteeId?: String<64> | null;
})) & {
    [k: string]: any;
    wechatQrCodes$entity?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId"> | Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<ParticularAction | "update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {} & (({
    granter?: User.UpdateOperation;
} | {
    granter?: User.RemoveOperation;
}) & ({
    grantee?: User.UpdateOperation;
} | {
    grantee?: User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type NativeAttr = OpAttr | `granter.${User.NativeAttr}` | `grantee.${User.NativeAttr}`;
export declare type FullAttr = NativeAttr | `wechatQrCodes$${number}.${WechatQrCode.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: Action;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
