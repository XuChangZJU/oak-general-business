import { String, Boolean, Text, Datetime } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
export declare type OpSchema = EntityShape & {
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
export declare type Schema = EntityShape & {
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text | null;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    iState?: IState | null;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.CaptchaIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    mobile: Q_StringValue;
    code: Q_StringValue;
    visitorId: Q_StringValue;
    reason: Q_StringValue;
    env: Object;
    expired: Q_BooleanValue;
    expiresAt: Q_DateValue;
    iState: Q_EnumValue<IState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    $$seq$$?: 1;
    mobile?: 1;
    code?: 1;
    visitorId?: 1;
    reason?: 1;
    env?: 1;
    expired?: 1;
    expiresAt?: 1;
    iState?: 1;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    mobile?: string;
    code?: string;
    visitorId?: string;
    reason?: string;
    env?: string;
    expired?: string;
    expiresAt?: string;
    iState?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type CaptchaIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$seq$$: 1;
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
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<OpSchema>;
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type CaptchaIdSubQuery = Selection<CaptchaIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr;
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
