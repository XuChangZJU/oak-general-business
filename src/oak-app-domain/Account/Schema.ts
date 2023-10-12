import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Price, Boolean, Text } from "oak-domain/lib/types/DataType";
import { AbleAction, AbleState, makeAbleActionDef } from "oak-domain/lib/actions/action";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import { ActionDef } from "oak-domain/lib/types/Action";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as Relation from "../Relation/Schema";
import * as UserRelation from "../UserRelation/Schema";
export type OpSchema = EntityShape & {
    total: Price;
    avail: Price;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    ableState?: AbleState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    total: Price;
    avail: Price;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    ableState?: AbleState | null;
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
    total: Q_NumberValue;
    avail: Q_NumberValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    ableState: Q_EnumValue<AbleState>;
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
    total?: number;
    avail?: number;
    entity?: number;
    entityId?: number;
    ableState?: number;
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
type AccountIdProjection = OneOf<{
    id: number;
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
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "entity" | "entityId">, Omit<UserEntityGrant.Filter, "entity" | "entityId">>>;
    relation$entity?: OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Relation.CreateOperationData, "entity" | "entityId">> | OakOperation<Relation.UpdateOperation["action"], Omit<Relation.UpdateOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">> | OakOperation<Relation.RemoveOperation["action"], Omit<Relation.RemoveOperationData, "entity" | "entityId">, Omit<Relation.Filter, "entity" | "entityId">>>;
    userRelation$entity?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "entity" | "entityId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "entity" | "entityId">, Omit<UserRelation.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
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