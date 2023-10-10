"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const getContextConfig_1 = require("../getContextConfig");
const Exception_1 = require("../../types/Exception");
const oak_domain_1 = require("oak-domain");
const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';
class Qiniu {
    name = 'qiniu';
    autoInform() {
        return false;
    }
    formKey(extraFile) {
        const { id, extension, entity, objectId } = extraFile;
        // 这里是为了兼容旧的代码使用objectId来生成key的数据，现在objectId已经废弃
        if (objectId) {
            return `${entity}/${objectId}${extension ? '.' + extension : ''}`;
        }
        return `extraFile/${id}${extension ? '.' + extension : ''}`;
    }
    async formUploadMeta(extraFile, context) {
        const { bucket } = extraFile;
        // 构造文件上传所需的key
        const key = this.formKey(extraFile);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        const { uploadHost, buckets } = config;
        (0, assert_1.assert)(bucket);
        (0, assert_1.assert)(buckets.find(ele => ele.name === bucket), `${bucket}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket,
            uploadMeta: instance.getKodoUploadInfo(uploadHost, bucket, key),
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
        const { config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        if (config) {
            let bucket = config.buckets.find((ele) => ele.name === extraFile.bucket);
            (0, assert_1.assert)(bucket);
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
        return '';
    }
    async checkWhetherSuccess(extraFile, context) {
        const key = this.formKey(extraFile);
        const { instance, config } = (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu');
        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? { fsize: 100 } : undefined;
        try {
            const result = await instance.getKodoFileStat(extraFile.bucket, key, mockData);
            const { fsize } = result;
            return fsize > 0;
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof oak_domain_1.OakExternalException) {
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
        try {
            await instance.removeKodoFile(extraFile.bucket, key, mockData);
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof oak_domain_1.OakExternalException) {
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
