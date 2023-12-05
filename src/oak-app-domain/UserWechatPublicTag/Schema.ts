import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Text, Datetime, Boolean, Uint } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import { ActionDef } from "oak-domain/lib/types/Action";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type OpSchema = EntityShape & {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    wechatUserId: ForeignKey<"wechatUser">;
    sync: Boolean;
    syncAt: Datetime;
    iState?: IState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    wechatUserId: ForeignKey<"wechatUser">;
    sync: Boolean;
    syncAt: Datetime;
    iState?: IState | null;
    wechatPublicTag: WechatPublicTag.Schema;
    wechatUser: WechatUser.Schema;
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
    wechatPublicTagId: Q_StringValue;
    wechatPublicTag: WechatPublicTag.Filter;
    wechatUserId: Q_StringValue;
    wechatUser: WechatUser.Filter;
    sync: Q_BooleanValue;
    syncAt: Q_DateValue;
    iState: Q_EnumValue<IState>;
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
    wechatUserId?: number;
    wechatUser?: WechatUser.Projection;
    sync?: number;
    syncAt?: number;
    iState?: number;
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
type WechatUserIdProjection = OneOf<{
    wechatUserId: number;
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
    wechatUserId: number;
} | {
    wechatUser: WechatUser.SortAttr;
} | {
    sync: number;
} | {
    syncAt: number;
} | {
    iState: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "wechatPublicTagId" | "wechatUserId">> & (({
    wechatPublicTagId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
} | {
    wechatPublicTag?: never;
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
}) & ({
    wechatUserId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    wechatUserId: ForeignKey<"wechatUser">;
    wechatUser?: WechatUser.UpdateOperation;
} | {
    wechatUser?: never;
    wechatUserId: ForeignKey<"wechatUser">;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "wechatPublicTagId" | "wechatUserId">> & (({
    wechatPublicTag?: WechatPublicTag.CreateSingleOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag?: WechatPublicTag.RemoveOperation;
    wechatPublicTagId?: never;
} | {
    wechatPublicTag?: never;
    wechatPublicTagId?: ForeignKey<"wechatPublicTag">;
}) & ({
    wechatUser?: WechatUser.CreateSingleOperation;
    wechatUserId?: never;
} | {
    wechatUser?: WechatUser.UpdateOperation;
    wechatUserId?: never;
} | {
    wechatUser?: WechatUser.RemoveOperation;
    wechatUserId?: never;
} | {
    wechatUser?: never;
    wechatUserId?: ForeignKey<"wechatUser">;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
}) & ({
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export type UserWechatPublicTagIdSubQuery = Selection<UserWechatPublicTagIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};