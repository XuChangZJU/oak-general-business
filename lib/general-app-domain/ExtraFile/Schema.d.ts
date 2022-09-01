import { String, Int, Text, Datetime, PrimaryKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Article from "../Article/Schema";
import * as User from "../User/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file' | 'pdf';
    bucket: String<16>;
    objectId: String<64>;
    tag1: String<16>;
    tag2: String<16>;
    filename: String<64>;
    md5: Text;
    entity: "article" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Int<4> | null;
    fileType: String<16>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file' | 'pdf';
    bucket: String<16>;
    objectId: String<64>;
    tag1: String<16>;
    tag2: String<16>;
    filename: String<64>;
    md5: Text;
    entity: "article" | "user" | string;
    entityId: String<64>;
    extra1?: Text | null;
    extension: String<16>;
    size?: Int<4> | null;
    sort?: Int<4> | null;
    fileType: String<16>;
    article?: Article.Schema;
    user?: User.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.ExtraFileIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'qiniu' | 'unknown'>;
    type: Q_EnumValue<'image' | 'video' | 'audio' | 'file' | 'pdf'>;
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
    article: Article.Filter;
    user: User.Filter;
};
export declare type Filter<E = Q_EnumValue<"article" | "user" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    origin?: 1;
    type?: 1;
    bucket?: 1;
    objectId?: 1;
    tag1?: 1;
    tag2?: 1;
    filename?: 1;
    md5?: 1;
    entity?: 1;
    entityId?: 1;
    extra1?: 1;
    extension?: 1;
    size?: 1;
    sort?: 1;
    fileType?: 1;
    article?: Article.Projection;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    origin?: string;
    type?: string;
    bucket?: string;
    objectId?: string;
    tag1?: string;
    tag2?: string;
    filename?: string;
    md5?: string;
    entity?: string;
    entityId?: string;
    extra1?: string;
    extension?: string;
    size?: string;
    sort?: string;
    fileType?: string;
    article?: Article.ExportProjection;
    user?: User.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type ExtraFileIdProjection = OneOf<{
    id: 1;
}>;
declare type ArticleIdProjection = OneOf<{
    entityId: 1;
}>;
declare type UserIdProjection = OneOf<{
    entityId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    origin: 1;
} | {
    type: 1;
} | {
    bucket: 1;
} | {
    objectId: 1;
} | {
    tag1: 1;
} | {
    tag2: 1;
} | {
    filename: 1;
} | {
    md5: 1;
} | {
    entity: 1;
} | {
    entityId: 1;
} | {
    extra1: 1;
} | {
    extension: 1;
} | {
    size: 1;
} | {
    sort: 1;
} | {
    fileType: 1;
} | {
    article: Article.SortAttr;
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
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: never;
    entityId?: never;
    article: Article.CreateSingleOperation;
} | {
    entity: "article";
    entityId: String<64>;
    article?: Article.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: String<64>;
    user?: User.UpdateOperation;
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
    entityId?: undefined;
    entity?: undefined;
} | {
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    entity?: ("article" | "user" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & ({
    article?: Article.UpdateOperation;
} | {
    article?: Article.RemoveOperation;
} | {
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ArticleIdSubQuery = Selection<ArticleIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type ExtraFileIdSubQuery = Selection<ExtraFileIdProjection>;
export declare type NativeAttr = OpAttr | `entity.${Article.NativeAttr}` | `entity.${User.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
