"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const getContextConfig_1 = require("../getContextConfig");
const Exception_1 = require("../../types/Exception");
const Exception_2 = require("oak-domain/lib/types/Exception");
class Qiniu {
    name = 'qiniu';
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
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        const { buckets } = config;
        let bucket2 = bucket;
        if (!bucket2) {
            const { defaultBucket } = config;
            bucket2 = defaultBucket;
        }
        (0, assert_1.assert)(bucket2);
        const b = buckets.find((ele) => ele.name === bucket2);
        (0, assert_1.assert)(b, `${bucket2}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket: bucket2,
            uploadMeta: instance.getKodoUploadInfo(bucket2, b.zone, key),
        });
    }
    async upload(extraFile, uploadFn, file) {
        const uploadMeta = extraFile.uploadMeta;
        let response;
        try {
            response = await uploadFn(file, 'file', uploadMeta.uploadHost, {
                key: uploadMeta.key,
                token: uploadMeta.uploadToken,
            }, true);
        }
        catch (err) {
            // 网络错误
            throw new Exception_2.OakNetworkException('网络异常，请求失败');
        }
        let isSuccess = false;
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            // 小程序端上传 使用wx.uploadFile
            if (response.errMsg === 'uploadFile:ok') {
                const data = JSON.parse(response.data);
                isSuccess = !!(data.success === true || data.key);
            }
        }
        else {
            const data = await response.json();
            isSuccess = !!(data.success === true || data.key);
        }
        // 解析回调
        if (isSuccess) {
            return;
        }
        else {
            throw new Exception_1.OakUploadException('图片上传七牛失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        const application = context.getApplication();
        if (!application) {
            return '';
        }
        const { config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
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
                return `${protocol2}://${domain}/${this.formKey(extraFile)}${style ? '-' + style : ''}`;
            }
        }
        return '';
    }
    async checkWhetherSuccess(extraFile, context) {
        const key = this.formKey(extraFile);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? { fsize: 100 } : undefined;
        const b = config.buckets.find((ele) => ele.name === extraFile.bucket);
        (0, assert_1.assert)(b, `extraFile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`);
        try {
            const result = await instance.getKodoFileStat(extraFile.bucket, b.zone, key, mockData);
            const { fsize } = result;
            return fsize > 0;
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof Exception_2.OakExternalException) {
                const data = err.data;
                if (data && data.status === 612) {
                    return false;
                }
            }
            throw err;
        }
    }
    async removeFile(extraFile, context) {
        const key = this.formKey(extraFile);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? true : undefined;
        const b = config.buckets.find((ele) => ele.name === extraFile.bucket);
        (0, assert_1.assert)(b, `extraFile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`);
        try {
            await instance.removeKodoFile(extraFile.bucket, b.zone, key, mockData);
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof Exception_2.OakExternalException) {
                const data = err.data;
                if (data && data.status === 612) {
                    return;
                }
            }
            throw err;
        }
    }
}
exports.default = Qiniu;
;
