import { Endpoint } from 'oak-domain/lib/types/Endpoint';
import { EntityDict } from '../oak-app-domain';
import { BRC } from '../types/RuntimeCxt';
import { WechatPublicEventData } from 'oak-external-sdk/lib/types/Wechat';
export declare function registerWeChatPublicEventCallback(appId: string, callback: (data: WechatPublicEventData, context: BRC) => void): void;
declare const endpoints: Record<string, Endpoint<EntityDict, BRC>>;
export default endpoints;
