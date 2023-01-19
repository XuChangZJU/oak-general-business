import { String, Text } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
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
    id: Q_StringValue | SubQuery.PlatformIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: Q_EnumValue<Config>;
    style: Q_EnumValue<Style>;
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
    description?: number;
    config?: number;
    style?: number;
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
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = Omit<DeduceAggregation<Schema, Projection, Filter, Sorter>, "id">;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, System.Filter> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, System.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    systems$platform?: System.UpdateOperation | System.RemoveOperation | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | System.UpdateOperation | System.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type PlatformIdSubQuery = Selection<PlatformIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr | `systems$${number}.${System.NativeAttr}`;
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
