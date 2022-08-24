import { String, Boolean, Datetime, Image, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as User from "../User/Schema";
import * as Application from "../Application/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as Token from "../Token/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    origin: 'mp' | 'public' | 'web';
    openId?: String<32> | null;
    unionId?: String<32> | null;
    accessToken?: String<32> | null;
    sessionKey?: String<64> | null;
    subscribed?: Boolean | null;
    subscribedAt?: Datetime | null;
    unsubscribedAt?: Datetime | null;
    userId?: ForeignKey<"user"> | null;
    applicationId: ForeignKey<"application">;
    nickname?: String<128> | null;
    avatar?: Image | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    origin: 'mp' | 'public' | 'web';
    openId?: String<32> | null;
    unionId?: String<32> | null;
    accessToken?: String<32> | null;
    sessionKey?: String<64> | null;
    subscribed?: Boolean | null;
    subscribedAt?: Datetime | null;
    unsubscribedAt?: Datetime | null;
    userId?: ForeignKey<"user"> | null;
    applicationId: ForeignKey<"application">;
    nickname?: String<128> | null;
    avatar?: Image | null;
    user?: User.Schema | null;
    application: Application.Schema;
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    token$entity?: Array<Token.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.WechatUserIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    origin: Q_EnumValue<'mp' | 'public' | 'web'>;
    openId: Q_StringValue;
    unionId: Q_StringValue;
    accessToken: Q_StringValue;
    sessionKey: Q_StringValue;
    subscribed: Q_BooleanValue;
    subscribedAt: Q_DateValue;
    unsubscribedAt: Q_DateValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
    nickname: Q_StringValue;
    avatar: Q_StringValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    origin?: 1;
    openId?: 1;
    unionId?: 1;
    accessToken?: 1;
    sessionKey?: 1;
    subscribed?: 1;
    subscribedAt?: 1;
    unsubscribedAt?: 1;
    userId?: 1;
    user?: User.Projection;
    applicationId?: 1;
    application?: Application.Projection;
    nickname?: 1;
    avatar?: 1;
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    token$entity?: Token.Selection & {
        $entity: "token";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    origin?: string;
    openId?: string;
    unionId?: string;
    accessToken?: string;
    sessionKey?: string;
    subscribed?: string;
    subscribedAt?: string;
    unsubscribedAt?: string;
    userId?: string;
    user?: User.ExportProjection;
    applicationId?: string;
    application?: Application.ExportProjection;
    nickname?: string;
    avatar?: string;
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
    token$entity?: Token.Exportation & {
        $entity: "token";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type WechatUserIdProjection = OneOf<{
    id: 1;
}>;
declare type UserIdProjection = OneOf<{
    userId: 1;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    origin: 1;
} | {
    openId: 1;
} | {
    unionId: 1;
} | {
    accessToken: 1;
} | {
    sessionKey: 1;
} | {
    subscribed: 1;
} | {
    subscribedAt: 1;
} | {
    unsubscribedAt: 1;
} | {
    userId: 1;
} | {
    user: User.SortAttr;
} | {
    applicationId: 1;
} | {
    application: Application.SortAttr;
} | {
    nickname: 1;
} | {
    avatar: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "userId" | "applicationId">> & (({
    userId?: never | null;
    user?: User.CreateSingleOperation;
} | {
    userId?: String<64>;
    user?: User.UpdateOperation;
}) & ({
    applicationId?: never | null;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
})) & {
    [k: string]: any;
    operEntity$entity?: OakOperation<OperEntity.UpdateOperation["action"], Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<OperEntity.UpdateOperation["action"], Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter>>;
    modiEntity$entity?: OakOperation<ModiEntity.UpdateOperation["action"], Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<ModiEntity.UpdateOperation["action"], Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter>>;
    token$entity?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Token.Filter> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId"> | Omit<Token.CreateOperationData, "entity" | "entityId">[]> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "entity" | "entityId">, Token.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "userId" | "applicationId">> & (({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64> | null;
}) & ({
    application?: Application.CreateSingleOperation | Application.UpdateOperation | Application.RemoveOperation;
    applicationId?: undefined;
} | {
    application?: undefined;
    applicationId?: String<64> | null;
})) & {
    [k: string]: any;
    operEntitys$entity?: OperEntity.UpdateOperation | OperEntity.RemoveOperation | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OperEntity.UpdateOperation | OperEntity.RemoveOperation>;
    modiEntitys$entity?: ModiEntity.UpdateOperation | ModiEntity.RemoveOperation | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | ModiEntity.UpdateOperation | ModiEntity.RemoveOperation>;
    tokens$entity?: Token.UpdateOperation | Token.RemoveOperation | Array<OakOperation<"create", Omit<Token.CreateOperationData, "entity" | "entityId"> | Omit<Token.CreateOperationData, "entity" | "entityId">[]> | Token.UpdateOperation | Token.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
}) & ({
    application?: Application.UpdateOperation;
} | {
    application?: Application.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type NativeAttr = OpAttr | `user.${User.NativeAttr}` | `application.${Application.NativeAttr}`;
export declare type FullAttr = NativeAttr | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}` | `tokens$${number}.${Token.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
