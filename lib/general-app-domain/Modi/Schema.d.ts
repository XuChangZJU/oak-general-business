import { String, Datetime, PrimaryKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as ModiEntity from "../ModiEntity/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
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
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    targetEntity: String<32>;
    entity: String<32>;
    entityId: String<64>;
    action: String<16>;
    data: Object;
    filter?: Object | null;
    extra?: Object | null;
    iState?: IState | null;
    modiEntity$modi?: Array<ModiEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.ModiIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    targetEntity: Q_StringValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    action: Q_StringValue;
    iState: Q_EnumValue<IState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    targetEntity?: 1;
    entity?: 1;
    entityId?: 1;
    action?: 1;
    data?: 1;
    filter?: 1;
    extra?: 1;
    iState?: 1;
    modiEntity$modi?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    targetEntity?: string;
    entity?: string;
    entityId?: string;
    action?: string;
    data?: string;
    filter?: string;
    extra?: string;
    iState?: string;
    modiEntity$modi?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ModiIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    targetEntity: 1;
} | {
    entity: 1;
} | {
    entityId: 1;
} | {
    action: 1;
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
    modiEntity$modi?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    modiEntitys$modi?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "modi" | "modiId">>>;
};
export declare type UpdateOperation = OakOperation<ParticularAction | "update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ModiIdSubQuery = Selection<ModiIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr | `modiEntitys$${number}.${ModiEntity.NativeAttr}`;
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
