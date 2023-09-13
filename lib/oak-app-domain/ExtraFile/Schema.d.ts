import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Int, Text, Float, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Article from "../Article/Schema";
import * as ArticleMenu from "../ArticleMenu/Schema";
import * as SessionMessage from "../SessionMessage/Schema";
import * as User from "../User/Schema";
export declare type OpSchema = EntityShape & {
    origin: 'qiniu' | 'wechat' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "sessionMessage" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension?: String<16> | null;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    uploaded?: Boolean | null;
    uploadMeta?: Object | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    origin: 'qiniu' | 'wechat' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "sessionMessage" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension?: String<16> | null;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    uploaded?: Boolean | null;
    uploadMeta?: Object | null;
    article?: Article.Schema;
    articleMenu?: ArticleMenu.Schema;
    sessionMessage?: SessionMessage.Schema;
    user?: User.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'qiniu' | 'wechat' | 'unknown'>;
    type: Q_EnumValue<'image' | 'video' | 'audio' | 'file'>;
    bucket: Q_StringValue;
    objectId: Q_StringValue;
    tag1: Q_StringValue;
    tag2: Q_StringValue;
    filename: Q_StringValue;
    md5: Q_StringValue;
    entity: Q_EnumValue<"article" | "articleMenu" | "sessionMessage" | "user" | string>;
    entityId: Q_StringValue;
    extra1: Q_StringValue;
    extension: Q_StringValue;
    size: Q_NumberValue;
    sort: Q_NumberValue;
    fileType: Q_StringValue;
    isBridge: Q_BooleanValue;
    uploaded: Q_BooleanValue;
    uploadMeta: Object;
    article: Article.Filter;
    articleMenu: ArticleMenu.Filter;
    sessionMessage: SessionMessage.Filter;
    user: User.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
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
    uploaded?: number;
    uploadMeta?: number | Object;
    article?: Article.Projection;
    articleMenu?: ArticleMenu.Projection;
    sessionMessage?: SessionMessage.Projection;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
declare type ExtraFileIdProjection = OneOf<{
    id: number;
}>;
declare type ArticleIdProjection = OneOf<{
    entityId: number;
}>;
declare type ArticleMenuIdProjection = OneOf<{
    entityId: number;
}>;
declare type SessionMessageIdProjection = OneOf<{
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
    uploaded: number;
} | {
    article: Article.SortAttr;
} | {
    articleMenu: ArticleMenu.SortAttr;
} | {
    sessionMessage: SessionMessage.SortAttr;
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
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    article: Article.CreateSingleOperation;
} | {
    entity: "article";
    entityId: ForeignKey<"Article">;
    article: Article.UpdateOperation;
} | {
    entity: "article";
    entityId: ForeignKey<"Article">;
} | {
    entity?: never;
    entityId?: never;
    articleMenu: ArticleMenu.CreateSingleOperation;
} | {
    entity: "articleMenu";
    entityId: ForeignKey<"ArticleMenu">;
    articleMenu: ArticleMenu.UpdateOperation;
} | {
    entity: "articleMenu";
    entityId: ForeignKey<"ArticleMenu">;
} | {
    entity?: never;
    entityId?: never;
    sessionMessage: SessionMessage.CreateSingleOperation;
} | {
    entity: "sessionMessage";
    entityId: ForeignKey<"SessionMessage">;
    sessionMessage: SessionMessage.UpdateOperation;
} | {
    entity: "sessionMessage";
    entityId: ForeignKey<"SessionMessage">;
} | {
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId">> & ({
    article?: Article.CreateSingleOperation | Article.UpdateOperation | Article.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    articleMenu?: ArticleMenu.CreateSingleOperation | ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    sessionMessage?: SessionMessage.CreateSingleOperation | SessionMessage.UpdateOperation | SessionMessage.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("article" | "articleMenu" | "sessionMessage" | "user" | string) | null;
    entityId?: ForeignKey<"Article" | "ArticleMenu" | "SessionMessage" | "User"> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & ({
    article?: Article.UpdateOperation | Article.RemoveOperation;
} | {
    articleMenu?: ArticleMenu.UpdateOperation | ArticleMenu.RemoveOperation;
} | {
    sessionMessage?: SessionMessage.UpdateOperation | SessionMessage.RemoveOperation;
} | {
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ArticleIdSubQuery = Selection<ArticleIdProjection>;
export declare type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
export declare type SessionMessageIdSubQuery = Selection<SessionMessageIdProjection>;
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
