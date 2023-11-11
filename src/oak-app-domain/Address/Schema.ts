import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Image, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Area from "../Area/Schema";
import * as User from "../User/Schema";
export type OpSchema = EntityShape & {
    detail: String<32>;
    areaId: ForeignKey<"area">;
    phone: String<12>;
    name: String<32>;
    default: Boolean;
    remark?: Text | null;
    entity?: ("user" | string) | null;
    entityId?: String<64> | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    detail: String<32>;
    areaId: ForeignKey<"area">;
    phone: String<12>;
    name: String<32>;
    default: Boolean;
    remark?: Text | null;
    entity?: ("user" | string) | null;
    entityId?: String<64> | null;
    area: Area.Schema;
    user?: User.Schema;
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
    entity: Q_EnumValue<"user" | string>;
    entityId: Q_StringValue;
    user: User.Filter;
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
    entity?: number;
    entityId?: number;
    user?: User.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type AddressIdProjection = OneOf<{
    id: number;
}>;
type AreaIdProjection = OneOf<{
    areaId: number;
}>;
type UserIdProjection = OneOf<{
    entityId: number;
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
    entity: number;
} | {
    entityId: number;
} | {
    user: User.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "areaId">> & ({
    area?: never;
    areaId: ForeignKey<"area">;
}) & ({
    entity?: never;
    entityId?: never;
    user?: User.CreateSingleOperation;
} | {
    entity?: "user";
    entityId?: ForeignKey<"User">;
    user?: User.UpdateOperation;
} | {
    entity?: "user";
    entityId?: ForeignKey<"User">;
    user?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "areaId">> & ({
    area?: never;
    areaId?: ForeignKey<"area">;
}) & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: "user" | string;
    entityId?: ForeignKey<"User">;
    user?: never;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type AreaIdSubQuery = Selection<AreaIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
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