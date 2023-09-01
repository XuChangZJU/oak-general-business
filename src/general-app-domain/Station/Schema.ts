import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Area from "../Area/Schema";
import * as SubwayStation from "../SubwayStation/Schema";
export type OpSchema = EntityShape & {
    name: String<32>;
    areaId: ForeignKey<"area">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    name: String<32>;
    areaId: ForeignKey<"area">;
    area: Area.Schema;
    subwayStation$station?: Array<SubwayStation.Schema>;
    subwayStation$station$$aggr?: AggregationResult<SubwayStation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.StationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    areaId: Q_StringValue | SubQuery.AreaIdSubQuery;
    area: Area.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    name?: number;
    areaId?: number;
    area?: Area.Projection;
    subwayStation$station?: SubwayStation.Selection & {
        $entity: "subwayStation";
    };
    subwayStation$station$$aggr?: SubwayStation.Aggregation & {
        $entity: "subwayStation";
    };
} & Partial<ExprOp<OpAttr | string>>;
type StationIdProjection = OneOf<{
    id: number;
}>;
type AreaIdProjection = OneOf<{
    areaId: number;
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
    name: number;
} | {
    areaId: number;
} | {
    area: Area.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "areaId">> & ({
    areaId: String<64>;
}) & {
    subwayStation$station?: OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "station" | "stationId">, SubwayStation.Filter> | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">> | OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "station" | "stationId">, SubwayStation.Filter>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "areaId">> & ({
    area?: never;
    areaId?: String<64> | null;
}) & {
    [k: string]: any;
    subwayStation$station?: SubwayStation.UpdateOperation | SubwayStation.RemoveOperation | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">> | SubwayStation.UpdateOperation | SubwayStation.RemoveOperation>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type AreaIdSubQuery = Selection<AreaIdProjection>;
export type StationIdSubQuery = Selection<StationIdProjection>;
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