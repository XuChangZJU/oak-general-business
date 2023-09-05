import { EntityDict } from '../oak-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare const triggers: Trigger<EntityDict, 'article', BackendRuntimeContext<EntityDict>>[];
export default triggers;
