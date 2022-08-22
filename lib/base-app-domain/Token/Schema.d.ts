import { String, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { AbleState } from 'oak-domain/lib/actions/action';
import { Action, ParticularAction } from "./Action";
import * as Application from "../Application/Schema";
import * as User from "../User/Schema";
import * as Mobile from "../Mobile/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type WechatMpEnv = {
    type: 'wechatMp';
    brand: string;
    model: string;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string;
    platform: string;
    fontSizeSetting: number;
    SDKVersion: string;
};
export declare type WebEnv = {
    type: 'web';
};
export declare type Environment = WechatMpEnv | WebEnv;
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    applicationId: ForeignKey<"application">;
    entity: "mobile" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    env: Environment;
    ableState?: AbleState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    applicationId: ForeignKey<"application">;
    entity: "mobile" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    env: Environment;
    ableState?: AbleState | null;
    application: Application.Schema;
    user?: User.Schema | null;
    player?: User.Schema | null;
    mobile?: Mobile.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.TokenIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
    entity: E;
    entityId: Q_StringValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    playerId: Q_StringValue | SubQuery.UserIdSubQuery;
    player: User.Filter;
    ableState: Q_EnumValue<AbleState>;
};
export declare type Filter<E = Q_EnumValue<"mobile" | "wechatUser" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    applicationId?: 1;
    application?: Application.Projection;
    entity?: 1;
    entityId?: 1;
    userId?: 1;
    user?: User.Projection;
    playerId?: 1;
    player?: User.Projection;
    env?: 1;
    ableState?: 1;
    mobile?: Mobile.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    applicationId?: string;
    application?: Application.ExportProjection;
    entity?: string;
    entityId?: string;
    userId?: string;
    user?: User.ExportProjection;
    playerId?: string;
    player?: User.ExportProjection;
    env?: string;
    ableState?: string;
    mobile?: Mobile.ExportProjection;
    wechatUser?: WechatUser.ExportProjection;
} & Partial<ExprOp<OpAttr>>;
declare type TokenIdProjection = OneOf<{
    id: 1;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: 1;
}>;
declare type UserIdProjection = OneOf<{
    userId: 1;
    playerId: 1;
}>;
declare type MobileIdProjection = OneOf<{
    entityId: 1;
}>;
declare type WechatUserIdProjection = OneOf<{
    entityId: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    applicationId: 1;
    application: Application.SortAttr;
    entity: 1;
    entityId: 1;
    userId: 1;
    user: User.SortAttr;
    playerId: 1;
    player: User.SortAttr;
    env: 1;
    ableState: 1;
    mobile: Mobile.SortAttr;
    wechatUser: WechatUser.SortAttr;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "applicationId" | "userId" | "playerId" | "entityId" | "entityId" | "entity" | "entityId">> & (({
    applicationId?: never | null;
    application: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
}) & ({
    userId?: never | null;
    user?: User.CreateSingleOperation;
} | {
    userId?: String<64>;
    user?: User.UpdateOperation;
}) & ({
    playerId?: never | null;
    player?: User.CreateSingleOperation;
} | {
    playerId?: String<64>;
    player?: User.UpdateOperation;
})) & ({
    entity?: never;
    entityId?: never;
    mobile: Mobile.CreateSingleOperation;
} | {
    entity: "mobile";
    entityId: String<64>;
    mobile?: Mobile.UpdateOperation;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
    wechatUser?: WechatUser.UpdateOperation;
} | {
    [K: string]: any;
}) & {
    [k: string]: any;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "applicationId" | "userId" | "playerId" | "entityId" | "entityId" | "entity" | "entityId">> & (({
    application?: Application.CreateSingleOperation | Application.UpdateOperation | Application.RemoveOperation;
    applicationId?: undefined;
} | {
    application?: undefined;
    applicationId?: String<64> | null;
}) & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    userId?: undefined;
} | {
    user?: undefined;
    userId?: String<64> | null;
}) & ({
    player?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    playerId?: undefined;
} | {
    player?: undefined;
    playerId?: String<64> | null;
})) & ({
    mobile?: Mobile.CreateSingleOperation | Mobile.UpdateOperation | Mobile.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: undefined;
    entity?: undefined;
} | {
    entity?: ("mobile" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<ParticularAction | "update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation;
} | {
    application?: Application.RemoveOperation;
}) & ({
    user?: User.UpdateOperation;
} | {
    user?: User.RemoveOperation;
}) & ({
    player?: User.UpdateOperation;
} | {
    player?: User.RemoveOperation;
})) & ({
    mobile?: Mobile.UpdateOperation;
} | {
    mobile?: Mobile.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation;
} | {
    wechatUser?: WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type MobileIdSubQuery = Selection<MobileIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type TokenIdSubQuery = Selection<TokenIdProjection>;
export declare type NativeAttr = OpAttr | `application.${Application.NativeAttr}` | `user.${User.NativeAttr}` | `player.${User.NativeAttr}` | `entity.${Mobile.NativeAttr}` | `entity.${WechatUser.NativeAttr}`;
export declare type FullAttr = NativeAttr;
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
