import { Checker } from 'oak-domain/lib/types';
import { EntityDict } from '../oak-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';
declare const checkers: Checker<EntityDict, 'wechatPublicTag', RuntimeCxt>[];
export default checkers;
