import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { Datetime, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as User from "../User/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type OpSchema = EntityShape & {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    userId: ForeignKey<"user">;
    sync: Boolean;
    syncAt: Datetime;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    userId: ForeignKey<"user">;
    sync: Boolean;
    syncAt: Datetime;
    wechatPublicTag: WechatPublicTag.Schema;
    user: User.Schema;
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
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    wechatPublicTagId: Q_StringValue;
    wechatPublicTag: WechatPublicTag.Filter;
    userId: Q_StringValue;
    user: User.Filter;
    sync: Q_BooleanValue;
    syncAt: Q_DateValue;
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
    wechatPublicTagId?: number;
    wechatPublicTag?: WechatPublicTag.Projection;
    userId?: number;
    user?: User.Projection;
    sync?: number;
    syncAt?: number;
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
type UserWechatPublicTagIdProjection = OneOf<{
    id: number;
}>;
type WechatPublicTagIdProjection = OneOf<{
    wechatPublicTagId: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
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
    wechatPublicTagId: number;
} | {
    wechatPublicTag: WechatPublicTag.SortAttr;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    sync: number;
} | {
    syncAt: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "wechatPublicTagId" | "userId">> & (({
    wechatPublicTagId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
} | {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
}) & ({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    userId: ForeignKey<"user">;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "wechatPublicTagId" | "userId">> & (({
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag: WechatPublicTag.UpdateOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag: WechatPublicTag.RemoveOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag?: never;
    wechatPublicTagId?: ForeignKey<"wechatPublicTag"> | null;
}) & ({
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
    userId?: ForeignKey<"user"> | null;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
}) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type UserWechatPublicTagIdSubQuery = Selection<UserWechatPublicTagIdProjection>;
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
