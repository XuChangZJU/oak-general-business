import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState } from "./Action";
import { Int } from "oak-domain/lib/types/DataType";
import * as Application from "../Application/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
type Config = {
    button: any[];
    matchrule?: {
        tag_id?: string;
    };
};
export type OpSchema = EntityShape & {
    menuId?: Int<4> | null;
    menuConfig: Config;
    applicationId: ForeignKey<"application">;
    wechatPublicTagId?: ForeignKey<"wechatPublicTag"> | null;
    iState?: IState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    menuId?: Int<4> | null;
    menuConfig: Config;
    applicationId: ForeignKey<"application">;
    wechatPublicTagId?: ForeignKey<"wechatPublicTag"> | null;
    iState?: IState | null;
    application: Application.Schema;
    wechatPublicTag?: WechatPublicTag.Schema | null;
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
    menuId: Q_NumberValue;
    menuConfig: JsonFilter<Config>;
    applicationId: Q_StringValue;
    application: Application.Filter;
    wechatPublicTagId: Q_StringValue;
    wechatPublicTag: WechatPublicTag.Filter;
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
    menuId?: number;
    menuConfig?: number | JsonProjection<Config>;
    applicationId?: number;
    application?: Application.Projection;
    wechatPublicTagId?: number;
    wechatPublicTag?: WechatPublicTag.Projection;
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
type WechatMenuIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type WechatPublicTagIdProjection = OneOf<{
    wechatPublicTagId: number;
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
    menuId: number;
} | {
    menuConfig: number;
} | {
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    wechatPublicTagId: number;
} | {
    wechatPublicTag: WechatPublicTag.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "wechatPublicTagId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId: ForeignKey<"application">;
}) & ({
    wechatPublicTagId?: never;
    wechatPublicTag?: WechatPublicTag.CreateSingleOperation;
} | {
    wechatPublicTagId: ForeignKey<"wechatPublicTag">;
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
} | {
    wechatPublicTag?: never;
    wechatPublicTagId?: ForeignKey<"wechatPublicTag">;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "wechatPublicTagId">> & (({
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
}) & ({
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
    wechatPublicTagId?: ForeignKey<"wechatPublicTag"> | null;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}) & ({
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export type WechatMenuIdSubQuery = Selection<WechatMenuIdProjection>;
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
