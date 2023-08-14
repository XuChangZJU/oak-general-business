import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare const triggers: Trigger<EntityDict, 'notification', BackendRuntimeContext<EntityDict>>[];
export default triggers;
