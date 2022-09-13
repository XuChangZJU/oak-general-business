import { String, Text, Datetime, PrimaryKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as ExtraFile from "../ExtraFile/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    title: String<32>;
    author: String<32>;
    abstract?: Text | null;
    content?: Text | null;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    title: String<32>;
    author: String<32>;
    abstract?: Text | null;
    content?: Text | null;
    iState?: IState | null;
    extraFile$entity?: Array<ExtraFile.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.ArticleIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    title: Q_StringValue;
    author: Q_StringValue;
    abstract: Q_StringValue;
    content: Q_StringValue;
    iState: Q_EnumValue<IState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    entity?: 1;
    entityId?: 1;
    title?: 1;
    author?: 1;
    abstract?: 1;
    content?: 1;
    iState?: 1;
    extraFile$entity?: ExtraFile.Selection & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    entity?: string;
    entityId?: string;
    title?: string;
    author?: string;
    abstract?: string;
    content?: string;
    iState?: string;
    extraFile$entity?: ExtraFile.Exportation & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ArticleIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    entity: 1;
} | {
    entityId: 1;
} | {
    title: 1;
} | {
    author: 1;
} | {
    abstract: 1;
} | {
    content: 1;
} | {
    iState: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    extraFiles$entity?: ExtraFile.UpdateOperation | ExtraFile.RemoveOperation | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | ExtraFile.UpdateOperation | ExtraFile.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ArticleIdSubQuery = Selection<ArticleIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr | `extraFiles$${number}.${ExtraFile.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
