import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Text, Datetime } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Application from "../Application/Schema";
import * as MessageTypeTemplate from "../MessageTypeTemplate/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
type KeywordEnumValueList = Array<{
    keywordCode: string;
    enumValueList: Array<string>;
}>;
export type OpSchema = EntityShape & {
    applicationId: ForeignKey<"application">;
    wechatId: String<64>;
    title: Text;
    primaryIndustry?: Text | null;
    deputyIndustry?: Text | null;
    content?: Text | null;
    example?: Text | null;
    param?: Object | null;
    syncAt: Datetime;
    keywordEnumValueList?: KeywordEnumValueList | null;
    type?: ('2' | '3') | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    applicationId: ForeignKey<"application">;
    wechatId: String<64>;
    title: Text;
    primaryIndustry?: Text | null;
    deputyIndustry?: Text | null;
    content?: Text | null;
    example?: Text | null;
    param?: Object | null;
    syncAt: Datetime;
    keywordEnumValueList?: KeywordEnumValueList | null;
    type?: ('2' | '3') | null;
    application: Application.Schema;
    messageTypeTemplate$template?: Array<MessageTypeTemplate.Schema>;
    messageTypeTemplate$template$$aggr?: AggregationResult<MessageTypeTemplate.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    applicationId: Q_StringValue;
    application: Application.Filter;
    wechatId: Q_StringValue;
    title: Q_StringValue;
    primaryIndustry: Q_StringValue;
    deputyIndustry: Q_StringValue;
    content: Q_StringValue;
    example: Q_StringValue;
    param: Object;
    syncAt: Q_DateValue;
    keywordEnumValueList: JsonFilter<KeywordEnumValueList>;
    type: Q_EnumValue<'2' | '3'>;
    messageTypeTemplate$template: MessageTypeTemplate.Filter & SubQueryPredicateMetadata;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    applicationId?: number;
    application?: Application.Projection;
    wechatId?: number;
    title?: number;
    primaryIndustry?: number;
    deputyIndustry?: number;
    content?: number;
    example?: number;
    param?: number | Object;
    syncAt?: number;
    keywordEnumValueList?: number | JsonProjection<KeywordEnumValueList>;
    type?: number;
    messageTypeTemplate$template?: MessageTypeTemplate.Selection & {
        $entity: "messageTypeTemplate";
    };
    messageTypeTemplate$template$$aggr?: MessageTypeTemplate.Aggregation & {
        $entity: "messageTypeTemplate";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    modiEntity$entity$$aggr?: ModiEntity.Aggregation & {
        $entity: "modiEntity";
    };
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    operEntity$entity$$aggr?: OperEntity.Aggregation & {
        $entity: "operEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
type WechatTemplateIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
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
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    wechatId: number;
} | {
    title: number;
} | {
    primaryIndustry: number;
} | {
    deputyIndustry: number;
} | {
    content: number;
} | {
    example: number;
} | {
    syncAt: number;
} | {
    keywordEnumValueList: number;
} | {
    type: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId: ForeignKey<"application">;
})) & {
    messageTypeTemplate$template?: OakOperation<MessageTypeTemplate.UpdateOperation["action"], Omit<MessageTypeTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">> | OakOperation<"create", Omit<MessageTypeTemplate.CreateOperationData, "template" | "templateId">[]> | Array<OakOperation<"create", Omit<MessageTypeTemplate.CreateOperationData, "template" | "templateId">> | OakOperation<MessageTypeTemplate.UpdateOperation["action"], Omit<MessageTypeTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId">> & (({
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
    applicationId?: ForeignKey<"application">;
})) & {
    [k: string]: any;
    messageTypeTemplate$template?: OakOperation<MessageTypeTemplate.UpdateOperation["action"], Omit<MessageTypeTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">> | OakOperation<MessageTypeTemplate.RemoveOperation["action"], Omit<MessageTypeTemplate.RemoveOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">> | OakOperation<"create", Omit<MessageTypeTemplate.CreateOperationData, "template" | "templateId">[]> | Array<OakOperation<"create", Omit<MessageTypeTemplate.CreateOperationData, "template" | "templateId">> | OakOperation<MessageTypeTemplate.UpdateOperation["action"], Omit<MessageTypeTemplate.UpdateOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">> | OakOperation<MessageTypeTemplate.RemoveOperation["action"], Omit<MessageTypeTemplate.RemoveOperationData, "template" | "templateId">, Omit<MessageTypeTemplate.Filter, "template" | "templateId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type WechatTemplateIdSubQuery = Selection<WechatTemplateIdProjection>;
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
