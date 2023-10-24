import { EntityDict } from '../oak-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare const triggers: Trigger<EntityDict, 'account', BackendRuntimeContext<EntityDict>>[];
export default triggers;
