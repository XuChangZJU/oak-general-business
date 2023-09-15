import { ForeignKey, JsonProjection } from "oak-domain/lib/types/DataType";
import { Q_DateValue, Q_BooleanValue, Q_StringValue, NodeId, MakeFilter, ExprOp, ExpressionKey, JsonFilter, SubQueryPredicateMetadata } from "oak-domain/lib/types/Demand";
import { OneOf } from "oak-domain/lib/types/Polyfill";
import { FormCreateData, FormUpdateData, DeduceAggregation, Operation as OakOperation, Selection as OakSelection, MakeAction as OakMakeAction, AggregationResult } from "oak-domain/lib/types/Entity";
import { GenericAction } from "oak-domain/lib/actions/action";
import { String, Boolean, Text } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
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
    platformId?: ForeignKey<"platform"> | null;
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
    platformId?: ForeignKey<"platform"> | null;
    folder: String<16>;
    super?: Boolean | null;
    style?: Style | null;
    entity?: String<32> | null;
    entityId?: String<64> | null;
    platform?: Platform.Schema | null;
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
    application$system: Application.Filter & SubQueryPredicateMetadata;
    domain$system: Domain.Filter & SubQueryPredicateMetadata;
    messageSystem$system: MessageSystem.Filter & SubQueryPredicateMetadata;
    userSystem$system: UserSystem.Filter & SubQueryPredicateMetadata;
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
export type Selection<P extends Object = Projection> = SelectOperation<P>;
export type Aggregation = DeduceAggregation<Projection, Filter, Sorter>;
export type CreateOperationData = FormCreateData<Omit<OpSchema, "entity" | "entityId" | "platformId">> & (({
    platformId?: never;
    platform?: Platform.CreateSingleOperation;
} | {
    platformId: ForeignKey<"platform">;
    platform?: Platform.UpdateOperation;
} | {
    platformId?: ForeignKey<"platform">;
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
    platformId?: ForeignKey<"platform"> | null;
})) & {
    [k: string]: any;
    application$system?: OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<Application.RemoveOperation["action"], Omit<Application.RemoveOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Application.CreateOperationData, "system" | "systemId">> | OakOperation<Application.UpdateOperation["action"], Omit<Application.UpdateOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">> | OakOperation<Application.RemoveOperation["action"], Omit<Application.RemoveOperationData, "system" | "systemId">, Omit<Application.Filter, "system" | "systemId">>>;
    domain$system?: OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<Domain.RemoveOperation["action"], Omit<Domain.RemoveOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<Domain.CreateOperationData, "system" | "systemId">> | OakOperation<Domain.UpdateOperation["action"], Omit<Domain.UpdateOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">> | OakOperation<Domain.RemoveOperation["action"], Omit<Domain.RemoveOperationData, "system" | "systemId">, Omit<Domain.Filter, "system" | "systemId">>>;
    messageSystem$system?: OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<MessageSystem.CreateOperationData, "system" | "systemId">> | OakOperation<MessageSystem.UpdateOperation["action"], Omit<MessageSystem.UpdateOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">> | OakOperation<MessageSystem.RemoveOperation["action"], Omit<MessageSystem.RemoveOperationData, "system" | "systemId">, Omit<MessageSystem.Filter, "system" | "systemId">>>;
    userSystem$system?: OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">[]> | Array<OakOperation<"create", Omit<UserSystem.CreateOperationData, "system" | "systemId">> | OakOperation<UserSystem.UpdateOperation["action"], Omit<UserSystem.UpdateOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">> | OakOperation<UserSystem.RemoveOperation["action"], Omit<UserSystem.RemoveOperationData, "system" | "systemId">, Omit<UserSystem.Filter, "system" | "systemId">>>;
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
export {};
