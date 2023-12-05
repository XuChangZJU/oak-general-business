import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Account from "../Account/Schema";
import * as Session from "../Session/Schema";
import * as ToDo from "../ToDo/Schema";
import * as ActionAuth from "../ActionAuth/Schema";
import * as RelationAuth from "../RelationAuth/Schema";
import * as UserEntityClaim from "../UserEntityClaim/Schema";
import * as UserRelation from "../UserRelation/Schema";
export type OpSchema = EntityShape & {
    entity: "account" | "session" | "toDo" | string;
    entityId?: String<64> | null;
    name?: String<32> | null;
    display?: String<32> | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: "account" | "session" | "toDo" | string;
    entityId?: String<64> | null;
    name?: String<32> | null;
    display?: String<32> | null;
    account?: Account.Schema;
    session?: Session.Schema;
    toDo?: ToDo.Schema;
    actionAuth$relation?: Array<ActionAuth.Schema>;
    actionAuth$relation$$aggr?: AggregationResult<ActionAuth.Schema>;
    relationAuth$sourceRelation?: Array<RelationAuth.Schema>;
    relationAuth$sourceRelation$$aggr?: AggregationResult<RelationAuth.Schema>;
    relationAuth$destRelation?: Array<RelationAuth.Schema>;
    relationAuth$destRelation$$aggr?: AggregationResult<RelationAuth.Schema>;
    userEntityClaim$relation?: Array<UserEntityClaim.Schema>;
    userEntityClaim$relation$$aggr?: AggregationResult<UserEntityClaim.Schema>;
    userRelation$relation?: Array<UserRelation.Schema>;
    userRelation$relation$$aggr?: AggregationResult<UserRelation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_EnumValue<"account" | "session" | "toDo" | string>;
    entityId: Q_StringValue;
    name: Q_StringValue;
    display: Q_StringValue;
    account: Account.Filter;
    session: Session.Filter;
    toDo: ToDo.Filter;
    actionAuth$relation: ActionAuth.Filter & SubQueryPredicateMetadata;
    relationAuth$sourceRelation: RelationAuth.Filter & SubQueryPredicateMetadata;
    relationAuth$destRelation: RelationAuth.Filter & SubQueryPredicateMetadata;
    userEntityClaim$relation: UserEntityClaim.Filter & SubQueryPredicateMetadata;
    userRelation$relation: UserRelation.Filter & SubQueryPredicateMetadata;
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
    account?: Account.Projection;
    session?: Session.Projection;
    toDo?: ToDo.Projection;
    actionAuth$relation?: ActionAuth.Selection & {
        $entity: "actionAuth";
    };
    actionAuth$relation$$aggr?: ActionAuth.Aggregation & {
        $entity: "actionAuth";
    };
    relationAuth$sourceRelation?: RelationAuth.Selection & {
        $entity: "relationAuth";
    };
    relationAuth$sourceRelation$$aggr?: RelationAuth.Aggregation & {
        $entity: "relationAuth";
    };
    relationAuth$destRelation?: RelationAuth.Selection & {
        $entity: "relationAuth";
    };
    relationAuth$destRelation$$aggr?: RelationAuth.Aggregation & {
        $entity: "relationAuth";
    };
    userEntityClaim$relation?: UserEntityClaim.Selection & {
        $entity: "userEntityClaim";
    };
    userEntityClaim$relation$$aggr?: UserEntityClaim.Aggregation & {
        $entity: "userEntityClaim";
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
    entity: number;
} | {
    entityId: number;
} | {
    name: number;
} | {
    display: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    account?: Account.CreateSingleOperation;
} | {
    entity: "account";
    entityId?: ForeignKey<"Account">;
    account?: Account.UpdateOperation;
} | {
    entity: "account";
    entityId?: ForeignKey<"Account">;
    account?: never;
} | {
    entity?: never;
    entityId?: never;
    session?: Session.CreateSingleOperation;
} | {
    entity: "session";
    entityId?: ForeignKey<"Session">;
    session?: Session.UpdateOperation;
} | {
    entity: "session";
    entityId?: ForeignKey<"Session">;
    session?: never;
} | {
    entity?: never;
    entityId?: never;
    toDo?: ToDo.CreateSingleOperation;
} | {
    entity: "toDo";
    entityId?: ForeignKey<"ToDo">;
    toDo?: ToDo.UpdateOperation;
} | {
    entity: "toDo";
    entityId?: ForeignKey<"ToDo">;
    toDo?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    actionAuth$relation?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">>>;
    relationAuth$sourceRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">>>;
    relationAuth$destRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">>>;
    userEntityClaim$relation?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "relation" | "relationId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">>>;
    userRelation$relation?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
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
    entityId?: ForeignKey<"Account" | "Session" | "ToDo">;
    account?: never;
    session?: never;
    toDo?: never;
}) & {
    [k: string]: any;
    actionAuth$relation?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">>>;
    relationAuth$sourceRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">>>;
    relationAuth$destRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">>>;
    userEntityClaim$relation?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "relation" | "relationId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "relation" | "relationId">, Omit<UserEntityClaim.Filter, "relation" | "relationId">>>;
    userRelation$relation?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & ({
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
export type AccountIdSubQuery = Selection<AccountIdProjection>;
export type SessionIdSubQuery = Selection<SessionIdProjection>;
export type ToDoIdSubQuery = Selection<ToDoIdProjection>;
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
export {};
