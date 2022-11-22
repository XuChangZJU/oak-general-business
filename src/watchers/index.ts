import { EntityDict } from '../general-app-domain';
import { Watcher } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

export default [] as Watcher<EntityDict, keyof EntityDict, BackendRuntimeContext<EntityDict>>[];
