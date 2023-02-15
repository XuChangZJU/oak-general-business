import { String } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { ReadOnlyAction, RelationAction } from "oak-domain/lib/actions/action";
export declare type Relation = 'owner';
import * as UserRole from "../UserRole/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
export declare type OpSchema = EntityShape & {
    name: String<64>;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    name: String<64>;
    userRole$role?: Array<UserRole.Schema>;
    userRole$role$$aggr?: AggregationResult<UserRole.Schema>;
    userEntityGrant$entity?: Array<UserEntityGrant.Schema>;
    userEntityGrant$entity$$aggr?: AggregationResult<UserEntityGrant.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.RoleIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type RoleIdProjection = OneOf<{
    id: number;
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
    name: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<OpSchema> & {
    userRole$role?: OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">[]> | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">>>;
    userEntityGrant$entity?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, UserEntityGrant.Filter> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "entity" | "entityId">, UserEntityGrant.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    userRole$role?: UserRole.RemoveOperation | OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">[]> | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "role" | "roleId">> | UserRole.RemoveOperation>;
    userEntityGrant$entity?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "entity" | "entityId">> | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type RoleIdSubQuery = Selection<RoleIdProjection>;
export declare type EntityDef = {
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
export {};
