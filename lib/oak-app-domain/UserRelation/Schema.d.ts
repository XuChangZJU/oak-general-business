import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as User from "../User/Schema";
import * as Relation from "../Relation/Schema";
import * as Session from "../Session/Schema";
export type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    relationId: ForeignKey<"relation">;
    entity: "session" | string;
    entityId: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    userId: ForeignKey<"user">;
    relationId: ForeignKey<"relation">;
    entity: "session" | string;
    entityId: String<64>;
    user: User.Schema;
    relation: Relation.Schema;
    session?: Session.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue;
    user: User.Filter;
    relationId: Q_StringValue;
    relation: Relation.Filter;
    entity: Q_EnumValue<"session" | string>;
    entityId: Q_StringValue;
    session: Session.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    userId?: number;
    user?: User.Projection;
    relationId?: number;
    relation?: Relation.Projection;
    entity?: number;
    entityId?: number;
    session?: Session.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type UserRelationIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
}>;
type RelationIdProjection = OneOf<{
    relationId: number;
}>;
type SessionIdProjection = OneOf<{
    entityId: number;
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
    userId: number;
} | {
    user: User.SortAttr;
} | {
    relationId: number;
} | {
    relation: Relation.SortAttr;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    session: Session.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "relationId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    userId: ForeignKey<"user">;
}) & ({
    relationId?: never;
    relation: Relation.CreateSingleOperation;
} | {
    relationId: ForeignKey<"relation">;
    relation?: Relation.UpdateOperation;
} | {
    relationId: ForeignKey<"relation">;
})) & ({
    entity?: never;
    entityId?: never;
    session: Session.CreateSingleOperation;
} | {
    entity: "session";
    entityId: ForeignKey<"Session">;
    session: Session.UpdateOperation;
} | {
    entity: "session";
    entityId: ForeignKey<"Session">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "relationId">> & (({
    user: User.CreateSingleOperation;
    userId?: never;
} | {
    user: User.UpdateOperation;
    userId?: never;
} | {
    user: User.RemoveOperation;
    userId?: never;
} | {
    user?: never;
    userId?: ForeignKey<"user"> | null;
}) & ({
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
})) & ({
    session?: Session.CreateSingleOperation | Session.UpdateOperation | Session.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("session" | string) | null;
    entityId?: ForeignKey<"Session"> | null;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
})) & ({
    session?: Session.UpdateOperation | Session.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
export type SessionIdSubQuery = Selection<SessionIdProjection>;
export type UserRelationIdSubQuery = Selection<UserRelationIdProjection>;
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
