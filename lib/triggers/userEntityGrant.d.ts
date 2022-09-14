import { Trigger } from 'oak-domain/lib/types/Trigger';
import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain/EntityDict';
declare const triggers: Trigger<EntityDict, 'userEntityGrant', RuntimeContext<EntityDict>>[];
export default triggers;
