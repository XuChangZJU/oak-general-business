import { String, Uint, Boolean, Datetime, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Application from "../Application/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export declare type OpSchema = EntityShape & {
    text: String<32>;
    applicationId: ForeignKey<"application">;
    wechatId: Uint<4>;
    sync: Boolean;
    syncAt: Datetime;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    text: String<32>;
    applicationId: ForeignKey<"application">;
    wechatId: Uint<4>;
    sync: Boolean;
    syncAt: Datetime;
    application: Application.Schema;
    userWechatPublicTag$wechatPublicTag?: Array<UserWechatPublicTag.Schema>;
    userWechatPublicTag$wechatPublicTag$$aggr?: AggregationResult<UserWechatPublicTag.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.WechatPublicTagIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    text: Q_StringValue;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
    wechatId: Q_NumberValue;
    sync: Q_BooleanValue;
    syncAt: Q_DateValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
    userWechatPublicTag$wechatPublicTag?: UserWechatPublicTag.Selection & {
        $entity: "userWechatPublicTag";
    };
    userWechatPublicTag$wechatPublicTag$$aggr?: UserWechatPublicTag.Aggregation & {
        $entity: "userWechatPublicTag";
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
declare type WechatPublicTagIdProjection = OneOf<{
    id: number;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: number;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
} | {
    applicationId: String<64>;
})) & {
    userWechatPublicTag$wechatPublicTag?: OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, UserWechatPublicTag.Filter> | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "wechatPublicTag" | "wechatPublicTagId">, UserWechatPublicTag.Filter>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId">> & (({
    application: Application.CreateSingleOperation;
    applicationId?: never;
} | {
    application: Application.UpdateOperation;
    applicationId?: never;
} | {
    application: Application.RemoveOperation;
    applicationId?: never;
} | {
    application?: never;
    applicationId?: String<64> | null;
})) & {
    [k: string]: any;
    userWechatPublicTag$wechatPublicTag?: UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "wechatPublicTag" | "wechatPublicTagId">> | UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
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
