import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { BRC } from '../types/RuntimeCxt';
import { MessageNotificationConverter } from '../types/Message';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function registerMessageNotificationConverters<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(converters: MessageNotificationConverter<ED, Cxt>[]): void;
declare const triggers: Trigger<EntityDict, 'message', BRC>[];
export default triggers;
