import { EntityDict } from '../general-app-domain';
import { Watcher } from 'oak-domain/lib/types';
import { RuntimeContext } from '../context/RuntimeContext';

export default [] as Watcher<EntityDict, keyof EntityDict, RuntimeContext<EntityDict>>[];
