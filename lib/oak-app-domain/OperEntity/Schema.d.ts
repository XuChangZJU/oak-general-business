import { ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { AppendOnlyAction } from "oak-domain/lib/actions/action";
import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import * as Oper from "../Oper/Schema";
import * as User from "../User/Schema";
import * as UserEntityGrant from "../UserEntityGrant/Schema";
import * as UserSystem from "../UserSystem/Schema";
import * as UserWechatPublicTag from "../UserWechatPublicTag/Schema";
import * as WechatLogin from "../WechatLogin/Schema";
import * as WechatMenu from "../WechatMenu/Schema";
import * as WechatPublicAutoReply from "../WechatPublicAutoReply/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatPublicTemplate from "../WechatPublicTemplate/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export type OpSchema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicAutoReply" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    operId: ForeignKey<"oper">;
    entity: "user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicAutoReply" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | string;
    entityId: String<64>;
    oper: Oper.Schema;
    user?: User.Schema;
    userEntityGrant?: UserEntityGrant.Schema;
    userSystem?: UserSystem.Schema;
    userWechatPublicTag?: UserWechatPublicTag.Schema;
    wechatLogin?: WechatLogin.Schema;
    wechatMenu?: WechatMenu.Schema;
    wechatPublicAutoReply?: WechatPublicAutoReply.Schema;
    wechatPublicTag?: WechatPublicTag.Schema;
    wechatPublicTemplate?: WechatPublicTemplate.Schema;
    wechatQrCode?: WechatQrCode.Schema;
    wechatUser?: WechatUser.Schema;
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
    entity: Q_EnumValue<"user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicAutoReply" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | string>;
    entityId: Q_StringValue;
    user: User.Filter;
    userEntityGrant: UserEntityGrant.Filter;
    userSystem: UserSystem.Filter;
    userWechatPublicTag: UserWechatPublicTag.Filter;
    wechatLogin: WechatLogin.Filter;
    wechatMenu: WechatMenu.Filter;
    wechatPublicAutoReply: WechatPublicAutoReply.Filter;
    wechatPublicTag: WechatPublicTag.Filter;
    wechatPublicTemplate: WechatPublicTemplate.Filter;
    wechatQrCode: WechatQrCode.Filter;
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
    wechatPublicAutoReply?: WechatPublicAutoReply.Projection;
    wechatPublicTag?: WechatPublicTag.Projection;
    wechatPublicTemplate?: WechatPublicTemplate.Projection;
    wechatQrCode?: WechatQrCode.Projection;
    wechatUser?: WechatUser.Projection;
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
type WechatPublicAutoReplyIdProjection = OneOf<{
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
    wechatPublicAutoReply: WechatPublicAutoReply.SortAttr;
} | {
    wechatPublicTag: WechatPublicTag.SortAttr;
} | {
    wechatPublicTemplate: WechatPublicTemplate.SortAttr;
} | {
    wechatQrCode: WechatQrCode.SortAttr;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    operId?: never;
    oper: Oper.CreateSingleOperation;
} | {
    oper?: never;
    operId: ForeignKey<"oper">;
})) & ({
    entity?: never;
    entityId?: never;
    user: User.CreateSingleOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: User.UpdateOperation;
} | {
    entity: "user";
    entityId: ForeignKey<"User">;
    user?: never;
} | {
    entity?: never;
    entityId?: never;
    userEntityGrant: UserEntityGrant.CreateSingleOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant?: UserEntityGrant.UpdateOperation;
} | {
    entity: "userEntityGrant";
    entityId: ForeignKey<"UserEntityGrant">;
    userEntityGrant?: never;
} | {
    entity?: never;
    entityId?: never;
    userSystem: UserSystem.CreateSingleOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
    userSystem?: UserSystem.UpdateOperation;
} | {
    entity: "userSystem";
    entityId: ForeignKey<"UserSystem">;
    userSystem?: never;
} | {
    entity?: never;
    entityId?: never;
    userWechatPublicTag: UserWechatPublicTag.CreateSingleOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
    userWechatPublicTag?: UserWechatPublicTag.UpdateOperation;
} | {
    entity: "userWechatPublicTag";
    entityId: ForeignKey<"UserWechatPublicTag">;
    userWechatPublicTag?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatLogin: WechatLogin.CreateSingleOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin?: WechatLogin.UpdateOperation;
} | {
    entity: "wechatLogin";
    entityId: ForeignKey<"WechatLogin">;
    wechatLogin?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatMenu: WechatMenu.CreateSingleOperation;
} | {
    entity: "wechatMenu";
    entityId: ForeignKey<"WechatMenu">;
    wechatMenu?: WechatMenu.UpdateOperation;
} | {
    entity: "wechatMenu";
    entityId: ForeignKey<"WechatMenu">;
    wechatMenu?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicAutoReply: WechatPublicAutoReply.CreateSingleOperation;
} | {
    entity: "wechatPublicAutoReply";
    entityId: ForeignKey<"WechatPublicAutoReply">;
    wechatPublicAutoReply?: WechatPublicAutoReply.UpdateOperation;
} | {
    entity: "wechatPublicAutoReply";
    entityId: ForeignKey<"WechatPublicAutoReply">;
    wechatPublicAutoReply?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicTag: WechatPublicTag.CreateSingleOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
    wechatPublicTag?: WechatPublicTag.UpdateOperation;
} | {
    entity: "wechatPublicTag";
    entityId: ForeignKey<"WechatPublicTag">;
    wechatPublicTag?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatPublicTemplate: WechatPublicTemplate.CreateSingleOperation;
} | {
    entity: "wechatPublicTemplate";
    entityId: ForeignKey<"WechatPublicTemplate">;
    wechatPublicTemplate?: WechatPublicTemplate.UpdateOperation;
} | {
    entity: "wechatPublicTemplate";
    entityId: ForeignKey<"WechatPublicTemplate">;
    wechatPublicTemplate?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatQrCode: WechatQrCode.CreateSingleOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
    wechatQrCode?: WechatQrCode.UpdateOperation;
} | {
    entity: "wechatQrCode";
    entityId: ForeignKey<"WechatQrCode">;
    wechatQrCode?: never;
} | {
    entity?: never;
    entityId?: never;
    wechatUser: WechatUser.CreateSingleOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
    wechatUser?: WechatUser.UpdateOperation;
} | {
    entity: "wechatUser";
    entityId: ForeignKey<"WechatUser">;
    wechatUser?: never;
} | {
    entity?: string;
    entityId?: string;
    [K: string]: any;
});
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "entity" | "entityId" | "operId">> & (({
    oper?: Oper.CreateSingleOperation;
    operId?: never;
} | {
    oper?: never;
    operId?: ForeignKey<"oper">;
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
    wechatPublicAutoReply?: WechatPublicAutoReply.CreateSingleOperation | WechatPublicAutoReply.UpdateOperation | WechatPublicAutoReply.RemoveOperation;
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
    entity?: ("user" | "userEntityGrant" | "userSystem" | "userWechatPublicTag" | "wechatLogin" | "wechatMenu" | "wechatPublicAutoReply" | "wechatPublicTag" | "wechatPublicTemplate" | "wechatQrCode" | "wechatUser" | string) | null;
    entityId?: ForeignKey<"User" | "UserEntityGrant" | "UserSystem" | "UserWechatPublicTag" | "WechatLogin" | "WechatMenu" | "WechatPublicAutoReply" | "WechatPublicTag" | "WechatPublicTemplate" | "WechatQrCode" | "WechatUser"> | null;
    user?: never;
    userEntityGrant?: never;
    userSystem?: never;
    userWechatPublicTag?: never;
    wechatLogin?: never;
    wechatMenu?: never;
    wechatPublicAutoReply?: never;
    wechatPublicTag?: never;
    wechatPublicTemplate?: never;
    wechatQrCode?: never;
    wechatUser?: never;
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
    wechatPublicAutoReply?: WechatPublicAutoReply.UpdateOperation | WechatPublicAutoReply.RemoveOperation;
} | {
    wechatPublicTag?: WechatPublicTag.UpdateOperation | WechatPublicTag.RemoveOperation;
} | {
    wechatPublicTemplate?: WechatPublicTemplate.UpdateOperation | WechatPublicTemplate.RemoveOperation;
} | {
    wechatQrCode?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation;
} | {
    wechatUser?: WechatUser.UpdateOperation | WechatUser.RemoveOperation;
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
export type WechatPublicAutoReplyIdSubQuery = Selection<WechatPublicAutoReplyIdProjection>;
export type WechatPublicTagIdSubQuery = Selection<WechatPublicTagIdProjection>;
export type WechatPublicTemplateIdSubQuery = Selection<WechatPublicTemplateIdProjection>;
export type WechatQrCodeIdSubQuery = Selection<WechatQrCodeIdProjection>;
export type WechatUserIdSubQuery = Selection<WechatUserIdProjection>;
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
export {};
