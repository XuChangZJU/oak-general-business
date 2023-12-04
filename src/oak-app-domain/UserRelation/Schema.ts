import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { LocaleDef } from "oak-domain/lib/types/Locale";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Index } from "oak-domain/lib/types/Storage";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as User from "../User/Schema";
import * as Relation from "../Relation/Schema";
import * as Account from "../Account/Schema";
import * as Session from "../Session/Schema";
import * as ToDo from "../ToDo/Schema";
import * as UserEntityClaim from "../UserEntityClaim/Schema";
export type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    relationId: ForeignKey<"relation">;
    entity: "account" | "session" | "toDo" | string;
    entityId: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    userId: ForeignKey<"user">;
    relationId: ForeignKey<"relation">;
    entity: "account" | "session" | "toDo" | string;
    entityId: String<64>;
    user: User.Schema;
    relation: Relation.Schema;
    account?: Account.Schema;
    session?: Session.Schema;
    toDo?: ToDo.Schema;
    userEntityClaim$userRelation?: Array<UserEntityClaim.Schema>;
    userEntityClaim$userRelation$$aggr?: AggregationResult<UserEntityClaim.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue;
    user: User.Filter;
    relationId: Q_StringValue;
    relation: Relation.Filter;
    entity: Q_EnumValue<"account" | "session" | "toDo" | string>;
    entityId: Q_StringValue;
    account: Account.Filter;
    session: Session.Filter;
    toDo: ToDo.Filter;
    userEntityClaim$userRelation: UserEntityClaim.Filter & SubQueryPredicateMetadata;
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
    account?: Account.Projection;
    session?: Session.Projection;
    toDo?: ToDo.Projection;
    userEntityClaim$userRelation?: UserEntityClaim.Selection & {
        $entity: "userEntityClaim";
    };
    userEntityClaim$userRelation$$aggr?: UserEntityClaim.Aggregation & {
        $entity: "userEntityClaim";
    };
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
type AccountIdProjection = OneOf<{
    entityId: number;
}>;
type SessionIdProjection = OneOf<{
    entityId: number;
}>;
type ToDoIdProjection = OneOf<{
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
    account: Account.SortAttr;
} | {
    session: Session.SortAttr;
} | {
    toDo: ToDo.SortAttr;
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
    user?: never;
    userId: ForeignKey<"user">;
}) & ({
    relationId?: never;
    relation: Relation.CreateSingleOperation;
} | {
    relationId: ForeignKey<"relation">;
    relation?: Relation.UpdateOperation;
} | {
    relation?: never;
    relationId: ForeignKey<"relation">;
})) & ({
    entity?: never;
    entityId?: never;
    account: Account.CreateSingleOperation;
} | {
    entity: "account";
    entityId: ForeignKey<"Account">;
    account?: Account.UpdateOperation;
} | {
    entity: "account";
    entityId: ForeignKey<"Account">;
    account?: never;
} | {
    entity?: never;
    entityId?: never;
    session: Session.CreateSingleOperation;
} | {
    entity: "session";
    entityId: ForeignKey<"Session">;
    session?: Session.UpdateOperation;
} | {
    entity: "session";
    entityId: ForeignKey<"Session">;
    session?: never;
} | {
    entity?: never;
    entityId?: never;
    toDo: ToDo.CreateSingleOperation;
} | {
    entity: "toDo";
    entityId: ForeignKey<"ToDo">;
    toDo?: ToDo.UpdateOperation;
} | {
    entity: "toDo";
    entityId: ForeignKey<"ToDo">;
    toDo?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    userEntityClaim$userRelation?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "userRelation" | "userRelationId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "userRelation" | "userRelationId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "relationId">> & (({
    user?: User.CreateSingleOperation;
    userId?: never;
} | {
    user?: User.UpdateOperation;
    userId?: never;
} | {
    user?: User.RemoveOperation;
    userId?: never;
} | {
    user?: never;
    userId?: ForeignKey<"user">;
}) & ({
    relation?: Relation.CreateSingleOperation;
    relationId?: never;
} | {
    relation?: Relation.UpdateOperation;
    relationId?: never;
} | {
    relation?: Relation.RemoveOperation;
    relationId?: never;
} | {
    relation?: never;
    relationId?: ForeignKey<"relation">;
})) & ({
    account?: Account.CreateSingleOperation | Account.UpdateOperation | Account.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    session?: Session.CreateSingleOperation | Session.UpdateOperation | Session.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    toDo?: ToDo.CreateSingleOperation | ToDo.UpdateOperation | ToDo.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("account" | "session" | "toDo" | string) | null;
    entityId?: ForeignKey<"Account" | "Session" | "ToDo"> | null;
    account?: never;
    session?: never;
    toDo?: never;
}) & {
    [k: string]: any;
    userEntityClaim$userRelation?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "userRelation" | "userRelationId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "userRelation" | "userRelationId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "userRelation" | "userRelationId">, Omit<UserEntityClaim.Filter, "userRelation" | "userRelationId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
})) & ({
    account?: Account.UpdateOperation | Account.RemoveOperation;
} | {
    session?: Session.UpdateOperation | Session.RemoveOperation;
} | {
    toDo?: ToDo.UpdateOperation | ToDo.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
export type AccountIdSubQuery = Selection<AccountIdProjection>;
export type SessionIdSubQuery = Selection<SessionIdProjection>;
export type ToDoIdSubQuery = Selection<ToDoIdProjection>;
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