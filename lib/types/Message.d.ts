import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
declare type WechatPublicTemplateMsgKeyword = 'keyword1' | 'keyword2' | 'keyword3' | 'keyword4' | 'keyword5' | 'keyword6' | 'keyword7';
export declare type Channel = 'wechatPublic' | 'jPush' | 'jim' | 'mp' | 'sms';
export declare type Weight = 'high' | 'medium' | 'low';
export interface MessageNotificationConverter<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>> {
    type: string;
    toWechatMp?: (entity: ED['message']['OpSchema']['entity'], entityId: string, context: Cxt) => Promise<{
        [K: string]: {
            value: string;
        };
    }>;
    toWechatPublic?: (entity: ED['message']['OpSchema']['entity'], entityId: string, context: Cxt) => Promise<{
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
    }>;
    toSms?: (entity: ED['message']['OpSchema']['entity'], entityId: string, context: Cxt) => Promise<{
        signName?: string;
        params?: Record<string, string>;
        paramsArray?: Array<string>;
    }>;
}
export {};
