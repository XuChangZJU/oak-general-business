import { String, Boolean, Text, ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, EntityShape, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { Config } from "../../types/Config";
import { Style } from "../../types/Style";
import * as Platform from "../Platform/Schema";
import * as Application from "../Application/Schema";
import * as Domain from "../Domain/Schema";
import * as MessageSystem from "../MessageSystem/Schema";
import * as UserSystem from "../UserSystem/Schema";
export declare type OpSchema = EntityShape & {
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
export declare type OpAttr = keyof OpSchema;
export declare type Schema = EntityShape & {
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
declare type AttrFilter = {
    id: Q_StringValue;
    $$createAt$$: Q_DateValue;
    $$seq$$: Q_StringValue;
    $$updateAt$$: Q_DateValue;
    name: Q_StringValue;
    description: Q_StringValue;
    config: JsonFilter<Config>;
    platformId: Q_StringValue;
    platform: Platform.Filter;
    folder: Q_StringValue;
    super: Q_BooleanValue;
    style: JsonFilter<Style>;
    entity: Q_StringValue;
    entityId: Q_StringValue;
    application$system: Application.Filter;
    domain$system: Domain.Filter;
    messageSystem$system: MessageSystem.Filter;
    userSystem$system: UserSystem.Filter;
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
    config?: number | JsonProjection<Config>;
    platformId?: number;
    platform?: Platform.Projection;
    folder?: number;
    super?: number;
    style?: number | JsonProjection<Style>;
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
declare type SystemIdProjection = OneOf<{
    id: number;
}>;
declare type PlatformIdProjection = OneOf<{
    platformId: number;
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
export declare type SortNode = {
    $attr: SortAttr;
    $direction?: "asc" | "desc";
};
export declare type Sorter = SortNode[];
export declare type SelectOperation<P extends Object = Projection> = OakSelection<"select", P, Filter, Sorter>;
export declare type Selection<P extends Object = Projection> = SelectOperation<P>;
export declare type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export declare type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "platformId">> & (({
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
    application$system?: OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">>>;
    domain$system?: OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">>>;
    messageSystem$system?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">>>;
    userSystem$system?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">>>;
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
    application$system?: OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<Application.RemoveOperation["action"], Omit<Application.RemoveOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<Application.RemoveOperation["action"], Omit<Application.RemoveOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">>>;
    domain$system?: OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<Domain.RemoveOperation["action"], Omit<Domain.RemoveOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<Domain.RemoveOperation["action"], Omit<Domain.RemoveOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">>>;
    messageSystem$system?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">>>;
    userSystem$system?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">>>;
};
export declare type UpdateOperation = OakOperation<"update" | string, UpdateOperationData, Filter, Sorter>;
export declare type RemoveOperationData = {} & (({
    platform?: Platform.UpdateOperation | Platform.RemoveOperation;
}));
export declare type RemoveOperation = OakOperation<"remove", RemoveOperationData, Filter, Sorter>;
export declare type Operation = CreateOperation | UpdateOperation | RemoveOperation;
export declare type PlatformIdSubQuery = Selection<PlatformIdProjection>;
export declare type SystemIdSubQuery = Selection<SystemIdProjection>;
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
