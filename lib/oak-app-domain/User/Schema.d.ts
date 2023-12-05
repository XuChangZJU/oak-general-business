import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, UserState, IdState } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import { String, Text, Boolean, Datetime } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Oper from "../Oper/Schema";
import * as UserEntityClaim from "../UserEntityClaim/Schema";
import * as UserRelation from "../UserRelation/Schema";
import * as ChangePasswordTemp from "../ChangePasswordTemp/Schema";
import * as Email from "../Email/Schema";
import * as Message from "../Message/Schema";
import * as Mobile from "../Mobile/Schema";
import * as Parasite from "../Parasite/Schema";
import * as ReadRemark from "../ReadRemark/Schema";
import * as Session from "../Session/Schema";
import * as SessionMessage from "../SessionMessage/Schema";
import * as Token from "../Token/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as Address from "../Address/Schema";
import * as Account from "../Account/Schema";
export type OpSchema = EntityShape & {
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
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
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
    userEntityClaim$user?: Array<UserEntityClaim.Schema>;
    userEntityClaim$user$$aggr?: AggregationResult<UserEntityClaim.Schema>;
    userRelation$user?: Array<UserRelation.Schema>;
    userRelation$user$$aggr?: AggregationResult<UserRelation.Schema>;
    changePasswordTemp$user?: Array<ChangePasswordTemp.Schema>;
    changePasswordTemp$user$$aggr?: AggregationResult<ChangePasswordTemp.Schema>;
    email$user?: Array<Email.Schema>;
    email$user$$aggr?: AggregationResult<Email.Schema>;
    message$user?: Array<Message.Schema>;
    message$user$$aggr?: AggregationResult<Message.Schema>;
    mobile$user?: Array<Mobile.Schema>;
    mobile$user$$aggr?: AggregationResult<Mobile.Schema>;
    parasite$user?: Array<Parasite.Schema>;
    parasite$user$$aggr?: AggregationResult<Parasite.Schema>;
    readRemark$user?: Array<ReadRemark.Schema>;
    readRemark$user$$aggr?: AggregationResult<ReadRemark.Schema>;
    session$user?: Array<Session.Schema>;
    session$user$$aggr?: AggregationResult<Session.Schema>;
    sessionMessage$user?: Array<SessionMessage.Schema>;
    sessionMessage$user$$aggr?: AggregationResult<SessionMessage.Schema>;
    token$user?: Array<Token.Schema>;
    token$user$$aggr?: AggregationResult<Token.Schema>;
    token$player?: Array<Token.Schema>;
    token$player$$aggr?: AggregationResult<Token.Schema>;
    userEntityGrant$granter?: Array<UserEntityGrant.Schema>;
    userEntityGrant$granter$$aggr?: AggregationResult<UserEntityGrant.Schema>;
    userSystem$user?: Array<UserSystem.Schema>;
    userSystem$user$$aggr?: AggregationResult<UserSystem.Schema>;
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
    address$entity?: Array<Address.Schema>;
    address$entity$$aggr?: AggregationResult<Address.Schema>;
    account$entity?: Array<Account.Schema>;
    account$entity$$aggr?: AggregationResult<Account.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_NumberValue;
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
    userEntityClaim$user: UserEntityClaim.Filter & SubQueryPredicateMetadata;
    userRelation$user: UserRelation.Filter & SubQueryPredicateMetadata;
    changePasswordTemp$user: ChangePasswordTemp.Filter & SubQueryPredicateMetadata;
    email$user: Email.Filter & SubQueryPredicateMetadata;
    message$user: Message.Filter & SubQueryPredicateMetadata;
    mobile$user: Mobile.Filter & SubQueryPredicateMetadata;
    parasite$user: Parasite.Filter & SubQueryPredicateMetadata;
    readRemark$user: ReadRemark.Filter & SubQueryPredicateMetadata;
    session$user: Session.Filter & SubQueryPredicateMetadata;
    sessionMessage$user: SessionMessage.Filter & SubQueryPredicateMetadata;
    token$user: Token.Filter & SubQueryPredicateMetadata;
    token$player: Token.Filter & SubQueryPredicateMetadata;
    userEntityGrant$granter: UserEntityGrant.Filter & SubQueryPredicateMetadata;
    userSystem$user: UserSystem.Filter & SubQueryPredicateMetadata;
    wechatLogin$user: WechatLogin.Filter & SubQueryPredicateMetadata;
    wechatUser$user: WechatUser.Filter & SubQueryPredicateMetadata;
    modiEntity$entity: ModiEntity.Filter & SubQueryPredicateMetadata;
    operEntity$entity: OperEntity.Filter & SubQueryPredicateMetadata;
    extraFile$entity: ExtraFile.Filter & SubQueryPredicateMetadata;
    wechatQrCode$entity: WechatQrCode.Filter & SubQueryPredicateMetadata;
    address$entity: Address.Filter & SubQueryPredicateMetadata;
    account$entity: Account.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string> & FulltextFilter>;
export type Projection = {
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
    userEntityClaim$user?: UserEntityClaim.Selection & {
        $entity: "userEntityClaim";
    };
    userEntityClaim$user$$aggr?: UserEntityClaim.Aggregation & {
        $entity: "userEntityClaim";
    };
    userRelation$user?: UserRelation.Selection & {
        $entity: "userRelation";
    };
    userRelation$user$$aggr?: UserRelation.Aggregation & {
        $entity: "userRelation";
    };
    changePasswordTemp$user?: ChangePasswordTemp.Selection & {
        $entity: "changePasswordTemp";
    };
    changePasswordTemp$user$$aggr?: ChangePasswordTemp.Aggregation & {
        $entity: "changePasswordTemp";
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
    readRemark$user?: ReadRemark.Selection & {
        $entity: "readRemark";
    };
    readRemark$user$$aggr?: ReadRemark.Aggregation & {
        $entity: "readRemark";
    };
    session$user?: Session.Selection & {
        $entity: "session";
    };
    session$user$$aggr?: Session.Aggregation & {
        $entity: "session";
    };
    sessionMessage$user?: SessionMessage.Selection & {
        $entity: "sessionMessage";
    };
    sessionMessage$user$$aggr?: SessionMessage.Aggregation & {
        $entity: "sessionMessage";
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
    userSystem$user?: UserSystem.Selection & {
        $entity: "userSystem";
    };
    userSystem$user$$aggr?: UserSystem.Aggregation & {
        $entity: "userSystem";
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
    address$entity?: Address.Selection & {
        $entity: "address";
    };
    address$entity$$aggr?: Address.Aggregation & {
        $entity: "address";
    };
    account$entity?: Account.Selection & {
        $entity: "account";
    };
    account$entity$$aggr?: Account.Aggregation & {
        $entity: "account";
    };
} & Partial<ExprOp<OpAttr | string>>;
type UserIdProjection = OneOf<{
    id: number;
    refId: number;
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
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "refId">> & (({
    refId?: never;
    ref?: CreateSingleOperation;
} | {
    refId: ForeignKey<"ref">;
    ref?: UpdateOperation;
} | {
    ref?: never;
    refId?: ForeignKey<"ref">;
})) & {
    oper$operator?: OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">[]> | Array<OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">>>;
    user$ref?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">>>;
    userEntityClaim$user?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "user" | "userId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">>>;
    userRelation$user?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">>>;
    changePasswordTemp$user?: OakOperation<ChangePasswordTemp.UpdateOperation["action"], Omit<ChangePasswordTemp.UpdateOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">> | OakOperation<"create", Omit<ChangePasswordTemp.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<ChangePasswordTemp.CreateOperationData, "user" | "userId">> | OakOperation<ChangePasswordTemp.UpdateOperation["action"], Omit<ChangePasswordTemp.UpdateOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">>>;
    email$user?: OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">> | OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">>>;
    message$user?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">>>;
    mobile$user?: OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">> | OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">>>;
    parasite$user?: OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">> | OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">>>;
    readRemark$user?: OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">> | OakOperation<"create", Omit<ReadRemark.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<ReadRemark.CreateOperationData, "user" | "userId">> | OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">>>;
    session$user?: OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">> | OakOperation<"create", Omit<Session.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Session.CreateOperationData, "user" | "userId">> | OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">>>;
    sessionMessage$user?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "user" | "userId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">>>;
    token$user?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">>>;
    token$player?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">>>;
    userEntityGrant$granter?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">>>;
    userSystem$user?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">>>;
    wechatLogin$user?: OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">> | OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">>>;
    wechatUser$user?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
    address$entity?: OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Address.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Address.CreateOperationData, "entity" | "entityId">> | OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">>>;
    account$entity?: OakOperation<Account.UpdateOperation["action"], Omit<Account.UpdateOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Account.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Account.CreateOperationData, "entity" | "entityId">> | OakOperation<Account.UpdateOperation["action"], Omit<Account.UpdateOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "refId">> & (({
    ref?: CreateSingleOperation;
    refId?: never;
} | {
    ref?: UpdateOperation;
    refId?: never;
} | {
    ref?: RemoveOperation;
    refId?: never;
} | {
    ref?: never;
    refId?: ForeignKey<"ref"> | null;
})) & {
    [k: string]: any;
    oper$operator?: OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">[]> | Array<OakOperation<"create", Omit<Oper.CreateOperationData, "operator" | "operatorId">>>;
    user$ref?: OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">[]> | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId">> | OakOperation<UpdateOperation["action"], Omit<UpdateOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">> | OakOperation<RemoveOperation["action"], Omit<RemoveOperationData, "ref" | "refId">, Omit<Filter, "ref" | "refId">>>;
    userEntityClaim$user?: OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserEntityClaim.CreateOperationData, "user" | "userId">> | OakOperation<UserEntityClaim.UpdateOperation["action"], Omit<UserEntityClaim.UpdateOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">> | OakOperation<UserEntityClaim.RemoveOperation["action"], Omit<UserEntityClaim.RemoveOperationData, "user" | "userId">, Omit<UserEntityClaim.Filter, "user" | "userId">>>;
    userRelation$user?: OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserRelation.CreateOperationData, "user" | "userId">> | OakOperation<UserRelation.UpdateOperation["action"], Omit<UserRelation.UpdateOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">> | OakOperation<UserRelation.RemoveOperation["action"], Omit<UserRelation.RemoveOperationData, "user" | "userId">, Omit<UserRelation.Filter, "user" | "userId">>>;
    changePasswordTemp$user?: OakOperation<ChangePasswordTemp.UpdateOperation["action"], Omit<ChangePasswordTemp.UpdateOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">> | OakOperation<ChangePasswordTemp.RemoveOperation["action"], Omit<ChangePasswordTemp.RemoveOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">> | OakOperation<"create", Omit<ChangePasswordTemp.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<ChangePasswordTemp.CreateOperationData, "user" | "userId">> | OakOperation<ChangePasswordTemp.UpdateOperation["action"], Omit<ChangePasswordTemp.UpdateOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">> | OakOperation<ChangePasswordTemp.RemoveOperation["action"], Omit<ChangePasswordTemp.RemoveOperationData, "user" | "userId">, Omit<ChangePasswordTemp.Filter, "user" | "userId">>>;
    email$user?: OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<Email.RemoveOperation["action"], Omit<Email.RemoveOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId">> | OakOperation<Email.UpdateOperation["action"], Omit<Email.UpdateOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">> | OakOperation<Email.RemoveOperation["action"], Omit<Email.RemoveOperationData, "user" | "userId">, Omit<Email.Filter, "user" | "userId">>>;
    message$user?: OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Message.CreateOperationData, "user" | "userId">> | OakOperation<Message.UpdateOperation["action"], Omit<Message.UpdateOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">> | OakOperation<Message.RemoveOperation["action"], Omit<Message.RemoveOperationData, "user" | "userId">, Omit<Message.Filter, "user" | "userId">>>;
    mobile$user?: OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<Mobile.RemoveOperation["action"], Omit<Mobile.RemoveOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId">> | OakOperation<Mobile.UpdateOperation["action"], Omit<Mobile.UpdateOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">> | OakOperation<Mobile.RemoveOperation["action"], Omit<Mobile.RemoveOperationData, "user" | "userId">, Omit<Mobile.Filter, "user" | "userId">>>;
    parasite$user?: OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<Parasite.RemoveOperation["action"], Omit<Parasite.RemoveOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Parasite.CreateOperationData, "user" | "userId">> | OakOperation<Parasite.UpdateOperation["action"], Omit<Parasite.UpdateOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">> | OakOperation<Parasite.RemoveOperation["action"], Omit<Parasite.RemoveOperationData, "user" | "userId">, Omit<Parasite.Filter, "user" | "userId">>>;
    readRemark$user?: OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">> | OakOperation<ReadRemark.RemoveOperation["action"], Omit<ReadRemark.RemoveOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">> | OakOperation<"create", Omit<ReadRemark.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<ReadRemark.CreateOperationData, "user" | "userId">> | OakOperation<ReadRemark.UpdateOperation["action"], Omit<ReadRemark.UpdateOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">> | OakOperation<ReadRemark.RemoveOperation["action"], Omit<ReadRemark.RemoveOperationData, "user" | "userId">, Omit<ReadRemark.Filter, "user" | "userId">>>;
    session$user?: OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">> | OakOperation<Session.RemoveOperation["action"], Omit<Session.RemoveOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">> | OakOperation<"create", Omit<Session.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Session.CreateOperationData, "user" | "userId">> | OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">> | OakOperation<Session.RemoveOperation["action"], Omit<Session.RemoveOperationData, "user" | "userId">, Omit<Session.Filter, "user" | "userId">>>;
    sessionMessage$user?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "user" | "userId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "user" | "userId">, Omit<SessionMessage.Filter, "user" | "userId">>>;
    token$user?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "user" | "userId">, Omit<Token.Filter, "user" | "userId">>>;
    token$player?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "player" | "playerId">, Omit<Token.Filter, "player" | "playerId">>>;
    userEntityGrant$granter?: OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">> | OakOperation<UserEntityGrant.UpdateOperation["action"], Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">> | OakOperation<UserEntityGrant.RemoveOperation["action"], Omit<UserEntityGrant.RemoveOperationData, "granter" | "granterId">, Omit<UserEntityGrant.Filter, "granter" | "granterId">>>;
    userSystem$user?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "user" | "userId">, Omit<UserSystem.Filter, "user" | "userId">>>;
    wechatLogin$user?: OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<WechatLogin.RemoveOperation["action"], Omit<WechatLogin.RemoveOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatLogin.CreateOperationData, "user" | "userId">> | OakOperation<WechatLogin.UpdateOperation["action"], Omit<WechatLogin.UpdateOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">> | OakOperation<WechatLogin.RemoveOperation["action"], Omit<WechatLogin.RemoveOperationData, "user" | "userId">, Omit<WechatLogin.Filter, "user" | "userId">>>;
    wechatUser$user?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "user" | "userId">, Omit<WechatUser.Filter, "user" | "userId">>>;
    modiEntity$entity?: OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId">>>;
    operEntity$entity?: OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId">>>;
    extraFile$entity?: OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId">> | OakOperation<ExtraFile.UpdateOperation["action"], Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">> | OakOperation<ExtraFile.RemoveOperation["action"], Omit<ExtraFile.RemoveOperationData, "entity" | "entityId">, Omit<ExtraFile.Filter, "entity" | "entityId">>>;
    wechatQrCode$entity?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "entity" | "entityId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "entity" | "entityId">, Omit<WechatQrCode.Filter, "entity" | "entityId">>>;
    address$entity?: OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">> | OakOperation<Address.RemoveOperation["action"], Omit<Address.RemoveOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Address.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Address.CreateOperationData, "entity" | "entityId">> | OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">> | OakOperation<Address.RemoveOperation["action"], Omit<Address.RemoveOperationData, "entity" | "entityId">, Omit<Address.Filter, "entity" | "entityId">>>;
    account$entity?: OakOperation<Account.UpdateOperation["action"], Omit<Account.UpdateOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">> | OakOperation<Account.RemoveOperation["action"], Omit<Account.RemoveOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Account.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Account.CreateOperationData, "entity" | "entityId">> | OakOperation<Account.UpdateOperation["action"], Omit<Account.UpdateOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">> | OakOperation<Account.RemoveOperation["action"], Omit<Account.RemoveOperationData, "entity" | "entityId">, Omit<Account.Filter, "entity" | "entityId">>>;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | RelationAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    ref?: UpdateOperation | RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type EntityDef = {
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
