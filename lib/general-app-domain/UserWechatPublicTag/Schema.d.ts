import { String, Boolean, Datetime, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as User from "../User/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export declare type OpSchema = EntityShape & {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    userId: ForeignKey<"user">;
    sync: Boolean;
    syncAt: Datetime;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
declare type AttrFilter = {
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
    modiEntity$entity: ModiEntity.Filter;
    operEntity$entity: OperEntity.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
declare type UserWechatPublicTagIdProjection = OneOf<{
    id: number;
}>;
declare type WechatPublicTagIdProjection = OneOf<{
    wechatPublicTagId: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "wechatPublicTagId" | "userId">> & (({
    wechatPublicTagId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    wechatPublicTagId: String<64>;
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
} | {
    wechatPublicTagId: String<64>;
}) & ({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId: String<64>;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "wechatPublicTagId" | "userId">> & (({
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
    wechatPublicTagId?: String<64> | null;
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
    userId?: String<64> | null;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
}) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type UserWechatPublicTagIdSubQuery = Selection<UserWechatPublicTagIdProjection>;
export declare type EntityDef = {
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
