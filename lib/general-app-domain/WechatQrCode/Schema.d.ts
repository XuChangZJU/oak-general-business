import { String, Boolean, Text, Datetime, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { QrCodeType } from "../../types/Config";
import * as Application from "../Application/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
export declare type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export declare type OpSchema = EntityShape & {
    entity: "userEntityGrant" | string;
    entityId: String<64>;
    type: QrCodeType;
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
export declare type Schema = EntityShape & {
    entity: "userEntityGrant" | string;
    entityId: String<64>;
    type: QrCodeType;
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
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.WechatQrCodeIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: E;
    entityId: Q_StringValue;
    type: Q_EnumValue<QrCodeType>;
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
    props: Q_EnumValue<WechatQrCodeProps>;
    userEntityGrant: UserEntityGrant.Filter;
};
export declare type Filter<E = Q_EnumValue<"userEntityGrant" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
    expiresAt?: number;
    expired?: number;
    ticket?: number;
    url?: number;
    permanent?: number;
    buffer?: number;
    applicationId?: number;
    application?: Application.Projection;
    props?: number;
    userEntityGrant?: UserEntityGrant.Projection;
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
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
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type WechatQrCodeIdProjection = OneOf<{
    id: number;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
declare type UserEntityGrantIdProjection = OneOf<{
    entityId: number;
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
    userEntityGrant: UserEntityGrant.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Aggregation = Omit<DeduceAggregation<Schema, Projection, Filter, Sorter>, "id">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
    applicationId?: never;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
} | {
    applicationId: String<64>;
})) & ({
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
    userEntityGrant: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: String<64>;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "applicationId">> & (({
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
})) & ({
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("userEntityGrant" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
    operEntitys$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    modiEntitys$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
})) & ({
    userEntityGrant?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export declare type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export declare type NativeAttr = OpAttr | `application.${Application.NativeAttr}` | `entity.${UserEntityGrant.NativeAttr}`;
export declare type FullAttr = NativeAttr | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}`;
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
