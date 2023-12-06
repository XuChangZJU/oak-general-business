"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const getContextConfig_1 = require("../getContextConfig");
const Exception_1 = require("../../types/Exception");
const Exception_2 = require("oak-domain/lib/types/Exception");
class CTYun {
    name = 'ctyun';
    autoInform() {
        return false;
    }
    formKey(extraFile) {
        const { id, extension, objectId } = extraFile;
        (0, assert_1.assert)(objectId);
        return `extraFile/${objectId}${extension ? '.' + extension : ''}`;
    }
    async formUploadMeta(extraFile, context) {
        const { bucket } = extraFile;
        // 构造文件上传所需的key
        const key = this.formKey(extraFile);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'ctyun');
        const { buckets } = config;
        let bucket2 = bucket;
        if (!bucket2) {
            const { defaultBucket } = config;
            bucket2 = defaultBucket;
        }
        (0, assert_1.assert)(bucket2);
        const b = buckets.find(ele => ele.name === bucket2);
        (0, assert_1.assert)(b, `${bucket2}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket: bucket2,
            uploadMeta: instance.getUploadInfo(bucket2, b.zone, key),
        });
    }
    async upload(extraFile, uploadFn, file) {
        const uploadMeta = extraFile.uploadMeta;
        let response;
        try {
            response = await uploadFn(file, 'file', uploadMeta.uploadHost, {
                key: uploadMeta.key,
                Policy: uploadMeta.policy,
                AWSAccessKeyId: uploadMeta.accessKey,
                signature: uploadMeta.signature,
            }, true);
        }
        catch (err) {
            // 网络错误
            throw new Exception_2.OakNetworkException('网络异常，请求失败');
        }
        let isSuccess = false;
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            // 小程序端上传 使用wx.uploadFile 
            // 待测试
            if (response.errMsg === 'uploadFile:ok') {
                const data = JSON.parse(response.data);
                isSuccess = !!(data.status === 204);
            }
        }
        else {
            isSuccess = !!(response.status === 204);
        }
        // 解析回调
        if (isSuccess) {
            return;
        }
        else {
            throw new Exception_1.OakUploadException('图片上传天翼云失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        const { config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'ctyun');
        if (config) {
            let bucket = config.buckets.find((ele) => ele.name === extraFile.bucket);
            if (bucket) {
                const { domain, protocol } = bucket;
                let protocol2 = protocol;
                if (protocol instanceof Array) {
                    // protocol存在https 说明域名有证书
                    const index = protocol.includes('https')
                        ? protocol.findIndex((ele) => ele === 'https')
                        : 0;
                    protocol2 = protocol[index];
                }
                return `${protocol2}://${domain}/${this.formKey(extraFile)}`;
            }
        }
        return '';
    }
    async checkWhetherSuccess(extraFile, context) {
        return true;
    }
    async removeFile(extraFile, context) {
    }
}
exports.default = CTYun;
;
