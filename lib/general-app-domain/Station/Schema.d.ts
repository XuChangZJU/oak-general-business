import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Area from "../Area/Schema";
import * as SubwayStation from "../SubwayStation/Schema";
export declare type OpSchema = EntityShape & {
    name: String<32>;
    areaId: ForeignKey<"area">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    name: String<32>;
    areaId: ForeignKey<"area">;
    area: Area.Schema;
    subwayStation$station?: Array<SubwayStation.Schema>;
    subwayStation$station$$aggr?: AggregationResult<SubwayStation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.StationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    areaId: Q_StringValue | SubQuery.AreaIdSubQuery;
    area: Area.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type StationIdProjection = OneOf<{
    id: number;
}>;
declare type AreaIdProjection = OneOf<{
    areaId: number;
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
    name: number;
} | {
    areaId: number;
} | {
    area: Area.SortAttr;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "areaId">> & ({
    areaId: String<64>;
}) & {
    subwayStation$station?: OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "station" | "stationId">, SubwayStation.Filter> | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">> | OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "station" | "stationId">, SubwayStation.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "areaId">> & ({
    area?: never;
    areaId?: String<64> | null;
}) & {
    [k: string]: any;
    subwayStation$station?: SubwayStation.UpdateOperation | SubwayStation.RemoveOperation | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "station" | "stationId">> | SubwayStation.UpdateOperation | SubwayStation.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type AreaIdSubQuery = Selection<AreaIdProjection>;
export declare type StationIdSubQuery = Selection<StationIdProjection>;
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
