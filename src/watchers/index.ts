import { EntityDict } from '../oak-app-domain';
import { Watcher } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import token from './token';
import extraFile from './extraFile';

export default [...token, ...extraFile] as Watcher<
    EntityDict,
    keyof EntityDict,
    BackendRuntimeContext<EntityDict>
>[];
