import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeCxt } from '../checkers/RuntimeCxt';
declare const triggers: Trigger<EntityDict, 'user', RuntimeCxt>[];
export default triggers;
