import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Relation from "../Relation/Schema";
export declare type OpSchema = EntityShape & {
    sourceRelationId: ForeignKey<"relation">;
    path: String<256>;
    destRelationId: ForeignKey<"relation">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    sourceRelationId: ForeignKey<"relation">;
    path: String<256>;
    destRelationId: ForeignKey<"relation">;
    sourceRelation: Relation.Schema;
    destRelation: Relation.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
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
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type RelationAuthIdProjection = OneOf<{
    id: number;
}>;
declare type RelationIdProjection = OneOf<{
    sourceRelationId: number;
    destRelationId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "sourceRelationId" | "destRelationId">> & (({
    sourceRelationId?: never;
    sourceRelation: Relation.CreateSingleOperation;
} | {
    sourceRelationId: ForeignKey<"sourceRelation">;
    sourceRelation?: Relation.UpdateOperation;
} | {
    sourceRelationId: ForeignKey<"sourceRelation">;
}) & ({
    destRelationId?: never;
    destRelation: Relation.CreateSingleOperation;
} | {
    destRelationId: ForeignKey<"destRelation">;
    destRelation?: Relation.UpdateOperation;
} | {
    destRelationId: ForeignKey<"destRelation">;
}));
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "sourceRelationId" | "destRelationId">> & (({
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
    sourceRelationId?: ForeignKey<"sourceRelation"> | null;
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
    destRelationId?: ForeignKey<"destRelation"> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    sourceRelation?: Relation.UpdateOperation | Relation.RemoveOperation;
}) & ({
    destRelation?: Relation.UpdateOperation | Relation.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type RelationIdSubQuery = Selection<RelationIdProjection>;
export declare type RelationAuthIdSubQuery = Selection<RelationAuthIdProjection>;
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
