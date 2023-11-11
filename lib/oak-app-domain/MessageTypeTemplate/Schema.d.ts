import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as WechatPublicTemplate from "../WechatPublicTemplate/Schema";
export type OpSchema = EntityShape & {
    type: String<64>;
    templateId: ForeignKey<"wechatPublicTemplate">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    type: String<64>;
    templateId: ForeignKey<"wechatPublicTemplate">;
    template: WechatPublicTemplate.Schema;
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
    template: WechatPublicTemplate.Filter;
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
    template?: WechatPublicTemplate.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type MessageTypeTemplateIdProjection = OneOf<{
    id: number;
}>;
type WechatPublicTemplateIdProjection = OneOf<{
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
    template: WechatPublicTemplate.SortAttr;
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
    template: WechatPublicTemplate.CreateSingleOperation;
} | {
    templateId: ForeignKey<"template">;
    template?: WechatPublicTemplate.UpdateOperation;
} | {
    template?: never;
    templateId: ForeignKey<"template">;
}));
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "templateId">> & (({
    template?: WechatPublicTemplate.CreateSingleOperation;
    templateId?: never;
} | {
    template?: WechatPublicTemplate.UpdateOperation;
    templateId?: never;
} | {
    template?: WechatPublicTemplate.RemoveOperation;
    templateId?: never;
} | {
    template?: never;
    templateId?: ForeignKey<"template">;
})) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    template?: WechatPublicTemplate.UpdateOperation | WechatPublicTemplate.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type WechatPublicTemplateIdSubQuery = Selection<WechatPublicTemplateIdProjection>;
export type MessageTypeTemplateIdSubQuery = Selection<MessageTypeTemplateIdProjection>;
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
