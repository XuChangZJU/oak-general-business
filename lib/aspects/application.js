"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadWechatMedia = exports.signatureJsSDK = exports.getApplication = void 0;
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const Projection_1 = require("../types/Projection");
const oak_external_sdk_1 = require("oak-external-sdk");
const fs_1 = tslib_1.__importDefault(require("fs"));
async function getApplication(params, context) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);
    const [application] = await context.select('application', {
        data: Projection_1.applicationProjection,
        filter: {
            type,
            system: {
                domain$system: {
                    url: domain,
                }
            },
        },
    }, {});
    //微信小程序环境下 没有就报错
    if (type === 'wechatMp') {
        (0, assert_1.assert)(application, '微信小程序环境下 application必须存在小程序相关配置');
    }
    else {
        //web 或 wechatPublic
        if (type === 'wechatPublic') {
            // 如果微信公众号环境下 application不存在公众号配置，但又在公众号访问，这时可以使用web的application
            if (!application) {
                const [application2] = await context.select('application', {
                    data: Projection_1.applicationProjection,
                    filter: {
                        type: 'web',
                        system: {
                            domain$system: {
                                url: domain,
                            }
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
    const { type, config, systemId } = application;
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
    const { applicationId, file, type: mediaType, isPermanent, description, } = params;
    const filename = file.originalFilename;
    const filetype = file.mimetype;
    const file2 = fs_1.default.createReadStream(file.filepath);
    const [application] = await context.select('application', {
        data: Projection_1.applicationProjection,
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });
    const { type, config } = application;
    (0, assert_1.assert)(type === 'wechatPublic' && config.type === 'wechatPublic');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    if (isPermanent === 'true') {
        const result = (await wechatInstance.createMaterial({
            type: mediaType,
            media: file2,
            filename,
            filetype,
            description: description ? JSON.parse(description) : null,
        }));
        return {
            mediaId: result.media_id,
        };
    }
    const result = (await wechatInstance.createTemporaryMaterial({
        type: mediaType,
        media: file2,
        filename,
        filetype,
    }));
    return {
        mediaId: result.media_id,
    };
}
exports.uploadWechatMedia = uploadWechatMedia;
