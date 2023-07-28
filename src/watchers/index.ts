import { EntityDict } from '../general-app-domain';
import { Watcher } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import token from './token';

export default [
    ...token,
] as Watcher<EntityDict, keyof EntityDict, BackendRuntimeContext<EntityDict>>[];
