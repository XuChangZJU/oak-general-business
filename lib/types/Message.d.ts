import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
type WechatPublicTemplateMsgKeyword = 'keyword1' | 'keyword2' | 'keyword3' | 'keyword4' | 'keyword5' | 'keyword6' | 'keyword7';
export type Channel = 'wechatPublic' | 'jPush' | 'jim' | 'wechatMp' | 'sms';
export type Weight = 'high' | 'medium' | 'low';
export interface MessageNotificationConverter<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>> {
    type: string;
    toWechatMp?: (message: ED['message']['OpSchema'], applications: EntityDict['application']['Schema'][], application: EntityDict['application']['Schema'], context: Cxt) => Promise<{
        [K: string]: {
            value: string;
        };
    } | undefined>;
    toWechatPublic?: (message: ED['message']['OpSchema'], applications: EntityDict['application']['Schema'][], application: EntityDict['application']['Schema'], context: Cxt) => Promise<{
        data: {
            first?: {
                value: string;
                color?: string;
            };
            remark?: {
                value: string;
                color?: string;
            };
        } & {
            [K in WechatPublicTemplateMsgKeyword]?: {
                value: string;
                color?: string;
            };
        };
        wechatMpAppId?: string;
    } | undefined>;
    toSms?: (message: ED['message']['OpSchema'], context: Cxt) => Promise<{
        signName?: string;
        params?: Record<string, string>;
        paramsArray?: Array<string>;
    } | undefined>;
}
export {};
