import { String, Text, Datetime, PrimaryKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Application from "../Application/Schema";
import * as UserSystem from "../UserSystem/Schema";
export declare type SystemConfig = {
    Cos?: {
        qiniu?: {
            accessKey: string;
            secretKey: string;
            uploadHost: string;
            bucket: string;
            domain: string;
            protocol: string | string[];
        };
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
    $$removeAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    config: SystemConfig;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    name: String<32>;
    description: Text;
    config: SystemConfig;
    application$system?: Array<Application.Schema>;
    userSystem$system?: Array<UserSystem.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.SystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    name?: 1;
    description?: 1;
    config?: 1;
    application$system?: Application.Selection & {
        $entity: "application";
    };
    userSystem$system?: UserSystem.Selection & {
        $entity: "userSystem";
    };
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    name?: string;
    description?: string;
    config?: string;
    application$system?: Application.Exportation & {
        $entity: "application";
    };
    userSystem$system?: UserSystem.Exportation & {
        $entity: "userSystem";
    };
} & Partial<ExprOp<OpAttr>>;
declare type SystemIdProjection = OneOf<{
    id: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    name: 1;
    description: 1;
    config: 1;
} & ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<OpSchema> & {
    [k: string]: any;
    application$system?: OakOperation<"update", Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId"> | Omit<Application.CreateOperationData, "system" | "systemId">[]> | OakOperation<"update", Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter>>;
    userSystem$system?: OakOperation<"update", Omit<UserSystem.UpdateOperationData, "system" | "systemId">, UserSystem.Filter> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId"> | Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | OakOperation<"update", Omit<UserSystem.UpdateOperationData, "system" | "systemId">, UserSystem.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<OpSchema> & {
    [k: string]: any;
    applications$system?: Application.UpdateOperation | Application.RemoveOperation | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId"> | Omit<Application.CreateOperationData, "system" | "systemId">[]> | Application.UpdateOperation | Application.RemoveOperation>;
    userSystems$system?: UserSystem.UpdateOperation | UserSystem.RemoveOperation | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId"> | Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | UserSystem.UpdateOperation | UserSystem.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type NativeAttr = OpAttr;
export declare type FullAttr = NativeAttr | `applications$${number}.${Application.NativeAttr}` | `userSystems$${number}.${UserSystem.NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: GenericAction;
    Selection: Selection;
    Operation: Operation;
    Create: CreateOperation;
    Update: UpdateOperation;
    Remove: RemoveOperation;
    CreateSingle: CreateSingleOperation;
    CreateMulti: CreateMultipleOperation;
};
export {};
