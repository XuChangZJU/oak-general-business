import { String, Boolean, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Article from "../Article/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
export declare type OpSchema = EntityShape & {
    name: String<32>;
    isArticle: Boolean;
    parentId?: ForeignKey<"articleMenu"> | null;
    isLeaf: Boolean;
    entity: String<32>;
    entityId: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.ArticleMenuIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    isArticle: Q_BooleanValue;
    parentId: Q_StringValue | SubQuery.ArticleMenuIdSubQuery;
    parent: Filter;
    isLeaf: Q_BooleanValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type ArticleMenuIdProjection = OneOf<{
    id: number;
    parentId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "parentId">> & (({
    parentId?: never;
    parent?: CreateSingleOperation;
} | {
    parentId: String<64>;
    parent?: UpdateOperation;
} | {
    parentId?: String<64>;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    article$articleMenu?: OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Article.Filter> | OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">[]> | Array<OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">> | OakOperation<Article.UpdateOperation["action"], Omit<Article.UpdateOperationData, "articleMenu" | "articleMenuId">, Article.Filter>>;
    articleMenu$parent?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Filter> | OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "parent" | "parentId">, Filter>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "parentId">> & (({
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
    parentId?: String<64> | null;
})) & {
    [k: string]: any;
    article$articleMenu?: Article.UpdateOperation | Article.RemoveOperation | OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">[]> | Array<OakOperation<"create", Omit<Article.CreateOperationData, "articleMenu" | "articleMenuId">> | Article.UpdateOperation | Article.RemoveOperation>;
    articleMenu$parent?: UpdateOperation | RemoveOperation | OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId">> | UpdateOperation | RemoveOperation>;
    extraFile$entity?: ExtraFile.UpdateOperation | ExtraFile.RemoveOperation | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | ExtraFile.UpdateOperation | ExtraFile.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    parent?: UpdateOperation | RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ArticleMenuIdSubQuery = Selection<ArticleMenuIdProjection>;
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
