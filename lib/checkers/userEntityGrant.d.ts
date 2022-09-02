import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
declare const checkers: Checker<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>>[];
export default checkers;
