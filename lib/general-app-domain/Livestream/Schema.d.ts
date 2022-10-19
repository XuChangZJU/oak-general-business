import { String, Datetime } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type OpSchema = EntityShape & {
    title: String<32>;
    streamTitle: String<32>;
    liveonly: 'online' | 'offline';
    hub: String<32>;
    streamKey: String<64>;
    entity: String<32>;
    entityId: String<64>;
    rtmpPushUrl: String<64>;
    rtmpPlayUrl: String<64>;
    pcPushUrl: String<64>;
    expireAt: Datetime;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    title: String<32>;
    streamTitle: String<32>;
    liveonly: 'online' | 'offline';
    hub: String<32>;
    streamKey: String<64>;
    entity: String<32>;
    entityId: String<64>;
    rtmpPushUrl: String<64>;
    rtmpPlayUrl: String<64>;
    pcPushUrl: String<64>;
    expireAt: Datetime;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.LivestreamIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    title: Q_StringValue;
    streamTitle: Q_StringValue;
    liveonly: Q_EnumValue<'online' | 'offline'>;
    hub: Q_StringValue;
    streamKey: Q_StringValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    rtmpPushUrl: Q_StringValue;
    rtmpPlayUrl: Q_StringValue;
    pcPushUrl: Q_StringValue;
    expireAt: Q_DateValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    $$seq$$?: 1;
    title?: 1;
    streamTitle?: 1;
    liveonly?: 1;
    hub?: 1;
    streamKey?: 1;
    entity?: 1;
    entityId?: 1;
    rtmpPushUrl?: 1;
    rtmpPlayUrl?: 1;
    pcPushUrl?: 1;
    expireAt?: 1;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    title?: string;
    streamTitle?: string;
    liveonly?: string;
    hub?: string;
    streamKey?: string;
    entity?: string;
    entityId?: string;
    rtmpPushUrl?: string;
    rtmpPlayUrl?: string;
    pcPushUrl?: string;
    expireAt?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type LivestreamIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$seq$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    title: 1;
} | {
    streamTitle: 1;
} | {
    liveonly: 1;
} | {
    hub: 1;
} | {
    streamKey: 1;
} | {
    entity: 1;
} | {
    entityId: 1;
} | {
    rtmpPushUrl: 1;
} | {
    rtmpPlayUrl: 1;
} | {
    pcPushUrl: 1;
} | {
    expireAt: 1;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type LivestreamIdSubQuery = Selection<LivestreamIdProjection>;
export declare type NativeAttr = OpAttr;
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
