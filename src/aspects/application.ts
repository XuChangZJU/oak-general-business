import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../general-app-domain";
import { AppType } from "../general-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";

export async function getApplication<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        type: AppType;
        domain: string;
    },
    context: Cxt
) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);

    const [application] = await context.select(
        'application',
        {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
                style: 1,
                system: {
                    id: 1,
                    name: 1,
                    config: 1,
                    platformId: 1,
                    style: 1,
                    folder: 1,
                    super: 1,
                    platform: {
                        id: 1,
                        config: 1,
                        style: 1,
                    },
                },
            },
            filter: {
                type,
                system: {
                    id: {
                        $in: {
                            entity: 'domain',
                            data: {
                                systemId: 1,
                            },
                            filter: {
                                url: domain,
                            },
                        },
                    },
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
                            style: 1,
                            system: {
                                id: 1,
                                name: 1,
                                config: 1,
                                platformId: 1,
                                style: 1,
                                folder: 1,
                                platform: {
                                    id: 1,
                                    config: 1,
                                    style: 1,
                                },
                            },
                        },
                        filter: {
                            type: 'web',
                            system: {
                                id: {
                                    $in: {
                                        entity: 'domain',
                                        data: {
                                            systemId: 1,
                                        },
                                        filter: {
                                            url: domain,
                                        },
                                    },
                                },
                            },
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