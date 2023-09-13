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
export declare type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    relationId: ForeignKey<"relation">;
    entity: "session" | string;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
declare type AttrFilter = {
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
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type UserRelationIdProjection = OneOf<{
    id: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
}>;
declare type RelationIdProjection = OneOf<{
    relationId: number;
}>;
declare type SessionIdProjection = OneOf<{
    entityId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "relationId">> & (({
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
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "relationId">> & (({
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
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
})) & ({
    session?: Session.UpdateOperation | Session.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type RelationIdSubQuery = Selection<RelationIdProjection>;
export declare type SessionIdSubQuery = Selection<SessionIdProjection>;
export declare type UserRelationIdSubQuery = Selection<UserRelationIdProjection>;
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
