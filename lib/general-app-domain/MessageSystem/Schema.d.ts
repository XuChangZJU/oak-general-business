import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Message from "../Message/Schema";
import * as System from "../System/Schema";
import * as MessageSent from "../MessageSent/Schema";
export declare type OpSchema = EntityShape & {
    messageId: ForeignKey<"message">;
    systemId: ForeignKey<"system">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    messageId: ForeignKey<"message">;
    systemId: ForeignKey<"system">;
    message: Message.Schema;
    system: System.Schema;
    messageSent$messageSystem?: Array<MessageSent.Schema>;
    messageSent$messageSystem$$aggr?: AggregationResult<MessageSent.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.MessageSystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    messageId: Q_StringValue | SubQuery.MessageIdSubQuery;
    message: Message.Filter;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    messageId?: number;
    message?: Message.Projection;
    systemId?: number;
    system?: System.Projection;
    messageSent$messageSystem?: MessageSent.Selection & {
        $entity: "messageSent";
    };
    messageSent$messageSystem$$aggr?: MessageSent.Aggregation & {
        $entity: "messageSent";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type MessageSystemIdProjection = OneOf<{
    id: number;
}>;
declare type MessageIdProjection = OneOf<{
    messageId: number;
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
    messageId: number;
} | {
    message: Message.SortAttr;
} | {
    systemId: number;
} | {
    system: System.SortAttr;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "messageId" | "systemId">> & (({
    messageId?: never;
    message: Message.CreateSingleOperation;
} | {
    messageId: String<64>;
    message?: Message.UpdateOperation;
} | {
    messageId: String<64>;
}) & ({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: String<64>;
    system?: System.UpdateOperation;
} | {
    systemId: String<64>;
})) & {
    messageSent$messageSystem?: OakOperation<MessageSent.UpdateOperation["action"], Omit<MessageSent.UpdateOperationData, "messageSystem" | "messageSystemId">, MessageSent.Filter> | OakOperation<"create", Omit<MessageSent.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<MessageSent.CreateOperationData, "messageSystem" | "messageSystemId">> | OakOperation<MessageSent.UpdateOperation["action"], Omit<MessageSent.UpdateOperationData, "messageSystem" | "messageSystemId">, MessageSent.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "messageId" | "systemId">> & (({
    message: Message.CreateSingleOperation;
    messageId?: never;
} | {
    message: Message.UpdateOperation;
    messageId?: never;
} | {
    message: Message.RemoveOperation;
    messageId?: never;
} | {
    message?: never;
    messageId?: String<64> | null;
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
    messageSent$messageSystem?: MessageSent.UpdateOperation | MessageSent.RemoveOperation | OakOperation<"create", Omit<MessageSent.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<MessageSent.CreateOperationData, "messageSystem" | "messageSystemId">> | MessageSent.UpdateOperation | MessageSent.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    message?: Message.UpdateOperation | Message.RemoveOperation;
}) & ({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type MessageIdSubQuery = Selection<MessageIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type MessageSystemIdSubQuery = Selection<MessageSystemIdProjection>;
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
