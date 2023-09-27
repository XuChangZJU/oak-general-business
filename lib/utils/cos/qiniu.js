"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const getContextConfig_1 = require("../getContextConfig");
const sign_1 = require("../sign");
const Exception_1 = require("../../types/Exception");
const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';
class Qiniu {
    name = 'qiniu';
    async formUploadMeta(extraFile, context) {
        const { origin, objectId, extension, entity, bucket } = extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        const { uploadHost, defaultBucket: bucket2, buckets } = config;
        if (bucket) {
            (0, assert_1.assert)(buckets.hasOwnProperty(bucket), `${bucket}不是一个有效的桶配置`);
        }
        Object.assign(extraFile, {
            bucket: bucket || bucket2,
            uploadMeta: instance.getUploadInfo(uploadHost, bucket || bucket2, key),
        });
    }
    async upload(extraFile, uploadFn, file) {
        const uploadMeta = extraFile.uploadMeta;
        let result;
        try {
            result = await uploadFn(file, 'file', uploadMeta.uploadHost, {
                key: uploadMeta.key,
                token: uploadMeta.uploadToken,
            }, true);
        }
        catch (err) {
            // 网络错误
            throw new Exception_1.OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.success === true || result.key) {
            return;
        }
        else {
            throw new Exception_1.OakUploadException('图片上传失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        const { objectId, extension, entity, bucket } = extraFile || {};
        const { config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        if (config) {
            const { domain, protocol } = config[origin].buckets[bucket];
            let protocol2 = protocol;
            if (protocol instanceof Array) {
                // protocol存在https 说明域名有证书
                const index = protocol.includes('https')
                    ? protocol.findIndex((ele) => ele === 'https')
                    : 0;
                protocol2 = protocol[index];
            }
            return `${protocol2}://${domain}/${entity}/${objectId}.${extension}`;
        }
        return '';
    }
    async checkWhetherSuccess(extraFile, context) {
        const { uploadMeta, bucket } = extraFile;
        const { key } = uploadMeta;
        const entry = `${bucket}:${key}`;
        const encodedEntryURI = (0, sign_1.urlSafeBase64Encode)(entry);
        const qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', encodedEntryURI);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        return false;
    }
    async removeFile(extraFile, context) {
        const { bucket, uploadMeta } = extraFile;
    }
}
exports.default = Qiniu;
;
