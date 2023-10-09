import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape, Configuration } from "oak-domain/lib/types/Entity";
import { LocaleDef } from "oak-domain/lib/types/Locale";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as Oper from "../Oper/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as WechatMenu from "../WechatMenu/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatPublicTemplate from "../WechatPublicTemplate/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as wechatPublicAutoReply from "../wechatPublicAutoReply/Schema";
export type OpSchema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | "wechatPublicAutoReply" | string;
    entityId: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | "wechatPublicAutoReply" | string;
    entityId: String<64>;
    oper: Oper.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    userSystem?: UserSystem.Schema;
    userWechatPublicTag?: UserWechatPublicTag.Schema;
    wechatLogin?: WechatLogin.Schema;
    wechatMenu?: WechatMenu.Schema;
    wechatPublicTag?: WechatPublicTag.Schema;
    wechatPublicTemplate?: WechatPublicTemplate.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
    wechatPublicAutoReply?: wechatPublicAutoReply.Schema;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    operId: Q_StringValue;
    oper: Oper.Filter;
    entity: Q_EnumValue<"user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | "wechatPublicAutoReply" | string>;
    entityId: Q_StringValue;
    user: User.Filter;
    userEntityGrant: UserEntityGrant.Filter;
    userSystem: UserSystem.Filter;
    userWechatPublicTag: UserWechatPublicTag.Filter;
    wechatLogin: WechatLogin.Filter;
    wechatMenu: WechatMenu.Filter;
    wechatPublicTag: WechatPublicTag.Filter;
    wechatPublicTemplate: WechatPublicTemplate.Filter;
    wechatQrCode: WechatQrCode.Filter;
    wechatUser: WechatUser.Filter;
    wechatPublicAutoReply: wechatPublicAutoReply.Filter;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    operId?: number;
    oper?: Oper.Projection;
    entity?: number;
    entityId?: number;
    user?: User.Projection;
    userEntityGrant?: UserEntityGrant.Projection;
    userSystem?: UserSystem.Projection;
    userWechatPublicTag?: UserWechatPublicTag.Projection;
    wechatLogin?: WechatLogin.Projection;
    wechatMenu?: WechatMenu.Projection;
    wechatPublicTag?: WechatPublicTag.Projection;
    wechatPublicTemplate?: WechatPublicTemplate.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
    wechatPublicAutoReply?: wechatPublicAutoReply.Projection;
} & Partial<ExprOp<OpAttr | string>>;
type OperEntityIdProjection = OneOf<{
    id: number;
}>;
type OperIdProjection = OneOf<{
    operId: number;
}>;
type UserIdProjection = OneOf<{
    entityId: number;
}>;
type UserEntityGrantIdProjection = OneOf<{
    entityId: number;
}>;
type UserSystemIdProjection = OneOf<{
    entityId: number;
}>;
type UserWechatPublicTagIdProjection = OneOf<{
    entityId: number;
}>;
type WechatLoginIdProjection = OneOf<{
    entityId: number;
}>;
type WechatMenuIdProjection = OneOf<{
    entityId: number;
}>;
type WechatPublicTagIdProjection = OneOf<{
    entityId: number;
}>;
type WechatPublicTemplateIdProjection = OneOf<{
    entityId: number;
}>;
type WechatQrCodeIdProjection = OneOf<{
    entityId: number;
}>;
type WechatUserIdProjection = OneOf<{
    entityId: number;
}>;
type wechatPublicAutoReplyIdProjection = OneOf<{
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
    operId: number;
} | {
    oper: Oper.SortAttr;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    user: User.SortAttr;
} | {
    userEntityGrant: UserEntityGrant.SortAttr;
} | {
    userSystem: UserSystem.SortAttr;
} | {
    userWechatPublicTag: UserWechatPublicTag.SortAttr;
} | {
    wechatLogin: WechatLogin.SortAttr;
} | {
    wechatMenu: WechatMenu.SortAttr;
} | {
    wechatPublicTag: WechatPublicTag.SortAttr;
} | {
    wechatPublicTemplate: WechatPublicTemplate.SortAttr;
} | {
    wechatQrCode: WechatQrCode.SortAttr;
} | {
    wechatUser: WechatUser.SortAttr;
} | {
    wechatPublicAutoReply: wechatPublicAutoReply.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    operId?: never;
    oper: Oper.CreateSingleOperation;
} | {
    operId: ForeignKey<"oper">;
})) & ({
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
} | {
    entity?: never;
    entityId?: never;
    userSystem: UserSystem.CreateSingleOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
    userSystem: UserSystem.UpdateOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
} | {
    entity?: never;
    entityId?: never;
    userWechatPublicTag: UserWechatPublicTag.CreateSingleOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
    userWechatPublicTag: UserWechatPublicTag.UpdateOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
} | {
    entity?: never;
    entityId?: never;
    wechatLogin: WechatLogin.CreateSingleOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin: WechatLogin.UpdateOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
} | {
    entity?: never;
    entityId?: never;
    wechatMenu: WechatMenu.CreateSingleOperation;
} | {
    entity: "wechatMenu";
    entityId: ForeignKey<"WechatMenu">;
    wechatMenu: WechatMenu.UpdateOperation;
} | {
    entity: "wechatMenu";
    entityId: ForeignKey<"WechatMenu">;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
    wechatPublicTag: WechatPublicTag.UpdateOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicTemplate: WechatPublicTemplate.CreateSingleOperation;
} | {
    entity: "wechatPublicTemplate";
    entityId: ForeignKey<"WechatPublicTemplate">;
    wechatPublicTemplate: WechatPublicTemplate.UpdateOperation;
} | {
    entity: "wechatPublicTemplate";
    entityId: ForeignKey<"WechatPublicTemplate">;
} | {
    entity?: never;
    entityId?: never;
    wechatQrCode: WechatQrCode.CreateSingleOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
    wechatQrCode: WechatQrCode.UpdateOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
    wechatUser: WechatUser.UpdateOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicAutoReply: wechatPublicAutoReply.CreateSingleOperation;
} | {
    entity: "wechatPublicAutoReply";
    entityId: ForeignKey<"wechatPublicAutoReply">;
    wechatPublicAutoReply: wechatPublicAutoReply.UpdateOperation;
} | {
    entity: "wechatPublicAutoReply";
    entityId: ForeignKey<"wechatPublicAutoReply">;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    oper: Oper.CreateSingleOperation;
    operId?: never;
} | {
    oper?: never;
    operId?: ForeignKey<"oper"> | null;
})) & ({
    user?: User.CreateSingleOperation | User.UpdateOperation | User.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userEntityGrant?: UserEntityGrant.CreateSingleOperation | UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userSystem?: UserSystem.CreateSingleOperation | UserSystem.UpdateOperation | UserSystem.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    userWechatPublicTag?: UserWechatPublicTag.CreateSingleOperation | UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatLogin?: WechatLogin.CreateSingleOperation | WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatMenu?: WechatMenu.CreateSingleOperation | WechatMenu.UpdateOperation | WechatMenu.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatPublicTag?: WechatPublicTag.CreateSingleOperation | WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatPublicTemplate?: WechatPublicTemplate.CreateSingleOperation | WechatPublicTemplate.UpdateOperation | WechatPublicTemplate.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatQrCode?: WechatQrCode.CreateSingleOperation | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatUser?: WechatUser.CreateSingleOperation | WechatUser.UpdateOperation | WechatUser.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    wechatPublicAutoReply?: wechatPublicAutoReply.CreateSingleOperation | wechatPublicAutoReply.UpdateOperation | wechatPublicAutoReply.RemoveOperation;
    entityId?: never;
    entity?: never;
} | {
    entity?: ("user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | "wechatPublicAutoReply" | string) | null;
    entityId?: ForeignKey<"User" | "UserEntityGrant" | "UserSystem" | "UserWechatPublicTag" | "WechatLogin" | "WechatMenu" | "WechatPublicTag" | "WechatPublicTemplate" | "WechatQrCode" | "WechatUser" | "wechatPublicAutoReply"> | null;
}) & {
    [k: string]: any;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & ({
    user?: User.UpdateOperation | User.RemoveOperation;
} | {
    userEntityGrant?: UserEntityGrant.UpdateOperation | UserEntityGrant.RemoveOperation;
} | {
    userSystem?: UserSystem.UpdateOperation | UserSystem.RemoveOperation;
} | {
    userWechatPublicTag?: UserWechatPublicTag.UpdateOperation | UserWechatPublicTag.RemoveOperation;
} | {
    wechatLogin?: WechatLogin.UpdateOperation | WechatLogin.RemoveOperation;
} | {
    wechatMenu?: WechatMenu.UpdateOperation | WechatMenu.RemoveOperation;
} | {
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
} | {
    wechatPublicTemplate?: WechatPublicTemplate.UpdateOperation | WechatPublicTemplate.RemoveOperation;
} | {
    wechatQrCode?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
} | {
    wechatPublicAutoReply?: wechatPublicAutoReply.UpdateOperation | wechatPublicAutoReply.RemoveOperation;
} | {
    [k: string]: any;
});
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type OperIdSubQuery = Selection<OperIdProjection>;
export type UserIdSubQuery = Selection<UserIdProjection>;
export type UserEntityGrantIdSubQuery = Selection<UserEntityGrantIdProjection>;
export type UserSystemIdSubQuery = Selection<UserSystemIdProjection>;
export type UserWechatPublicTagIdSubQuery = Selection<UserWechatPublicTagIdProjection>;
export type WechatLoginIdSubQuery = Selection<WechatLoginIdProjection>;
export type WechatMenuIdSubQuery = Selection<WechatMenuIdProjection>;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export type WechatPublicTemplateIdSubQuery = Selection<WechatPublicTemplateIdProjection>;
export type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
export type wechatPublicAutoReplyIdSubQuery = Selection<wechatPublicAutoReplyIdProjection>;
export type OperEntityIdSubQuery = Selection<OperEntityIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<AppendOnlyAction> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};