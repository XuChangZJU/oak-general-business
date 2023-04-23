import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Station from "../Station/Schema";
import * as Subway from "../Subway/Schema";
export declare type OpSchema = EntityShape & {
    stationId: ForeignKey<"station">;
    subwayId: ForeignKey<"subway">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    stationId: ForeignKey<"station">;
    subwayId: ForeignKey<"subway">;
    station: Station.Schema;
    subway: Subway.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.SubwayStationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    stationId: Q_StringValue | SubQuery.StationIdSubQuery;
    station: Station.Filter;
    subwayId: Q_StringValue | SubQuery.SubwayIdSubQuery;
    subway: Subway.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    stationId?: number;
    station?: Station.Projection;
    subwayId?: number;
    subway?: Subway.Projection;
} & Partial<ExprOp<OpAttr | string>>;
declare type SubwayStationIdProjection = OneOf<{
    id: number;
}>;
declare type StationIdProjection = OneOf<{
    stationId: number;
}>;
declare type SubwayIdProjection = OneOf<{
    subwayId: number;
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
    stationId: number;
} | {
    station: Station.SortAttr;
} | {
    subwayId: number;
} | {
    subway: Subway.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "stationId" | "subwayId">> & (({
    stationId?: never;
    station: Station.CreateSingleOperation;
} | {
    stationId: String<64>;
    station?: Station.UpdateOperation;
} | {
    stationId: String<64>;
}) & ({
    subwayId?: never;
    subway: Subway.CreateSingleOperation;
} | {
    subwayId: String<64>;
    subway?: Subway.UpdateOperation;
} | {
    subwayId: String<64>;
}));
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "stationId" | "subwayId">> & (({
    station: Station.CreateSingleOperation;
    stationId?: never;
} | {
    station: Station.UpdateOperation;
    stationId?: never;
} | {
    station: Station.RemoveOperation;
    stationId?: never;
} | {
    station?: never;
    stationId?: String<64> | null;
}) & ({
    subway: Subway.CreateSingleOperation;
    subwayId?: never;
} | {
    subway: Subway.UpdateOperation;
    subwayId?: never;
} | {
    subway: Subway.RemoveOperation;
    subwayId?: never;
} | {
    subway?: never;
    subwayId?: String<64> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    station?: Station.UpdateOperation | Station.RemoveOperation;
}) & ({
    subway?: Subway.UpdateOperation | Subway.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type StationIdSubQuery = Selection<StationIdProjection>;
export declare type SubwayIdSubQuery = Selection<SubwayIdProjection>;
export declare type SubwayStationIdSubQuery = Selection<SubwayStationIdProjection>;
export declare type EntityDef = {
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
