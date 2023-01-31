import { String, Text, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState, VisitState } from "./Action";
import * as User from "../User/Schema";
import * as System from "../System/Schema";
import * as MessageSent from "../MessageSent/Schema";
declare type MessageParams = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export declare type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    type: String<64>;
    weight: 'high' | 'medium' | 'low' | 'data';
    title: String<32>;
    content: Text;
    props: Object;
    data?: Object | null;
    params?: MessageParams | null;
    iState?: IState | null;
    visitState?: VisitState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    type: String<64>;
    weight: 'high' | 'medium' | 'low' | 'data';
    title: String<32>;
    content: Text;
    props: Object;
    data?: Object | null;
    params?: MessageParams | null;
    iState?: IState | null;
    visitState?: VisitState | null;
    user: User.Schema;
    system: System.Schema;
    messageSent$message?: Array<MessageSent.Schema>;
    messageSent$message$$aggr?: AggregationResult<MessageSent.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.MessageIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
    type: Q_StringValue;
    weight: Q_EnumValue<'high' | 'medium' | 'low' | 'data'>;
    title: Q_StringValue;
    content: Q_StringValue;
    props: Object;
    data: Object;
    params: Q_EnumValue<MessageParams>;
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
    userId?: number;
    user?: User.Projection;
    systemId?: number;
    system?: System.Projection;
    type?: number;
    weight?: number;
    title?: number;
    content?: number;
    props?: number;
    data?: number;
    params?: number;
    iState?: number;
    visitState?: number;
    messageSent$message?: MessageSent.Selection & {
        $entity: "messageSent";
    };
    messageSent$message$$aggr?: MessageSent.Aggregation & {
        $entity: "messageSent";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type MessageIdProjection = OneOf<{
    id: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
}>;
declare type SystemIdProjection = OneOf<{
    systemId: number;
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
    systemId: number;
} | {
    system: System.SortAttr;
} | {
    type: number;
} | {
    weight: number;
} | {
    title: number;
} | {
    content: number;
} | {
    params: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "systemId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId: String<64>;
}) & ({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: String<64>;
    system?: System.UpdateOperation;
} | {
    systemId: String<64>;
})) & {
    messageSent$message?: OakOperation<MessageSent.UpdateOperation["action"], Omit<MessageSent.UpdateOperationData, "message" | "messageId">, MessageSent.Filter> | OakOperation<"create", Omit<MessageSent.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSent.CreateOperationData, "message" | "messageId">> | OakOperation<MessageSent.UpdateOperation["action"], Omit<MessageSent.UpdateOperationData, "message" | "messageId">, MessageSent.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "systemId">> & (({
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
}) & ({
    system: System.CreateSingleOperation;
    systemId?: never;
} | {
    system: System.UpdateOperation;
    systemId?: never;
} | {
    system: System.RemoveOperation;
    systemId?: never;
} | {
    system?: never;
    systemId?: String<64> | null;
})) & {
    [k: string]: any;
    messageSent$message?: MessageSent.UpdateOperation | MessageSent.RemoveOperation | OakOperation<"create", Omit<MessageSent.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSent.CreateOperationData, "message" | "messageId">> | MessageSent.UpdateOperation | MessageSent.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
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
