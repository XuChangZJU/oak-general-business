import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { Config } from "../../types/Config";
import { Style } from "../../types/Style";
import * as System from "../System/Schema";
export type OpSchema = EntityShape & {
    name: String<32>;
    description: Text;
    config: Config;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
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
type AttrFilter = {
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
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
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
type PlatformIdProjection = OneOf<{
    id: number;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, System.Filter> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, System.Filter>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    system$platform?: System.UpdateOperation | System.RemoveOperation | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | System.UpdateOperation | System.RemoveOperation>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type PlatformIdSubQuery = Selection<PlatformIdProjection>;
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