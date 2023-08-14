import { PrimaryKey, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { String, Int, Datetime, Image, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Style } from "../../types/Style";
import { EntityDesc } from "oak-domain/lib/types/EntityDesc";
import * as System from "../System/Schema";
import * as MessageTypeTemplateId from "../MessageTypeTemplateId/Schema";
import * as Notification from "../Notification/Schema";
import * as Token from "../Token/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export type Passport = 'email' | 'mobile' | 'wechat' | 'wechatPublic';
export type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    originalId?: string; //原始id
    qrCodePrefix?: string; // 扫描二维码跳转的前缀(在小程序后台配置，必须统一跳转到weCharQrCode/scan/index)
    server?: {
        url?: string; //服务器地址(URL)
        token: string; //令牌(Token)
        encodingAESKey: string; //消息加解密密钥(EncodingAESKey)
        mode: 'clear' | 'compatible' | 'safe'; //消息加解密方式 明文模式 兼容模式 安全模式
        dataFormat: 'json' | 'xml';
    };
    passport?: Passport[];
};
export type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string; //网站 微信扫码登录
        domain?: string;
        enable?: boolean; //启用扫码登录
    };
    passport?: Passport[];
};
export type WechatPublicTemplateMsgsConfig = Record<string, string>; // key值代表messageTypeId，value的值代表对应的templateId，data的转换改成message上的函数注入
export type WechatPublicConfig = {
    type: 'wechatPublic';
    isService: boolean; // 是否服务号
    appId: string;
    appSecret: string;
    originalId?: string; //原始id
    enable?: boolean;
    templateMsgs?: WechatPublicTemplateMsgsConfig;
    server?: {
        url?: string; //服务器地址(URL)
        token: string; //令牌(Token)
        encodingAESKey: string; //消息加解密密钥(EncodingAESKey)
        mode: 'clear' | 'compatible' | 'safe'; //消息加解密方式 明文模式 兼容模式 安全模式
    };
    wechatMp?: {
        appId: string;
        //公众号跳小程序配置 originalId
        originalId: string; //原始id
    };
    passport?: Passport[];
};
export type OpSchema = EntityShape & {
    name: String<32>;
    description: Text;
    type: AppType;
    systemId: ForeignKey<"system">;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    style?: Style | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    name: String<32>;
    description: Text;
    type: AppType;
    systemId: ForeignKey<"system">;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    style?: Style | null;
    system: System.Schema;
    messageTypeTemplateId$application?: Array<MessageTypeTemplateId.Schema>;
    messageTypeTemplateId$application$$aggr?: AggregationResult<MessageTypeTemplateId.Schema>;
    notification$application?: Array<Notification.Schema>;
    notification$application$$aggr?: AggregationResult<Notification.Schema>;
    token$application?: Array<Token.Schema>;
    token$application$$aggr?: AggregationResult<Token.Schema>;
    wechatPublicTag$application?: Array<WechatPublicTag.Schema>;
    wechatPublicTag$application$$aggr?: AggregationResult<WechatPublicTag.Schema>;
    wechatQrCode$application?: Array<WechatQrCode.Schema>;
    wechatQrCode$application$$aggr?: AggregationResult<WechatQrCode.Schema>;
    wechatUser$application?: Array<WechatUser.Schema>;
    wechatUser$application$$aggr?: AggregationResult<WechatUser.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    type: Q_EnumValue<AppType>;
    systemId: Q_StringValue;
    system: System.Filter;
    config: JsonFilter<WebConfig | WechatMpConfig | WechatPublicConfig>;
    style: JsonFilter<Style>;
    messageTypeTemplateId$application: MessageTypeTemplateId.Filter & SubQueryPredicateMetadata;
    notification$application: Notification.Filter & SubQueryPredicateMetadata;
    token$application: Token.Filter & SubQueryPredicateMetadata;
    wechatPublicTag$application: WechatPublicTag.Filter & SubQueryPredicateMetadata;
    wechatQrCode$application: WechatQrCode.Filter & SubQueryPredicateMetadata;
    wechatUser$application: WechatUser.Filter & SubQueryPredicateMetadata;
};
export type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    name?: number;
    description?: number;
    type?: number;
    systemId?: number;
    system?: System.Projection;
    config?: number | JsonProjection<WebConfig | WechatMpConfig | WechatPublicConfig>;
    style?: number | JsonProjection<Style>;
    messageTypeTemplateId$application?: MessageTypeTemplateId.Selection & {
        $entity: "messageTypeTemplateId";
    };
    messageTypeTemplateId$application$$aggr?: MessageTypeTemplateId.Aggregation & {
        $entity: "messageTypeTemplateId";
    };
    notification$application?: Notification.Selection & {
        $entity: "notification";
    };
    notification$application$$aggr?: Notification.Aggregation & {
        $entity: "notification";
    };
    token$application?: Token.Selection & {
        $entity: "token";
    };
    token$application$$aggr?: Token.Aggregation & {
        $entity: "token";
    };
    wechatPublicTag$application?: WechatPublicTag.Selection & {
        $entity: "wechatPublicTag";
    };
    wechatPublicTag$application$$aggr?: WechatPublicTag.Aggregation & {
        $entity: "wechatPublicTag";
    };
    wechatQrCode$application?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
    wechatQrCode$application$$aggr?: WechatQrCode.Aggregation & {
        $entity: "wechatQrCode";
    };
    wechatUser$application?: WechatUser.Selection & {
        $entity: "wechatUser";
    };
    wechatUser$application$$aggr?: WechatUser.Aggregation & {
        $entity: "wechatUser";
    };
} & Partial<ExprOp<OpAttr | string>>;
type ApplicationIdProjection = OneOf<{
    id: number;
}>;
type SystemIdProjection = OneOf<{
    systemId: number;
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
    description: number;
} | {
    type: number;
} | {
    systemId: number;
} | {
    system: System.SortAttr;
} | {
    style: number;
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
export type CreateOperationData = FormCreateData<Omit<OpSchema, "systemId">> & (({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: ForeignKey<"system">;
    system?: System.UpdateOperation;
} | {
    systemId: ForeignKey<"system">;
})) & {
    messageTypeTemplateId$application?: OakOperation<MessageTypeTemplateId.UpdateOperation["action"], Omit<MessageTypeTemplateId.UpdateOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<MessageTypeTemplateId.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<MessageTypeTemplateId.CreateOperationData, "application" | "applicationId">> | OakOperation<MessageTypeTemplateId.UpdateOperation["action"], Omit<MessageTypeTemplateId.UpdateOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">>>;
    notification$application?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "application" | "applicationId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">>>;
    token$application?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">>>;
    wechatPublicTag$application?: OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">>>;
    wechatQrCode$application?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">>>;
    wechatUser$application?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "systemId">> & (({
    system: System.CreateSingleOperation;
    systemId?: never;
} | {
    system: System.UpdateOperation;
    systemId?: never;
} | {
    system: System.RemoveOperation;
    systemId?: never;
} | {
    system?: never;
    systemId?: ForeignKey<"system"> | null;
})) & {
    [k: string]: any;
    messageTypeTemplateId$application?: OakOperation<MessageTypeTemplateId.UpdateOperation["action"], Omit<MessageTypeTemplateId.UpdateOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">> | OakOperation<MessageTypeTemplateId.RemoveOperation["action"], Omit<MessageTypeTemplateId.RemoveOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<MessageTypeTemplateId.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<MessageTypeTemplateId.CreateOperationData, "application" | "applicationId">> | OakOperation<MessageTypeTemplateId.UpdateOperation["action"], Omit<MessageTypeTemplateId.UpdateOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">> | OakOperation<MessageTypeTemplateId.RemoveOperation["action"], Omit<MessageTypeTemplateId.RemoveOperationData, "application" | "applicationId">, Omit<MessageTypeTemplateId.Filter, "application" | "applicationId">>>;
    notification$application?: OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Notification.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Notification.CreateOperationData, "application" | "applicationId">> | OakOperation<Notification.UpdateOperation["action"], Omit<Notification.UpdateOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">> | OakOperation<Notification.RemoveOperation["action"], Omit<Notification.RemoveOperationData, "application" | "applicationId">, Omit<Notification.Filter, "application" | "applicationId">>>;
    token$application?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">>>;
    wechatPublicTag$application?: OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<WechatPublicTag.RemoveOperation["action"], Omit<WechatPublicTag.RemoveOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<WechatPublicTag.RemoveOperation["action"], Omit<WechatPublicTag.RemoveOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">>>;
    wechatQrCode$application?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">>>;
    wechatUser$application?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">>>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
export type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Aggregation: Aggregation;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};