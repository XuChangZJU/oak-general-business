import { String, Boolean, Text, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Application from "../Application/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
export declare type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    entity: "userEntityGrant" | string;
    entityId: String<64>;
    type: 'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp';
    allowShare: Boolean;
    tag?: String<32> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    ticket?: Text | null;
    url?: String<64> | null;
    permanent: Boolean;
    buffer?: Text | null;
    applicationId: ForeignKey<"application">;
    props: WechatQrCodeProps;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    entity: "userEntityGrant" | string;
    entityId: String<64>;
    type: 'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp';
    allowShare: Boolean;
    tag?: String<32> | null;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    ticket?: Text | null;
    url?: String<64> | null;
    permanent: Boolean;
    buffer?: Text | null;
    applicationId: ForeignKey<"application">;
    props: WechatQrCodeProps;
    application: Application.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.WechatQrCodeIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    entity: E;
    entityId: Q_StringValue;
    type: Q_EnumValue<'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp'>;
    allowShare: Q_BooleanValue;
    tag: Q_StringValue;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    ticket: Q_StringValue;
    url: Q_StringValue;
    permanent: Q_BooleanValue;
    buffer: Q_StringValue;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
};
export declare type Filter<E = Q_EnumValue<"userEntityGrant" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    entity?: 1;
    entityId?: 1;
    type?: 1;
    allowShare?: 1;
    tag?: 1;
    expiresAt?: 1;
    expired?: 1;
    ticket?: 1;
    url?: 1;
    permanent?: 1;
    buffer?: 1;
    applicationId?: 1;
    application?: Application.Projection;
    props?: 1;
    userEntityGrant?: UserEntityGrant.Projection;
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    entity?: string;
    entityId?: string;
    type?: string;
    allowShare?: string;
    tag?: string;
    expiresAt?: string;
    expired?: string;
    ticket?: string;
    url?: string;
    permanent?: string;
    buffer?: string;
    applicationId?: string;
    application?: Application.ExportProjection;
    props?: string;
    userEntityGrant?: UserEntityGrant.ExportProjection;
} & Partial<ExprOp<OpAttr>>;
declare type WechatQrCodeIdProjection = OneOf<{
    id: 1;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: 1;
}>;
declare type UserEntityGrantIdProjection = OneOf<{
    entityId: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    entity: 1;
    entityId: 1;
    type: 1;
    allowShare: 1;
    tag: 1;
    expiresAt: 1;
    expired: 1;
    ticket: 1;
    url: 1;
    permanent: 1;
    buffer: 1;
    applicationId: 1;
    application: Application.SortAttr;
    props: 1;
    userEntityGrant: UserEntityGrant.SortAttr;
    [k: string]: any;
} & ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "entityId" | "entity" | "entityId">> & (({
    applicationId?: never | null;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
})) & ({
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    [K: string]: any;
}) & {
    [k: string]: any;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "entityId" | "entity" | "entityId">> & (({
    application?: Application.CreateSingleOperation | Application.UpdateOperation | Application.RemoveOperation;
    applicationId?: undefined;
} | {
    application?: undefined;
    applicationId?: String<64> | null;
})) & ({
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    entity?: ("userEntityGrant" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation;
} | {
    application?: Application.RemoveOperation;
})) & ({
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    userEntityGrant?: UserEntityGrant.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type NativeAttr = OpAttr | `application.${Application.NativeAttr}` | `entity.${UserEntityGrant.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
