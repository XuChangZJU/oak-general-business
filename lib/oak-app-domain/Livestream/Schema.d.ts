import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Datetime } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
export type OpSchema = EntityShape & {
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
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
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
type AttrFilter = {
    id: Q_StringValue;
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
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    title?: number;
    streamTitle?: number;
    liveonly?: number;
    hub?: number;
    streamKey?: number;
    entity?: number;
    entityId?: number;
    rtmpPushUrl?: number;
    rtmpPlayUrl?: number;
    pcPushUrl?: number;
    expireAt?: number;
} & Partial<ExprOp<OpAttr | string>>;
type LivestreamIdProjection = OneOf<{
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
    title: number;
} | {
    streamTitle: number;
} | {
    liveonly: number;
} | {
    hub: number;
} | {
    streamKey: number;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    rtmpPushUrl: number;
} | {
    rtmpPlayUrl: number;
} | {
    pcPushUrl: number;
} | {
    expireAt: number;
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
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type LivestreamIdSubQuery = Selection<LivestreamIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
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
