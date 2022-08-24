import { String, Text, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as System from "../System/Schema";
import * as Token from "../Token/Schema";
import * as WechatQrCode from "../WechatQrCode/Schema";
import * as WechatUser from "../WechatUser/Schema";
export declare type AppType = 'web' | 'wechatMp' | 'wechatPublic';
export declare type WechatMpConfig = {
    type: 'wechatMp';
    appId: string;
    appSecret: string;
    qrCodePrefix?: string;
};
export declare type WebConfig = {
    type: 'web';
    appId?: string;
    appSecret?: string;
};
export declare type WechatPublicConfig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    type: AppType;
    systemId: ForeignKey<"system">;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    type: AppType;
    systemId: ForeignKey<"system">;
    config: WebConfig | WechatMpConfig | WechatPublicConfig;
    system: System.Schema;
    token$application?: Array<Token.Schema>;
    wechatQrCode$application?: Array<WechatQrCode.Schema>;
    wechatUser$application?: Array<WechatUser.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.ApplicationIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    type: Q_EnumValue<AppType>;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    name?: 1;
    description?: 1;
    type?: 1;
    systemId?: 1;
    system?: System.Projection;
    config?: 1;
    token$application?: Token.Selection & {
        $entity: "token";
    };
    wechatQrCode$application?: WechatQrCode.Selection & {
        $entity: "wechatQrCode";
    };
    wechatUser$application?: WechatUser.Selection & {
        $entity: "wechatUser";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    name?: string;
    description?: string;
    type?: string;
    systemId?: string;
    system?: System.ExportProjection;
    config?: string;
    token$application?: Token.Exportation & {
        $entity: "token";
    };
    wechatQrCode$application?: WechatQrCode.Exportation & {
        $entity: "wechatQrCode";
    };
    wechatUser$application?: WechatUser.Exportation & {
        $entity: "wechatUser";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type ApplicationIdProjection = OneOf<{
    id: 1;
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
    description: 1;
} | {
    type: 1;
} | {
    systemId: 1;
} | {
    system: System.SortAttr;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "systemId">> & (({
    systemId?: never | null;
    system: System.CreateSingleOperation;
} | {
    systemId: String<64>;
    system?: System.UpdateOperation;
})) & {
    [k: string]: any;
    token$application?: OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Token.Filter> | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId"> | Omit<Token.CreateOperationData, "application" | "applicationId">[]> | OakOperation<Token.UpdateOperation["action"], Omit<Token.UpdateOperationData, "application" | "applicationId">, Token.Filter>>;
    wechatQrCode$application?: OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, WechatQrCode.Filter> | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId"> | Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | OakOperation<WechatQrCode.UpdateOperation["action"], Omit<WechatQrCode.UpdateOperationData, "application" | "applicationId">, WechatQrCode.Filter>>;
    wechatUser$application?: OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, WechatUser.Filter> | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId"> | Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | OakOperation<WechatUser.UpdateOperation["action"], Omit<WechatUser.UpdateOperationData, "application" | "applicationId">, WechatUser.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "systemId">> & (({
    system?: System.CreateSingleOperation | System.UpdateOperation | System.RemoveOperation;
    systemId?: undefined;
} | {
    system?: undefined;
    systemId?: String<64> | null;
})) & {
    [k: string]: any;
    tokens$application?: Token.UpdateOperation | Token.RemoveOperation | Array<OakOperation<"create", Omit<Token.CreateOperationData, "application" | "applicationId"> | Omit<Token.CreateOperationData, "application" | "applicationId">[]> | Token.UpdateOperation | Token.RemoveOperation>;
    wechatQrCodes$application?: WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation | Array<OakOperation<"create", Omit<WechatQrCode.CreateOperationData, "application" | "applicationId"> | Omit<WechatQrCode.CreateOperationData, "application" | "applicationId">[]> | WechatQrCode.UpdateOperation | WechatQrCode.RemoveOperation>;
    wechatUsers$application?: WechatUser.UpdateOperation | WechatUser.RemoveOperation | Array<OakOperation<"create", Omit<WechatUser.CreateOperationData, "application" | "applicationId"> | Omit<WechatUser.CreateOperationData, "application" | "applicationId">[]> | WechatUser.UpdateOperation | WechatUser.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    system?: System.UpdateOperation;
} | {
    system?: System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type ApplicationIdSubQuery = Selection<ApplicationIdProjection>;
export declare type NativeAttr = OpAttr | `system.${System.NativeAttr}`;
export declare type FullAttr = NativeAttr | `tokens$${number}.${Token.NativeAttr}` | `wechatQrCodes$${number}.${WechatQrCode.NativeAttr}` | `wechatUsers$${number}.${WechatUser.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<GenericAction> | string;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
