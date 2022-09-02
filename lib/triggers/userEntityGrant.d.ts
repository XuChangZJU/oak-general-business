import { Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from '../general-app-domain/EntityDict';
declare const triggers: Trigger<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>>[];
export default triggers;
