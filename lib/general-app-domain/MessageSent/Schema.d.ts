import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as Message from "../Message/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    channel: 'public' | 'jPush' | 'jim' | 'mp' | 'gsm';
    data: Object;
    messageId: ForeignKey<"message">;
    data1: Object;
    data2: Object;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    channel: 'public' | 'jPush' | 'jim' | 'mp' | 'gsm';
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
    $$updateAt$$: Q_DateValue;
    channel: Q_EnumValue<'public' | 'jPush' | 'jim' | 'mp' | 'gsm'>;
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
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    channel?: 1;
    data?: 1;
    messageId?: 1;
    message?: Message.Projection;
    data1?: 1;
    data2?: 1;
    iState?: 1;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    channel?: string;
    data?: string;
    messageId?: string;
    message?: Message.ExportProjection;
    data1?: string;
    data2?: string;
    iState?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type MessageSentIdProjection = OneOf<{
    id: 1;
}>;
declare type MessageIdProjection = OneOf<{
    messageId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    channel: 1;
} | {
    messageId: 1;
} | {
    message: Message.SortAttr;
} | {
    iState: 1;
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
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
