import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Relation from "../Relation/Schema";
export type OpSchema = EntityShape & {
    sourceRelationId: ForeignKey<"relation">;
    path: String<256>;
    destRelationId: ForeignKey<"relation">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    sourceRelationId: ForeignKey<"relation">;
    path: String<256>;
    destRelationId: ForeignKey<"relation">;
    sourceRelation: Relation.Schema;
    destRelation: Relation.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    sourceRelationId: Q_StringValue;
    sourceRelation: Relation.Filter;
    path: Q_StringValue;
    destRelationId: Q_StringValue;
    destRelation: Relation.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    sourceRelationId?: number;
    sourceRelation?: Relation.Projection;
    path?: number;
    destRelationId?: number;
    destRelation?: Relation.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type RelationAuthIdProjection = OneOf<{
    id: number;
}>;
type RelationIdProjection = OneOf<{
    sourceRelationId: number;
    destRelationId: number;
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
    sourceRelationId: number;
} | {
    sourceRelation: Relation.SortAttr;
} | {
    path: number;
} | {
    destRelationId: number;
} | {
    destRelation: Relation.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "sourceRelationId" | "destRelationId">> & (({
    sourceRelationId?: never;
    sourceRelation: Relation.CreateSingleOperation;
} | {
    sourceRelationId: String<64>;
    sourceRelation?: Relation.UpdateOperation;
} | {
    sourceRelationId: String<64>;
}) & ({
    destRelationId?: never;
    destRelation: Relation.CreateSingleOperation;
} | {
    destRelationId: String<64>;
    destRelation?: Relation.UpdateOperation;
} | {
    destRelationId: String<64>;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "sourceRelationId" | "destRelationId">> & (({
    sourceRelation: Relation.CreateSingleOperation;
    sourceRelationId?: never;
} | {
    sourceRelation: Relation.UpdateOperation;
    sourceRelationId?: never;
} | {
    sourceRelation: Relation.RemoveOperation;
    sourceRelationId?: never;
} | {
    sourceRelation?: never;
    sourceRelationId?: String<64> | null;
}) & ({
    destRelation: Relation.CreateSingleOperation;
    destRelationId?: never;
} | {
    destRelation: Relation.UpdateOperation;
    destRelationId?: never;
} | {
    destRelation: Relation.RemoveOperation;
    destRelationId?: never;
} | {
    destRelation?: never;
    destRelationId?: String<64> | null;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    sourceRelation?: Relation.UpdateOperation | Relation.RemoveOperation;
}) & ({
    destRelation?: Relation.UpdateOperation | Relation.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
export type RelationAuthIdSubQuery = Selection<RelationAuthIdProjection>;
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