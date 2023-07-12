import { EntityDict } from '../general-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare const triggers: Trigger<EntityDict, 'articleMenu', BackendRuntimeContext<EntityDict>>[];
export default triggers;
