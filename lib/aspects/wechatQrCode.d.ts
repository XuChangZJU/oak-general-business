import { EntityDict } from "../general-app-domain";
import { WechatQrCodeProps } from '../general-app-domain/WechatQrCode/Schema';
import { RuntimeContext } from '../context/RuntimeContext';
export declare function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends RuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    applicationId: string;
    tag?: string;
    lifetimeLength?: number;
    permanent?: boolean;
    props: WechatQrCodeProps;
}, context: Cxt): Promise<(Omit<Omit<import("../general-app-domain/WechatQrCode/Schema").OpSchema, "applicationId" | "entity" | "entityId">, import("oak-domain/lib/types").InstinctiveAttributes> & {
    id: string;
} & {
    applicationId: string;
    application?: import("../general-app-domain/Application/Schema").UpdateOperation | undefined;
} & {
    [K: string]: any;
    entity?: string | undefined;
    entityId?: string | undefined;
} & {
    operEntity$entity?: import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId">, undefined, undefined>[] | undefined;
    modiEntity$entity?: import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId">, undefined, undefined>[] | undefined;
}) | (Omit<Omit<import("../general-app-domain/WechatQrCode/Schema").OpSchema, "applicationId" | "entity" | "entityId">, import("oak-domain/lib/types").InstinctiveAttributes> & {
    id: string;
} & {
    applicationId: string;
} & {
    [K: string]: any;
    entity?: string | undefined;
    entityId?: string | undefined;
} & {
    operEntity$entity?: import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/OperEntity/Schema").CreateOperationData, "entity" | "entityId">, undefined, undefined>[] | undefined;
    modiEntity$entity?: import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId">[], undefined, undefined> | import("oak-domain/lib/types").Operation<"create", Omit<import("../general-app-domain/ModiEntity/Schema").CreateOperationData, "entity" | "entityId">, undefined, undefined>[] | undefined;
})>;
