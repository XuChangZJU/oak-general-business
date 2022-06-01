import { EntityDict } from 'oak-app-domain/EntityDict';
import { SelectTriggerAfter, Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';

import assert from 'assert';
import { WechatSDK } from 'oak-wechat-sdk';
import { WechatMpConfig } from 'oak-app-domain/Application/Schema';
import { shrinkUuidTo32Bytes } from 'oak-domain/lib/utils/uuid';
import { assign } from 'lodash';

const triggers: Trigger<EntityDict, 'wechatQrCode', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '选择userEntityGrant时，动态生成需要的数据',
        entity: 'wechatQrCode',
        action: 'select',
        when: 'after',
        fn: async ({ result }, context, params) => {
            let count = 0;
            const application = await context.getApplication();
            const { type, config } = application;
        
            assert(type === 'wechatMp' || config.type === 'wechatMp');
            const config2 = config as WechatMpConfig;
            const { appId, appSecret } = config2;
            for (const code of result) {
                const { type, expired, url, id } = code;
                console.log('code', code);
                if (type === 'wechatMpWxaCode') {
                    // 小程序码去实时获取（暂时不考虑缓存）
                    const wechatInstance = WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                    const buffer = await wechatInstance.getMpUnlimitWxaCode({
                        scene: shrinkUuidTo32Bytes(id),
                        page: 'pages/index/index',  // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                    });
                    // 把arrayBuffer转成字符串返回
                    const str = String.fromCharCode(...new Uint8Array(buffer));
                    assign(code, {
                        buffer: str,
                    });
                }
                else if (expired) {
                    // 如果过期了，在这里生成新的临时码并修改值（公众号）
                    throw new Error('not implemented yet');
                }
            }
            return count;
        }
    } as SelectTriggerAfter<EntityDict, 'wechatQrCode', GeneralRuntimeContext<EntityDict>>,
];
export default triggers;