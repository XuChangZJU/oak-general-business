import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, IState, VisitState } from "./Action";
import { String, Text } from "oak-domain/lib/types/DataType";
import { Weight, Channel } from "../../types/Message";
import * as User from "../User/Schema";
import * as Platform from "../Platform/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
import * as WechatMpJump from "../WechatMpJump/Schema";
export type Router = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
type MessageRestriction = {
    systemIds?: string[];
    channels?: Array<Channel>;
};
type Chaanels = Channel[];
export type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    userId: ForeignKey<"user">;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction | null;
    title: String<256>;
    content: Text;
    data?: Object | null;
    router?: Router | null;
    platformId?: ForeignKey<"platform"> | null;
    channels?: Chaanels | null;
    iState?: IState | null;
    visitState?: VisitState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    userId: ForeignKey<"user">;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction | null;
    title: String<256>;
    content: Text;
    data?: Object | null;
    router?: Router | null;
    platformId?: ForeignKey<"platform"> | null;
    channels?: Chaanels | null;
    iState?: IState | null;
    visitState?: VisitState | null;
    user: User.Schema;
    platform?: Platform.Schema | null;
    messageSystem$message?: Array<MessageSystem.Schema>;
    messageSystem$message$$aggr?: AggregationResult<MessageSystem.Schema>;
    wechatMpJump$message?: Array<WechatMpJump.Schema>;
    wechatMpJump$message$$aggr?: AggregationResult<WechatMpJump.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    userId: Q_StringValue;
    user: User.Filter;
    type: Q_StringValue;
    weight: Q_EnumValue<Weight>;
    restriction: JsonFilter<MessageRestriction>;
    title: Q_StringValue;
    content: Q_StringValue;
    data: Object;
    router: JsonFilter<Router>;
    platformId: Q_StringValue;
    platform: Platform.Filter;
    channels: JsonFilter<Chaanels>;
    iState: Q_EnumValue<IState>;
    visitState: Q_EnumValue<VisitState>;
    messageSystem$message: MessageSystem.Filter & SubQueryPredicateMetadata;
    wechatMpJump$message: WechatMpJump.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    entity?: number;
    entityId?: number;
    userId?: number;
    user?: User.Projection;
    type?: number;
    weight?: number;
    restriction?: number | JsonProjection<MessageRestriction>;
    title?: number;
    content?: number;
    data?: number | Object;
    router?: number | JsonProjection<Router>;
    platformId?: number;
    platform?: Platform.Projection;
    channels?: number | JsonProjection<Chaanels>;
    iState?: number;
    visitState?: number;
    messageSystem$message?: MessageSystem.Selection & {
        $entity: "messageSystem";
    };
    messageSystem$message$$aggr?: MessageSystem.Aggregation & {
        $entity: "messageSystem";
    };
    wechatMpJump$message?: WechatMpJump.Selection & {
        $entity: "wechatMpJump";
    };
    wechatMpJump$message$$aggr?: WechatMpJump.Aggregation & {
        $entity: "wechatMpJump";
    };
} & Partial<ExprOp<OpAttr | string>>;
type MessageIdProjection = OneOf<{
    id: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
}>;
type PlatformIdProjection = OneOf<{
    platformId: number;
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
    entity: number;
} | {
    entityId: number;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    type: number;
} | {
    weight: number;
} | {
    restriction: number;
} | {
    title: number;
} | {
    content: number;
} | {
    router: number;
} | {
    platformId: number;
} | {
    platform: Platform.SortAttr;
} | {
    channels: number;
} | {
    iState: number;
} | {
    visitState: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "userId" | "platformId">> & (({
    userId?: never;
    user: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    user?: never;
    userId: ForeignKey<"user">;
}) & ({
    platformId?: never;
    platform?: Platform.CreateSingleOperation;
} | {
    platformId: ForeignKey<"platform">;
    platform?: Platform.UpdateOperation;
} | {
    platform?: never;
    platformId?: ForeignKey<"platform">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    messageSystem$message?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">>>;
    wechatMpJump$message?: OakOperation<WechatMpJump.UpdateOperation["action"], Omit<WechatMpJump.UpdateOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">> | OakOperation<"create", Omit<WechatMpJump.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<WechatMpJump.CreateOperationData, "message" | "messageId">> | OakOperation<WechatMpJump.UpdateOperation["action"], Omit<WechatMpJump.UpdateOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "platformId">> & (({
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
    platform?: Platform.CreateSingleOperation;
    platformId?: never;
} | {
    platform?: Platform.UpdateOperation;
    platformId?: never;
} | {
    platform?: Platform.RemoveOperation;
    platformId?: never;
} | {
    platform?: never;
    platformId?: ForeignKey<"platform"> | null;
})) & {
    [k: string]: any;
    messageSystem$message?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "message" | "messageId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "message" | "messageId">, Omit<MessageSystem.Filter, "message" | "messageId">>>;
    wechatMpJump$message?: OakOperation<WechatMpJump.UpdateOperation["action"], Omit<WechatMpJump.UpdateOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">> | OakOperation<WechatMpJump.RemoveOperation["action"], Omit<WechatMpJump.RemoveOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">> | OakOperation<"create", Omit<WechatMpJump.CreateOperationData, "message" | "messageId">[]> | Array<OakOperation<"create", Omit<WechatMpJump.CreateOperationData, "message" | "messageId">> | OakOperation<WechatMpJump.UpdateOperation["action"], Omit<WechatMpJump.UpdateOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">> | OakOperation<WechatMpJump.RemoveOperation["action"], Omit<WechatMpJump.RemoveOperationData, "message" | "messageId">, Omit<WechatMpJump.Filter, "message" | "messageId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    platform?: Platform.UpdateOperation | Platform.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type PlatformIdSubQuery = Selection<PlatformIdProjection>;
export type MessageIdSubQuery = Selection<MessageIdProjection>;
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
