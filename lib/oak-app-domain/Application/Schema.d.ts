import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Style } from "../../types/Style";
import * as System from "../System/Schema";
import * as MessageTypeTemplateId from "../MessageTypeTemplateId/Schema";
import * as Notification from "../Notification/Schema";
import * as SessionMessage from "../SessionMessage/Schema";
import * as Token from "../Token/Schema";
import * as WechatPublicTag from "../WechatPublicTag/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
import * as Session from "../Session/Schema";
export declare type Passport = 'email' | 'mobile' | 'wechat' | 'wechatPublic';
export declare type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    originalId?: string;
    qrCodePrefix?: string;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
        dataFormat: 'json' | 'xml';
    };
    passport?: Passport[];
};
export declare type WebConfig = {
    type: 'web';
    wechat?: {
        appId: string;
        appSecret: string;
        domain?: string;
        enable?: boolean;
    };
    passport?: Passport[];
};
export declare type WechatPublicTemplateMsgsConfig = Record<string, string>;
export declare type WechatPublicConfig = {
    type: 'wechatPublic';
    isService: boolean;
    appId: string;
    appSecret: string;
    originalId?: string;
    enable?: boolean;
    templateMsgs?: WechatPublicTemplateMsgsConfig;
    server?: {
        url?: string;
        token: string;
        encodingAESKey: string;
        mode: 'clear' | 'compatible' | 'safe';
    };
    wechatMp?: {
        appId: string;
        originalId: string;
    };
    passport?: Passport[];
};
export declare type OpSchema = EntityShape & {
    name: String<32>;
    description: Text;
    type: AppType;
    systemId: ForeignKey<"system">;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    style?: Style | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
    sessionMessage$application?: Array<SessionMessage.Schema>;
    sessionMessage$application$$aggr?: AggregationResult<SessionMessage.Schema>;
    token$application?: Array<Token.Schema>;
    token$application$$aggr?: AggregationResult<Token.Schema>;
    wechatPublicTag$application?: Array<WechatPublicTag.Schema>;
    wechatPublicTag$application$$aggr?: AggregationResult<WechatPublicTag.Schema>;
    wechatQrCode$application?: Array<WechatQrCode.Schema>;
    wechatQrCode$application$$aggr?: AggregationResult<WechatQrCode.Schema>;
    wechatUser$application?: Array<WechatUser.Schema>;
    wechatUser$application$$aggr?: AggregationResult<WechatUser.Schema>;
    session$entity?: Array<Session.Schema>;
    session$entity$$aggr?: AggregationResult<Session.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
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
    sessionMessage$application: SessionMessage.Filter & SubQueryPredicateMetadata;
    token$application: Token.Filter & SubQueryPredicateMetadata;
    wechatPublicTag$application: WechatPublicTag.Filter & SubQueryPredicateMetadata;
    wechatQrCode$application: WechatQrCode.Filter & SubQueryPredicateMetadata;
    wechatUser$application: WechatUser.Filter & SubQueryPredicateMetadata;
    session$entity: Session.Filter & SubQueryPredicateMetadata;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
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
    sessionMessage$application?: SessionMessage.Selection & {
        $entity: "sessionMessage";
    };
    sessionMessage$application$$aggr?: SessionMessage.Aggregation & {
        $entity: "sessionMessage";
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
    session$entity?: Session.Selection & {
        $entity: "session";
    };
    session$entity$$aggr?: Session.Aggregation & {
        $entity: "session";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ApplicationIdProjection = OneOf<{
    id: number;
}>;
declare type SystemIdProjection = OneOf<{
    systemId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "systemId">> & (({
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
    sessionMessage$application?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "application" | "applicationId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">>>;
    token$application?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">>>;
    wechatPublicTag$application?: OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">>>;
    wechatQrCode$application?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">>>;
    wechatUser$application?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">>>;
    session$entity?: OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Session.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Session.CreateOperationData, "entity" | "entityId">> | OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "systemId">> & (({
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
    sessionMessage$application?: OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<SessionMessage.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<SessionMessage.CreateOperationData, "application" | "applicationId">> | OakOperation<SessionMessage.UpdateOperation["action"], Omit<SessionMessage.UpdateOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">> | OakOperation<SessionMessage.RemoveOperation["action"], Omit<SessionMessage.RemoveOperationData, "application" | "applicationId">, Omit<SessionMessage.Filter, "application" | "applicationId">>>;
    token$application?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId">> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">> | OakOperation<Token.RemoveOperation["action"], Omit<Token.RemoveOperationData, "application" | "applicationId">, Omit<Token.Filter, "application" | "applicationId">>>;
    wechatPublicTag$application?: OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<WechatPublicTag.RemoveOperation["action"], Omit<WechatPublicTag.RemoveOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatPublicTag.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatPublicTag.UpdateOperation["action"], Omit<WechatPublicTag.UpdateOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">> | OakOperation<WechatPublicTag.RemoveOperation["action"], Omit<WechatPublicTag.RemoveOperationData, "application" | "applicationId">, Omit<WechatPublicTag.Filter, "application" | "applicationId">>>;
    wechatQrCode$application?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">> | OakOperation<WechatQrCode.RemoveOperation["action"], Omit<WechatQrCode.RemoveOperationData, "application" | "applicationId">, Omit<WechatQrCode.Filter, "application" | "applicationId">>>;
    wechatUser$application?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId">> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">> | OakOperation<WechatUser.RemoveOperation["action"], Omit<WechatUser.RemoveOperationData, "application" | "applicationId">, Omit<WechatUser.Filter, "application" | "applicationId">>>;
    session$entity?: OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">> | OakOperation<Session.RemoveOperation["action"], Omit<Session.RemoveOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">> | OakOperation<"create", Omit<Session.CreateOperationData, "entity" | "entityId">[]> | Array<OakOperation<"create", Omit<Session.CreateOperationData, "entity" | "entityId">> | OakOperation<Session.UpdateOperation["action"], Omit<Session.UpdateOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">> | OakOperation<Session.RemoveOperation["action"], Omit<Session.RemoveOperationData, "entity" | "entityId">, Omit<Session.Filter, "entity" | "entityId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type EntityDef = {
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
export {};
