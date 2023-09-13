import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, RelationAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as SessionMessage from "../SessionMessage/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as Relation from "../Relation/Schema";
import * as UserRelation from "../UserRelation/Schema";
export declare type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    sessionMessage$session?: Array<SessionMessage.Schema>;
    sessionMessage$session$$aggr?: AggregationResult<SessionMessage.Schema>;
    userEntityGrant$entity?: Array<UserEntityGrant.Schema>;
    userEntityGrant$entity$$aggr?: AggregationResult<UserEntityGrant.Schema>;
    relation$entity?: Array<Relation.Schema>;
    relation$entity$$aggr?: AggregationResult<Relation.Schema>;
    userRelation$entity?: Array<UserRelation.Schema>;
    userRelation$entity$$aggr?: AggregationResult<UserRelation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    sessionMessage$session: SessionMessage.Filter & SubQueryPredicateMetadata;
    userEntityGrant$entity: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    relation$entity: Relation.Filter & SubQueryPredicateMetadata;
    userRelation$entity: UserRelation.Filter & SubQueryPredicateMetadata;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    entity?: number;
    entityId?: number;
    sessionMessage$session?: SessionMessage.Selection & {
        $entity: "sessionMessage";
    };
    sessionMessage$session$$aggr?: SessionMessage.Aggregation & {
        $entity: "sessionMessage";
    };
    userEntityGrant$entity?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$entity$$aggr?: UserEntityGrant.Aggregation & {
        $entity: "userEntityGrant";
    };
    relation$entity?: Relation.Selection & {
        $entity: "relation";
    };
    relation$entity$$aggr?: Relation.Aggregation & {
        $entity: "relation";
    };
    userRelation$entity?: UserRelation.Selection & {
        $entity: "userRelation";
    };
    userRelation$entity$$aggr?: UserRelation.Aggregation & {
        $entity: "userRelation";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type SessionIdProjection = OneOf<{
    id: number;
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
    entity: number;
} | {
    entityId: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    sessionMessage$session?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    sessionMessage$session?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type SessionIdSubQuery = Selection<SessionIdProjection>;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction | RelationAction> | string;
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
