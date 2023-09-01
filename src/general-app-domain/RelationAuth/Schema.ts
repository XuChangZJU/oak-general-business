import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Relation from "../Relation/Schema";
type Relations = string[];
export type OpSchema = EntityShape & {
    relationId: ForeignKey<"relation">;
    path: String<256>;
    destEntity: String<32>;
    deRelations: Relations;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    relationId: ForeignKey<"relation">;
    path: String<256>;
    destEntity: String<32>;
    deRelations: Relations;
    relation: Relation.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.RelationAuthIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    relationId: Q_StringValue | SubQuery.RelationIdSubQuery;
    relation: Relation.Filter;
    path: Q_StringValue;
    destEntity: Q_StringValue;
    deRelations: Q_EnumValue<Relations>;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    relationId?: number;
    relation?: Relation.Projection;
    path?: number;
    destEntity?: number;
    deRelations?: number;
} & Partial<ExprOp<OpAttr | string>>;
type RelationAuthIdProjection = OneOf<{
    id: number;
}>;
type RelationIdProjection = OneOf<{
    relationId: number;
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
    relationId: number;
} | {
    relation: Relation.SortAttr;
} | {
    path: number;
} | {
    destEntity: number;
} | {
    deRelations: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "relationId">> & (({
    relationId?: never;
    relation: Relation.CreateSingleOperation;
} | {
    relationId: String<64>;
    relation?: Relation.UpdateOperation;
} | {
    relationId: String<64>;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "relationId">> & (({
    relation: Relation.CreateSingleOperation;
    relationId?: never;
} | {
    relation: Relation.UpdateOperation;
    relationId?: never;
} | {
    relation: Relation.RemoveOperation;
    relationId?: never;
} | {
    relation?: never;
    relationId?: String<64> | null;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
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