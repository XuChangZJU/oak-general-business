import { String, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, MakeAction as OakMakeAction, EntityShape } from "oak-domain/lib/types/Entity";
import { ReadOnlyAction } from "oak-domain/lib/actions/action";
import * as Address from "../Address/Schema";
export declare type OpSchema = EntityShape & {
    name: String<32>;
    level: 'province' | 'city' | 'district' | 'street' | 'country';
    depth: 0 | 1 | 2 | 3 | 4;
    parentId?: ForeignKey<"area"> | null;
    code: String<12>;
    center: Geo;
};
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    level: Q_EnumValue<'province' | 'city' | 'district' | 'street' | 'country'>;
    depth: Q_EnumValue<0 | 1 | 2 | 3 | 4>;
    parentId: Q_StringValue | SubQuery.AreaIdSubQuery;
    parent: Filter;
    code: Q_StringValue;
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
    level?: number;
    depth?: number;
    parentId?: number;
    parent?: Projection;
    code?: number;
    center?: number;
    address$area?: Address.Selection & {
        $entity: "address";
    };
    area$parent?: Selection & {
        $entity: "area";
    };
} & Partial<ExprOp<OpAttr | string>>;
export declare type ExportProjection = {
    "#id"?: NodeId;
    [k: string]: any;
    id?: string;
    $$createAt$$?: string;
    $$updateAt$$?: string;
    $$seq$$?: string;
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
} & Partial<ExprOp<OpAttr | string>>;
declare type AreaIdProjection = OneOf<{
    id: number;
    parentId: number;
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
    level: number;
} | {
    depth: number;
} | {
    parentId: number;
} | {
    parent: SortAttr;
} | {
    code: number;
} | {
    center: number;
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
export declare type Aggregation = Omit<DeduceAggregation<Schema, Projection, Filter, Sorter>, "id">;
export declare type Exportation = OakOperation<"export", ExportProjection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "parentId">> & ({
    parentId?: String<64>;
}) & {
    address$area?: OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "area" | "areaId">, Address.Filter> | OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId">[]> | Array<OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId">> | OakOperation<Address.UpdateOperation["action"], Omit<Address.UpdateOperationData, "area" | "areaId">, Address.Filter>>;
};
export declare type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export declare type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export declare type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export declare type UpdateOperationData = FormUpdateData<Omit<OpSchema, "parentId">> & ({
    parent?: never;
    parentId?: String<64> | null;
}) & {
    [k: string]: any;
    addresss$area?: Address.UpdateOperation | Address.RemoveOperation | OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId">[]> | Array<OakOperation<"create", Omit<Address.CreateOperationData, "area" | "areaId">> | Address.UpdateOperation | Address.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {};
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type AreaIdSubQuery = Selection<AreaIdProjection>;
export declare type NativeAttr = OpAttr | `parent.${OpAttr}` | `parent.parent.${OpAttr}` | `parent.parent.parent.${OpAttr}`;
export declare type FullAttr = NativeAttr | `addresss$${number}.${Address.NativeAttr}` | `areas$${number}.${NativeAttr}`;
export declare type EntityDef = {
    Schema: Schema;
    OpSchema: OpSchema;
    Action: OakMakeAction<ReadOnlyAction> | string;
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
