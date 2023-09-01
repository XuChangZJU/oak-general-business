import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type Relation = 'owner';
import * as UserRole from "../UserRole/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
export type OpSchema = EntityShape & {
    name: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    name: String<64>;
    userRole$role?: Array<UserRole.Schema>;
    userRole$role$$aggr?: AggregationResult<UserRole.Schema>;
    userEntityGrant$entity?: Array<UserEntityGrant.Schema>;
    userEntityGrant$entity$$aggr?: AggregationResult<UserEntityGrant.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.RoleIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    name?: number;
    userRole$role?: UserRole.Selection & {
        $entity: "userRole";
    };
    userRole$role$$aggr?: UserRole.Aggregation & {
        $entity: "userRole";
    };
    userEntityGrant$entity?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$entity$$aggr?: UserEntityGrant.Aggregation & {
        $entity: "userEntityGrant";
    };
} & Partial<ExprOp<OpAttr | string>>;
type RoleIdProjection = OneOf<{
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
    name: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<OpSchema> & {
    userRole$role?: OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">[]> | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, UserEntityGrant.Filter> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, UserEntityGrant.Filter>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    userRole$role?: UserRole.RemoveOperation | OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">[]> | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">> | UserRole.RemoveOperation>;
    userEntityGrant$entity?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation>;
};
export type UpdateOperation = OakOperation<"update" | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {};
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type RoleIdSubQuery = Selection<RoleIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<ReadOnlyAction | RelationAction> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    Relation: Relation;
};