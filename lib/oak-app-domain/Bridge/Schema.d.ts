import { JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { String, Datetime, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { QrCodeType } from "../../types/Config";
import * as WechatQrCode from "../WechatQrCode/Schema";
type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    qrCodeType: QrCodeType;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    qrCodeType: QrCodeType;
    wechatQrCode$entity?: Array<WechatQrCode.Schema>;
    wechatQrCode$entity$$aggr?: AggregationResult<WechatQrCode.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    redirectTo: JsonFilter<RedirectTo>;
    qrCodeType: Q_EnumValue<QrCodeType>;
    wechatQrCode$entity: WechatQrCode.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    entity?: number;
    entityId?: number;
    expiresAt?: number;
    expired?: number;
    redirectTo?: number | JsonProjection<RedirectTo>;
    qrCodeType?: number;
    wechatQrCode$entity?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
    wechatQrCode$entity$$aggr?: WechatQrCode.Aggregation & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr | string>>;
type BridgeIdProjection = OneOf<{
    id: number;
}>;
export type SortAttr = {
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
    expiresAt: number;
} | {
    expired: number;
} | {
    redirectTo: number;
} | {
    qrCodeType: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type BridgeIdSubQuery = Selection<BridgeIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
