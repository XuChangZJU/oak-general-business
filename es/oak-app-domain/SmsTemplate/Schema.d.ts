import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Text, Datetime } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as System from "../System/Schema";
import * as MessageTypeSmsTemplate from "../MessageTypeSmsTemplate/Schema";
export type OpSchema = EntityShape & {
    systemId: ForeignKey<"system">;
    origin: String<64>;
    templateName: Text;
    templateCode: String<64>;
    templateContent: Text;
    syncAt: Datetime;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    systemId: ForeignKey<"system">;
    origin: String<64>;
    templateName: Text;
    templateCode: String<64>;
    templateContent: Text;
    syncAt: Datetime;
    system: System.Schema;
    messageTypeSmsTemplate$template?: Array<MessageTypeSmsTemplate.Schema>;
    messageTypeSmsTemplate$template$$aggr?: AggregationResult<MessageTypeSmsTemplate.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    systemId: Q_StringValue;
    system: System.Filter;
    origin: Q_StringValue;
    templateName: Q_StringValue;
    templateCode: Q_StringValue;
    templateContent: Q_StringValue;
    syncAt: Q_DateValue;
    messageTypeSmsTemplate$template: MessageTypeSmsTemplate.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    systemId?: number;
    system?: System.Projection;
    origin?: number;
    templateName?: number;
    templateCode?: number;
    templateContent?: number;
    syncAt?: number;
    messageTypeSmsTemplate$template?: MessageTypeSmsTemplate.Selection & {
        $entity: "messageTypeSmsTemplate";
    };
    messageTypeSmsTemplate$template$$aggr?: MessageTypeSmsTemplate.Aggregation & {
        $entity: "messageTypeSmsTemplate";
    };
} & Partial<ExprOp<OpAttr | string>>;
type SmsTemplateIdProjection = OneOf<{
    id: number;
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
    systemId: number;
} | {
    system: System.SortAttr;
} | {
    origin: number;
} | {
    templateName: number;
} | {
    templateCode: number;
} | {
    templateContent: number;
} | {
    syncAt: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "systemId">> & (({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: ForeignKey<"system">;
    system?: System.UpdateOperation;
} | {
    system?: never;
    systemId: ForeignKey<"system">;
})) & {
    messageTypeSmsTemplate$template?: OakOperation<MessageTypeSmsTemplate.UpdateOperation["action"], Omit<MessageTypeSmsTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">> | OakOperation<"create", Omit<MessageTypeSmsTemplate.CreateOperationData, "template" | "templateId">[]> | Array<OakOperation<"create", Omit<MessageTypeSmsTemplate.CreateOperationData, "template" | "templateId">> | OakOperation<MessageTypeSmsTemplate.UpdateOperation["action"], Omit<MessageTypeSmsTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "systemId">> & (({
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
    messageTypeSmsTemplate$template?: OakOperation<MessageTypeSmsTemplate.UpdateOperation["action"], Omit<MessageTypeSmsTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">> | OakOperation<MessageTypeSmsTemplate.RemoveOperation["action"], Omit<MessageTypeSmsTemplate.RemoveOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">> | OakOperation<"create", Omit<MessageTypeSmsTemplate.CreateOperationData, "template" | "templateId">[]> | Array<OakOperation<"create", Omit<MessageTypeSmsTemplate.CreateOperationData, "template" | "templateId">> | OakOperation<MessageTypeSmsTemplate.UpdateOperation["action"], Omit<MessageTypeSmsTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">> | OakOperation<MessageTypeSmsTemplate.RemoveOperation["action"], Omit<MessageTypeSmsTemplate.RemoveOperationData, "template" | "templateId">, Omit<MessageTypeSmsTemplate.Filter, "template" | "templateId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
export type SmsTemplateIdSubQuery = Selection<SmsTemplateIdProjection>;
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
export {};
