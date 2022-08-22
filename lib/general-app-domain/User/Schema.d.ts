import { String, Text, Datetime, Image, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { Action, ParticularAction, UserState, IdState } from "./Action";
import * as System from "../System/Schema";
import * as Email from "../Email/Schema";
import * as Mobile from "../Mobile/Schema";
import * as UserRole from "../UserRole/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as Token from "../Token/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
import * as ExtraFile from "../ExtraFile/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name?: String<16> | null;
    nickname?: String<64> | null;
    password?: Text | null;
    passwordSha1?: Text | null;
    birth?: Datetime | null;
    gender?: ('male' | 'female') | null;
    avatar?: Image | null;
    idCardType?: ('ID-Card' | 'passport' | 'Mainland-passport') | null;
    idNumber?: String<32> | null;
    refId?: ForeignKey<"user"> | null;
    systemId: ForeignKey<"system">;
    idState?: IdState | null;
    userState?: UserState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name?: String<16> | null;
    nickname?: String<64> | null;
    password?: Text | null;
    passwordSha1?: Text | null;
    birth?: Datetime | null;
    gender?: ('male' | 'female') | null;
    avatar?: Image | null;
    idCardType?: ('ID-Card' | 'passport' | 'Mainland-passport') | null;
    idNumber?: String<32> | null;
    refId?: ForeignKey<"user"> | null;
    systemId: ForeignKey<"system">;
    idState?: IdState | null;
    userState?: UserState | null;
    ref?: Schema | null;
    system: System.Schema;
    email$user?: Array<Email.Schema>;
    mobile$user?: Array<Mobile.Schema>;
    userRole$user?: Array<UserRole.Schema>;
    userSystem$user?: Array<UserSystem.Schema>;
    token$user?: Array<Token.Schema>;
    token$player?: Array<Token.Schema>;
    user$ref?: Array<Schema>;
    userEntityGrant$granter?: Array<UserEntityGrant.Schema>;
    userEntityGrant$grantee?: Array<UserEntityGrant.Schema>;
    wechatUser$user?: Array<WechatUser.Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
    extraFile$entity?: Array<ExtraFile.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.UserIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    nickname: Q_StringValue;
    password: Q_StringValue;
    passwordSha1: Q_StringValue;
    birth: Q_DateValue;
    gender: Q_EnumValue<'male' | 'female'>;
    avatar: Q_StringValue;
    idCardType: Q_EnumValue<'ID-Card' | 'passport' | 'Mainland-passport'>;
    idNumber: Q_StringValue;
    refId: Q_StringValue | SubQuery.UserIdSubQuery;
    ref: Filter;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
    idState: Q_EnumValue<IdState>;
    userState: Q_EnumValue<UserState>;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr> & FulltextFilter>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    name?: 1;
    nickname?: 1;
    password?: 1;
    passwordSha1?: 1;
    birth?: 1;
    gender?: 1;
    avatar?: 1;
    idCardType?: 1;
    idNumber?: 1;
    refId?: 1;
    ref?: Projection;
    systemId?: 1;
    system?: System.Projection;
    idState?: 1;
    userState?: 1;
    email$user?: Email.Selection & {
        $entity: "email";
    };
    mobile$user?: Mobile.Selection & {
        $entity: "mobile";
    };
    userRole$user?: UserRole.Selection & {
        $entity: "userRole";
    };
    userSystem$user?: UserSystem.Selection & {
        $entity: "userSystem";
    };
    token$user?: Token.Selection & {
        $entity: "token";
    };
    token$player?: Token.Selection & {
        $entity: "token";
    };
    user$ref?: Selection & {
        $entity: "user";
    };
    userEntityGrant$granter?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$grantee?: UserEntityGrant.Selection & {
        $entity: "userEntityGrant";
    };
    wechatUser$user?: WechatUser.Selection & {
        $entity: "wechatUser";
    };
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
    };
    extraFile$entity?: ExtraFile.Selection & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    name?: string;
    nickname?: string;
    password?: string;
    passwordSha1?: string;
    birth?: string;
    gender?: string;
    avatar?: string;
    idCardType?: string;
    idNumber?: string;
    refId?: string;
    ref?: ExportProjection;
    systemId?: string;
    system?: System.ExportProjection;
    idState?: string;
    userState?: string;
    email$user?: Email.Exportation & {
        $entity: "email";
    };
    mobile$user?: Mobile.Exportation & {
        $entity: "mobile";
    };
    userRole$user?: UserRole.Exportation & {
        $entity: "userRole";
    };
    userSystem$user?: UserSystem.Exportation & {
        $entity: "userSystem";
    };
    token$user?: Token.Exportation & {
        $entity: "token";
    };
    token$player?: Token.Exportation & {
        $entity: "token";
    };
    user$ref?: Exportation & {
        $entity: "user";
    };
    userEntityGrant$granter?: UserEntityGrant.Exportation & {
        $entity: "userEntityGrant";
    };
    userEntityGrant$grantee?: UserEntityGrant.Exportation & {
        $entity: "userEntityGrant";
    };
    wechatUser$user?: WechatUser.Exportation & {
        $entity: "wechatUser";
    };
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
    extraFile$entity?: ExtraFile.Exportation & {
        $entity: "extraFile";
    };
} & Partial<ExprOp<OpAttr>>;
declare type UserIdProjection = OneOf<{
    id: 1;
    refId: 1;
}>;
declare type SystemIdProjection = OneOf<{
    systemId: 1;
}>;
export declare type SortAttr = {
    id: 1;
} | {
    $$createAt$$: 1;
} | {
    $$updateAt$$: 1;
} | {
    name: 1;
} | {
    nickname: 1;
} | {
    password: 1;
} | {
    passwordSha1: 1;
} | {
    birth: 1;
} | {
    gender: 1;
} | {
    avatar: 1;
} | {
    idCardType: 1;
} | {
    idNumber: 1;
} | {
    refId: 1;
} | {
    ref: SortAttr;
} | {
    systemId: 1;
} | {
    system: System.SortAttr;
} | {
    idState: 1;
} | {
    userState: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "refId" | "systemId">> & (({
    refId?: never | null;
    ref?: CreateSingleOperation;
} | {
    refId?: String<64>;
    ref?: UpdateOperation;
}) & ({
    systemId?: never | null;
    system: System.CreateSingleOperation;
} | {
    systemId: String<64>;
    system?: System.UpdateOperation;
})) & {
    [k: string]: any;
    email$user?: OakOperation<"update", Omit<Email.UpdateOperationData, "user" | "userId">, Email.Filter> | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId"> | Omit<Email.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<Email.UpdateOperationData, "user" | "userId">, Email.Filter>>;
    mobile$user?: OakOperation<"update", Omit<Mobile.UpdateOperationData, "user" | "userId">, Mobile.Filter> | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId"> | Omit<Mobile.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<Mobile.UpdateOperationData, "user" | "userId">, Mobile.Filter>>;
    userRole$user?: OakOperation<"update", Omit<UserRole.UpdateOperationData, "user" | "userId">, UserRole.Filter> | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "user" | "userId"> | Omit<UserRole.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<UserRole.UpdateOperationData, "user" | "userId">, UserRole.Filter>>;
    userSystem$user?: OakOperation<"update", Omit<UserSystem.UpdateOperationData, "user" | "userId">, UserSystem.Filter> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId"> | Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<UserSystem.UpdateOperationData, "user" | "userId">, UserSystem.Filter>>;
    token$user?: OakOperation<"update", Omit<Token.UpdateOperationData, "user" | "userId">, Token.Filter> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId"> | Omit<Token.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<Token.UpdateOperationData, "user" | "userId">, Token.Filter>>;
    token$player?: OakOperation<"update", Omit<Token.UpdateOperationData, "player" | "playerId">, Token.Filter> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId"> | Omit<Token.CreateOperationData, "player" | "playerId">[]> | OakOperation<"update", Omit<Token.UpdateOperationData, "player" | "playerId">, Token.Filter>>;
    user$ref?: OakOperation<"update", Omit<UpdateOperationData, "ref" | "refId">, Filter> | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId"> | Omit<CreateOperationData, "ref" | "refId">[]> | OakOperation<"update", Omit<UpdateOperationData, "ref" | "refId">, Filter>>;
    userEntityGrant$granter?: OakOperation<"update", Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, UserEntityGrant.Filter> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId"> | Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | OakOperation<"update", Omit<UserEntityGrant.UpdateOperationData, "granter" | "granterId">, UserEntityGrant.Filter>>;
    userEntityGrant$grantee?: OakOperation<"update", Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, UserEntityGrant.Filter> | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId"> | Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">[]> | OakOperation<"update", Omit<UserEntityGrant.UpdateOperationData, "grantee" | "granteeId">, UserEntityGrant.Filter>>;
    wechatUser$user?: OakOperation<"update", Omit<WechatUser.UpdateOperationData, "user" | "userId">, WechatUser.Filter> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId"> | Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | OakOperation<"update", Omit<WechatUser.UpdateOperationData, "user" | "userId">, WechatUser.Filter>>;
    operEntity$entity?: OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter>>;
    modiEntity$entity?: OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter>>;
    extraFile$entity?: OakOperation<"update", Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter> | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId"> | Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<ExtraFile.UpdateOperationData, "entity" | "entityId">, ExtraFile.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "refId" | "systemId">> & (({
    ref?: CreateSingleOperation | UpdateOperation | RemoveOperation;
    refId?: undefined;
} | {
    ref?: undefined;
    refId?: String<64> | null;
}) & ({
    system?: System.CreateSingleOperation | System.UpdateOperation | System.RemoveOperation;
    systemId?: undefined;
} | {
    system?: undefined;
    systemId?: String<64> | null;
})) & {
    [k: string]: any;
    emails$user?: Email.UpdateOperation | Email.RemoveOperation | Array<OakOperation<"create", Omit<Email.CreateOperationData, "user" | "userId"> | Omit<Email.CreateOperationData, "user" | "userId">[]> | Email.UpdateOperation | Email.RemoveOperation>;
    mobiles$user?: Mobile.UpdateOperation | Mobile.RemoveOperation | Array<OakOperation<"create", Omit<Mobile.CreateOperationData, "user" | "userId"> | Omit<Mobile.CreateOperationData, "user" | "userId">[]> | Mobile.UpdateOperation | Mobile.RemoveOperation>;
    userRoles$user?: UserRole.UpdateOperation | UserRole.RemoveOperation | Array<OakOperation<"create", Omit<UserRole.CreateOperationData, "user" | "userId"> | Omit<UserRole.CreateOperationData, "user" | "userId">[]> | UserRole.UpdateOperation | UserRole.RemoveOperation>;
    userSystems$user?: UserSystem.UpdateOperation | UserSystem.RemoveOperation | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "user" | "userId"> | Omit<UserSystem.CreateOperationData, "user" | "userId">[]> | UserSystem.UpdateOperation | UserSystem.RemoveOperation>;
    tokens$user?: Token.UpdateOperation | Token.RemoveOperation | Array<OakOperation<"create", Omit<Token.CreateOperationData, "user" | "userId"> | Omit<Token.CreateOperationData, "user" | "userId">[]> | Token.UpdateOperation | Token.RemoveOperation>;
    tokens$player?: Token.UpdateOperation | Token.RemoveOperation | Array<OakOperation<"create", Omit<Token.CreateOperationData, "player" | "playerId"> | Omit<Token.CreateOperationData, "player" | "playerId">[]> | Token.UpdateOperation | Token.RemoveOperation>;
    users$ref?: UpdateOperation | RemoveOperation | Array<OakOperation<"create", Omit<CreateOperationData, "ref" | "refId"> | Omit<CreateOperationData, "ref" | "refId">[]> | UpdateOperation | RemoveOperation>;
    userEntityGrants$granter?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId"> | Omit<UserEntityGrant.CreateOperationData, "granter" | "granterId">[]> | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation>;
    userEntityGrants$grantee?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation | Array<OakOperation<"create", Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId"> | Omit<UserEntityGrant.CreateOperationData, "grantee" | "granteeId">[]> | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation>;
    wechatUsers$user?: WechatUser.UpdateOperation | WechatUser.RemoveOperation | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "user" | "userId"> | Omit<WechatUser.CreateOperationData, "user" | "userId">[]> | WechatUser.UpdateOperation | WechatUser.RemoveOperation>;
    operEntitys$entity?: OperEntity.UpdateOperation | OperEntity.RemoveOperation | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OperEntity.UpdateOperation | OperEntity.RemoveOperation>;
    modiEntitys$entity?: ModiEntity.UpdateOperation | ModiEntity.RemoveOperation | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | ModiEntity.UpdateOperation | ModiEntity.RemoveOperation>;
    extraFiles$entity?: ExtraFile.UpdateOperation | ExtraFile.RemoveOperation | Array<OakOperation<"create", Omit<ExtraFile.CreateOperationData, "entity" | "entityId"> | Omit<ExtraFile.CreateOperationData, "entity" | "entityId">[]> | ExtraFile.UpdateOperation | ExtraFile.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<ParticularAction | "update", UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    ref?: UpdateOperation;
} | {
    ref?: RemoveOperation;
}) & ({
    system?: System.UpdateOperation;
} | {
    system?: System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type NativeAttr = OpAttr | `ref.${OpAttr}` | `ref.ref.${OpAttr}` | `ref.ref.ref.${OpAttr}` | `system.${System.NativeAttr}`;
export declare type FullAttr = NativeAttr | `emails$${number}.${Email.NativeAttr}` | `mobiles$${number}.${Mobile.NativeAttr}` | `userRoles$${number}.${UserRole.NativeAttr}` | `userSystems$${number}.${UserSystem.NativeAttr}` | `tokens$user$${number}.${Token.NativeAttr}` | `tokens$player$${number}.${Token.NativeAttr}` | `users$${number}.${NativeAttr}` | `userEntityGrants$granter$${number}.${UserEntityGrant.NativeAttr}` | `userEntityGrants$grantee$${number}.${UserEntityGrant.NativeAttr}` | `wechatUsers$${number}.${WechatUser.NativeAttr}` | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}` | `extraFiles$${number}.${ExtraFile.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: Action;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
    ParticularAction: ParticularAction;
};
export {};
