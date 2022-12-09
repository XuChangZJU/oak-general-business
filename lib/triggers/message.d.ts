import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeCxt } from '../types/RuntimeCxt';
export declare const MessageDisperse: {};
declare const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[];
export default triggers;
