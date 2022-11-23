import { String, Int, Boolean, Text, Datetime, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import * as User from "../User/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
export declare type OpSchema = EntityShape & {
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
export declare type Schema = EntityShape & {
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
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    wechatQrCode$entity?: Array<WechatQrCode.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.UserEntityGrantIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
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
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    entity?: number;
    entityId?: number;
    relation?: number;
    type?: number;
    number?: number;
    confirmed?: number;
    remark?: number;
    granterId?: number;
    granter?: User.Projection;
    granteeId?: number;
    grantee?: User.Projection;
    expiresAt?: number;
    expired?: number;
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    wechatQrCode$entity?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
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
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
    wechatQrCode$entity?: WechatQrCode.Exportation & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type UserEntityGrantIdProjection = OneOf<{
    id: number;
}>;
declare type UserIdProjection = OneOf<{
    granterId: number;
    granteeId: number;
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
    entity: number;
} | {
    entityId: number;
} | {
    relation: number;
} | {
    type: number;
} | {
    number: number;
} | {
    confirmed: number;
} | {
    remark: number;
} | {
    granterId: number;
} | {
    granter: User.SortAttr;
} | {
    granteeId: number;
} | {
    grantee: User.SortAttr;
} | {
    expiresAt: number;
} | {
    expired: number;
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
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "granterId" | "granteeId">> & (({
    granterId?: never;
    granter: User.CreateSingleOperation;
} | {
    granterId: String<64>;
    granter?: User.UpdateOperation;
} | {
    granterId: String<64>;
}) & ({
    granteeId?: never;
    grantee?: User.CreateSingleOperation;
} | {
    granteeId: String<64>;
    grantee?: User.UpdateOperation;
} | {
    granteeId?: String<64>;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, WechatQrCode.Filter> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, WechatQrCode.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "granterId" | "granteeId">> & (({
    granter: User.CreateSingleOperation;
    granterId?: never;
} | {
    granter: User.UpdateOperation;
    granterId?: never;
} | {
    granter: User.RemoveOperation;
    granterId?: never;
} | {
    granter?: never;
    granterId?: String<64> | null;
}) & ({
    grantee: User.CreateSingleOperation;
    granteeId?: never;
} | {
    grantee: User.UpdateOperation;
    granteeId?: never;
} | {
    grantee: User.RemoveOperation;
    granteeId?: never;
} | {
    grantee?: never;
    granteeId?: String<64> | null;
})) & {
    [k: string]: any;
    operEntitys$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    modiEntitys$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCodes$entity?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    granter?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    grantee?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type NativeAttr = OpAttr | `granter.${User.NativeAttr}` | `grantee.${User.NativeAttr}`;
export declare type FullAttr = NativeAttr | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}` | `wechatQrCodes$${number}.${WechatQrCode.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
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
