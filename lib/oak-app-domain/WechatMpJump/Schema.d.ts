import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { Boolean, Datetime, Int, String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Message from "../Message/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
type Jump_wxa = {
    path?: string;
    query?: string;
    env_version?: string;
};
export type OpSchema = EntityShape & {
    messageId?: ForeignKey<"message"> | null;
    jump_wxa?: Jump_wxa | null;
    openlink?: String<256> | null;
    expireType?: Int<1> | null;
    expireInterval?: Int<2> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    messageId?: ForeignKey<"message"> | null;
    jump_wxa?: Jump_wxa | null;
    openlink?: String<256> | null;
    expireType?: Int<1> | null;
    expireInterval?: Int<2> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    message?: Message.Schema | null;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    messageId: Q_StringValue;
    message: Message.Filter;
    jump_wxa: JsonFilter<Jump_wxa>;
    openlink: Q_StringValue;
    expireType: Q_NumberValue;
    expireInterval: Q_NumberValue;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    messageId?: number;
    message?: Message.Projection;
    jump_wxa?: number | JsonProjection<Jump_wxa>;
    openlink?: number;
    expireType?: number;
    expireInterval?: number;
    expiresAt?: number;
    expired?: number;
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    modiEntity$entity$$aggr?: ModiEntity.Aggregation & {
        $entity: "modiEntity";
    };
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    operEntity$entity$$aggr?: OperEntity.Aggregation & {
        $entity: "operEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
type WechatMpJumpIdProjection = OneOf<{
    id: number;
}>;
type MessageIdProjection = OneOf<{
    messageId: number;
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
    messageId: number;
} | {
    message: Message.SortAttr;
} | {
    jump_wxa: number;
} | {
    openlink: number;
} | {
    expireType: number;
} | {
    expireInterval: number;
} | {
    expiresAt: number;
} | {
    expired: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "messageId">> & (({
    messageId?: never;
    message?: Message.CreateSingleOperation;
} | {
    messageId: ForeignKey<"message">;
    message?: Message.UpdateOperation;
} | {
    message?: never;
    messageId?: ForeignKey<"message">;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "messageId">> & (({
    message?: Message.CreateSingleOperation;
    messageId?: never;
} | {
    message?: Message.UpdateOperation;
    messageId?: never;
} | {
    message?: Message.RemoveOperation;
    messageId?: never;
} | {
    message?: never;
    messageId?: ForeignKey<"message"> | null;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    message?: Message.UpdateOperation | Message.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type MessageIdSubQuery = Selection<MessageIdProjection>;
export type WechatMpJumpIdSubQuery = Selection<WechatMpJumpIdProjection>;
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
