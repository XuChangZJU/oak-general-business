import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as Message from "../Message/Schema";
export declare type OpSchema = EntityShape & {
    channel: 'wechat' | 'jPush' | 'jim' | 'mp' | 'sms';
    data: Object;
    messageId: ForeignKey<"message">;
    data1: Object;
    data2: Object;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    channel: 'wechat' | 'jPush' | 'jim' | 'mp' | 'sms';
    data: Object;
    messageId: ForeignKey<"message">;
    data1: Object;
    data2: Object;
    iState?: IState | null;
    message: Message.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.MessageSentIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    channel: Q_EnumValue<'wechat' | 'jPush' | 'jim' | 'mp' | 'sms'>;
    data: Object;
    messageId: Q_StringValue | SubQuery.MessageIdSubQuery;
    message: Message.Filter;
    data1: Object;
    data2: Object;
    iState: Q_EnumValue<IState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    channel?: number;
    data?: number;
    messageId?: number;
    message?: Message.Projection;
    data1?: number;
    data2?: number;
    iState?: number;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    channel?: string;
    data?: string;
    messageId?: string;
    message?: Message.ExportProjection;
    data1?: string;
    data2?: string;
    iState?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type MessageSentIdProjection = OneOf<{
    id: number;
}>;
declare type MessageIdProjection = OneOf<{
    messageId: number;
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
    channel: number;
} | {
    messageId: number;
} | {
    message: Message.SortAttr;
} | {
    iState: number;
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
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "messageId">> & (({
    messageId?: never;
    message: Message.CreateSingleOperation;
} | {
    messageId: String<64>;
    message?: Message.UpdateOperation;
} | {
    messageId: String<64>;
}));
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "messageId">> & (({
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
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    message?: Message.UpdateOperation | Message.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type MessageIdSubQuery = Selection<MessageIdProjection>;
export declare type MessageSentIdSubQuery = Selection<MessageSentIdProjection>;
export declare type NativeAttr = OpAttr | `message.${Message.NativeAttr}`;
export declare type FullAttr = NativeAttr;
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
