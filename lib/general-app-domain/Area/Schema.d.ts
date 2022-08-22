import { String, Datetime, PrimaryKey, ForeignKey, Geo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, Operation as OakOperation } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import * as Address from "../Address/Schema";
import * as OperEntity from "../OperEntity/Schema";
import * as ModiEntity from "../ModiEntity/Schema";
export declare type OpSchema = {
    id: PrimaryKey;
    $$createAt$$: Datetime;
    $$updateAt$$: Datetime;
    $$deleteAt$$?: Datetime | null;
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
    $$deleteAt$$?: Datetime | null;
    name: String<32>;
    level: 'province' | 'city' | 'district' | 'street' | 'country';
    depth: 0 | 1 | 2 | 3 | 4;
    parentId?: ForeignKey<"area"> | null;
    code: String<12>;
    center: Geo;
    parent?: Schema | null;
    address$area?: Array<Address.Schema>;
    area$parent?: Array<Schema>;
    operEntity$entity?: Array<OperEntity.Schema>;
    modiEntity$entity?: Array<ModiEntity.Schema>;
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
    operEntity$entity?: OperEntity.Selection & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Selection & {
        $entity: "modiEntity";
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
    operEntity$entity?: OperEntity.Exportation & {
        $entity: "operEntity";
    };
    modiEntity$entity?: ModiEntity.Exportation & {
        $entity: "modiEntity";
    };
} & Partial<ExprOp<OpAttr>>;
declare type AreaIdProjection = OneOf<{
    id: 1;
    parentId: 1;
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
    level: 1;
} | {
    depth: 1;
} | {
    parentId: 1;
} | {
    parent: SortAttr;
} | {
    code: 1;
} | {
    center: 1;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr>>;
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P = Projection> = Omit<OakOperation<"select", P, Filter, Sorter>, "id">;
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
    operEntity$entity?: OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter> | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<OperEntity.UpdateOperationData, "entity" | "entityId">, OperEntity.Filter>>;
    modiEntity$entity?: OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter> | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | OakOperation<"update", Omit<ModiEntity.UpdateOperationData, "entity" | "entityId">, ModiEntity.Filter>>;
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
    operEntitys$entity?: OperEntity.UpdateOperation | OperEntity.RemoveOperation | Array<OakOperation<"create", Omit<OperEntity.CreateOperationData, "entity" | "entityId"> | Omit<OperEntity.CreateOperationData, "entity" | "entityId">[]> | OperEntity.UpdateOperation | OperEntity.RemoveOperation>;
    modiEntitys$entity?: ModiEntity.UpdateOperation | ModiEntity.RemoveOperation | Array<OakOperation<"create", Omit<ModiEntity.CreateOperationData, "entity" | "entityId"> | Omit<ModiEntity.CreateOperationData, "entity" | "entityId">[]> | ModiEntity.UpdateOperation | ModiEntity.RemoveOperation>;
};
export declare type UpdateOperation = OakOperation<"update", UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    parent?: UpdateOperation;
} | {
    parent?: RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation | SelectOperation;
export declare type AreaIdSubQuery = Selection<AreaIdProjection>;
export declare type NativeAttr = OpAttr | `parent.${OpAttr}` | `parent.parent.${OpAttr}` | `parent.parent.parent.${OpAttr}`;
export declare type FullAttr = NativeAttr | `addresss$${number}.${Address.NativeAttr}` | `areas$${number}.${NativeAttr}` | `operEntitys$${number}.${OperEntity.NativeAttr}` | `modiEntitys$${number}.${ModiEntity.NativeAttr}`;
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
