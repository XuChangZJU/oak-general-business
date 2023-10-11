import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { applicationProjection } from '../types/Projection';
import { MediaType } from '../types/WeChat';
import {
    WebEnv,
} from 'oak-domain/lib/types/Environment';
import {
    WechatPublicInstance,
    WechatSDK,
} from 'oak-external-sdk';
import fs from 'fs';
import { File } from 'formidable';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';

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
                    }
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
                                }
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
    const { type, config, systemId } = application!;
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
    }, // FormData表单提交 isPermanent 变成 'true' | 'false'
    context: Cxt
): Promise<{ mediaId: string }> {
    const {
        applicationId,
        file,
        type: mediaType,
        isPermanent,
        description,
    } = params;
    const filename = file.originalFilename!;
    const filetype = file.mimetype!;
    const file2 = fs.createReadStream(file.filepath);

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
    assert(type === 'wechatPublic' && config!.type === 'wechatPublic');
    const config2 = config as WechatPublicConfig;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(
        appId,
        'wechatPublic',
        appSecret
    ) as WechatPublicInstance;

    if (isPermanent === 'true') {
        const result = (await wechatInstance.createMaterial({
            type: mediaType,
            media: file2,
            filename,
            filetype,
            description: description ? JSON.parse(description) : null,
        })) as {
            media_id: string;
            url: string;
        };

        return {
            mediaId: result.media_id,
        };
    }

    const result = (await wechatInstance.createTemporaryMaterial({
        type: mediaType,
        media: file2,
        filename,
        filetype,
    })) as {
        media_id: string;
        createdAt: Number;
        type: MediaType;
    };

    return {
        mediaId: result.media_id,
    };
}