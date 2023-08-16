import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as Area from "../Area/Schema";
export type OpSchema = EntityShape & {
    detail: String<32>;
    areaId: ForeignKey<"area">;
    phone: String<12>;
    name: String<32>;
    default: Boolean;
    remark: Text;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    detail: String<32>;
    areaId: ForeignKey<"area">;
    phone: String<12>;
    name: String<32>;
    default: Boolean;
    remark: Text;
    area: Area.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    detail: Q_StringValue;
    areaId: Q_StringValue;
    area: Area.Filter;
    phone: Q_StringValue;
    name: Q_StringValue;
    default: Q_BooleanValue;
    remark: Q_StringValue;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    detail?: number;
    areaId?: number;
    area?: Area.Projection;
    phone?: number;
    name?: number;
    default?: number;
    remark?: number;
} & Partial<ExprOp<OpAttr | string>>;
type AddressIdProjection = OneOf<{
    id: number;
}>;
type AreaIdProjection = OneOf<{
    areaId: number;
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
    detail: number;
} | {
    areaId: number;
} | {
    area: Area.SortAttr;
} | {
    phone: number;
} | {
    name: number;
} | {
    default: number;
} | {
    remark: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "areaId">> & ({
    areaId: String<64>;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "areaId">> & ({
    area?: never;
    areaId?: String<64> | null;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type AreaIdSubQuery = Selection<AreaIdProjection>;
export type AddressIdSubQuery = Selection<AddressIdProjection>;
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