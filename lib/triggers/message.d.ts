import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BRC } from '../types/RuntimeCxt';
import { MessageNotificationConverter } from '../types/Message';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Router } from '../entities/Message';
export declare function registerMessageNotificationConverters<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(converters: MessageNotificationConverter<ED, Cxt>[]): void;
export declare function tryMakeSmsNotification(message: {
    userId: string;
    type?: string;
    entity?: string;
    router?: Router | null;
    entityId?: string;
}, context: BackendRuntimeContext<EntityDict>): Promise<Omit<import("../oak-app-domain/Notification/Schema").CreateOperationData, "messageSystemId"> | undefined>;
declare const triggers: Trigger<EntityDict, 'message', BRC>[];
export default triggers;
