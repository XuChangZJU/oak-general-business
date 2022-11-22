import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from './RuntimeCxt';
declare const checkers: Checker<EntityDict, 'address', RuntimeCxt>[];
export default checkers;
