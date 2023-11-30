import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Int, Text, Float, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Application from "../Application/Schema";
import * as Article from "../Article/Schema";
import * as ArticleMenu from "../ArticleMenu/Schema";
import * as SessionMessage from "../SessionMessage/Schema";
import * as User from "../User/Schema";
export type OpSchema = EntityShape & {
    origin: 'qiniu' | 'wechat' | 'unknown' | 'ctyun';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket?: String<32> | null;
    objectId?: String<64> | null;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "sessionMessage" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extra2?: Object | null;
    extension?: String<16> | null;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    uploadState: 'success' | 'failed' | 'uploading';
    uploadMeta?: Object | null;
    applicationId: ForeignKey<"application">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    origin: 'qiniu' | 'wechat' | 'unknown' | 'ctyun';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket?: String<32> | null;
    objectId?: String<64> | null;
    tag1?: String<32> | null;
    tag2?: String<32> | null;
    filename: String<256>;
    md5?: Text | null;
    entity: "article" | "articleMenu" | "sessionMessage" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extra2?: Object | null;
    extension?: String<16> | null;
    size?: Int<4> | null;
    sort?: Float<22, 10> | null;
    fileType?: String<128> | null;
    isBridge?: Boolean | null;
    uploadState: 'success' | 'failed' | 'uploading';
    uploadMeta?: Object | null;
    applicationId: ForeignKey<"application">;
    application: Application.Schema;
    article?: Article.Schema;
    articleMenu?: ArticleMenu.Schema;
    sessionMessage?: SessionMessage.Schema;
    user?: User.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'qiniu' | 'wechat' | 'unknown' | 'ctyun'>;
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
    extra2: Object;
    extension: Q_StringValue;
    size: Q_NumberValue;
    sort: Q_NumberValue;
    fileType: Q_StringValue;
    isBridge: Q_BooleanValue;
    uploadState: Q_EnumValue<'success' | 'failed' | 'uploading'>;
    uploadMeta: Object;
    applicationId: Q_StringValue;
    application: Application.Filter;
    article: Article.Filter;
    articleMenu: ArticleMenu.Filter;
    sessionMessage: SessionMessage.Filter;
    user: User.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
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
    extra2?: number | Object;
    extension?: number;
    size?: number;
    sort?: number;
    fileType?: number;
    isBridge?: number;
    uploadState?: number;
    uploadMeta?: number | Object;
    applicationId?: number;
    application?: Application.Projection;
    article?: Article.Projection;
    articleMenu?: ArticleMenu.Projection;
    sessionMessage?: SessionMessage.Projection;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type ExtraFileIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type ArticleIdProjection = OneOf<{
    entityId: number;
}>;
type ArticleMenuIdProjection = OneOf<{
    entityId: number;
}>;
type SessionMessageIdProjection = OneOf<{
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
    uploadState: number;
} | {
    applicationId: number;
} | {
    application: Application.SortAttr;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId: ForeignKey<"application">;
})) & ({
    entity?: never;
    entityId?: never;
    article: Article.CreateSingleOperation;
} | {
    entity: "article";
    entityId: ForeignKey<"Article">;
    article?: Article.UpdateOperation;
} | {
    entity: "article";
    entityId: ForeignKey<"Article">;
    article?: never;
} | {
    entity?: never;
    entityId?: never;
    articleMenu: ArticleMenu.CreateSingleOperation;
} | {
    entity: "articleMenu";
    entityId: ForeignKey<"ArticleMenu">;
    articleMenu?: ArticleMenu.UpdateOperation;
} | {
    entity: "articleMenu";
    entityId: ForeignKey<"ArticleMenu">;
    articleMenu?: never;
} | {
    entity?: never;
    entityId?: never;
    sessionMessage: SessionMessage.CreateSingleOperation;
} | {
    entity: "sessionMessage";
    entityId: ForeignKey<"SessionMessage">;
    sessionMessage?: SessionMessage.UpdateOperation;
} | {
    entity: "sessionMessage";
    entityId: ForeignKey<"SessionMessage">;
    sessionMessage?: never;
} | {
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
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
})) & ({
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
    article?: never;
    articleMenu?: never;
    sessionMessage?: never;
    user?: never;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
})) & ({
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
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type ArticleIdSubQuery = Selection<ArticleIdProjection>;
export type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
export type SessionMessageIdSubQuery = Selection<SessionMessageIdProjection>;
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
export {};
