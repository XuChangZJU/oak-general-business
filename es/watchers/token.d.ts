import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Watcher } from 'oak-domain/lib/types/Watcher';
declare const watchers: Watcher<EntityDict, 'token', BackendRuntimeContext<EntityDict>>[];
export default watchers;
