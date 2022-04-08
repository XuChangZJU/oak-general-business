import { String, Int, Float, Double, Boolean, Text, Datetime, File, Image, PrimaryKey, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as UserRole from "../UserRole/Schema";
export type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    name: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    name: String<64>;
    userRole$role?: Array<UserRole.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.RoleIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    name?: 1;
    userRole$role?: UserRole.Selection;
} & Partial<ExprOp<OpAttr>>;
export type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    name?: string;
    userRole$role?: UserRole.Exportation;
} & Partial<ExprOp<OpAttr>>;
type RoleIdProjection = OneOf<{
    id: 1;
}>;
export type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    name: 1;
} & ExprOp<OpAttr>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<OpSchema & {
    [k: string]: any;
    userRole$role?: UserRole.CreateOperation | UserRole.UpdateOperation;
}>;
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    userRoles$role?: UserRole.CreateOperation | Omit<UserRole.UpdateOperation, "id" | "ids" | "filter">;
};
export type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export type RemoveOperationData = {} & {
    [k: string]: any;
    userRoles$role?: Omit<UserRole.UpdateOperation | UserRole.RemoveOperation, "id" | "ids" | "filter">;
};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export type RoleIdSubQuery = Selection<RoleIdProjection>;
export type NativeAttr = OpAttr;
export type FullAttr = NativeAttr | `userRoles$${number}.${UserRole.NativeAttr}`;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
};