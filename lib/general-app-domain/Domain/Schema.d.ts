import { String, Int, Datetime, PrimaryKey, ForeignKey } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation, MakeAction as OakMakeAction } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as System from "../System/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
    url: String<64>;
    apiPath: String<32>;
    protocol: 'http' | 'https';
    port: Int<2>;
    systemId: ForeignKey<"system">;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
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
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    url?: 1;
    apiPath?: 1;
    protocol?: 1;
    port?: 1;
    systemId?: 1;
    system?: System.Projection;
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    url?: string;
    apiPath?: string;
    protocol?: string;
    port?: string;
    systemId?: string;
    system?: System.ExportProjection;
} & Partial<ExprOp<OpAttr | string>>;
declare type DomainIdProjection = OneOf<{
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
    url: 1;
} | {
    apiPath: 1;
} | {
    protocol: 1;
} | {
    port: 1;
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
}));
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
