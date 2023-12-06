import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import Sms from "../../types/Sms";
import { ED } from '../../types/RuntimeCxt';
import { EntityDict } from '../../oak-app-domain';
import { TencentSmsConfig } from '../../types/Config';
export default class Tencent implements Sms<ED, BackendRuntimeContext<ED>> {
    name: string;
    getConfig(context: BackendRuntimeContext<ED>, systemId?: string): Promise<TencentSmsConfig>;
    syncTemplate(systemId: string, context: BackendRuntimeContext<ED>): Promise<{
        templateCode: string;
        templateName: string;
        templateContent: string;
    }[]>;
    sendSms(params: {
        mobile: string;
        templateParam?: Record<string, string>;
        smsTemplate: Partial<EntityDict['smsTemplate']['Schema']>;
    }, context: BackendRuntimeContext<ED>): Promise<{
        success: boolean;
        res: any;
    }>;
}
