import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
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
    subwayStation$subway?: Array<SubwayStation.Schema>;
    subwayStation$subway$$aggr?: AggregationResult<SubwayStation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    areaId: Q_StringValue;
    area: Area.Filter;
    subwayStation$subway: SubwayStation.Filter & SubQueryPredicateMetadata;
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
    subwayStation$subway?: SubwayStation.Selection & {
        $entity: "subwayStation";
    };
    subwayStation$subway$$aggr?: SubwayStation.Aggregation & {
        $entity: "subwayStation";
    };
} & Partial<ExprOp<OpAttr | string>>;
type SubwayIdProjection = OneOf<{
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
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "areaId">> & ({
    areaId: ForeignKey<"area">;
}) & {
    subwayStation$subway?: OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">> | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "subway" | "subwayId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "subway" | "subwayId">> | OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "areaId">> & ({
    area?: never;
    areaId?: ForeignKey<"area"> | null;
}) & {
    [k: string]: any;
    subwayStation$subway?: OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">> | OakOperation<SubwayStation.RemoveOperation["action"], Omit<SubwayStation.RemoveOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">> | OakOperation<"create", Omit<SubwayStation.CreateOperationData, "subway" | "subwayId">[]> | Array<OakOperation<"create", Omit<SubwayStation.CreateOperationData, "subway" | "subwayId">> | OakOperation<SubwayStation.UpdateOperation["action"], Omit<SubwayStation.UpdateOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">> | OakOperation<SubwayStation.RemoveOperation["action"], Omit<SubwayStation.RemoveOperationData, "subway" | "subwayId">, Omit<SubwayStation.Filter, "subway" | "subwayId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type AreaIdSubQuery = Selection<AreaIdProjection>;
export type SubwayIdSubQuery = Selection<SubwayIdProjection>;
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
