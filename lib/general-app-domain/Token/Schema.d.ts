import { String, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { AbleState } from 'oak-domain/lib/actions/action';
import { Action, ParticularAction } from "./Action";
import * as Application from "../Application/Schema";
import * as User from "../User/Schema";
import * as Email from "../Email/Schema";
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
export declare type ServerEnv = {
    type: 'server';
};
export declare type Environment = WechatMpEnv | WebEnv | ServerEnv;
export declare type OpSchema = EntityShape & {
    applicationId?: ForeignKey<"application"> | null;
    entity: "email" | "mobile" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    env: Environment;
    ableState?: AbleState | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    applicationId?: ForeignKey<"application"> | null;
    entity: "email" | "mobile" | "wechatUser" | string;
    entityId: String<64>;
    userId?: ForeignKey<"user"> | null;
    playerId?: ForeignKey<"user"> | null;
    env: Environment;
    ableState?: AbleState | null;
    application?: Application.Schema | null;
    user?: User.Schema | null;
    player?: User.Schema | null;
    email?: Email.Schema;
    mobile?: Mobile.Schema;
    wechatUser?: WechatUser.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter<E> = {
    id: Q_StringValue | SubQuery.TokenIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    applicationId: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    application: Application.Filter;
    entity: E;
    entityId: Q_StringValue;
    userId: Q_StringValue | SubQuery.UserIdSubQuery;
    user: User.Filter;
    playerId: Q_StringValue | SubQuery.UserIdSubQuery;
    player: User.Filter;
    env: Q_EnumValue<Environment>;
    ableState: Q_EnumValue<AbleState>;
    email: Email.Filter;
    mobile: Mobile.Filter;
    wechatUser: WechatUser.Filter;
};
export declare type Filter<E = Q_EnumValue<"email" | "mobile" | "wechatUser" | string>> = MakeFilter<AttrFilter<E> & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
    env?: number;
    ableState?: number;
    email?: Email.Projection;
    mobile?: Mobile.Projection;
    wechatUser?: WechatUser.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
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
    email?: Email.ExportProjection;
    mobile?: Mobile.ExportProjection;
    wechatUser?: WechatUser.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type TokenIdProjection = OneOf<{
    id: number;
}>;
declare type ApplicationIdProjection = OneOf<{
    applicationId: number;
}>;
declare type UserIdProjection = OneOf<{
    userId: number;
    playerId: number;
}>;
declare type EmailIdProjection = OneOf<{
    entityId: number;
}>;
declare type MobileIdProjection = OneOf<{
    entityId: number;
}>;
declare type WechatUserIdProjection = OneOf<{
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
    env: number;
} | {
    ableState: number;
} | {
    email: Email.SortAttr;
} | {
    mobile: Mobile.SortAttr;
} | {
    wechatUser: WechatUser.SortAttr;
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
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "applicationId" | "userId" | "playerId">> & (({
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
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "applicationId" | "userId" | "playerId">> & (({
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
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("email" | "mobile" | "wechatUser" | string) | null;
    entityId?: String<64> | null;
}) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | ParticularAction | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
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
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
} | {
    [k: string]: any;
});
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type UserIdSubQuery = Selection<UserIdProjection>;
export declare type EmailIdSubQuery = Selection<EmailIdProjection>;
export declare type MobileIdSubQuery = Selection<MobileIdProjection>;
export declare type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export declare type TokenIdSubQuery = Selection<TokenIdProjection>;
export declare type NativeAttr = OpAttr | `application.${Application.NativeAttr}` | `user.${User.NativeAttr}` | `player.${User.NativeAttr}` | `entity.${Email.NativeAttr}` | `entity.${Mobile.NativeAttr}` | `entity.${WechatUser.NativeAttr}`;
export declare type FullAttr = NativeAttr;
export declare type EntityDef = {
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
