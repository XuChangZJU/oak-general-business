import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Message from "../Message/Schema";
import * as System from "../System/Schema";
import * as Notification from "../Notification/Schema";
export type OpSchema = EntityShape & {
    messageId: ForeignKey<"message">;
    systemId: ForeignKey<"system">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    messageId: ForeignKey<"message">;
    systemId: ForeignKey<"system">;
    message: Message.Schema;
    system: System.Schema;
    notification$messageSystem?: Array<Notification.Schema>;
    notification$messageSystem$$aggr?: AggregationResult<Notification.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    messageId: Q_StringValue;
    message: Message.Filter;
    systemId: Q_StringValue;
    system: System.Filter;
    notification$messageSystem: Notification.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
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
type MessageSystemIdProjection = OneOf<{
    id: number;
}>;
type MessageIdProjection = OneOf<{
    messageId: number;
}>;
type SystemIdProjection = OneOf<{
    systemId: number;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "messageId" | "systemId">> & (({
    messageId?: never;
    message: Message.CreateSingleOperation;
} | {
    messageId: ForeignKey<"message">;
    message?: Message.UpdateOperation;
} | {
    message?: never;
    messageId: ForeignKey<"message">;
}) & ({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: ForeignKey<"system">;
    system?: System.UpdateOperation;
} | {
    system?: never;
    systemId: ForeignKey<"system">;
})) & {
    notification$messageSystem?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "messageId" | "systemId">> & (({
    message?: Message.CreateSingleOperation;
    messageId?: never;
} | {
    message?: Message.UpdateOperation;
    messageId?: never;
} | {
    message?: Message.RemoveOperation;
    messageId?: never;
} | {
    message?: never;
    messageId?: ForeignKey<"message">;
}) & ({
    system?: System.CreateSingleOperation;
    systemId?: never;
} | {
    system?: System.UpdateOperation;
    systemId?: never;
} | {
    system?: System.RemoveOperation;
    systemId?: never;
} | {
    system?: never;
    systemId?: ForeignKey<"system">;
})) & {
    [k: string]: any;
    notification$messageSystem?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "messageSystem" | "messageSystemId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "messageSystem" | "messageSystemId">, Omit<Notification.Filter, "messageSystem" | "messageSystemId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    message?: Message.UpdateOperation | Message.RemoveOperation;
}) & ({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type MessageIdSubQuery = Selection<MessageIdProjection>;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
export type MessageSystemIdSubQuery = Selection<MessageSystemIdProjection>;
export type EntityDef = {
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