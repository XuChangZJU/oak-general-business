import { Checker } from "oak-domain/lib/types";
import { EntityDict } from 'oak-app-domain/EntityDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
declare const checkers: Checker<EntityDict, 'address', GeneralRuntimeContext<EntityDict>>[];
export default checkers;
