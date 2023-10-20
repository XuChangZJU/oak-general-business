import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from '../oak-app-domain';
import {
    AppType,
    WechatPublicConfig,
    WechatMpConfig,
} from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { applicationProjection } from '../types/Projection';
import { MediaType, MaterialType } from '../types/WeChat';
import { WebEnv } from 'oak-domain/lib/types/Environment';
import {
    WechatPublicInstance,
    WechatMpInstance,
    WechatSDK,
} from 'oak-external-sdk';
import fs from 'fs';
import { File } from 'formidable';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';

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
            data: cloneDeep(applicationProjection),
            filter: {
                type,
                system: {
                    domain$system: {
                        url: domain,
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
                        data: cloneDeep(applicationProjection),
                        filter: {
                            type: 'web',
                            system: {
                                domain$system: {
                                    url: domain,
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

export async function signatureJsSDK<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>({ url, env }: { url: string; env: WebEnv }, context: Cxt) {
    const application = context.getApplication();
    const { type, config } = application!;
    assert(type === 'wechatPublic' && config!.type === 'wechatPublic');
    const config2 = config as WechatPublicConfig;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(
        appId,
        'wechatPublic',
        appSecret
    ) as WechatPublicInstance;

    const result = await wechatInstance.signatureJsSDK({ url });

    return result;
}

export async function uploadWechatMedia<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        file: File;
        type: MediaType;
        isPermanent?: string; // 上传临时素材或永久素材 默认上传临时
        description?: string; // { title: string; introduction: string }
        extraFileId?: string; // extraFile的id 为了缓存微信mediaId
    }, // FormData表单提交 isPermanent 变成 'true' | 'false'
    context: Cxt
): Promise<{ mediaId: string }> {
    const { applicationId, file, type: mediaType, description, extraFileId } = params;
    assert(applicationId);
    const isPermanent = params.isPermanent === 'true';
    const filename = file.originalFilename!;
    const filetype = file.mimetype!;
    const fileLength = file.size!;
    const fileStream = fs.createReadStream(file.filepath);

    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    const { type, config } = application!;
    assert(type === 'wechatPublic' || type === 'wechatMp');

    let wechatInstance: WechatPublicInstance | WechatMpInstance;
    if (type === 'wechatPublic') {
        assert(config!.type === 'wechatPublic');
        const config2 = config as WechatPublicConfig;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(
            appId,
            'wechatPublic',
            appSecret
        ) as WechatPublicInstance;
    } else {
        assert(config!.type === 'wechatMp');
        const config2 = config as WechatMpConfig;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(
            appId,
            'wechatPublic',
            appSecret
        ) as WechatMpInstance;
    }

    let mediaId: string;
    if (isPermanent) {
        // 只有公众号才能上传永久素材
        assert(type === 'wechatPublic');
        const result = await(
            wechatInstance as WechatPublicInstance
        ).createMaterial({
            type: mediaType,
            media: fileStream,
            filename,
            filetype,
            fileLength,
            description: description ? JSON.parse(description) : null,
        }) as {
            media_id: string;
            url: string;
        };

        mediaId = result.media_id;
    } else {
        const result = (await wechatInstance.createTemporaryMaterial({
            type: mediaType,
            media: fileStream,
            filename,
            filetype,
            fileLength,
        })) as {
            media_id: string;
            createdAt: Number;
            type: MediaType;
        };
        mediaId = result.media_id;
    }

    if (extraFileId) {
        const closeRootMode = context.openRootMode();
        try {
            await context.operate(
                'extraFile',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        extra1: mediaId,
                    },
                    filter: {
                        id: extraFileId,
                    },
                },
                {
                    dontCollect: true,
                }
            );
            closeRootMode();
        } catch (err) {
            closeRootMode();
            throw err;
        }
    }


    return {
        mediaId,
    };
}

export async function getMaterial<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        mediaId: string;
        isPermanent?: boolean; // 获取临时素材或永久素材 默认获取临时
    },
    context: Cxt
): Promise<any> {
    const { mediaId, applicationId, isPermanent = false } = params;
    assert(applicationId);
    assert(mediaId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatPublic' || type === 'wechatMp');

    let wechatInstance: WechatPublicInstance | WechatMpInstance;
    if (type === 'wechatPublic') {
        const config2 = config as WechatPublicConfig;
        const { appId, appSecret } = config2;

        wechatInstance = WechatSDK.getInstance(
            appId!,
            type!,
            appSecret!
        ) as WechatPublicInstance;
    } else {
        const config2 = config as WechatMpConfig;
        const { appId, appSecret } = config2;

        wechatInstance = WechatSDK.getInstance(
            appId!,
            type!,
            appSecret!
        ) as WechatMpInstance;
    }

    let result;
    if (isPermanent) {
        // 只有公众号才能获取永久素材
        assert(type === 'wechatPublic');
        result = await(wechatInstance as WechatPublicInstance).getMaterial({
            mediaId,
        });
    } else {
        result = await wechatInstance.getTemporaryMaterial({
            mediaId,
        });
    }

    if (result instanceof ArrayBuffer) {
        return Buffer.from(result).toString('base64');
    }
    return result;
}

export async function deleteMaterial<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        mediaId: string;
    },
    context: Cxt
): Promise<any> {
    const { mediaId, applicationId } = params;
    assert(applicationId);
    assert(mediaId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatPublic');

    const config2 = config as WechatPublicConfig;
    const { appId, appSecret } = config2;

    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;

    const result = await wechatInstance.deleteMaterial({
        mediaId,
    });
    return result;
}

export async function batchGetArticle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        offset?: number;
        count: number;
        noContent?: 0 | 1;
    },
    context: Cxt
): Promise<any> {
    const { applicationId, offset, count, noContent } = params;
    assert(applicationId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatPublic');
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.batchGetArticle({
        offset,
        count,
        noContent,
    });
    return result;
}

export async function getArticle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        articleId: string;
    },
    context: Cxt
): Promise<any> {
    const { applicationId, articleId } = params;
    assert(applicationId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatPublic');
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const result = await wechatInstance.getArticle({
        articleId,
    });
    return result;
}

export async function batchGetMaterialList<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        applicationId: string;
        type: MaterialType;
        offset?: number;
        count: number;
    },
    context: Cxt
): Promise<any> {
    const { applicationId } = params;
    assert(applicationId);
    const [application] = await context.select(
        'application',
        {
            data: cloneDeep(applicationProjection),
            filter: {
                id: applicationId,
            },
        },
        {
            dontCollect: true,
        }
    );
    assert(application);
    const { type, config } = application!;
    assert(type === 'wechatPublic');
    let appId: string, appSecret: string;
    const config2 = config as WechatPublicConfig;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(
        appId!,
        type!,
        appSecret!
    ) as WechatPublicInstance;
    const { type: materialType, offset, count } = params;
    const result = await wechatInstance.batchGetMaterialList({
        type: materialType,
        offset,
        count,
    });
    return result;
}
