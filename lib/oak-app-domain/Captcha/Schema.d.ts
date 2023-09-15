import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { String, Text, Boolean, Datetime } from "oak-domain/lib/types/DataType";
export type OpSchema = EntityShape & {
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text | null;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    type: 'login' | 'changePassword' | 'confirm';
    iState?: IState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text | null;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    type: 'login' | 'changePassword' | 'confirm';
    iState?: IState | null;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
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
    type: Q_EnumValue<'login' | 'changePassword' | 'confirm'>;
    iState: Q_EnumValue<IState>;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    mobile?: number;
    code?: number;
    visitorId?: number;
    reason?: number;
    env?: number | Object;
    expired?: number;
    expiresAt?: number;
    type?: number;
    iState?: number;
} & Partial<ExprOp<OpAttr | string>>;
type CaptchaIdProjection = OneOf<{
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
    mobile: number;
} | {
    code: number;
} | {
    visitorId: number;
} | {
    reason: number;
} | {
    expired: number;
} | {
    expiresAt: number;
} | {
    type: number;
} | {
    iState: number;
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
export type CreateOperationData = FormCreateData<OpSchema>;
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type CaptchaIdSubQuery = Selection<CaptchaIdProjection>;
export type EntityDef = {
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
