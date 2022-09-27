import { String, Boolean, Text, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Platform from "../Platform/Schema";
import * as Application from "../Application/Schema";
import * as Domain from "../Domain/Schema";
import * as User from "../User/Schema";
export declare type QiniuConfig = {
    accessKey: string;
    secretKey: string;
    uploadHost: string;
    liveHost?: string;
    puhlishDomain?: string;
    playDomain?: string;
    playBackDomain?: string;
    hub?: string;
    publisthKey?: string;
    playKey?: string;
    bucket: string;
    domain: string;
    protocol: string | string[];
};
export declare type SystemConfig = {
    Cos?: {
        qiniu?: QiniuConfig;
    };
    Map?: {
        amap?: {
            webApiKey: string;
        };
    };
    UserEntityGrant?: {
        lifetimeLength: number;
    };
};
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    config: SystemConfig;
    platformId: ForeignKey<"platform">;
    super?: Boolean | null;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    config: SystemConfig;
    platformId: ForeignKey<"platform">;
    super?: Boolean | null;
    platform: Platform.Schema;
    application$system?: Array<Application.Schema>;
    domain$system?: Array<Domain.Schema>;
    user$system?: Array<User.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.SystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: Q_EnumValue<SystemConfig>;
    platformId: Q_StringValue | SubQuery.PlatformIdSubQuery;
    platform: Platform.Filter;
    super: Q_BooleanValue;
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
    config?: 1;
    platformId?: 1;
    platform?: Platform.Projection;
    super?: 1;
    application$system?: Application.Selection & {
        $entity: "application";
    };
    domain$system?: Domain.Selection & {
        $entity: "domain";
    };
    user$system?: User.Selection & {
        $entity: "user";
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
    config?: string;
    platformId?: string;
    platform?: Platform.ExportProjection;
    super?: string;
    application$system?: Application.Exportation & {
        $entity: "application";
    };
    domain$system?: Domain.Exportation & {
        $entity: "domain";
    };
    user$system?: User.Exportation & {
        $entity: "user";
    };
} & Partial<ExprOp<OpAttr | string>>;
declare type SystemIdProjection = OneOf<{
    id: 1;
}>;
declare type PlatformIdProjection = OneOf<{
    platformId: 1;
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
    config: 1;
} | {
    platformId: 1;
} | {
    platform: Platform.SortAttr;
} | {
    super: 1;
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
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "platformId">> & (({
    platformId?: never;
    platform: Platform.CreateSingleOperation;
} | {
    platformId: String<64>;
    platform?: Platform.UpdateOperation;
} | {
    platformId: String<64>;
})) & {
    application$system?: OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter> | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter>>;
    domain$system?: OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Domain.Filter> | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Domain.Filter>>;
    user$system?: OakOperation<User.UpdateOperation["action"], Omit<User.UpdateOperationData, "system" | "systemId">, User.Filter> | OakOperation<"create", Omit<User.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<User.CreateOperationData, "system" | "systemId">> | OakOperation<User.UpdateOperation["action"], Omit<User.UpdateOperationData, "system" | "systemId">, User.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "platformId">> & (({
    platform: Platform.CreateSingleOperation;
    platformId?: never;
} | {
    platform: Platform.UpdateOperation;
    platformId?: never;
} | {
    platform: Platform.RemoveOperation;
    platformId?: never;
} | {
    platform?: never;
    platformId?: String<64> | null;
})) & {
    [k: string]: any;
    applications$system?: Application.UpdateOperation | Application.RemoveOperation | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | Application.UpdateOperation | Application.RemoveOperation>;
    domains$system?: Domain.UpdateOperation | Domain.RemoveOperation | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | Domain.UpdateOperation | Domain.RemoveOperation>;
    users$system?: User.UpdateOperation | User.RemoveOperation | OakOperation<"create", Omit<User.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<User.CreateOperationData, "system" | "systemId">> | User.UpdateOperation | User.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    platform?: Platform.UpdateOperation | Platform.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type PlatformIdSubQuery = Selection<PlatformIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type NativeAttr = OpAttr | `platform.${Platform.NativeAttr}`;
export declare type FullAttr = NativeAttr | `applications$${number}.${Application.NativeAttr}` | `domains$${number}.${Domain.NativeAttr}` | `users$${number}.${User.NativeAttr}`;
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
