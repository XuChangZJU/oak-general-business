import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Image, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as User from "../User/Schema";
import * as Application from "../Application/Schema";
import * as ReadRemark from "../ReadRemark/Schema";
import * as SessionMessage from "../SessionMessage/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as Relation from "../Relation/Schema";
import * as UserRelation from "../UserRelation/Schema";
export type OpSchema = EntityShape & {
    entity: "application" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    lmts?: Datetime | null;
    openId?: String<32> | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: "application" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    lmts?: Datetime | null;
    openId?: String<32> | null;
    user?: User.Schema | null;
    application?: Application.Schema;
    readRemark$session?: Array<ReadRemark.Schema>;
    readRemark$session$$aggr?: AggregationResult<ReadRemark.Schema>;
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
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_EnumValue<"application" | string>;
    entityId: Q_StringValue;
    userId: Q_StringValue;
    user: User.Filter;
    lmts: Q_DateValue;
    openId: Q_StringValue;
    application: Application.Filter;
    readRemark$session: ReadRemark.Filter & SubQueryPredicateMetadata;
    sessionMessage$session: SessionMessage.Filter & SubQueryPredicateMetadata;
    userEntityGrant$entity: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    relation$entity: Relation.Filter & SubQueryPredicateMetadata;
    userRelation$entity: UserRelation.Filter & SubQueryPredicateMetadata;
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
    userId?: number;
    user?: User.Projection;
    lmts?: number;
    openId?: number;
    application?: Application.Projection;
    readRemark$session?: ReadRemark.Selection & {
        $entity: "readRemark";
    };
    readRemark$session$$aggr?: ReadRemark.Aggregation & {
        $entity: "readRemark";
    };
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
type SessionIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
}>;
type ApplicationIdProjection = OneOf<{
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
    userId: number;
} | {
    user: User.SortAttr;
} | {
    lmts: number;
} | {
    openId: number;
} | {
    application: Application.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId">> & (({
    userId?: never;
    user?: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    userId?: ForeignKey<"user">;
})) & ({
    entity?: never;
    entityId?: never;
    application: Application.CreateSingleOperation;
} | {
    entity: "application";
    entityId: ForeignKey<"Application">;
    application: Application.UpdateOperation;
} | {
    entity: "application";
    entityId: ForeignKey<"Application">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    readRemark$session?: OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<ReadRemark.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<ReadRemark.CreateOperationData, "session" | "sessionId">> | OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">>>;
    sessionMessage$session?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "userId">> & (({
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
})) & ({
    application?: Application.CreateSingleOperation | Application.UpdateOperation | Application.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("application" | string) | null;
    entityId?: ForeignKey<"Application"> | null;
}) & {
    [k: string]: any;
    readRemark$session?: OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">> | OakOperation<ReadRemark.RemoveOperation["action"], Omit<ReadRemark.RemoveOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<ReadRemark.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<ReadRemark.CreateOperationData, "session" | "sessionId">> | OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">> | OakOperation<ReadRemark.RemoveOperation["action"], Omit<ReadRemark.RemoveOperationData, "session" | "sessionId">, Omit<ReadRemark.Filter, "session" | "sessionId">>>;
    sessionMessage$session?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "session" | "sessionId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "session" | "sessionId">, Omit<SessionMessage.Filter, "session" | "sessionId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
})) & ({
    application?: Application.UpdateOperation | Application.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type SessionIdSubQuery = Selection<SessionIdProjection>;
export type EntityDef = {
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