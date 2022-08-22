import { String, Datetime, PrimaryKey, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Address from "../Address/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    name: String<32>;
    level: 'province' | 'city' | 'district' | 'street' | 'country';
    depth: 0 | 1 | 2 | 3 | 4;
    parentId?: ForeignKey<"area"> | null;
    code: String<12>;
    center: Geo;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$removeAt$$?: Datetime | null;
    name: String<32>;
    level: 'province' | 'city' | 'district' | 'street' | 'country';
    depth: 0 | 1 | 2 | 3 | 4;
    parentId?: ForeignKey<"area"> | null;
    code: String<12>;
    center: Geo;
    parent?: Schema | null;
    address$area?: Array<Address.Schema>;
    area$parent?: Array<Schema>;
} & {
    [A in ExpressionKey]?: any;
};
declare type AttrFilter = {
    id: Q_StringValue | SubQuery.AreaIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    level: Q_EnumValue<'province' | 'city' | 'district' | 'street' | 'country'>;
    depth: Q_EnumValue<0 | 1 | 2 | 3 | 4>;
    parentId: Q_StringValue | SubQuery.AreaIdSubQuery;
    parent: Filter;
    code: Q_StringValue;
};
export declare type Filter = MakeFilter<AttrFilter & ExprOp<OpAttr>>;
export declare type Projection = {
    "#id"?: NodeId;
    [k: string]: any;
    id: 1;
    $$createAt$$?: 1;
    $$updateAt$$?: 1;
    name?: 1;
    level?: 1;
    depth?: 1;
    parentId?: 1;
    parent?: Projection;
    code?: 1;
    center?: 1;
    address$area?: Address.Selection & {
        $entity: "address";
    };
    area$parent?: Selection & {
        $entity: "area";
    };
} & Partial<ExprOp<OpAttr>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    name?: string;
    level?: string;
    depth?: string;
    parentId?: string;
    parent?: ExportProjection;
    code?: string;
    center?: string;
    address$area?: Address.Exportation & {
        $entity: "address";
    };
    area$parent?: Exportation & {
        $entity: "area";
    };
} & Partial<ExprOp<OpAttr>>;
declare type AreaIdProjection = OneOf<{
    id: 1;
    parentId: 1;
}>;
export declare type SortAttr = OneOf<{
    id: 1;
    $$createAt$$: 1;
    $$updateAt$$: 1;
    name: 1;
    level: 1;
    depth: 1;
    parentId: 1;
    parent: SortAttr;
    code: 1;
    center: 1;
} & ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = OakOperation<"select", P, Filter, Sorter>;
export declare type Selection<P = Projection> = Omit<SelectOperation<P>, "action">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "parentId">> & (({
    parentId?: never | null;
    parent?: CreateSingleOperation;
} | {
    parentId?: String<64>;
    parent?: UpdateOperation;
})) & {
    [k: string]: any;
    address$area?: OakOperation<"update", Omit<Address.UpdateOperationData, "area" | "areaId">, Address.Filter> | Array<OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId"> | Omit<Address.CreateOperationData, "area" | "areaId">[]> | OakOperation<"update", Omit<Address.UpdateOperationData, "area" | "areaId">, Address.Filter>>;
    area$parent?: OakOperation<"update", Omit<UpdateOperationData, "parent" | "parentId">, Filter> | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId"> | Omit<CreateOperationData, "parent" | "parentId">[]> | OakOperation<"update", Omit<UpdateOperationData, "parent" | "parentId">, Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "parentId">> & (({
    parent?: CreateSingleOperation | UpdateOperation | RemoveOperation;
    parentId?: undefined;
} | {
    parent?: undefined;
    parentId?: String<64> | null;
})) & {
    [k: string]: any;
    addresss$area?: Address.UpdateOperation | Address.RemoveOperation | Array<OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId"> | Omit<Address.CreateOperationData, "area" | "areaId">[]> | Address.UpdateOperation | Address.RemoveOperation>;
    areas$parent?: UpdateOperation | RemoveOperation | Array<OakOperation<"create", Omit<CreateOperationData, "parent" | "parentId"> | Omit<CreateOperationData, "parent" | "parentId">[]> | UpdateOperation | RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter>;
export declare type RemoveOperationData = {} & (({
    parent?: UpdateOperation;
} | {
    parent?: RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type AreaIdSubQuery = Selection<AreaIdProjection>;
export declare type NativeAttr = OpAttr | `parent.${OpAttr}` | `parent.parent.${OpAttr}` | `parent.parent.parent.${OpAttr}`;
export declare type FullAttr = NativeAttr | `addresss$${number}.${Address.NativeAttr}` | `areas$${number}.${NativeAttr}`;
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
