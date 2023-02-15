import { BRC } from './RuntimeCxt';
import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

type WechatPublicTemplateMsgKeyword = 'keyword1' | 'keyword2' | 'keyword3' | 'keyword4' | 'keyword5' | 'keyword6' | 'keyword7';
export type Channel = 'wechatPublic' | 'jPush' | 'jim' | 'wechatMp' | 'sms';
export type Weight = 'high' | 'medium' | 'low';

export interface MessageNotificationConverter<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>> {
    type: string;
    toWechatMp?: (entity: ED['message']['OpSchema']['entity'], entityId: string,
        applications: EntityDict['application']['Schema'][], application: EntityDict['application']['Schema'],
        context: Cxt) => Promise<{
            [K: string]: {
                value: string;
            }
        } | undefined>;
    toWechatPublic?: (entity: ED['message']['OpSchema']['entity'], entityId: string,
        applications: EntityDict['application']['Schema'][], application: EntityDict['application']['Schema'],
        context: Cxt) => Promise<{
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
            },
            wechatMpAppId?: string,
        } | undefined>;
    toSms?: (entity: ED['message']['OpSchema']['entity'], entityId: string, context: Cxt) => Promise<{
        signName?: string;      // 可能的签名
        params?: Record<string, string>;        // 模板参数,需要替换的参数名和 value 的键值对
        paramsArray?: Array<string>;            // 数组形式的模板参数，按序传入服务商接口
    } | undefined>;
}
