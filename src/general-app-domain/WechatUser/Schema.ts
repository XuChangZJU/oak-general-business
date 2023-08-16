import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as Application from "../Application/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as Token from "../Token/Schema";
export type OpSchema = EntityShape & {
    origin: 'mp' | 'public' | 'web';
    openId?: String<32> | null;
    unionId?: String<32> | null;
    sessionKey?: String<64> | null;
    accessToken?: String<128> | null;
    refreshToken?: String<128> | null;
    scope?: String<64> | null;
    atExpiredAt?: Datetime | null;
    rtExpiredAt?: Datetime | null;
    subscribed?: Boolean | null;
    subscribedAt?: Datetime | null;
    unsubscribedAt?: Datetime | null;
    userId?: ForeignKey<"user"> | null;
    applicationId: ForeignKey<"application">;
    nickname?: String<128> | null;
    avatar?: Image | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    origin: 'mp' | 'public' | 'web';
    openId?: String<32> | null;
    unionId?: String<32> | null;
    sessionKey?: String<64> | null;
    accessToken?: String<128> | null;
    refreshToken?: String<128> | null;
    scope?: String<64> | null;
    atExpiredAt?: Datetime | null;
    rtExpiredAt?: Datetime | null;
    subscribed?: Boolean | null;
    subscribedAt?: Datetime | null;
    unsubscribedAt?: Datetime | null;
    userId?: ForeignKey<"user"> | null;
    applicationId: ForeignKey<"application">;
    nickname?: String<128> | null;
    avatar?: Image | null;
    user?: User.Schema | null;
    application: Application.Schema;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
    token$entity?: Array<Token.Schema>;
    token$entity$$aggr?: AggregationResult<Token.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'mp' | 'public' | 'web'>;
    openId: Q_StringValue;
    unionId: Q_StringValue;
    sessionKey: Q_StringValue;
    accessToken: Q_StringValue;
    refreshToken: Q_StringValue;
    scope: Q_StringValue;
    atExpiredAt: Q_DateValue;
    rtExpiredAt: Q_DateValue;
    subscribed: Q_BooleanValue;
    subscribedAt: Q_DateValue;
    unsubscribedAt: Q_DateValue;
    userId: Q_StringValue;
    user: User.Filter;
    applicationId: Q_StringValue;
    application: Application.Filter;
    nickname: Q_StringValue;
    avatar: Q_StringValue;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
    token$entity: Token.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    origin?: number;
    openId?: number;
    unionId?: number;
    sessionKey?: number;
    accessToken?: number;
    refreshToken?: number;
    scope?: number;
    atExpiredAt?: number;
    rtExpiredAt?: number;
    subscribed?: number;
    subscribedAt?: number;
    unsubscribedAt?: number;
    userId?: number;
    user?: User.Projection;
    applicationId?: number;
    application?: Application.Projection;
    nickname?: number;
    avatar?: number;
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
    token$entity?: Token.Selection & {
        $entity: "token";
    };
    token$entity$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
} & Partial<ExprOp<OpAttr | string>>;
type WechatUserIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
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
    origin: number;
} | {
    openId: number;
} | {
    unionId: number;
} | {
    sessionKey: number;
} | {
    accessToken: number;
} | {
    refreshToken: number;
} | {
    scope: number;
} | {
    atExpiredAt: number;
} | {
    rtExpiredAt: number;
} | {
    subscribed: number;
} | {
    subscribedAt: number;
} | {
    unsubscribedAt: number;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    nickname: number;
} | {
    avatar: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "applicationId">> & (({
    userId?: never;
    user?: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId?: String<64>;
}) & ({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
} | {
    applicationId: String<64>;
})) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "applicationId">> & (({
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
}) & ({
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
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "entity" | "entityId">, Omit<Token.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
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