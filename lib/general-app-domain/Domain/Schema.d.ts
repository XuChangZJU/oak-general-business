import { String, Int, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as System from "../System/Schema";
export declare type OpSchema = EntityShape & {
    url: String<64>;
    apiPath: String<32>;
    protocol: 'http' | 'https';
    port: Int<2>;
    systemId: ForeignKey<"system">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
    url: String<64>;
    apiPath: String<32>;
    protocol: 'http' | 'https';
    port: Int<2>;
    systemId: ForeignKey<"system">;
    system: System.Schema;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.DomainIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    url: Q_StringValue;
    apiPath: Q_StringValue;
    protocol: Q_EnumValue<'http' | 'https'>;
    port: Q_NumberValue;
    systemId: Q_StringValue | SubQuery.SystemIdSubQuery;
    system: System.Filter;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr | string>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: number;
    $$createAt$$?: number;
    $$updateAt$$?: number;
    $$seq$$?: number;
    url?: number;
    apiPath?: number;
    protocol?: number;
    port?: number;
    systemId?: number;
    system?: System.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
    url?: string;
    apiPath?: string;
    protocol?: string;
    port?: string;
    systemId?: string;
    system?: System.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type DomainIdProjection = OneOf<{
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
    url: number;
} | {
    apiPath: number;
} | {
    protocol: number;
} | {
    port: number;
} | {
    systemId: number;
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
export declare type SelectOperation<P extends Object = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
export declare type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "systemId">> & (({
    systemId?: never;
    system: System.CreateSingleOperation;
} | {
    systemId: String<64>;
    system?: System.UpdateOperation;
} | {
    systemId: String<64>;
}));
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
    systemId?: String<64> | null;
})) & {
    [k: string]: any;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    system?: System.UpdateOperation | System.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
export declare type DomainIdSubQuery = Selection<DomainIdProjection>;
export declare type NativeAttr = OpAttr | `system.${System.NativeAttr}`;
export declare type FullAttr = NativeAttr;
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
