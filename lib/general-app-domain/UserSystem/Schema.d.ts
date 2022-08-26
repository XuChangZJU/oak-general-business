import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as System from "../System/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    relation: 'owner';
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    relation: 'owner';
    user: User.Schema;
    system: System.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.UserSystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
    relation: Q_EnumValue<'owner'>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    userId?: 1;
    user?: User.Projection;
    systemId?: 1;
    system?: System.Projection;
    relation?: 1;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    userId?: string;
    user?: User.ExportProjection;
    systemId?: string;
    system?: System.ExportProjection;
    relation?: string;
} & Partial<ExprOp<OpAttr | string>>;
declare type UserSystemIdProjection = OneOf<{
    id: 1;
}>;
declare type UserIdProjection = OneOf<{
    userId: 1;
}>;
declare type SystemIdProjection = OneOf<{
    systemId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    userId: 1;
} | {
    user: User.SortAttr;
} | {
    systemId: 1;
} | {
    system: System.SortAttr;
} | {
    relation: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "systemId">> & (({
    userId?: never | null;
    user?: User.CreateSingleOperation;
} | {
    userId?: String<64>;
    user?: User.UpdateOperation;
}) & ({
    systemId?: never | null;
    system?: System.CreateSingleOperation;
} | {
    systemId?: String<64>;
    system?: System.UpdateOperation;
}));
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "systemId">> & (({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64> | null;
}) & ({
    system?: System.CreateSingleOperation | System.UpdateOperation | System.RemoveOperation;
    systemId?: undefined;
} | {
    system?: undefined;
    systemId?: String<64> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
}) & ({
    system?: System.UpdateOperation;
} | {
    system?: System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
export declare type NativeAttr = OpAttr | `user.${User.NativeAttr}` | `system.${System.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
