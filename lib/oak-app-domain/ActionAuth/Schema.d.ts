import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Relation from "../Relation/Schema";
import * as Path from "../Path/Schema";
type Actions = string[];
export type OpSchema = EntityShape & {
    relationId?: ForeignKey<"relation"> | null;
    pathId: ForeignKey<"path">;
    deActions: Actions;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    relationId?: ForeignKey<"relation"> | null;
    pathId: ForeignKey<"path">;
    deActions: Actions;
    relation?: Relation.Schema | null;
    path: Path.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    relationId: Q_StringValue;
    relation: Relation.Filter;
    pathId: Q_StringValue;
    path: Path.Filter;
    deActions: JsonFilter<Actions>;
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
    pathId?: number;
    path?: Path.Projection;
    deActions?: number | JsonProjection<Actions>;
} & Partial<ExprOp<OpAttr | string>>;
type ActionAuthIdProjection = OneOf<{
    id: number;
}>;
type RelationIdProjection = OneOf<{
    relationId: number;
}>;
type PathIdProjection = OneOf<{
    pathId: number;
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
    pathId: number;
} | {
    path: Path.SortAttr;
} | {
    deActions: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "relationId" | "pathId">> & (({
    relationId?: never;
    relation?: Relation.CreateSingleOperation;
} | {
    relationId: ForeignKey<"relation">;
    relation?: Relation.UpdateOperation;
} | {
    relationId?: ForeignKey<"relation">;
}) & ({
    pathId?: never;
    path: Path.CreateSingleOperation;
} | {
    pathId: ForeignKey<"path">;
    path?: Path.UpdateOperation;
} | {
    pathId: ForeignKey<"path">;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "relationId" | "pathId">> & (({
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
    relationId?: ForeignKey<"relation"> | null;
}) & ({
    path: Path.CreateSingleOperation;
    pathId?: never;
} | {
    path: Path.UpdateOperation;
    pathId?: never;
} | {
    path: Path.RemoveOperation;
    pathId?: never;
} | {
    path?: never;
    pathId?: ForeignKey<"path"> | null;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
}) & ({
    path?: Path.UpdateOperation | Path.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
export type PathIdSubQuery = Selection<PathIdProjection>;
export type ActionAuthIdSubQuery = Selection<ActionAuthIdProjection>;
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
