import { String, Int, Uint, Float, Double, Boolean, Text, Datetime, File, Price, Image, PrimaryKey, ForeignKey, Geo, SingleGeo } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_NumberValue, Q_StringValue, Q_EnumValue, NodeId, MakeFilter, FulltextFilter, ExprOp, ExpressionKey } from "oak-domain/lib/types/Demand";
import { OneOf, ValueOf } from "oak-domain/lib/types/Polyfill";
import * as SubQuery from "../_SubQuery";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
import { Config } from "../../types/Config";
import { Style } from "../../types/Style";
import * as Platform from "../Platform/Schema";
import * as Application from "../Application/Schema";
import * as Domain from "../Domain/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
import * as UserSystem from "../UserSystem/Schema";
export type OpSchema = EntityShape & {
    name: String<32>;
    description: Text;
    config: Config;
    platformId: ForeignKey<"platform">;
    folder: String<16>;
    super?: Boolean | null;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
};
export type OpAttr = keyof OpSchema;
export type Schema = EntityShape & {
    name: String<32>;
    description: Text;
    config: Config;
    platformId: ForeignKey<"platform">;
    folder: String<16>;
    super?: Boolean | null;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    platform: Platform.Schema;
    application$system?: Array<Application.Schema>;
    application$system$$aggr?: AggregationResult<Application.Schema>;
    domain$system?: Array<Domain.Schema>;
    domain$system$$aggr?: AggregationResult<Domain.Schema>;
    messageSystem$system?: Array<MessageSystem.Schema>;
    messageSystem$system$$aggr?: AggregationResult<MessageSystem.Schema>;
    userSystem$system?: Array<UserSystem.Schema>;
    userSystem$system$$aggr?: AggregationResult<UserSystem.Schema>;
} & {
    [A in ExpressionKey]?: any;
};
type AttrFilter = {
    id: Q_StringValue | SubQuery.SystemIdSubQuery;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: Q_EnumValue<Config>;
    platformId: Q_StringValue | SubQuery.PlatformIdSubQuery;
    platform: Platform.Filter;
    folder: Q_StringValue;
    super: Q_BooleanValue;
    style: Q_EnumValue<Style>;
    entity: Q_StringValue;
    entityId: Q_StringValue;
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
    config?: number;
    platformId?: number;
    platform?: Platform.Projection;
    folder?: number;
    super?: number;
    style?: number;
    entity?: number;
    entityId?: number;
    application$system?: Application.Selection & {
        $entity: "application";
    };
    application$system$$aggr?: Application.Aggregation & {
        $entity: "application";
    };
    domain$system?: Domain.Selection & {
        $entity: "domain";
    };
    domain$system$$aggr?: Domain.Aggregation & {
        $entity: "domain";
    };
    messageSystem$system?: MessageSystem.Selection & {
        $entity: "messageSystem";
    };
    messageSystem$system$$aggr?: MessageSystem.Aggregation & {
        $entity: "messageSystem";
    };
    userSystem$system?: UserSystem.Selection & {
        $entity: "userSystem";
    };
    userSystem$system$$aggr?: UserSystem.Aggregation & {
        $entity: "userSystem";
    };
} & Partial<ExprOp<OpAttr | string>>;
type SystemIdProjection = OneOf<{
    id: number;
}>;
type PlatformIdProjection = OneOf<{
    platformId: number;
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
    config: number;
} | {
    platformId: number;
} | {
    platform: Platform.SortAttr;
} | {
    folder: number;
} | {
    super: number;
} | {
    style: number;
} | {
    entity: number;
} | {
    entityId: number;
} | {
    [k: string]: any;
} | OneOf<ExprOp<OpAttr | string>>;
export type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export type Sorter = SortNode[];
export type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export type Selection<P extends Object = Projection> = Omit<SelectOperation<P>, "action">;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "platformId">> & (({
    platformId?: never;
    platform: Platform.CreateSingleOperation;
} | {
    platformId: String<64>;
    platform?: Platform.UpdateOperation;
} | {
    platformId: String<64>;
})) & ({
    entity?: string;
    entityId?: string;
    [K: string]: any;
}) & {
    application$system?: OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter> | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Application.Filter>>;
    domain$system?: OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Domain.Filter> | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Domain.Filter>>;
    messageSystem$system?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, MessageSystem.Filter> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, MessageSystem.Filter>>;
    userSystem$system?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, UserSystem.Filter> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, UserSystem.Filter>>;
};
export type CreateSingleOperation = OakOperation<"create", CreateOperationData>;
export type CreateMultipleOperation = OakOperation<"create", Array<CreateOperationData>>;
export type CreateOperation = CreateSingleOperation | CreateMultipleOperation;
export type UpdateOperationData = FormUpdateData<Omit<OpSchema, "platformId">> & (({
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
    application$system?: Application.UpdateOperation | Application.RemoveOperation | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | Application.UpdateOperation | Application.RemoveOperation>;
    domain$system?: Domain.UpdateOperation | Domain.RemoveOperation | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | Domain.UpdateOperation | Domain.RemoveOperation>;
    messageSystem$system?: MessageSystem.UpdateOperation | MessageSystem.RemoveOperation | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">> | MessageSystem.UpdateOperation | MessageSystem.RemoveOperation>;
    userSystem$system?: UserSystem.UpdateOperation | UserSystem.RemoveOperation | OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">> | UserSystem.UpdateOperation | UserSystem.RemoveOperation>;
};
export type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export type RemoveOperationData = {} & (({
    platform?: Platform.UpdateOperation | Platform.RemoveOperation;
}));
export type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export type PlatformIdSubQuery = Selection<PlatformIdProjection>;
export type SystemIdSubQuery = Selection<SystemIdProjection>;
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