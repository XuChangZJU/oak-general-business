import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction } from "./Action";
import { String, Text, Datetime, Boolean } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { QrCodeType } from "../../types/Config";
import * as User from "../User/Schema";
import * as UserEntityClaim from "../UserEntityClaim/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
type RelationIds = string[];
export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
type Rule = 'single' | 'all' | 'free';
export type OpSchema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    relationEntity: String<32>;
    relationEntityFilter: Object;
    relationIds: RelationIds;
    type: 'grant' | 'transfer';
    rule: Rule;
    ruleOnRow: Rule;
    multiple?: Boolean | null;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    redirectTo?: RedirectToProps | null;
    claimUrl: String<128>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    entity: String<32>;
    entityId: String<64>;
    relationEntity: String<32>;
    relationEntityFilter: Object;
    relationIds: RelationIds;
    type: 'grant' | 'transfer';
    rule: Rule;
    ruleOnRow: Rule;
    multiple?: Boolean | null;
    remark?: Text | null;
    granterId: ForeignKey<"user">;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime | null;
    expired?: Boolean | null;
    redirectTo?: RedirectToProps | null;
    claimUrl: String<128>;
    granter: User.Schema;
    userEntityClaim$ueg?: Array<UserEntityClaim.Schema>;
    userEntityClaim$ueg$$aggr?: AggregationResult<UserEntityClaim.Schema>;
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
    relationEntity: Q_StringValue;
    relationEntityFilter: Object;
    relationIds: JsonFilter<RelationIds>;
    type: Q_EnumValue<'grant' | 'transfer'>;
    rule: Q_EnumValue<Rule>;
    ruleOnRow: Q_EnumValue<Rule>;
    multiple: Q_BooleanValue;
    remark: Q_StringValue;
    granterId: Q_StringValue;
    granter: User.Filter;
    qrCodeType: Q_EnumValue<QrCodeType>;
    expiresAt: Q_DateValue;
    expired: Q_BooleanValue;
    redirectTo: JsonFilter<RedirectToProps>;
    claimUrl: Q_StringValue;
    userEntityClaim$ueg: UserEntityClaim.Filter & SubQueryPredicateMetadata;
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
    relationEntity?: number;
    relationEntityFilter?: number | Object;
    relationIds?: number | JsonProjection<RelationIds>;
    type?: number;
    rule?: number;
    ruleOnRow?: number;
    multiple?: number;
    remark?: number;
    granterId?: number;
    granter?: User.Projection;
    qrCodeType?: number;
    expiresAt?: number;
    expired?: number;
    redirectTo?: number | JsonProjection<RedirectToProps>;
    claimUrl?: number;
    userEntityClaim$ueg?: UserEntityClaim.Selection & {
        $entity: "userEntityClaim";
    };
    userEntityClaim$ueg$$aggr?: UserEntityClaim.Aggregation & {
        $entity: "userEntityClaim";
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
type UserIdProjection = OneOf<{
    granterId: number;
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
    relationEntity: number;
} | {
    relationIds: number;
} | {
    type: number;
} | {
    rule: number;
} | {
    ruleOnRow: number;
} | {
    multiple: number;
} | {
    remark: number;
} | {
    granterId: number;
} | {
    granter: User.SortAttr;
} | {
    qrCodeType: number;
} | {
    expiresAt: number;
} | {
    expired: number;
} | {
    redirectTo: number;
} | {
    claimUrl: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "granterId">> & (({
    granterId?: never;
    granter: User.CreateSingleOperation;
} | {
    granterId: ForeignKey<"granter">;
    granter?: User.UpdateOperation;
} | {
    granterId: ForeignKey<"granter">;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    userEntityClaim$ueg?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "ueg" | "uegId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "ueg" | "uegId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "granterId">> & (({
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
})) & {
    [k: string]: any;
    userEntityClaim$ueg?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "ueg" | "uegId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "ueg" | "uegId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "ueg" | "uegId">, Omit<UserEntityClaim.Filter, "ueg" | "uegId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    granter?: User.UpdateOperation | User.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
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
export {};
