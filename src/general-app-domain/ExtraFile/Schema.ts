import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Article from "../Article/Schema";
import * as ArticleMenu from "../ArticleMenu/Schema";
import * as User from "../User/Schema";
export type OpSchema = EntityShape & {
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    article?: Article.Schema;
    articleMenu?: ArticleMenu.Schema;
    user?: User.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter<E> = {
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
    article: Article.Filter;
    articleMenu: ArticleMenu.Filter;
    user: User.Filter;
};
export type Filter<E = Q_EnumValue<"article" | "articleMenu" | "user" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export type Projection = {
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
    article?: Article.Projection;
    articleMenu?: ArticleMenu.Projection;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type ExtraFileIdProjection = OneOf<{
    id: number;
}>;
type ArticleIdProjection = OneOf<{
    entityId: number;
}>;
type ArticleMenuIdProjection = OneOf<{
    entityId: number;
}>;
type UserIdProjection = OneOf<{
    entityId: number;
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
    article: Article.SortAttr;
} | {
    articleMenu: ArticleMenu.SortAttr;
} | {
    user: User.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    article: Article.CreateSingleOperation;
} | {
    entity: "article";
    entityId: String<64>;
    article: Article.UpdateOperation;
} | {
    entity: "article";
    entityId: String<64>;
} | {
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
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
    article?: Article.CreateSingleOperation | Article.UpdateOperation | Article.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    articleMenu?: ArticleMenu.CreateSingleOperation | ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("article" | "articleMenu" | "user" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & ({
    article?: Article.UpdateOperation | Article.RemoveOperation;
} | {
    articleMenu?: ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
} | {
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ArticleIdSubQuery = Selection<ArticleIdProjection>;
export type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type ExtraFileIdSubQuery = Selection<ExtraFileIdProjection>;
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