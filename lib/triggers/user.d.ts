import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
declare const triggers: Trigger<EntityDict, 'user', GeneralRuntimeContext<EntityDict>>[];
export default triggers;
