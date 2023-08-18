import { String, Text, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState, VisitState } from "./Action";
import { Channel, Weight } from "../../types/Message";
import * as User from "../User/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
declare type Router = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
declare type MessageRestriction = {
    systemIds?: string[];
    channels?: Array<Channel>;
};
export declare type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    userId: ForeignKey<"user">;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction | null;
    title: String<256>;
    content: Text;
    data?: Object | null;
    router?: Router | null;
    iState?: IState | null;
    visitState?: VisitState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    userId: ForeignKey<"user">;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction | null;
    title: String<256>;
    content: Text;
    data?: Object | null;
    router?: Router | null;
    iState?: IState | null;
    visitState?: VisitState | null;
    user: User.Schema;
    messageSystem$message?: Array<MessageSystem.Schema>;
    messageSystem$message$$aggr?: AggregationResult<MessageSystem.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.MessageIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    type: Q_StringValue;
    weight: Q_EnumValue<Weight>;
    restriction: Q_EnumValue<MessageRestriction>;
    title: Q_StringValue;
    content: Q_StringValue;
    data: Object;
    router: Q_EnumValue<Router>;
    iState: Q_EnumValue<IState>;
    visitState: Q_EnumValue<VisitState>;
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
    userId?: number;
    user?: User.Projection;
    type?: number;
    weight?: number;
    restriction?: number;
    title?: number;
    content?: number;
    data?: number;
    router?: number;
    iState?: number;
    visitState?: number;
    messageSystem$message?: MessageSystem.Selection & {
        $entity: "messageSystem";
    };
    messageSystem$message$$aggr?: MessageSystem.Aggregation & {
        $entity: "messageSystem";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type MessageIdProjection = OneOf<{
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
    entity: number;
} | {
    entityId: number;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    type: number;
} | {
    weight: number;
} | {
    restriction: number;
} | {
    title: number;
} | {
    content: number;
} | {
    router: number;
} | {
    iState: number;
} | {
    visitState: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId: String<64>;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    messageSystem$message?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, MessageSystem.Filter> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, MessageSystem.Filter>>;
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
    messageSystem$message?: MessageSystem.UpdateOperation | MessageSystem.RemoveOperation | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">> | MessageSystem.UpdateOperation | MessageSystem.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type MessageIdSubQuery = Selection<MessageIdProjection>;
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
