"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_external_sdk_1 = require("oak-external-sdk");
const Exception_1 = require("../../types/Exception");
const domain_1 = require("../../utils/domain");
class Wechat {
    name = 'wechat';
    autoInform() {
        return false;
    }
    formKey(extraFile) {
        // 微信上传素材库不需要
        const { id, extension, entity, objectId } = extraFile;
        return '';
    }
    async formUploadMeta(extraFile, context) {
        // 微信上传素材库
    }
    async upload(extraFile, uploadFn, file, uploadToAspect) {
        let result;
        const { applicationId, type, extra2, id } = extraFile;
        (0, assert_1.assert)(type === 'image');
        try {
            result = (await uploadToAspect(file, 'file', 'uploadWechatMedia', {
                applicationId,
                type,
                isPermanent: extra2?.isPermanent ||
                    false,
                extraFileId: id,
            }, true));
        }
        catch (err) {
            // 网络错误
            throw new Exception_1.OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.mediaId) {
            return;
        }
        else {
            throw new Exception_1.OakUploadException('图片上传微信失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        // 微信获取素材链接 还需要处理下
        const { applicationId, extra1: mediaId, extra2, type } = extraFile;
        const systemId = context.getSystemId();
        const [domain] = context.select('domain', {
            data: {
                id: 1,
                systemId: 1,
                url: 1,
                apiPath: 1,
                protocol: 1,
                port: 1,
            },
            filter: Object.assign({
                systemId,
            }, process.env.NODE_ENV === 'development' && {
                url: 'localhost',
            }),
        }, {});
        if (domain && mediaId) {
            const serverUrl = (0, domain_1.composeServerUrl)(domain, 'endpoint/wechatMaterial', {
                applicationId,
                mediaId: mediaId,
                isPermanent: `${extra2?.isPermanent ||
                    false}`,
            });
            return serverUrl;
        }
        return '';
    }
    async checkWhetherSuccess(extraFile, context) {
        const { extra1 } = extraFile;
        return !!extra1;
    }
    async removeFile(extraFile, context) {
        const { extra2, applicationId, extra1: mediaId } = extraFile;
        const isPermanent = extra2?.isPermanent || false;
        // 只有永久素材 才能删除素材
        if (isPermanent) {
            (0, assert_1.assert)(applicationId);
            (0, assert_1.assert)(mediaId);
            const [application] = await context.select('application', {
                data: {
                    id: 1,
                    config: 1,
                    type: 1,
                },
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
    }
}
exports.default = Wechat;
;
