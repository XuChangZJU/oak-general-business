import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Image, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Application from "../Application/Schema";
import * as Session from "../Session/Schema";
import * as User from "../User/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
type Type = 'text' | 'image' | 'voice' | 'video' | 'location' | 'link' | 'event' | 'miniprogrampage';
export type OpSchema = EntityShape & {
    applicationId: ForeignKey<"application">;
    sessionId: ForeignKey<"session">;
    userId?: ForeignKey<"user"> | null;
    wechatUserId?: ForeignKey<"wechatUser"> | null;
    createTime?: Datetime | null;
    type: Type;
    text?: Text | null;
    news?: String<128> | null;
    aaoe?: Boolean | null;
    extra?: Object | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    applicationId: ForeignKey<"application">;
    sessionId: ForeignKey<"session">;
    userId?: ForeignKey<"user"> | null;
    wechatUserId?: ForeignKey<"wechatUser"> | null;
    createTime?: Datetime | null;
    type: Type;
    text?: Text | null;
    news?: String<128> | null;
    aaoe?: Boolean | null;
    extra?: Object | null;
    application: Application.Schema;
    session: Session.Schema;
    user?: User.Schema | null;
    wechatUser?: WechatUser.Schema | null;
    extraFile$entity?: Array<ExtraFile.Schema>;
    extraFile$entity$$aggr?: AggregationResult<ExtraFile.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    applicationId: Q_StringValue;
    application: Application.Filter;
    sessionId: Q_StringValue;
    session: Session.Filter;
    userId: Q_StringValue;
    user: User.Filter;
    wechatUserId: Q_StringValue;
    wechatUser: WechatUser.Filter;
    createTime: Q_DateValue;
    type: Q_EnumValue<Type>;
    text: Q_StringValue;
    news: Q_StringValue;
    aaoe: Q_BooleanValue;
    extra: Object;
    extraFile$entity: ExtraFile.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    applicationId?: number;
    application?: Application.Projection;
    sessionId?: number;
    session?: Session.Projection;
    userId?: number;
    user?: User.Projection;
    wechatUserId?: number;
    wechatUser?: WechatUser.Projection;
    createTime?: number;
    type?: number;
    text?: number;
    news?: number;
    aaoe?: number;
    extra?: number | Object;
    extraFile$entity?: ExtraFile.Selection & {
        $entity: "extraFile";
    };
    extraFile$entity$$aggr?: ExtraFile.Aggregation & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr | string>>;
type SessionMessageIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type SessionIdProjection = OneOf<{
    sessionId: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
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
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    sessionId: number;
} | {
    session: Session.SortAttr;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    wechatUserId: number;
} | {
    wechatUser: WechatUser.SortAttr;
} | {
    createTime: number;
} | {
    type: number;
} | {
    text: number;
} | {
    news: number;
} | {
    aaoe: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "sessionId" | "userId" | "wechatUserId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    applicationId: ForeignKey<"application">;
}) & ({
    sessionId?: never;
    session: Session.CreateSingleOperation;
} | {
    sessionId: ForeignKey<"session">;
    session?: Session.UpdateOperation;
} | {
    sessionId: ForeignKey<"session">;
}) & ({
    userId?: never;
    user?: User.CreateSingleOperation;
} | {
    userId: ForeignKey<"user">;
    user?: User.UpdateOperation;
} | {
    userId?: ForeignKey<"user">;
}) & ({
    wechatUserId?: never;
    wechatUser?: WechatUser.CreateSingleOperation;
} | {
    wechatUserId: ForeignKey<"wechatUser">;
    wechatUser?: WechatUser.UpdateOperation;
} | {
    wechatUserId?: ForeignKey<"wechatUser">;
})) & {
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "sessionId" | "userId" | "wechatUserId">> & (({
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
    applicationId?: ForeignKey<"application"> | null;
}) & ({
    session: Session.CreateSingleOperation;
    sessionId?: never;
} | {
    session: Session.UpdateOperation;
    sessionId?: never;
} | {
    session: Session.RemoveOperation;
    sessionId?: never;
} | {
    session?: never;
    sessionId?: ForeignKey<"session"> | null;
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
}) & ({
    wechatUser: WechatUser.CreateSingleOperation;
    wechatUserId?: never;
} | {
    wechatUser: WechatUser.UpdateOperation;
    wechatUserId?: never;
} | {
    wechatUser: WechatUser.RemoveOperation;
    wechatUserId?: never;
} | {
    wechatUser?: never;
    wechatUserId?: ForeignKey<"wechatUser"> | null;
})) & {
    [k: string]: any;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}) & ({
    session?: Session.UpdateOperation | Session.RemoveOperation;
}) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type SessionIdSubQuery = Selection<SessionIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export type SessionMessageIdSubQuery = Selection<SessionMessageIdProjection>;
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