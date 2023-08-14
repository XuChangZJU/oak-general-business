import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { RuntimeCxt } from '../types/RuntimeCxt';
declare const triggers: Trigger<EntityDict, 'address', RuntimeCxt>[];
export default triggers;
