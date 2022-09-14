import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
declare const checkers: Checker<EntityDict, 'token', RuntimeContext<EntityDict>>[];
export default checkers;
