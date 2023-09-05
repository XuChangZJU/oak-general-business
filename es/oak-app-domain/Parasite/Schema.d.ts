import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { String, Int, Datetime, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as User from "../User/Schema";
import * as Token from "../Token/Schema";
declare type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export declare type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    entity: String<32>;
    entityId: String<64>;
    showTip?: Boolean | null;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    multiple?: Boolean | null;
    tokenLifeLength?: Int<4> | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    userId: ForeignKey<"user">;
    entity: String<32>;
    entityId: String<64>;
    showTip?: Boolean | null;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    multiple?: Boolean | null;
    tokenLifeLength?: Int<4> | null;
    user: User.Schema;
    token$entity?: Array<Token.Schema>;
    token$entity$$aggr?: AggregationResult<Token.Schema>;
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
    entity: Q_StringValue;
    entityId: Q_StringValue;
    showTip: Q_BooleanValue;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    redirectTo: JsonFilter<RedirectTo>;
    multiple: Q_BooleanValue;
    tokenLifeLength: Q_NumberValue;
    token$entity: Token.Filter & SubQueryPredicateMetadata;
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
    entity?: number;
    entityId?: number;
    showTip?: number;
    expiresAt?: number;
    expired?: number;
    redirectTo?: number | JsonProjection<RedirectTo>;
    multiple?: number;
    tokenLifeLength?: number;
    token$entity?: Token.Selection & {
        $entity: "token";
    };
    token$entity$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ParasiteIdProjection = OneOf<{
    id: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
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
    entity: number;
} | {
    entityId: number;
} | {
    showTip: number;
} | {
    expiresAt: number;
} | {
    expired: number;
} | {
    redirectTo: number;
} | {
    multiple: number;
} | {
    tokenLifeLength: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    userId: ForeignKey<"user">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId">> & (({
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
})) & {
    [k: string]: any;
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type ParasiteIdSubQuery = Selection<ParasiteIdProjection>;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
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
