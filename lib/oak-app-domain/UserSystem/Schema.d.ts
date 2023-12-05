import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as User from "../User/Schema";
import * as System from "../System/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type OpSchema = EntityShape & {
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    userId: ForeignKey<"user">;
    systemId: ForeignKey<"system">;
    user: User.Schema;
    system: System.Schema;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    userId: Q_StringValue;
    user: User.Filter;
    systemId: Q_StringValue;
    system: System.Filter;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    userId?: number;
    user?: User.Projection;
    systemId?: number;
    system?: System.Projection;
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    modiEntity$entity$$aggr?: ModiEntity.Aggregation & {
        $entity: "modiEntity";
    };
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    operEntity$entity$$aggr?: OperEntity.Aggregation & {
        $entity: "operEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
type UserSystemIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
}>;
type SystemIdProjection = OneOf<{
    systemId: number;
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
    userId: number;
} | {
    user: User.SortAttr;
} | {
    systemId: number;
} | {
    system: System.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "systemId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    user?: never;
    userId: ForeignKey<"user">;
}) & ({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: ForeignKey<"system">;
    system?: System.UpdateOperation;
} | {
    system?: never;
    systemId: ForeignKey<"system">;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "systemId">> & (({
    user?: User.CreateSingleOperation;
    userId?: never;
} | {
    user?: User.UpdateOperation;
    userId?: never;
} | {
    user?: User.RemoveOperation;
    userId?: never;
} | {
    user?: never;
    userId?: ForeignKey<"user">;
}) & ({
    system?: System.CreateSingleOperation;
    systemId?: never;
} | {
    system?: System.UpdateOperation;
    systemId?: never;
} | {
    system?: System.RemoveOperation;
    systemId?: never;
} | {
    system?: never;
    systemId?: ForeignKey<"system">;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
export type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
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
export {};
