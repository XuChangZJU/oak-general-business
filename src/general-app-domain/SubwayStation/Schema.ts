import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Station from "../Station/Schema";
import * as Subway from "../Subway/Schema";
export type OpSchema = EntityShape & {
    stationId: ForeignKey<"station">;
    subwayId: ForeignKey<"subway">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    stationId: ForeignKey<"station">;
    subwayId: ForeignKey<"subway">;
    station: Station.Schema;
    subway: Subway.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    stationId: Q_StringValue;
    station: Station.Filter;
    subwayId: Q_StringValue;
    subway: Subway.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
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
type SubwayStationIdProjection = OneOf<{
    id: number;
}>;
type StationIdProjection = OneOf<{
    stationId: number;
}>;
type SubwayIdProjection = OneOf<{
    subwayId: number;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "stationId" | "subwayId">> & (({
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
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "stationId" | "subwayId">> & (({
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
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    station?: Station.UpdateOperation | Station.RemoveOperation;
}) & ({
    subway?: Subway.UpdateOperation | Subway.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type StationIdSubQuery = Selection<StationIdProjection>;
export type SubwayIdSubQuery = Selection<SubwayIdProjection>;
export type SubwayStationIdSubQuery = Selection<SubwayStationIdProjection>;
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