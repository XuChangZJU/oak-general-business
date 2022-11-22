import assert from 'assert';
import { EntityDict } from '../general-app-domain';
import { AppType } from '../general-app-domain/Application/Schema';
import {
    DEV_WEB_APPLICATION_ID,
    DEV_WECHATMP_APPLICATION_ID,
    DEV_WECHATPUPLIC_APPLICATION_ID,
} from '../data/DEV-CONFIG';
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";

export async function getApplication<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    type: AppType;
}, context: Cxt) {
    const { type } = params;
    const APP_ID = {
        web: DEV_WEB_APPLICATION_ID,
        wechatMp: DEV_WECHATMP_APPLICATION_ID,
        wechatPublic: DEV_WECHATPUPLIC_APPLICATION_ID,
    };
    const appId = APP_ID[type];

    const [application] = await context.select('application', {
        data: {
            id: 1,
            name: 1,
            config: 1,
            type: 1,
            systemId: 1,
            system: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
                system: {
                    id: 1,
                    name: 1,
                    config: 1,
                },
            },
            filter: {
                id: appId,
            },
        },
    },
        {}
    );

    //微信小程序环境下 没有就报错
    if (type === 'wechatMp') {
        assert(
            application,
            '微信小程序环境下 application必须存在小程序相关配置'
        );
    } else {
        //web 或 wechatPublic
        if (type === 'wechatPublic') {
            // 如果微信公众号环境下 application不存在公众号配置，但又在公众号访问，这时可以使用web的application
            if (!application) {
                const [application2] = await context.select(
                    'application',
                    {
                        data: {
                            id: 1,
                            name: 1,
                            config: 1,
                            type: 1,
                            systemId: 1,
                            system: {
                                id: 1,
                                name: 1,
                                config: 1,
                            },
                        },
                        filter: {
                            id: APP_ID.web,
                        },
                    },
                    {}
                );

                assert(
                    application2,
                    '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置'
                );

                return application2.id as string;
            }
        } else {
            assert(application, 'web环境下 application必须存在web相关配置');
        }
    }

    return application.id as string;
}