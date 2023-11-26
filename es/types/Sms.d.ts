import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
/**
 * 短信发送及模板同步
 */
export default interface Sms<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> {
    name: string;
    /**
     * 是否支持模板同步
     */
    autoSyncTemplate(): boolean;
}
