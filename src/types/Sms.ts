import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../context/FrontendRuntimeContext';

/**
 * 短信发送及模板同步
 */
export default interface Sms<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AspectDict<ED, Cxt>>> {
    name: string;
    /**
     * 是否支持模板同步
     */
    autoSyncTemplate(systemId: string): Promise<boolean>;
    sendSms(): Promise<void>;
    /**
     */
}