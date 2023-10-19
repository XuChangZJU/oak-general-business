"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const Exception_1 = require("../../types/Exception");
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
        const { applicationId, type, uploadMeta, id } = extraFile;
        (0, assert_1.assert)(type === 'image');
        try {
            result = (await uploadToAspect(file, 'file', 'uploadWechatMedia', {
                applicationId,
                type,
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
        return extraFile.extra1 || '';
    }
    async checkWhetherSuccess(extraFile, context) {
        return false;
    }
    async removeFile(extraFile, context) { }
}
exports.default = Wechat;
;
