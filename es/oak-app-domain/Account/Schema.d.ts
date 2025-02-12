import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { AbleState } from "oak-domain/lib/actions/action";
import { Price, String } from "oak-domain/lib/types/DataType";
import * as User from "../User/Schema";
import * as Relation from "../Relation/Schema";
import * as UserRelation from "../UserRelation/Schema";
export type OpSchema = EntityShape & {
    total: Price;
    avail: Price;
    entity?: ("user" | string) | null;
    entityId?: String<64> | null;
    ableState?: AbleState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    total: Price;
    avail: Price;
    entity?: ("user" | string) | null;
    entityId?: String<64> | null;
    ableState?: AbleState | null;
    user?: User.Schema;
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
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    total: Q_NumberValue;
    avail: Q_NumberValue;
    entity: Q_EnumValue<"user" | string>;
    entityId: Q_StringValue;
    ableState: Q_EnumValue<AbleState>;
    user: User.Filter;
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
    total?: number;
    avail?: number;
    entity?: number;
    entityId?: number;
    ableState?: number;
    user?: User.Projection;
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
type AccountIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
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
    total: number;
} | {
    avail: number;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    ableState: number;
} | {
    user: User.SortAttr;
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
    user?: User.CreateSingleOperation;
} | {
    entity?: "user";
    entityId?: ForeignKey<"User">;
    user?: User.UpdateOperation;
} | {
    entity?: "user";
    entityId?: ForeignKey<"User">;
    user?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: "user" | string;
    entityId?: ForeignKey<"User">;
    user?: never;
}) & {
    [k: string]: any;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type AccountIdSubQuery = Selection<AccountIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action | RelationAction> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
