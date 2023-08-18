import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as ActionAuth from "../ActionAuth/Schema";
import * as RelationAuth from "../RelationAuth/Schema";
import * as UserRelation from "../UserRelation/Schema";
export type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    name: String<32>;
    display: String<32>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    name: String<32>;
    display: String<32>;
    actionAuth$relation?: Array<ActionAuth.Schema>;
    actionAuth$relation$$aggr?: AggregationResult<ActionAuth.Schema>;
    relationAuth$relation?: Array<RelationAuth.Schema>;
    relationAuth$relation$$aggr?: AggregationResult<RelationAuth.Schema>;
    userRelation$relation?: Array<UserRelation.Schema>;
    userRelation$relation$$aggr?: AggregationResult<UserRelation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.RelationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    name: Q_StringValue;
    display: Q_StringValue;
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
    name?: number;
    display?: number;
    actionAuth$relation?: ActionAuth.Selection & {
        $entity: "actionAuth";
    };
    actionAuth$relation$$aggr?: ActionAuth.Aggregation & {
        $entity: "actionAuth";
    };
    relationAuth$relation?: RelationAuth.Selection & {
        $entity: "relationAuth";
    };
    relationAuth$relation$$aggr?: RelationAuth.Aggregation & {
        $entity: "relationAuth";
    };
    userRelation$relation?: UserRelation.Selection & {
        $entity: "userRelation";
    };
    userRelation$relation$$aggr?: UserRelation.Aggregation & {
        $entity: "userRelation";
    };
} & Partial<ExprOp<OpAttr | string>>;
type RelationIdProjection = OneOf<{
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
    name: number;
} | {
    display: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    actionAuth$relation?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, ActionAuth.Filter> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, ActionAuth.Filter>>;
    relationAuth$relation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "relation" | "relationId">, RelationAuth.Filter> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "relation" | "relationId">, RelationAuth.Filter>>;
    userRelation$relation?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, UserRelation.Filter> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, UserRelation.Filter>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    actionAuth$relation?: ActionAuth.UpdateOperation | ActionAuth.RemoveOperation | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | ActionAuth.UpdateOperation | ActionAuth.RemoveOperation>;
    relationAuth$relation?: RelationAuth.UpdateOperation | RelationAuth.RemoveOperation | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "relation" | "relationId">> | RelationAuth.UpdateOperation | RelationAuth.RemoveOperation>;
    userRelation$relation?: UserRelation.UpdateOperation | UserRelation.RemoveOperation | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | UserRelation.UpdateOperation | UserRelation.RemoveOperation>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
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