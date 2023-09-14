import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Article from "../Article/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
export type OpSchema = EntityShape & {
    name: String<32>;
    isArticle: Boolean;
    parentId?: ForeignKey<"articleMenu"> | null;
    isLeaf: Boolean;
    entity: String<32>;
    entityId: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    name: String<32>;
    isArticle: Boolean;
    parentId?: ForeignKey<"articleMenu"> | null;
    isLeaf: Boolean;
    entity: String<32>;
    entityId: String<64>;
    parent?: Schema | null;
    article$articleMenu?: Array<Article.Schema>;
    article$articleMenu$$aggr?: AggregationResult<Article.Schema>;
    articleMenu$parent?: Array<Schema>;
    articleMenu$parent$$aggr?: AggregationResult<Schema>;
    extraFile$entity?: Array<ExtraFile.Schema>;
    extraFile$entity$$aggr?: AggregationResult<ExtraFile.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    isArticle: Q_BooleanValue;
    parentId: Q_StringValue;
    parent: Filter;
    isLeaf: Q_BooleanValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    article$articleMenu: Article.Filter & SubQueryPredicateMetadata;
    articleMenu$parent: Filter & SubQueryPredicateMetadata;
    extraFile$entity: ExtraFile.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    name?: number;
    isArticle?: number;
    parentId?: number;
    parent?: Projection;
    isLeaf?: number;
    entity?: number;
    entityId?: number;
    article$articleMenu?: Article.Selection & {
        $entity: "article";
    };
    article$articleMenu$$aggr?: Article.Aggregation & {
        $entity: "article";
    };
    articleMenu$parent?: Selection & {
        $entity: "articleMenu";
    };
    articleMenu$parent$$aggr?: Aggregation & {
        $entity: "articleMenu";
    };
    extraFile$entity?: ExtraFile.Selection & {
        $entity: "extraFile";
    };
    extraFile$entity$$aggr?: ExtraFile.Aggregation & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr | string>>;
type ArticleMenuIdProjection = OneOf<{
    id: number;
    parentId: number;
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
    name: number;
} | {
    isArticle: number;
} | {
    parentId: number;
} | {
    parent: SortAttr;
} | {
    isLeaf: number;
} | {
    entity: number;
} | {
    entityId: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "parentId">> & (({
    parentId?: never;
    parent?: CreateSingleOperation;
} | {
    parentId: ForeignKey<"parent">;
    parent?: UpdateOperation;
} | {
    parentId?: ForeignKey<"parent">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    article$articleMenu?: OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">> | OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">[]> | Array<OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">> | OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">>>;
    articleMenu$parent?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">> | OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "parentId">> & (({
    parent: CreateSingleOperation;
    parentId?: never;
} | {
    parent: UpdateOperation;
    parentId?: never;
} | {
    parent: RemoveOperation;
    parentId?: never;
} | {
    parent?: never;
    parentId?: ForeignKey<"parent"> | null;
})) & {
    [k: string]: any;
    article$articleMenu?: OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">> | OakOperation<Article.RemoveOperation["action"], Omit<Article.RemoveOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">> | OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">[]> | Array<OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">> | OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">> | OakOperation<Article.RemoveOperation["action"], Omit<Article.RemoveOperationData, "articleMenu" | "articleMenuId">, Omit<Article.Filter, "articleMenu" | "articleMenuId">>>;
    articleMenu$parent?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">> | OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "parent" | "parentId">, Omit<Filter, "parent" | "parentId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    parent?: UpdateOperation | RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
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
