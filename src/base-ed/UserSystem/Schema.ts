import { String, Int, Float, Double, Boolean, Text, Datetime, File, Image, PrimaryKey, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as System from "../System/Schema";
export type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    relation: 'owner';
};
export type OpAttr = keyof OpSchema;
export type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    relation: 'owner';
    user: User.Schema;
    system: System.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.UserSystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
    relation: Q_EnumValue<'owner'>;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export type Projection = {
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
} & Partial<ExprOp<OpAttr>>;
export type ExportProjection = {
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
} & Partial<ExprOp<OpAttr>>;
type UserSystemIdProjection = OneOf<{
    id: 1;
}>;
type UserIdProjection = OneOf<{
    userId: 1;
}>;
type SystemIdProjection = OneOf<{
    systemId: 1;
}>;
export type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    userId: 1;
    user: User.SortAttr;
    systemId: 1;
    system: System.SortAttr;
    relation: 1;
} & ExprOp<OpAttr>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "systemId" | "user" | "system"> & ({
    user?: User.CreateSingleOperation | (User.UpdateOperation & {
        id: String<64>;
    });
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64>;
}) & ({
    system?: System.CreateSingleOperation | (System.UpdateOperation & {
        id: String<64>;
    });
    systemId?: undefined;
} | {
    system?: undefined;
    systemId?: String<64>;
}) & {
    [k: string]: any;
}>;
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "systemId" | "user" | "system">> & ({
    user?: User.CreateSingleOperation | Omit<User.UpdateOperation, "id" | "ids" | "filter">;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64>;
}) & ({
    system?: System.CreateSingleOperation | Omit<System.UpdateOperation, "id" | "ids" | "filter">;
    systemId?: undefined;
} | {
    system?: undefined;
    systemId?: String<64>;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export type RemoveOperationData = {} & {
    user?: Omit<User.UpdateOperation | User.RemoveOperation, "id" | "ids" | "filter">;
    system?: Omit<System.UpdateOperation | System.RemoveOperation, "id" | "ids" | "filter">;
} & {
    [k: string]: any;
};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
export type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
export type NativeAttr = OpAttr | `user.${User.NativeAttr}` | `system.${System.NativeAttr}`;
export type FullAttr = NativeAttr;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
};