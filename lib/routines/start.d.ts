import { Routine } from 'oak-domain/lib/types/Timer';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare const startRoutines: Array<Routine<EntityDict & BaseEntityDict, BackendRuntimeContext<EntityDict & BaseEntityDict>>>;
export default startRoutines;
