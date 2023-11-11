import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Index, ActionDef } from "oak-domain/lib/types";
import { Channel } from "../../types/Message";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Application from "../Application/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
export type OpSchema = EntityShape & {
    channel: Channel;
    applicationId?: ForeignKey<"application"> | null;
    data?: Object | null;
    messageSystemId: ForeignKey<"messageSystem">;
    data1?: Object | null;
    data2?: Object | null;
    templateId?: String<128> | null;
    iState?: IState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    channel: Channel;
    applicationId?: ForeignKey<"application"> | null;
    data?: Object | null;
    messageSystemId: ForeignKey<"messageSystem">;
    data1?: Object | null;
    data2?: Object | null;
    templateId?: String<128> | null;
    iState?: IState | null;
    application?: Application.Schema | null;
    messageSystem: MessageSystem.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    channel: Q_EnumValue<Channel>;
    applicationId: Q_StringValue;
    application: Application.Filter;
    data: Object;
    messageSystemId: Q_StringValue;
    messageSystem: MessageSystem.Filter;
    data1: Object;
    data2: Object;
    templateId: Q_StringValue;
    iState: Q_EnumValue<IState>;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    channel?: number;
    applicationId?: number;
    application?: Application.Projection;
    data?: number | Object;
    messageSystemId?: number;
    messageSystem?: MessageSystem.Projection;
    data1?: number | Object;
    data2?: number | Object;
    templateId?: number;
    iState?: number;
} & Partial<ExprOp<OpAttr | string>>;
type NotificationIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type MessageSystemIdProjection = OneOf<{
    messageSystemId: number;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "messageSystemId">> & (({
    applicationId?: never;
    application?: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId?: ForeignKey<"application">;
}) & ({
    messageSystemId?: never;
    messageSystem: MessageSystem.CreateSingleOperation;
} | {
    messageSystemId: ForeignKey<"messageSystem">;
    messageSystem?: MessageSystem.UpdateOperation;
} | {
    messageSystem?: never;
    messageSystemId: ForeignKey<"messageSystem">;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "messageSystemId">> & (({
    application?: Application.CreateSingleOperation;
    applicationId?: never;
} | {
    application?: Application.UpdateOperation;
    applicationId?: never;
} | {
    application?: Application.RemoveOperation;
    applicationId?: never;
} | {
    application?: never;
    applicationId?: ForeignKey<"application"> | null;
}) & ({
    messageSystem?: MessageSystem.CreateSingleOperation;
    messageSystemId?: never;
} | {
    messageSystem?: MessageSystem.UpdateOperation;
    messageSystemId?: never;
} | {
    messageSystem?: MessageSystem.RemoveOperation;
    messageSystemId?: never;
} | {
    messageSystem?: never;
    messageSystemId?: ForeignKey<"messageSystem">;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}) & ({
    messageSystem?: MessageSystem.UpdateOperation | MessageSystem.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type MessageSystemIdSubQuery = Selection<MessageSystemIdProjection>;
export type NotificationIdSubQuery = Selection<NotificationIdProjection>;
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