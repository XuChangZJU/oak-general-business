import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Text, Datetime, Int } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { LocaleDef } from "oak-domain/lib/types/Locale";
import { Index } from "oak-domain/lib/types/Storage";
import { QrCodeType } from "../../types/Config";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Relation from "../Relation/Schema";
import * as User from "../User/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean; //小程序独有 小程序跳回tabBar的话 必须使用 wx.switchTab
};
export type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    relationId: ForeignKey<"relation">;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    granteeId?: ForeignKey<"user"> | null;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    redirectTo?: RedirectToProps | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    relationId: ForeignKey<"relation">;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    granteeId?: ForeignKey<"user"> | null;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    redirectTo?: RedirectToProps | null;
    relation: Relation.Schema;
    granter: User.Schema;
    grantee?: User.Schema | null;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
    wechatQrCode$entity?: Array<WechatQrCode.Schema>;
    wechatQrCode$entity$$aggr?: AggregationResult<WechatQrCode.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    relationId: Q_StringValue;
    relation: Relation.Filter;
    type: Q_EnumValue<'grant' | 'transfer'>;
    number: Q_NumberValue;
    confirmed: Q_NumberValue;
    remark: Q_StringValue;
    granterId: Q_StringValue;
    granter: User.Filter;
    granteeId: Q_StringValue;
    grantee: User.Filter;
    qrCodeType: Q_EnumValue<QrCodeType>;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    redirectTo: JsonFilter<RedirectToProps>;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
    wechatQrCode$entity: WechatQrCode.Filter & SubQueryPredicateMetadata;
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
    relationId?: number;
    relation?: Relation.Projection;
    type?: number;
    number?: number;
    confirmed?: number;
    remark?: number;
    granterId?: number;
    granter?: User.Projection;
    granteeId?: number;
    grantee?: User.Projection;
    qrCodeType?: number;
    expiresAt?: number;
    expired?: number;
    redirectTo?: number | JsonProjection<RedirectToProps>;
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
    wechatQrCode$entity?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
    wechatQrCode$entity$$aggr?: WechatQrCode.Aggregation & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr | string>>;
type UserEntityGrantIdProjection = OneOf<{
    id: number;
}>;
type RelationIdProjection = OneOf<{
    relationId: number;
}>;
type UserIdProjection = OneOf<{
    granterId: number;
    granteeId: number;
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
    relationId: number;
} | {
    relation: Relation.SortAttr;
} | {
    type: number;
} | {
    number: number;
} | {
    confirmed: number;
} | {
    remark: number;
} | {
    granterId: number;
} | {
    granter: User.SortAttr;
} | {
    granteeId: number;
} | {
    grantee: User.SortAttr;
} | {
    qrCodeType: number;
} | {
    expiresAt: number;
} | {
    expired: number;
} | {
    redirectTo: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "relationId" | "granterId" | "granteeId">> & (({
    relationId?: never;
    relation: Relation.CreateSingleOperation;
} | {
    relationId: ForeignKey<"relation">;
    relation?: Relation.UpdateOperation;
} | {
    relationId: ForeignKey<"relation">;
}) & ({
    granterId?: never;
    granter: User.CreateSingleOperation;
} | {
    granterId: ForeignKey<"granter">;
    granter?: User.UpdateOperation;
} | {
    granterId: ForeignKey<"granter">;
}) & ({
    granteeId?: never;
    grantee?: User.CreateSingleOperation;
} | {
    granteeId: ForeignKey<"grantee">;
    grantee?: User.UpdateOperation;
} | {
    granteeId?: ForeignKey<"grantee">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "relationId" | "granterId" | "granteeId">> & (({
    relation: Relation.CreateSingleOperation;
    relationId?: never;
} | {
    relation: Relation.UpdateOperation;
    relationId?: never;
} | {
    relation: Relation.RemoveOperation;
    relationId?: never;
} | {
    relation?: never;
    relationId?: ForeignKey<"relation"> | null;
}) & ({
    granter: User.CreateSingleOperation;
    granterId?: never;
} | {
    granter: User.UpdateOperation;
    granterId?: never;
} | {
    granter: User.RemoveOperation;
    granterId?: never;
} | {
    granter?: never;
    granterId?: ForeignKey<"granter"> | null;
}) & ({
    grantee: User.CreateSingleOperation;
    granteeId?: never;
} | {
    grantee: User.UpdateOperation;
    granteeId?: never;
} | {
    grantee: User.RemoveOperation;
    granteeId?: never;
} | {
    grantee?: never;
    granteeId?: ForeignKey<"grantee"> | null;
})) & {
    [k: string]: any;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    relation?: Relation.UpdateOperation | Relation.RemoveOperation;
}) & ({
    granter?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    grantee?: User.UpdateOperation | User.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type RelationIdSubQuery = Selection<RelationIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
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