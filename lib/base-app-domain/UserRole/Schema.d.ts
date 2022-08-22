import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as Role from "../Role/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    roleId: ForeignKey<"role">;
    relation: 'owner';
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    roleId: ForeignKey<"role">;
    relation: 'owner';
    user: User.Schema;
    role: Role.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.UserRoleIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    roleId: Q_StringValue | SubQuery.RoleIdSubQuery;
    role: Role.Filter;
    relation: Q_EnumValue<'owner'>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    userId?: 1;
    user?: User.Projection;
    roleId?: 1;
    role?: Role.Projection;
    relation?: 1;
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    userId?: string;
    user?: User.ExportProjection;
    roleId?: string;
    role?: Role.ExportProjection;
    relation?: string;
} & Partial<ExprOp<OpAttr>>;
declare type UserRoleIdProjection = OneOf<{
    id: 1;
}>;
declare type UserIdProjection = OneOf<{
    userId: 1;
}>;
declare type RoleIdProjection = OneOf<{
    roleId: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    userId: 1;
    user: User.SortAttr;
    roleId: 1;
    role: Role.SortAttr;
    relation: 1;
} & ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "roleId">> & (({
    userId?: never | null;
    user?: User.CreateSingleOperation;
} | {
    userId?: String<64>;
    user?: User.UpdateOperation;
}) & ({
    roleId?: never | null;
    role?: Role.CreateSingleOperation;
} | {
    roleId?: String<64>;
    role?: Role.UpdateOperation;
})) & {
    [k: string]: any;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "roleId">> & (({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64> | null;
}) & ({
    role?: Role.CreateSingleOperation | Role.UpdateOperation | Role.RemoveOperation;
    roleId?: undefined;
} | {
    role?: undefined;
    roleId?: String<64> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
}) & ({
    role?: Role.UpdateOperation;
} | {
    role?: Role.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type RoleIdSubQuery = Selection<RoleIdProjection>;
export declare type UserRoleIdSubQuery = Selection<UserRoleIdProjection>;
export declare type NativeAttr = OpAttr | `user.${User.NativeAttr}` | `role.${Role.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
