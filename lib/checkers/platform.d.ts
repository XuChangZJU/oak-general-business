import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';
declare const checkers: Checker<EntityDict, 'platform', RuntimeCxt>[];
export default checkers;
