import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { AbleState } from 'oak-domain/lib/actions/action';
import { Action, ParticularAction } from "./Action";
import * as User from "../User/Schema";
import * as Token from "../Token/Schema";
export declare type OpSchema = EntityShape & {
    mobile: String<16>;
    userId: ForeignKey<"user">;
    ableState?: AbleState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    mobile: String<16>;
    userId: ForeignKey<"user">;
    ableState?: AbleState | null;
    user: User.Schema;
    token$entity?: Array<Token.Schema>;
    token$entity$$aggr?: AggregationResult<Token.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.MobileIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    mobile: Q_StringValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    ableState: Q_EnumValue<AbleState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    mobile?: number;
    userId?: number;
    user?: User.Projection;
    ableState?: number;
    token$entity?: Token.Selection & {
        $entity: "token";
    };
    token$entity$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type MobileIdProjection = OneOf<{
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
    mobile: number;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    ableState: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = Omit<DeduceAggregation<Schema, Projection, Filter, Sorter>, "id">;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId: String<64>;
})) & {
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Token.Filter> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Token.Filter>>;
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
    userId?: String<64> | null;
})) & {
    [k: string]: any;
    tokens$entity?: Token.UpdateOperation | Token.RemoveOperation | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | Token.UpdateOperation | Token.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type MobileIdSubQuery = Selection<MobileIdProjection>;
export declare type NativeAttr = OpAttr | `user.${User.NativeAttr}`;
export declare type FullAttr = NativeAttr | `tokens$${number}.${Token.NativeAttr}`;
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
