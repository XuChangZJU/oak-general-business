import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { AppendOnlyAction } from "oak-domain/lib/actions/action";
import { String, Datetime } from "oak-domain/lib/types/DataType";
import * as User from "../User/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type OpSchema = EntityShape & {
    action: String<24>;
    data: Object;
    filter?: Object | null;
    extra?: Object | null;
    operatorId?: ForeignKey<"user"> | null;
    targetEntity: String<32>;
    bornAt?: Datetime | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    action: String<24>;
    data: Object;
    filter?: Object | null;
    extra?: Object | null;
    operatorId?: ForeignKey<"user"> | null;
    targetEntity: String<32>;
    bornAt?: Datetime | null;
    operator?: User.Schema | null;
    operEntity$oper?: Array<OperEntity.Schema>;
    operEntity$oper$$aggr?: AggregationResult<OperEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    action: Q_StringValue;
    data: Object;
    filter: Object;
    extra: Object;
    operatorId: Q_StringValue;
    operator: User.Filter;
    targetEntity: Q_StringValue;
    bornAt: Q_DateValue;
    operEntity$oper: OperEntity.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    action?: number;
    data?: number | Object;
    filter?: number | Object;
    extra?: number | Object;
    operatorId?: number;
    operator?: User.Projection;
    targetEntity?: number;
    bornAt?: number;
    operEntity$oper?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    operEntity$oper$$aggr?: OperEntity.Aggregation & {
        $entity: "operEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
type OperIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    operatorId: number;
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
    action: number;
} | {
    operatorId: number;
} | {
    operator: User.SortAttr;
} | {
    targetEntity: number;
} | {
    bornAt: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "operatorId">> & (({
    operatorId?: never;
    operator?: User.CreateSingleOperation;
} | {
    operatorId: ForeignKey<"operator">;
    operator?: User.UpdateOperation;
} | {
    operator?: never;
    operatorId?: ForeignKey<"operator">;
})) & {
    operEntity$oper?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "oper" | "operId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "oper" | "operId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "operatorId">> & (({
    operator?: User.CreateSingleOperation;
    operatorId?: never;
} | {
    operator?: User.UpdateOperation;
    operatorId?: never;
} | {
    operator?: User.RemoveOperation;
    operatorId?: never;
} | {
    operator?: never;
    operatorId?: ForeignKey<"operator"> | null;
})) & {
    [k: string]: any;
    operEntity$oper?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "oper" | "operId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "oper" | "operId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    operator?: User.UpdateOperation | User.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type OperIdSubQuery = Selection<OperIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<AppendOnlyAction> | string;
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
