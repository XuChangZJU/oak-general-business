import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { ExcludeUpdateAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as Role from "../Role/Schema";
export declare type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    roleId: ForeignKey<"role">;
    relation: 'owner';
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    roleId: Q_StringValue | SubQuery.RoleIdSubQuery;
    role: Role.Filter;
    relation: Q_EnumValue<'owner'>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    userId?: number;
    user?: User.Projection;
    roleId?: number;
    role?: Role.Projection;
    relation?: number;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    userId?: string;
    user?: User.ExportProjection;
    roleId?: string;
    role?: Role.ExportProjection;
    relation?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type UserRoleIdProjection = OneOf<{
    id: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
}>;
declare type RoleIdProjection = OneOf<{
    roleId: number;
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
    userId: number;
} | {
    user: User.SortAttr;
} | {
    roleId: number;
} | {
    role: Role.SortAttr;
} | {
    relation: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "roleId">> & (({
    userId?: never;
    user?: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId?: String<64>;
}) & {
    roleId?: String<64>;
});
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "roleId">> & (({
    user: User.CreateSingleOperation;
    userId?: never;
} | {
    user: User.UpdateOperation;
    userId?: never;
} | {
    user: User.RemoveOperation;
    userId?: never;
} | {
    user?: never;
    userId?: String<64> | null;
}) & {
    role?: never;
    roleId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type RoleIdSubQuery = Selection<RoleIdProjection>;
export declare type UserRoleIdSubQuery = Selection<UserRoleIdProjection>;
export declare type NativeAttr = OpAttr | `user.${User.NativeAttr}` | `role.${Role.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<ExcludeUpdateAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
