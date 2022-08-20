import { EntityDict } from "../general-app-domain";
import { WechatQrCodeProps } from '../general-app-domain/WechatQrCode/Schema';
import { GeneralRuntimeContext } from "../RuntimeContext";
export declare function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends GeneralRuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    applicationId: string;
    tag?: string;
    lifetimeLength?: number;
    permanent?: boolean;
    props: WechatQrCodeProps;
}, context: Cxt): Promise<Omit<Omit<import("../general-app-domain/WechatQrCode/Schema").OpSchema, "entity" | "entityId" | "applicationId">, import("oak-domain/lib/types").InstinctiveAttributes> & {
    id: string;
} & {
    applicationId: string;
    application?: import("../general-app-domain/Application/Schema").UpdateOperation | undefined;
} & {
    [K: string]: any;
} & {
    [k: string]: any;
    operEntity$entity?: import("oak-domain/lib/types").Operation<"update", Omit<import("../general-app-domain/OperEntity/Schema").UpdateOperationData, "entity" | "entityId">, import("../general-app-domain/OperEntity/Schema").Filter<import("oak-domain/lib/types").Q_EnumValue<string>>, undefined> | (import("oak-domain/lib/types").Operation<"update", Omit<import("../general-app-domain/OperEntity/Schema").UpdateOperationData, "entity" | "entityId">, import("../general-app-domain/OperEntity/Schema").Filter<import("oak-domain/lib/types").Q_EnumValue<string>>, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId"> | Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined>)[] | undefined;
    modiEntity$entity?: import("oak-domain/lib/types").Operation<"update", Omit<import("../general-app-domain/ModiEntity/Schema").UpdateOperationData, "entity" | "entityId">, import("../general-app-domain/ModiEntity/Schema").Filter<import("oak-domain/lib/types").Q_EnumValue<string>>, undefined> | (import("oak-domain/lib/types").Operation<"update", Omit<import("../general-app-domain/ModiEntity/Schema").UpdateOperationData, "entity" | "entityId">, import("../general-app-domain/ModiEntity/Schema").Filter<import("oak-domain/lib/types").Q_EnumValue<string>>, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId"> | Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined>)[] | undefined;
}>;
