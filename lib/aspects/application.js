"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchGetMaterialList = exports.getArticle = exports.batchGetArticle = exports.deleteMaterial = exports.getMaterial = exports.uploadWechatMedia = exports.signatureJsSDK = exports.getApplication = void 0;
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const Projection_1 = require("../types/Projection");
const oak_external_sdk_1 = require("oak-external-sdk");
const fs_1 = tslib_1.__importDefault(require("fs"));
const lodash_1 = require("oak-domain/lib/utils/lodash");
const uuid_1 = require("oak-domain/lib/utils/uuid");
async function getApplication(params, context) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
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
        (0, assert_1.assert)(application, '微信小程序环境下 application必须存在小程序相关配置');
    }
    else if (type === 'native') {
        (0, assert_1.assert)(application, 'APP环境下 application必须存在APP相关配置');
    }
    else {
        //web 或 wechatPublic
        if (type === 'wechatPublic') {
            // 如果微信公众号环境下 application不存在公众号配置，但又在公众号访问，这时可以使用web的application
            if (!application) {
                const [application2] = await context.select('application', {
                    data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
                    filter: {
                        type: 'web',
                        system: {
                            domain$system: {
                                url: domain,
                            },
                        },
                    },
                }, {});
                (0, assert_1.assert)(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                return application2.id;
            }
        }
        else {
            (0, assert_1.assert)(application, 'web环境下 application必须存在web相关配置');
        }
    }
    return application.id;
}
exports.getApplication = getApplication;
async function signatureJsSDK({ url, env }, context) {
    const application = context.getApplication();
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic' && config.type === 'wechatPublic');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    const result = await wechatInstance.signatureJsSDK({ url });
    return result;
}
exports.signatureJsSDK = signatureJsSDK;
async function uploadWechatMedia(params, // FormData表单提交 isPermanent 变成 'true' | 'false'
context) {
    const { applicationId, file, type: mediaType, description, extraFileId } = params;
    (0, assert_1.assert)(applicationId);
    const isPermanent = params.isPermanent === 'true';
    const filename = file.originalFilename;
    const filetype = file.mimetype;
    const fileLength = file.size;
    const fileStream = fs_1.default.createReadStream(file.filepath);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic' || type === 'wechatMp');
    let wechatInstance;
    if (type === 'wechatPublic') {
        (0, assert_1.assert)(config.type === 'wechatPublic');
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    }
    else {
        (0, assert_1.assert)(config.type === 'wechatMp');
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    }
    let mediaId;
    if (isPermanent) {
        // 只有公众号才能上传永久素材
        (0, assert_1.assert)(type === 'wechatPublic');
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
                id: await (0, uuid_1.generateNewIdAsync)(),
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
exports.uploadWechatMedia = uploadWechatMedia;
async function getMaterial(params, context) {
    const { mediaId, applicationId, isPermanent = false } = params;
    (0, assert_1.assert)(applicationId);
    (0, assert_1.assert)(mediaId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic' || type === 'wechatMp');
    let wechatInstance;
    if (type === 'wechatPublic') {
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    }
    else {
        const config2 = config;
        const { appId, appSecret } = config2;
        wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    }
    let result;
    if (isPermanent) {
        // 只有公众号才能获取永久素材
        (0, assert_1.assert)(type === 'wechatPublic');
        result = await wechatInstance.getMaterial({
            mediaId,
        });
    }
    else {
        result = await wechatInstance.getTemporaryMaterial({
            mediaId,
        });
    }
    if (result instanceof ArrayBuffer) {
        return Buffer.from(result).toString('base64');
    }
    return result;
}
exports.getMaterial = getMaterial;
async function deleteMaterial(params, context) {
    const { mediaId, applicationId } = params;
    (0, assert_1.assert)(applicationId);
    (0, assert_1.assert)(mediaId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.deleteMaterial({
        mediaId,
    });
    return result;
}
exports.deleteMaterial = deleteMaterial;
async function batchGetArticle(params, context) {
    const { applicationId, offset, count, noContent } = params;
    (0, assert_1.assert)(applicationId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.batchGetArticle({
        offset,
        count,
        noContent,
    });
    return result;
}
exports.batchGetArticle = batchGetArticle;
async function getArticle(params, context) {
    const { applicationId, articleId } = params;
    (0, assert_1.assert)(applicationId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const result = await wechatInstance.getArticle({
        articleId,
    });
    return result;
}
exports.getArticle = getArticle;
async function batchGetMaterialList(params, context) {
    const { applicationId } = params;
    (0, assert_1.assert)(applicationId);
    const [application] = await context.select('application', {
        data: (0, lodash_1.cloneDeep)(Projection_1.applicationProjection),
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    (0, assert_1.assert)(application);
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic');
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
    const { type: materialType, offset, count } = params;
    const result = await wechatInstance.batchGetMaterialList({
        type: materialType,
        offset,
        count,
    });
    return result;
}
exports.batchGetMaterialList = batchGetMaterialList;
