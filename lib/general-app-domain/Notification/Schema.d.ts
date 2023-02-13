import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { Channel } from "../../types/Message";
import * as Application from "../Application/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
export declare type OpSchema = EntityShape & {
    channel: Channel;
    applicationId?: ForeignKey<"application"> | null;
    data: Object;
    messageSystemId: ForeignKey<"messageSystem">;
    data1: Object;
    data2: Object;
    templateId?: String<128> | null;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    channel: Channel;
    applicationId?: ForeignKey<"application"> | null;
    data: Object;
    messageSystemId: ForeignKey<"messageSystem">;
    data1: Object;
    data2: Object;
    templateId?: String<128> | null;
    iState?: IState | null;
    application?: Application.Schema | null;
    messageSystem: MessageSystem.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.NotificationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    channel: Q_EnumValue<Channel>;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
    data: Object;
    messageSystemId: Q_StringValue | SubQuery.MessageSystemIdSubQuery;
    messageSystem: MessageSystem.Filter;
    data1: Object;
    data2: Object;
    templateId: Q_StringValue;
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
    applicationId?: number;
    application?: Application.Projection;
    data?: number;
    messageSystemId?: number;
    messageSystem?: MessageSystem.Projection;
    data1?: number;
    data2?: number;
    templateId?: number;
    iState?: number;
} & Partial<ExprOp<OpAttr | string>>;
declare type NotificationIdProjection = OneOf<{
    id: number;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
declare type MessageSystemIdProjection = OneOf<{
    messageSystemId: number;
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
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    messageSystemId: number;
} | {
    messageSystem: MessageSystem.SortAttr;
} | {
    templateId: number;
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
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "messageSystemId">> & (({
    applicationId?: never;
    application?: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
} | {
    applicationId?: String<64>;
}) & ({
    messageSystemId?: never;
    messageSystem: MessageSystem.CreateSingleOperation;
} | {
    messageSystemId: String<64>;
    messageSystem?: MessageSystem.UpdateOperation;
} | {
    messageSystemId: String<64>;
}));
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "messageSystemId">> & (({
    application: Application.CreateSingleOperation;
    applicationId?: never;
} | {
    application: Application.UpdateOperation;
    applicationId?: never;
} | {
    application: Application.RemoveOperation;
    applicationId?: never;
} | {
    application?: never;
    applicationId?: String<64> | null;
}) & ({
    messageSystem: MessageSystem.CreateSingleOperation;
    messageSystemId?: never;
} | {
    messageSystem: MessageSystem.UpdateOperation;
    messageSystemId?: never;
} | {
    messageSystem: MessageSystem.RemoveOperation;
    messageSystemId?: never;
} | {
    messageSystem?: never;
    messageSystemId?: String<64> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}) & ({
    messageSystem?: MessageSystem.UpdateOperation | MessageSystem.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type MessageSystemIdSubQuery = Selection<MessageSystemIdProjection>;
export declare type NotificationIdSubQuery = Selection<NotificationIdProjection>;
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
