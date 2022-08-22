import { String, Boolean, Text, Datetime, PrimaryKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text | null;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    iState?: IState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text | null;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    iState?: IState | null;
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.CaptchaIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    mobile: Q_StringValue;
    code: Q_StringValue;
    visitorId: Q_StringValue;
    reason: Q_StringValue;
    expired: Q_BooleanValue;
    expiresAt: Q_DateValue;
    iState: Q_EnumValue<IState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    mobile?: 1;
    code?: 1;
    visitorId?: 1;
    reason?: 1;
    env?: 1;
    expired?: 1;
    expiresAt?: 1;
    iState?: 1;
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    mobile?: string;
    code?: string;
    visitorId?: string;
    reason?: string;
    env?: string;
    expired?: string;
    expiresAt?: string;
    iState?: string;
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr>>;
declare type CaptchaIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    mobile: 1;
} | {
    code: 1;
} | {
    visitorId: 1;
} | {
    reason: 1;
} | {
    expired: 1;
} | {
    expiresAt: 1;
} | {
    iState: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<OpSchema> & {
    [k: string]: any;
    operEntity$entity?: OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter>>;
    modiEntity$entity?: OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    operEntitys$entity?: OperEntity.UpdateOperation | OperEntity.RemoveOperation | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OperEntity.UpdateOperation | OperEntity.RemoveOperation>;
    modiEntitys$entity?: ModiEntity.UpdateOperation | ModiEntity.RemoveOperation | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | ModiEntity.UpdateOperation | ModiEntity.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<ParticularAction | "update", UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type CaptchaIdSubQuery = Selection<CaptchaIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: Action;
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
