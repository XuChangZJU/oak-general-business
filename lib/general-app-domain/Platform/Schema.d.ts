import { JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Config } from "../../types/Config";
import { Style } from "../../types/Style";
import * as System from "../System/Schema";
export declare type OpSchema = EntityShape & {
    name: String<32>;
    description: Text;
    config: Config;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    name: String<32>;
    description: Text;
    config: Config;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    system$platform?: Array<System.Schema>;
    system$platform$$aggr?: AggregationResult<System.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: JsonFilter<Config>;
    style: JsonFilter<Style>;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    system$platform: System.Filter & SubQueryPredicateMetadata;
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
    description?: number;
    config?: number | JsonProjection<Config>;
    style?: number | JsonProjection<Style>;
    entity?: number;
    entityId?: number;
    system$platform?: System.Selection & {
        $entity: "system";
    };
    system$platform$$aggr?: System.Aggregation & {
        $entity: "system";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type PlatformIdProjection = OneOf<{
    id: number;
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
    description: number;
} | {
    config: number;
} | {
    style: number;
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
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<System.RemoveOperation["action"], Omit<System.RemoveOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<System.RemoveOperation["action"], Omit<System.RemoveOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type PlatformIdSubQuery = Selection<PlatformIdProjection>;
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
