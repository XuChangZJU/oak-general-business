import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BRC } from '../types/RuntimeCxt';
declare const triggers: Trigger<EntityDict, 'wechatMpJump', BRC>[];
export default triggers;
