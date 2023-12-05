import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { String, Datetime, Boolean, Uint } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Application from "../Application/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as WechatMenu from "../WechatMenu/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type OpSchema = EntityShape & {
    text: String<32>;
    applicationId: ForeignKey<"application">;
    wechatId?: Uint<4> | null;
    sync?: Boolean | null;
    syncAt?: Datetime | null;
    iState?: IState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    text: String<32>;
    applicationId: ForeignKey<"application">;
    wechatId?: Uint<4> | null;
    sync?: Boolean | null;
    syncAt?: Datetime | null;
    iState?: IState | null;
    application: Application.Schema;
    userWechatPublicTag$wechatPublicTag?: Array<UserWechatPublicTag.Schema>;
    userWechatPublicTag$wechatPublicTag$$aggr?: AggregationResult<UserWechatPublicTag.Schema>;
    wechatMenu$wechatPublicTag?: Array<WechatMenu.Schema>;
    wechatMenu$wechatPublicTag$$aggr?: AggregationResult<WechatMenu.Schema>;
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
    text: Q_StringValue;
    applicationId: Q_StringValue;
    application: Application.Filter;
    wechatId: Q_NumberValue;
    sync: Q_BooleanValue;
    syncAt: Q_DateValue;
    iState: Q_EnumValue<IState>;
    userWechatPublicTag$wechatPublicTag: UserWechatPublicTag.Filter & SubQueryPredicateMetadata;
    wechatMenu$wechatPublicTag: WechatMenu.Filter & SubQueryPredicateMetadata;
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
    text?: number;
    applicationId?: number;
    application?: Application.Projection;
    wechatId?: number;
    sync?: number;
    syncAt?: number;
    iState?: number;
    userWechatPublicTag$wechatPublicTag?: UserWechatPublicTag.Selection & {
        $entity: "userWechatPublicTag";
    };
    userWechatPublicTag$wechatPublicTag$$aggr?: UserWechatPublicTag.Aggregation & {
        $entity: "userWechatPublicTag";
    };
    wechatMenu$wechatPublicTag?: WechatMenu.Selection & {
        $entity: "wechatMenu";
    };
    wechatMenu$wechatPublicTag$$aggr?: WechatMenu.Aggregation & {
        $entity: "wechatMenu";
    };
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
type WechatPublicTagIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
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
    text: number;
} | {
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    wechatId: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId: ForeignKey<"application">;
})) & {
    userWechatPublicTag$wechatPublicTag?: OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">>>;
    wechatMenu$wechatPublicTag?: OakOperation<WechatMenu.UpdateOperation["action"], Omit<WechatMenu.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<"create", Omit<WechatMenu.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<WechatMenu.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<WechatMenu.UpdateOperation["action"], Omit<WechatMenu.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId">> & (({
    application?: Application.CreateSingleOperation;
    applicationId?: never;
} | {
    application?: Application.UpdateOperation;
    applicationId?: never;
} | {
    application?: Application.RemoveOperation;
    applicationId?: never;
} | {
    application?: never;
    applicationId?: ForeignKey<"application">;
})) & {
    [k: string]: any;
    userWechatPublicTag$wechatPublicTag?: OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<UserWechatPublicTag.RemoveOperation["action"], Omit<UserWechatPublicTag.RemoveOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<UserWechatPublicTag.RemoveOperation["action"], Omit<UserWechatPublicTag.RemoveOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<UserWechatPublicTag.Filter, "wechatPublicTag" | "wechatPublicTagId">>>;
    wechatMenu$wechatPublicTag?: OakOperation<WechatMenu.UpdateOperation["action"], Omit<WechatMenu.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<WechatMenu.RemoveOperation["action"], Omit<WechatMenu.RemoveOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<"create", Omit<WechatMenu.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<WechatMenu.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<WechatMenu.UpdateOperation["action"], Omit<WechatMenu.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<WechatMenu.RemoveOperation["action"], Omit<WechatMenu.RemoveOperationData, "wechatPublicTag" | "wechatPublicTagId">, Omit<WechatMenu.Filter, "wechatPublicTag" | "wechatPublicTagId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
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
export {};
