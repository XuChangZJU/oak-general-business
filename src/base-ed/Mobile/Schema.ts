import { String, Int, Float, Double, Boolean, Text, Datetime, File, Image, PrimaryKey, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as Token from "../Token/Schema";
export type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    mobile: String<16>;
    userId: ForeignKey<"user">;
};
export type OpAttr = keyof OpSchema;
export type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    mobile: String<16>;
    userId: ForeignKey<"user">;
    user: User.Schema;
    token$entity?: Array<Token.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.MobileIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    mobile: Q_StringValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    mobile?: 1;
    userId?: 1;
    user?: User.Projection;
    token$entity?: Token.Selection;
} & Partial<ExprOp<OpAttr>>;
export type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    mobile?: string;
    userId?: string;
    user?: User.ExportProjection;
    token$entity?: Token.Exportation;
} & Partial<ExprOp<OpAttr>>;
type MobileIdProjection = OneOf<{
    id: 1;
}>;
type UserIdProjection = OneOf<{
    userId: 1;
}>;
export type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    mobile: 1;
    userId: 1;
    user: User.SortAttr;
} & ExprOp<OpAttr>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "user"> & ({
    user?: User.CreateSingleOperation | (User.UpdateOperation & {
        id: String<64>;
    });
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64>;
}) & {
    [k: string]: any;
    token$entity?: Token.CreateOperation | Token.UpdateOperation;
}>;
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "user">> & ({
    user?: User.CreateSingleOperation | Omit<User.UpdateOperation, "id" | "ids" | "filter">;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64>;
}) & {
    [k: string]: any;
    tokens$entity?: Token.CreateOperation | Omit<Token.UpdateOperation, "id" | "ids" | "filter">;
};
export type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export type RemoveOperationData = {} & {
    user?: Omit<User.UpdateOperation | User.RemoveOperation, "id" | "ids" | "filter">;
} & {
    [k: string]: any;
    tokens$entity?: Omit<Token.UpdateOperation | Token.RemoveOperation, "id" | "ids" | "filter">;
};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type MobileIdSubQuery = Selection<MobileIdProjection>;
export type NativeAttr = OpAttr | `user.${User.NativeAttr}`;
export type FullAttr = NativeAttr | `tokens$${number}.${Token.NativeAttr}`;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
};