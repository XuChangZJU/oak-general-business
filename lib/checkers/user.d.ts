import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
declare const checkers: Checker<EntityDict, 'user', RuntimeContext<EntityDict>>[];
export default checkers;
