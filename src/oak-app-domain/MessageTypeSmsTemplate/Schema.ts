import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Float, Int, Boolean, Datetime, } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as SmsTemplate from "../SmsTemplate/Schema";
export type OpSchema = EntityShape & {
    type: String<64>;
    templateId: ForeignKey<"smsTemplate">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    type: String<64>;
    templateId: ForeignKey<"smsTemplate">;
    template: SmsTemplate.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    type: Q_StringValue;
    templateId: Q_StringValue;
    template: SmsTemplate.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    type?: number;
    templateId?: number;
    template?: SmsTemplate.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type MessageTypeSmsTemplateIdProjection = OneOf<{
    id: number;
}>;
type SmsTemplateIdProjection = OneOf<{
    templateId: number;
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
    type: number;
} | {
    templateId: number;
} | {
    template: SmsTemplate.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "templateId">> & (({
    templateId?: never;
    template: SmsTemplate.CreateSingleOperation;
} | {
    templateId: ForeignKey<"template">;
    template?: SmsTemplate.UpdateOperation;
} | {
    templateId: ForeignKey<"template">;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "templateId">> & (({
    template: SmsTemplate.CreateSingleOperation;
    templateId?: never;
} | {
    template: SmsTemplate.UpdateOperation;
    templateId?: never;
} | {
    template: SmsTemplate.RemoveOperation;
    templateId?: never;
} | {
    template?: never;
    templateId?: ForeignKey<"template"> | null;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    template?: SmsTemplate.UpdateOperation | SmsTemplate.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type SmsTemplateIdSubQuery = Selection<SmsTemplateIdProjection>;
export type MessageTypeSmsTemplateIdSubQuery = Selection<MessageTypeSmsTemplateIdProjection>;
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