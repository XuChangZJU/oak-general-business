import { assert } from 'oak-domain/lib/utils/assert';
import { applicationProjection } from '../types/Projection';
import { WechatSDK, } from 'oak-external-sdk';
import fs from 'fs';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
export async function getApplication(params, context) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            type,
            system: {
                domain$system: {
                    url: domain,
                },
            },
        },
    }, {});
    //微信小程序环境下 没有就报错
    if (type === 'wechatMp') {
        assert(application, '微信小程序环境下 application必须存在小程序相关配置');
    }
    else {
        //web 或 wechatPublic
        if (type === 'wechatPublic') {
            // 如果微信公众号环境下 application不存在公众号配置，但又在公众号访问，这时可以使用web的application
            if (!application) {
                const [application2] = await context.select('application', {
                    data: cloneDeep(applicationProjection),
                    filter: {
                        type: 'web',
                        system: {
                            domain$system: {
                                url: domain,
                            },
                        },
                    },
                }, {});
                assert(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                return application2.id;
            }
        }
        else {
            assert(application, 'web环境下 application必须存在web相关配置');
        }
    }
    return application.id;
}
export async function signatureJsSDK({ url, env }, context) {
    const application = context.getApplication();
    const { type, config } = application;
    assert(type === 'wechatPublic' && config.type === 'wechatPublic');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    const result = await wechatInstance.signatureJsSDK({ url });
    return result;
}
export async function uploadWechatMedia(params, // FormData表单提交 isPermanent 变成 'true' | 'false'
context) {
    const { applicationId, file, type: mediaType, description, extraFileId } = params;
    const isPermanent = params.isPermanent === 'true';
    const filename = file.originalFilename;
    const filetype = file.mimetype;
    const fileLength = file.size;
    const fileStream = fs.createReadStream(file.filepath);
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    const { type, config } = application;
    assert(type === 'wechatPublic' || type === 'wechatMp');
    let wechatInstance;
    if (type === 'wechatPublic') {
        assert(config.type === 'wechatPublic');
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    }
    else {
        assert(config.type === 'wechatMp');
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    }
    let mediaId;
    if (isPermanent) {
        // 只有公众号才能上传永久素材
        assert(type === 'wechatPublic');
        const result = await wechatInstance.createMaterial({
            type: mediaType,
            media: fileStream,
            filename,
            filetype,
            fileLength,
            description: description ? JSON.parse(description) : null,
        });
        mediaId = result.media_id;
    }
    else {
        const result = (await wechatInstance.createTemporaryMaterial({
            type: mediaType,
            media: fileStream,
            filename,
            filetype,
            fileLength,
        }));
        mediaId = result.media_id;
    }
    if (extraFileId) {
        const closeRootMode = context.openRootMode();
        try {
            await context.operate('extraFile', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    extra1: mediaId,
                },
                filter: {
                    id: extraFileId,
                },
            }, {
                dontCollect: true,
            });
            closeRootMode();
        }
        catch (err) {
            closeRootMode();
            throw err;
        }
    }
    return {
        mediaId,
    };
}
export async function getMaterial(params, context) {
    const { mediaId, applicationId, isPermanent = false } = params;
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic' || type === 'wechatMp');
    let wechatInstance;
    if (type === 'wechatPublic') {
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    }
    else {
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    }
    if (isPermanent) {
        // 只有公众号才能获取永久素材
        assert(type === 'wechatPublic');
        const result = await wechatInstance.getMaterial({
            mediaId,
        });
        return result;
    }
    const result = await wechatInstance.getTemporaryMaterial({
        mediaId,
    });
    return result;
}
export async function batchGetArticle(params, context) {
    const { applicationId, offset, count, noContent } = params;
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchGetArticle({
        offset,
        count,
        noContent,
    });
    return result;
}
export async function getArticle(params, context) {
    const { applicationId, articleId } = params;
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getArticle({
        articleId,
    });
    return result;
}
export async function batchGetMaterialList(params, context) {
    const { applicationId } = params;
    const [application] = await context.select('application', {
        data: cloneDeep(applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    assert(application);
    const { type, config } = application;
    assert(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const { type: materialType, offset, count } = params;
    const result = await wechatInstance.batchGetMaterialList({
        type: materialType,
        offset,
        count,
    });
    return result;
}
