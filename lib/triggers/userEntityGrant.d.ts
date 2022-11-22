import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeCxt } from '../types/RuntimeCxt';
declare const triggers: Trigger<EntityDict, 'userEntityGrant', RuntimeCxt>[];
export default triggers;
