import { String, Int, Float, Boolean, Text } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as ArticleMenu from "../ArticleMenu/Schema";
import * as User from "../User/Schema";
export declare type OpSchema = EntityShape & {
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "articleMenu" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Float<4, 2> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "articleMenu" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Float<4, 2> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    articleMenu?: ArticleMenu.Schema;
    user?: User.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.ExtraFileIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'qiniu' | 'unknown'>;
    type: Q_EnumValue<'image' | 'video' | 'audio' | 'file'>;
    bucket: Q_StringValue;
    objectId: Q_StringValue;
    tag1: Q_StringValue;
    tag2: Q_StringValue;
    filename: Q_StringValue;
    md5: Q_StringValue;
    entity: E;
    entityId: Q_StringValue;
    extra1: Q_StringValue;
    extension: Q_StringValue;
    size: Q_NumberValue;
    sort: Q_NumberValue;
    fileType: Q_StringValue;
    isBridge: Q_BooleanValue;
    articleMenu: ArticleMenu.Filter;
    user: User.Filter;
};
export declare type Filter<E = Q_EnumValue<"articleMenu" | "user" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    origin?: number;
    type?: number;
    bucket?: number;
    objectId?: number;
    tag1?: number;
    tag2?: number;
    filename?: number;
    md5?: number;
    entity?: number;
    entityId?: number;
    extra1?: number;
    extension?: number;
    size?: number;
    sort?: number;
    fileType?: number;
    isBridge?: number;
    articleMenu?: ArticleMenu.Projection;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
declare type ExtraFileIdProjection = OneOf<{
    id: number;
}>;
declare type ArticleMenuIdProjection = OneOf<{
    entityId: number;
}>;
declare type UserIdProjection = OneOf<{
    entityId: number;
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
    origin: number;
} | {
    type: number;
} | {
    bucket: number;
} | {
    objectId: number;
} | {
    tag1: number;
} | {
    tag2: number;
} | {
    filename: number;
} | {
    md5: number;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    extra1: number;
} | {
    extension: number;
} | {
    size: number;
} | {
    sort: number;
} | {
    fileType: number;
} | {
    isBridge: number;
} | {
    articleMenu: ArticleMenu.SortAttr;
} | {
    user: User.SortAttr;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    articleMenu: ArticleMenu.CreateSingleOperation;
} | {
    entity: "articleMenu";
    entityId: String<64>;
    articleMenu: ArticleMenu.UpdateOperation;
} | {
    entity: "articleMenu";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: String<64>;
    user: User.UpdateOperation;
} | {
    entity: "user";
    entityId: String<64>;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
    articleMenu?: ArticleMenu.CreateSingleOperation | ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("articleMenu" | "user" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & ({
    articleMenu?: ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
} | {
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type ExtraFileIdSubQuery = Selection<ExtraFileIdProjection>;
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
