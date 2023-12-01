import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Image, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Config } from "../../types/Config";
import { Style } from "../../types/Style";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Message from "../Message/Schema";
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
    message$platform?: Array<Message.Schema>;
    message$platform$$aggr?: AggregationResult<Message.Schema>;
    system$platform?: Array<System.Schema>;
    system$platform$$aggr?: AggregationResult<System.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: JsonFilter<Config>;
    style: JsonFilter<Style>;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    message$platform: Message.Filter & SubQueryPredicateMetadata;
    system$platform: System.Filter & SubQueryPredicateMetadata;
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
    config?: number | JsonProjection<Config>;
    style?: number | JsonProjection<Style>;
    entity?: number;
    entityId?: number;
    message$platform?: Message.Selection & {
        $entity: "message";
    };
    message$platform$$aggr?: Message.Aggregation & {
        $entity: "message";
    };
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
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId">> & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    message$platform?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<Message.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "platform" | "platformId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">>>;
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    message$platform?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<Message.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "platform" | "platformId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "platform" | "platformId">, Omit<Message.Filter, "platform" | "platformId">>>;
    system$platform?: OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<System.RemoveOperation["action"], Omit<System.RemoveOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">[]> | Array<OakOperation<"create", Omit<System.CreateOperationData, "platform" | "platformId">> | OakOperation<System.UpdateOperation["action"], Omit<System.UpdateOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">> | OakOperation<System.RemoveOperation["action"], Omit<System.RemoveOperationData, "platform" | "platformId">, Omit<System.Filter, "platform" | "platformId">>>;
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