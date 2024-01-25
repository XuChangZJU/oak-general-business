import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Boolean, Datetime, Int } from "oak-domain/lib/types/DataType";
import * as User from "../User/Schema";
import * as Token from "../Token/Schema";
type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export type OpSchema = EntityShape & {
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
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
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
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
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
type ParasiteIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
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
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    user?: never;
    userId: ForeignKey<"user">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId">> & (({
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
})) & {
    [k: string]: any;
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type ParasiteIdSubQuery = Selection<ParasiteIdProjection>;
export type EntityDef = {
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