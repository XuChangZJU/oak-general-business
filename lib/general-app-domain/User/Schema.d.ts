import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, UserState, IdState } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Text, Boolean, Datetime } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Oper from "../Oper/Schema";
import * as UserRelation from "../UserRelation/Schema";
import * as Email from "../Email/Schema";
import * as Message from "../Message/Schema";
import * as Mobile from "../Mobile/Schema";
import * as Parasite from "../Parasite/Schema";
import * as Token from "../Token/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
export declare type OpSchema = EntityShape & {
    name?: String<16> | null;
    nickname?: String<64> | null;
    password?: Text | null;
    passwordSha1?: Text | null;
    birth?: Datetime | null;
    gender?: ('male' | 'female') | null;
    idCardType?: ('ID-Card' | 'passport' | 'Mainland-passport') | null;
    idNumber?: String<32> | null;
    refId?: ForeignKey<"user"> | null;
    isRoot?: Boolean | null;
    idState?: IdState | null;
    userState?: UserState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    name?: String<16> | null;
    nickname?: String<64> | null;
    password?: Text | null;
    passwordSha1?: Text | null;
    birth?: Datetime | null;
    gender?: ('male' | 'female') | null;
    idCardType?: ('ID-Card' | 'passport' | 'Mainland-passport') | null;
    idNumber?: String<32> | null;
    refId?: ForeignKey<"user"> | null;
    isRoot?: Boolean | null;
    idState?: IdState | null;
    userState?: UserState | null;
    ref?: Schema | null;
    oper$operator?: Array<Oper.Schema>;
    oper$operator$$aggr?: AggregationResult<Oper.Schema>;
    user$ref?: Array<Schema>;
    user$ref$$aggr?: AggregationResult<Schema>;
    userRelation$user?: Array<UserRelation.Schema>;
    userRelation$user$$aggr?: AggregationResult<UserRelation.Schema>;
    email$user?: Array<Email.Schema>;
    email$user$$aggr?: AggregationResult<Email.Schema>;
    message$user?: Array<Message.Schema>;
    message$user$$aggr?: AggregationResult<Message.Schema>;
    mobile$user?: Array<Mobile.Schema>;
    mobile$user$$aggr?: AggregationResult<Mobile.Schema>;
    parasite$user?: Array<Parasite.Schema>;
    parasite$user$$aggr?: AggregationResult<Parasite.Schema>;
    token$user?: Array<Token.Schema>;
    token$user$$aggr?: AggregationResult<Token.Schema>;
    token$player?: Array<Token.Schema>;
    token$player$$aggr?: AggregationResult<Token.Schema>;
    userEntityGrant$granter?: Array<UserEntityGrant.Schema>;
    userEntityGrant$granter$$aggr?: AggregationResult<UserEntityGrant.Schema>;
    userEntityGrant$grantee?: Array<UserEntityGrant.Schema>;
    userEntityGrant$grantee$$aggr?: AggregationResult<UserEntityGrant.Schema>;
    userSystem$user?: Array<UserSystem.Schema>;
    userSystem$user$$aggr?: AggregationResult<UserSystem.Schema>;
    userWechatPublicTag$user?: Array<UserWechatPublicTag.Schema>;
    userWechatPublicTag$user$$aggr?: AggregationResult<UserWechatPublicTag.Schema>;
    wechatLogin$user?: Array<WechatLogin.Schema>;
    wechatLogin$user$$aggr?: AggregationResult<WechatLogin.Schema>;
    wechatUser$user?: Array<WechatUser.Schema>;
    wechatUser$user$$aggr?: AggregationResult<WechatUser.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    modiEntity$entity$$aggr?: AggregationResult<ModiEntity.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    operEntity$entity$$aggr?: AggregationResult<OperEntity.Schema>;
    extraFile$entity?: Array<ExtraFile.Schema>;
    extraFile$entity$$aggr?: AggregationResult<ExtraFile.Schema>;
    wechatQrCode$entity?: Array<WechatQrCode.Schema>;
    wechatQrCode$entity$$aggr?: AggregationResult<WechatQrCode.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    nickname: Q_StringValue;
    password: Q_StringValue;
    passwordSha1: Q_StringValue;
    birth: Q_DateValue;
    gender: Q_EnumValue<'male' | 'female'>;
    idCardType: Q_EnumValue<'ID-Card' | 'passport' | 'Mainland-passport'>;
    idNumber: Q_StringValue;
    refId: Q_StringValue;
    ref: Filter;
    isRoot: Q_BooleanValue;
    idState: Q_EnumValue<IdState>;
    userState: Q_EnumValue<UserState>;
    oper$operator: Oper.Filter & SubQueryPredicateMetadata;
    user$ref: Filter & SubQueryPredicateMetadata;
    userRelation$user: UserRelation.Filter & SubQueryPredicateMetadata;
    email$user: Email.Filter & SubQueryPredicateMetadata;
    message$user: Message.Filter & SubQueryPredicateMetadata;
    mobile$user: Mobile.Filter & SubQueryPredicateMetadata;
    parasite$user: Parasite.Filter & SubQueryPredicateMetadata;
    token$user: Token.Filter & SubQueryPredicateMetadata;
    token$player: Token.Filter & SubQueryPredicateMetadata;
    userEntityGrant$granter: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    userEntityGrant$grantee: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    userSystem$user: UserSystem.Filter & SubQueryPredicateMetadata;
    userWechatPublicTag$user: UserWechatPublicTag.Filter & SubQueryPredicateMetadata;
    wechatLogin$user: WechatLogin.Filter & SubQueryPredicateMetadata;
    wechatUser$user: WechatUser.Filter & SubQueryPredicateMetadata;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
    extraFile$entity: ExtraFile.Filter & SubQueryPredicateMetadata;
    wechatQrCode$entity: WechatQrCode.Filter & SubQueryPredicateMetadata;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string> & FulltextFilter>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    name?: number;
    nickname?: number;
    password?: number;
    passwordSha1?: number;
    birth?: number;
    gender?: number;
    idCardType?: number;
    idNumber?: number;
    refId?: number;
    ref?: Projection;
    isRoot?: number;
    idState?: number;
    userState?: number;
    oper$operator?: Oper.Selection & {
        $entity: "oper";
    };
    oper$operator$$aggr?: Oper.Aggregation & {
        $entity: "oper";
    };
    user$ref?: Selection & {
        $entity: "user";
    };
    user$ref$$aggr?: Aggregation & {
        $entity: "user";
    };
    userRelation$user?: UserRelation.Selection & {
        $entity: "userRelation";
    };
    userRelation$user$$aggr?: UserRelation.Aggregation & {
        $entity: "userRelation";
    };
    email$user?: Email.Selection & {
        $entity: "email";
    };
    email$user$$aggr?: Email.Aggregation & {
        $entity: "email";
    };
    message$user?: Message.Selection & {
        $entity: "message";
    };
    message$user$$aggr?: Message.Aggregation & {
        $entity: "message";
    };
    mobile$user?: Mobile.Selection & {
        $entity: "mobile";
    };
    mobile$user$$aggr?: Mobile.Aggregation & {
        $entity: "mobile";
    };
    parasite$user?: Parasite.Selection & {
        $entity: "parasite";
    };
    parasite$user$$aggr?: Parasite.Aggregation & {
        $entity: "parasite";
    };
    token$user?: Token.Selection & {
        $entity: "token";
    };
    token$user$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
    token$player?: Token.Selection & {
        $entity: "token";
    };
    token$player$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
    userEntityGrant$granter?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$granter$$aggr?: UserEntityGrant.Aggregation & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$grantee?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$grantee$$aggr?: UserEntityGrant.Aggregation & {
        $entity: "userEntityGrant";
    };
    userSystem$user?: UserSystem.Selection & {
        $entity: "userSystem";
    };
    userSystem$user$$aggr?: UserSystem.Aggregation & {
        $entity: "userSystem";
    };
    userWechatPublicTag$user?: UserWechatPublicTag.Selection & {
        $entity: "userWechatPublicTag";
    };
    userWechatPublicTag$user$$aggr?: UserWechatPublicTag.Aggregation & {
        $entity: "userWechatPublicTag";
    };
    wechatLogin$user?: WechatLogin.Selection & {
        $entity: "wechatLogin";
    };
    wechatLogin$user$$aggr?: WechatLogin.Aggregation & {
        $entity: "wechatLogin";
    };
    wechatUser$user?: WechatUser.Selection & {
        $entity: "wechatUser";
    };
    wechatUser$user$$aggr?: WechatUser.Aggregation & {
        $entity: "wechatUser";
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
    extraFile$entity?: ExtraFile.Selection & {
        $entity: "extraFile";
    };
    extraFile$entity$$aggr?: ExtraFile.Aggregation & {
        $entity: "extraFile";
    };
    wechatQrCode$entity?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
    wechatQrCode$entity$$aggr?: WechatQrCode.Aggregation & {
        $entity: "wechatQrCode";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type UserIdProjection = OneOf<{
    id: number;
    refId: number;
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
    name: number;
} | {
    nickname: number;
} | {
    password: number;
} | {
    passwordSha1: number;
} | {
    birth: number;
} | {
    gender: number;
} | {
    idCardType: number;
} | {
    idNumber: number;
} | {
    refId: number;
} | {
    ref: SortAttr;
} | {
    isRoot: number;
} | {
    idState: number;
} | {
    userState: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "refId">> & (({
    refId?: never;
    ref?: CreateSingleOperation;
} | {
    refId: ForeignKey<"ref">;
    ref?: UpdateOperation;
} | {
    refId?: ForeignKey<"ref">;
})) & {
    oper$operator?: OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">[]> | Array<OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">>>;
    user$ref?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">>>;
    userRelation$user?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">>>;
    email$user?: OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">> | OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">>>;
    message$user?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">>>;
    mobile$user?: OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">> | OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">>>;
    parasite$user?: OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">> | OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">>>;
    token$user?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">>>;
    token$player?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">>>;
    userEntityGrant$granter?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">>>;
    userEntityGrant$grantee?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">>>;
    userSystem$user?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">>>;
    userWechatPublicTag$user?: OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "user" | "userId">> | OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">>>;
    wechatLogin$user?: OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">> | OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">>>;
    wechatUser$user?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "refId">> & (({
    ref: CreateSingleOperation;
    refId?: never;
} | {
    ref: UpdateOperation;
    refId?: never;
} | {
    ref: RemoveOperation;
    refId?: never;
} | {
    ref?: never;
    refId?: ForeignKey<"ref"> | null;
})) & {
    [k: string]: any;
    oper$operator?: OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">[]> | Array<OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">>>;
    user$ref?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">>>;
    userRelation$user?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">>>;
    email$user?: OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<Email.RemoveOperation["action"], Omit<Email.RemoveOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">> | OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<Email.RemoveOperation["action"], Omit<Email.RemoveOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">>>;
    message$user?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">>>;
    mobile$user?: OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<Mobile.RemoveOperation["action"], Omit<Mobile.RemoveOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">> | OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<Mobile.RemoveOperation["action"], Omit<Mobile.RemoveOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">>>;
    parasite$user?: OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<Parasite.RemoveOperation["action"], Omit<Parasite.RemoveOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">> | OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<Parasite.RemoveOperation["action"], Omit<Parasite.RemoveOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">>>;
    token$user?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">>>;
    token$player?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">>>;
    userEntityGrant$granter?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">>>;
    userEntityGrant$grantee?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "grantee" | "granteeId">, Omit<UserEntityGrant.Filter, "grantee" | "granteeId">>>;
    userSystem$user?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">>>;
    userWechatPublicTag$user?: OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">> | OakOperation<UserWechatPublicTag.RemoveOperation["action"], Omit<UserWechatPublicTag.RemoveOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserWechatPublicTag.CreateOperationData, "user" | "userId">> | OakOperation<UserWechatPublicTag.UpdateOperation["action"], Omit<UserWechatPublicTag.UpdateOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">> | OakOperation<UserWechatPublicTag.RemoveOperation["action"], Omit<UserWechatPublicTag.RemoveOperationData, "user" | "userId">, Omit<UserWechatPublicTag.Filter, "user" | "userId">>>;
    wechatLogin$user?: OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<WechatLogin.RemoveOperation["action"], Omit<WechatLogin.RemoveOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">> | OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<WechatLogin.RemoveOperation["action"], Omit<WechatLogin.RemoveOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">>>;
    wechatUser$user?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    ref?: UpdateOperation | RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<Action | RelationAction> | string;
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
