import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Session from "../Session/Schema";
import * as ActionAuth from "../ActionAuth/Schema";
import * as RelationAuth from "../RelationAuth/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserRelation from "../UserRelation/Schema";
export declare type OpSchema = EntityShape & {
    entity: "session" | string;
    entityId?: String<64> | null;
    name?: String<32> | null;
    display?: String<32> | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    entity: "session" | string;
    entityId?: String<64> | null;
    name?: String<32> | null;
    display?: String<32> | null;
    session?: Session.Schema;
    actionAuth$relation?: Array<ActionAuth.Schema>;
    actionAuth$relation$$aggr?: AggregationResult<ActionAuth.Schema>;
    relationAuth$sourceRelation?: Array<RelationAuth.Schema>;
    relationAuth$sourceRelation$$aggr?: AggregationResult<RelationAuth.Schema>;
    relationAuth$destRelation?: Array<RelationAuth.Schema>;
    relationAuth$destRelation$$aggr?: AggregationResult<RelationAuth.Schema>;
    userEntityGrant$relation?: Array<UserEntityGrant.Schema>;
    userEntityGrant$relation$$aggr?: AggregationResult<UserEntityGrant.Schema>;
    userRelation$relation?: Array<UserRelation.Schema>;
    userRelation$relation$$aggr?: AggregationResult<UserRelation.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_EnumValue<"session" | string>;
    entityId: Q_StringValue;
    name: Q_StringValue;
    display: Q_StringValue;
    session: Session.Filter;
    actionAuth$relation: ActionAuth.Filter & SubQueryPredicateMetadata;
    relationAuth$sourceRelation: RelationAuth.Filter & SubQueryPredicateMetadata;
    relationAuth$destRelation: RelationAuth.Filter & SubQueryPredicateMetadata;
    userEntityGrant$relation: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    userRelation$relation: UserRelation.Filter & SubQueryPredicateMetadata;
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
    name?: number;
    display?: number;
    session?: Session.Projection;
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
    userEntityGrant$relation?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$relation$$aggr?: UserEntityGrant.Aggregation & {
        $entity: "userEntityGrant";
    };
    userRelation$relation?: UserRelation.Selection & {
        $entity: "userRelation";
    };
    userRelation$relation$$aggr?: UserRelation.Aggregation & {
        $entity: "userRelation";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type RelationIdProjection = OneOf<{
    id: number;
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
    entity: number;
} | {
    entityId: number;
} | {
    name: number;
} | {
    display: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    session: Session.CreateSingleOperation;
} | {
    entity: "session";
    entityId: ForeignKey<"Session">;
    session: Session.UpdateOperation;
} | {
    entity: "session";
    entityId?: ForeignKey<"Session">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    actionAuth$relation?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">>>;
    relationAuth$sourceRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">>>;
    relationAuth$destRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">>>;
    userEntityGrant$relation?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "relation" | "relationId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">>>;
    userRelation$relation?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
    session?: Session.CreateSingleOperation | Session.UpdateOperation | Session.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("session" | string) | null;
    entityId?: ForeignKey<"Session"> | null;
}) & {
    [k: string]: any;
    actionAuth$relation?: OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<ActionAuth.CreateOperationData, "relation" | "relationId">> | OakOperation<ActionAuth.UpdateOperation["action"], Omit<ActionAuth.UpdateOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">> | OakOperation<ActionAuth.RemoveOperation["action"], Omit<ActionAuth.RemoveOperationData, "relation" | "relationId">, Omit<ActionAuth.Filter, "relation" | "relationId">>>;
    relationAuth$sourceRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "sourceRelation" | "sourceRelationId">, Omit<RelationAuth.Filter, "sourceRelation" | "sourceRelationId">>>;
    relationAuth$destRelation?: OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">[]> | Array<OakOperation<"create", Omit<RelationAuth.CreateOperationData, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.UpdateOperation["action"], Omit<RelationAuth.UpdateOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">> | OakOperation<RelationAuth.RemoveOperation["action"], Omit<RelationAuth.RemoveOperationData, "destRelation" | "destRelationId">, Omit<RelationAuth.Filter, "destRelation" | "destRelationId">>>;
    userEntityGrant$relation?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "relation" | "relationId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "relation" | "relationId">, Omit<UserEntityGrant.Filter, "relation" | "relationId">>>;
    userRelation$relation?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "relation" | "relationId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "relation" | "relationId">, Omit<UserRelation.Filter, "relation" | "relationId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & ({
    session?: Session.UpdateOperation | Session.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type SessionIdSubQuery = Selection<SessionIdProjection>;
export declare type RelationIdSubQuery = Selection<RelationIdProjection>;
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
