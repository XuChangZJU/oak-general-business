import { String } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as ModiEntity from "../ModiEntity/Schema";
export declare type OpSchema = EntityShape & {
    targetEntity: String<32>;
    entity: String<32>;
    entityId: String<64>;
    action: String<16>;
    data: Object;
    filter?: Object | null;
    extra?: Object | null;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    targetEntity: String<32>;
    entity: String<32>;
    entityId: String<64>;
    action: String<16>;
    data: Object;
    filter?: Object | null;
    extra?: Object | null;
    iState?: IState | null;
    modiEntity$modi?: Array<ModiEntity.Schema>;
    modiEntity$modi$$aggr?: AggregationResult<ModiEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    targetEntity: Q_StringValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    action: Q_StringValue;
    data: Object;
    filter: Object;
    extra: Object;
    iState: Q_EnumValue<IState>;
    modiEntity$modi: ModiEntity.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    targetEntity?: number;
    entity?: number;
    entityId?: number;
    action?: number;
    data?: number | Object;
    filter?: number | Object;
    extra?: number | Object;
    iState?: number;
    modiEntity$modi?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    modiEntity$modi$$aggr?: ModiEntity.Aggregation & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ModiIdProjection = OneOf<{
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
    targetEntity: number;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    action: number;
} | {
    iState: number;
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
    modiEntity$modi?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    modiEntity$modi?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ModiIdSubQuery = Selection<ModiIdProjection>;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
