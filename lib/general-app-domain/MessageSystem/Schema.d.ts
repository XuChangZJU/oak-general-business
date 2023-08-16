import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Message from "../Message/Schema";
import * as System from "../System/Schema";
import * as Notification from "../Notification/Schema";
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
    notification$messageSystem?: Array<Notification.Schema>;
    notification$messageSystem$$aggr?: AggregationResult<Notification.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    messageId: Q_StringValue;
    message: Message.Filter;
    systemId: Q_StringValue;
    system: System.Filter;
    notification$messageSystem: Notification.Filter & SubQueryPredicateMetadata;
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
    notification$messageSystem?: Notification.Selection & {
        $entity: "notification";
    };
    notification$messageSystem$$aggr?: Notification.Aggregation & {
        $entity: "notification";
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
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
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
    notification$messageSystem?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">>>;
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
    notification$messageSystem?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">>>;
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
