import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeContext } from '../context/RuntimeContext';
declare const triggers: Trigger<EntityDict, 'wechatQrCode', RuntimeContext<EntityDict>>[];
export default triggers;
