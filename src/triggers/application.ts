import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { RuntimeCxt } from '../types/RuntimeCxt';
import {
    AppType,
    WechatPublicConfig,
} from '../oak-app-domain/Application/Schema';
import { set } from 'oak-domain/lib/utils/lodash';

const triggers: Trigger<EntityDict, 'application', RuntimeCxt>[] = [
    {
        name: '切换微信扫码登录方式',
        entity: 'application',
        action: 'update',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            const [application] = await context.select('application', {
                data: {
                    id: 1,
                    config: 1,
                },
                filter: {
                    id: filter?.id,
                },
                count: 1,
            }, {})
            const { config } = application || {};
            const toggleEnabelFn = async (type: AppType) => {
                const [applicationP] = await context.select('application', {
                    data: {
                        id: 1,
                        config: 1,
                    },
                    filter: {
                        type,
                    },
                    count: 1,
                }, {})
                const { config: config2, id } = applicationP || {};
                if (config2 && config2.type === type) {
                    if (type === 'web') {
                        set(config2, 'wechat.enable', false);
                    }
                    if (type === 'wechatPublic') {
                        Object.assign(config2, {
                            enable: false
                        })
                    }
                    await context.operate('application', {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            config: config2,
                        },
                        filter: {
                            id,
                        }
                    }, {})
                }
            }
            if (config?.type === 'web') {
                const { wechat } = config;
                if (wechat && wechat.enable) {
                    toggleEnabelFn('wechatPublic')
                }
            }
            else if (config?.type === 'wechatPublic') {
                if (config.enable) {
                    toggleEnabelFn('web')
                }
            }
            return 1;
        }
    },
];

export default triggers;
