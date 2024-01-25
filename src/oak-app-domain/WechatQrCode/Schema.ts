import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Boolean, Datetime, Text } from "oak-domain/lib/types/DataType";
import { QrCodeType } from "../../types/Config";
import * as Application from "../Application/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
export type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
export type OpSchema = EntityShape & {
    entity: "user" | "userEntityGrant" | "wechatLogin" | string;
    entityId: String<64>;
    type: QrCodeType;
    allowShare: Boolean;
    tag?: String<32> | null;
    tag2?: String<64> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    ticket?: Text | null;
    url?: String<256> | null;
    permanent?: Boolean | null;
    buffer?: Text | null;
    applicationId: ForeignKey<"application">;
    props: WechatQrCodeProps;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: "user" | "userEntityGrant" | "wechatLogin" | string;
    entityId: String<64>;
    type: QrCodeType;
    allowShare: Boolean;
    tag?: String<32> | null;
    tag2?: String<64> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    ticket?: Text | null;
    url?: String<256> | null;
    permanent?: Boolean | null;
    buffer?: Text | null;
    applicationId: ForeignKey<"application">;
    props: WechatQrCodeProps;
    application: Application.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    wechatLogin?: WechatLogin.Schema;
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
    entity: Q_EnumValue<"user" | "userEntityGrant" | "wechatLogin" | string>;
    entityId: Q_StringValue;
    type: Q_EnumValue<QrCodeType>;
    allowShare: Q_BooleanValue;
    tag: Q_StringValue;
    tag2: Q_StringValue;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    ticket: Q_StringValue;
    url: Q_StringValue;
    permanent: Q_BooleanValue;
    buffer: Q_StringValue;
    applicationId: Q_StringValue;
    application: Application.Filter;
    props: JsonFilter<WechatQrCodeProps>;
    user: User.Filter;
    userEntityGrant: UserEntityGrant.Filter;
    wechatLogin: WechatLogin.Filter;
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
    entity?: number;
    entityId?: number;
    type?: number;
    allowShare?: number;
    tag?: number;
    tag2?: number;
    expiresAt?: number;
    expired?: number;
    ticket?: number;
    url?: number;
    permanent?: number;
    buffer?: number;
    applicationId?: number;
    application?: Application.Projection;
    props?: number | JsonProjection<WechatQrCodeProps>;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    wechatLogin?: WechatLogin.Projection;
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
type WechatQrCodeIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type UserIdProjection = OneOf<{
    entityId: number;
}>;
type UserEntityGrantIdProjection = OneOf<{
    entityId: number;
}>;
type WechatLoginIdProjection = OneOf<{
    entityId: number;
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
    type: number;
} | {
    allowShare: number;
} | {
    tag: number;
} | {
    tag2: number;
} | {
    expiresAt: number;
} | {
    expired: number;
} | {
    ticket: number;
} | {
    url: number;
} | {
    permanent: number;
} | {
    buffer: number;
} | {
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    props: number;
} | {
    user: User.SortAttr;
} | {
    userEntityGrant: UserEntityGrant.SortAttr;
} | {
    wechatLogin: WechatLogin.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: ForeignKey<"application">;
    application?: Application.UpdateOperation;
} | {
    application?: never;
    applicationId: ForeignKey<"application">;
})) & ({
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: never;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatLogin: WechatLogin.CreateSingleOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin?: WechatLogin.UpdateOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
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
})) & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatLogin?: WechatLogin.CreateSingleOperation | WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("user" | "userEntityGrant" | "wechatLogin" | string) | null;
    entityId?: ForeignKey<"User" | "UserEntityGrant" | "WechatLogin"> | null;
    user?: never;
    userEntityGrant?: never;
    wechatLogin?: never;
}) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
})) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    userEntityGrant?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
} | {
    wechatLogin?: WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export type WechatLoginIdSubQuery = Selection<WechatLoginIdProjection>;
export type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
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