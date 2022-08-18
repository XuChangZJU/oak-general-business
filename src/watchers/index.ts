import { EntityDict } from '../general-app-domain';
import { Watcher } from 'oak-domain/lib/types';
import { GeneralRuntimeContext } from '../RuntimeContext';

export default [] as Watcher<EntityDict, keyof EntityDict, GeneralRuntimeContext<EntityDict>>[];
