import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { AbleState } from 'oak-domain/lib/actions/action';
import { Action, ParticularAction } from "./Action";
import { RelationAction } from "oak-domain/lib/actions/action";
import * as Application from "../Application/Schema";
import * as User from "../User/Schema";
import * as Email from "../Email/Schema";
import * as Mobile from "../Mobile/Schema";
import * as Parasite from "../Parasite/Schema";
import * as WechatUser from "../WechatUser/Schema";
// https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfoSync.html
export type WechatMpEnv = {
    type: 'wechatMp';
    brand: string; // 设备品牌
    model: string; // 设备型号
    pixelRatio: number; // 设备像素比
    screenWidth: number; // 屏幕宽度
    screenHeight: number; // 屏幕高度
    windowWidth: number; // 窗口宽度
    windowHeight: number; // 窗口高度
    statusBarHeight: number; // 状态栏高度
    language: string; // 语言
    version: string; // 微信版本号
    system: string; // 操作系统及版本
    platform: string; // 平台
    fontSizeSetting: number; // 字体大小
    SDKVersion: string; // 基础库版本
};
export type WebEnv = {
    type: 'web';
    visitorId: string;
    platform: {
        value: string;
    };
    timezone: {
        value: string;
    };
    vendor: {
        value: string;
    };
    vendorFlavors: {
        value: string[];
    };
};
export type ServerEnv = {
    type: 'server';
};
export type Environment = WechatMpEnv | WebEnv | ServerEnv;
export type OpSchema = EntityShape & {
    applicationId?: ForeignKey<"application"> | null;
    entity: "email" | "mobile" | "parasite" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    disablesAt?: Datetime | null;
    env: Environment;
    ableState?: AbleState | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    applicationId?: ForeignKey<"application"> | null;
    entity: "email" | "mobile" | "parasite" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    disablesAt?: Datetime | null;
    env: Environment;
    ableState?: AbleState | null;
    application?: Application.Schema | null;
    user?: User.Schema | null;
    player?: User.Schema | null;
    email?: Email.Schema;
    mobile?: Mobile.Schema;
    parasite?: Parasite.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    applicationId: Q_StringValue;
    application: Application.Filter;
    entity: Q_EnumValue<"email" | "mobile" | "parasite" | "wechatUser" | string>;
    entityId: Q_StringValue;
    userId: Q_StringValue;
    user: User.Filter;
    playerId: Q_StringValue;
    player: User.Filter;
    disablesAt: Q_DateValue;
    env: JsonFilter<Environment>;
    ableState: Q_EnumValue<AbleState>;
    email: Email.Filter;
    mobile: Mobile.Filter;
    parasite: Parasite.Filter;
    wechatUser: WechatUser.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    applicationId?: number;
    application?: Application.Projection;
    entity?: number;
    entityId?: number;
    userId?: number;
    user?: User.Projection;
    playerId?: number;
    player?: User.Projection;
    disablesAt?: number;
    env?: number | JsonProjection<Environment>;
    ableState?: number;
    email?: Email.Projection;
    mobile?: Mobile.Projection;
    parasite?: Parasite.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type TokenIdProjection = OneOf<{
    id: number;
}>;
type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
type UserIdProjection = OneOf<{
    userId: number;
    playerId: number;
}>;
type EmailIdProjection = OneOf<{
    entityId: number;
}>;
type MobileIdProjection = OneOf<{
    entityId: number;
}>;
type ParasiteIdProjection = OneOf<{
    entityId: number;
}>;
type WechatUserIdProjection = OneOf<{
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
    applicationId: number;
} | {
    application: Application.SortAttr;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    userId: number;
} | {
    user: User.SortAttr;
} | {
    playerId: number;
} | {
    player: User.SortAttr;
} | {
    disablesAt: number;
} | {
    env: number;
} | {
    ableState: number;
} | {
    email: Email.SortAttr;
} | {
    mobile: Mobile.SortAttr;
} | {
    parasite: Parasite.SortAttr;
} | {
    wechatUser: WechatUser.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "applicationId" | "userId" | "playerId">> & (({
    applicationId?: never;
    application?: Application.CreateSingleOperation;
} | {
    applicationId: String<64>;
    application?: Application.UpdateOperation;
} | {
    applicationId?: String<64>;
}) & ({
    userId?: never;
    user?: User.CreateSingleOperation;
} | {
    userId: String<64>;
    user?: User.UpdateOperation;
} | {
    userId?: String<64>;
}) & ({
    playerId?: never;
    player?: User.CreateSingleOperation;
} | {
    playerId: String<64>;
    player?: User.UpdateOperation;
} | {
    playerId?: String<64>;
})) & ({
    entity?: never;
    entityId?: never;
    email: Email.CreateSingleOperation;
} | {
    entity: "email";
    entityId: String<64>;
    email: Email.UpdateOperation;
} | {
    entity: "email";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    mobile: Mobile.CreateSingleOperation;
} | {
    entity: "mobile";
    entityId: String<64>;
    mobile: Mobile.UpdateOperation;
} | {
    entity: "mobile";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    parasite: Parasite.CreateSingleOperation;
} | {
    entity: "parasite";
    entityId: String<64>;
    parasite: Parasite.UpdateOperation;
} | {
    entity: "parasite";
    entityId: String<64>;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
    wechatUser: WechatUser.UpdateOperation;
} | {
    entity: "wechatUser";
    entityId: String<64>;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "applicationId" | "userId" | "playerId">> & (({
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
}) & ({
    user: User.CreateSingleOperation;
    userId?: never;
} | {
    user: User.UpdateOperation;
    userId?: never;
} | {
    user: User.RemoveOperation;
    userId?: never;
} | {
    user?: never;
    userId?: String<64> | null;
}) & ({
    player: User.CreateSingleOperation;
    playerId?: never;
} | {
    player: User.UpdateOperation;
    playerId?: never;
} | {
    player: User.RemoveOperation;
    playerId?: never;
} | {
    player?: never;
    playerId?: String<64> | null;
})) & ({
    email?: Email.CreateSingleOperation | Email.UpdateOperation | Email.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    mobile?: Mobile.CreateSingleOperation | Mobile.UpdateOperation | Mobile.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    parasite?: Parasite.CreateSingleOperation | Parasite.UpdateOperation | Parasite.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("email" | "mobile" | "parasite" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    application?: Application.UpdateOperation | Application.RemoveOperation;
}) & ({
    user?: User.UpdateOperation | User.RemoveOperation;
}) & ({
    player?: User.UpdateOperation | User.RemoveOperation;
})) & ({
    email?: Email.UpdateOperation | Email.RemoveOperation;
} | {
    mobile?: Mobile.UpdateOperation | Mobile.RemoveOperation;
} | {
    parasite?: Parasite.UpdateOperation | Parasite.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type EmailIdSubQuery = Selection<EmailIdProjection>;
export type MobileIdSubQuery = Selection<MobileIdProjection>;
export type ParasiteIdSubQuery = Selection<ParasiteIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export type TokenIdSubQuery = Selection<TokenIdProjection>;
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