import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Boolean } from "oak-domain/lib/types/DataType";
import * as ActionAuth from "../ActionAuth/Schema";
import * as RelationAuth from "../RelationAuth/Schema";
export type OpSchema = EntityShape & {
    destEntity: String<32>;
    value: String<256>;
    recursive: Boolean;
    sourceEntity: String<32>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    destEntity: String<32>;
    value: String<256>;
    recursive: Boolean;
    sourceEntity: String<32>;
    actionAuth$path?: Array<ActionAuth.Schema>;
    actionAuth$path$$aggr?: AggregationResult<ActionAuth.Schema>;
    relationAuth$path?: Array<RelationAuth.Schema>;
    relationAuth$path$$aggr?: AggregationResult<RelationAuth.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    destEntity: Q_StringValue;
    value: Q_StringValue;
    recursive: Q_BooleanValue;
    sourceEntity: Q_StringValue;
    actionAuth$path: ActionAuth.Filter & SubQueryPredicateMetadata;
    relationAuth$path: RelationAuth.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    destEntity?: number;
    value?: number;
    recursive?: number;
    sourceEntity?: number;
    actionAuth$path?: ActionAuth.Selection & {
        $entity: "actionAuth";
    };
    actionAuth$path$$aggr?: ActionAuth.Aggregation & {
        $entity: "actionAuth";
    };
    relationAuth$path?: RelationAuth.Selection & {
        $entity: "relationAuth";
    };
    relationAuth$path$$aggr?: RelationAuth.Aggregation & {
        $entity: "relationAuth";
    };
} & Partial<ExprOp<OpAttr | string>>;
type PathIdProjection = OneOf<{
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
    destEntity: number;
} | {
    value: number;
} | {
    recursive: number;
} | {
    sourceEntity: number;
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
export type CreateOperationData = FormCreateData<OpSchema> & {
    actionAuth$path?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "path" | "pathId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "path" | "pathId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">>>;
    relationAuth$path?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "path" | "pathId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "path" | "pathId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    actionAuth$path?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "path" | "pathId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "path" | "pathId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "path" | "pathId">, Omit<ActionAuth.Filter, "path" | "pathId">>>;
    relationAuth$path?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "path" | "pathId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "path" | "pathId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "path" | "pathId">, Omit<RelationAuth.Filter, "path" | "pathId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type PathIdSubQuery = Selection<PathIdProjection>;
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
