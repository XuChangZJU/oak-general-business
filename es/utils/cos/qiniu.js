import { assert } from 'oak-domain/lib/utils/assert';
import { getConfig } from '../getContextConfig';
import { OakUploadException } from '../../types/Exception';
import { OakExternalException } from 'oak-domain';
export default class Qiniu {
    name = 'qiniu';
    autoInform() {
        return false;
    }
    formKey(extraFile) {
        const { id, extension, objectId } = extraFile;
        assert(objectId);
        return `extraFile/${objectId}${extension ? '.' + extension : ''}`;
    }
    async formUploadMeta(extraFile, context) {
        const { bucket } = extraFile;
        // 构造文件上传所需的key
        const key = this.formKey(extraFile);
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');
        const { buckets } = config;
        let bucket2 = bucket;
        if (!bucket2) {
            const { defaultBucket } = config;
            bucket2 = defaultBucket;
        }
        assert(bucket2);
        const b = buckets.find(ele => ele.name === bucket2);
        assert(b, `${bucket2}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket: bucket2,
            uploadMeta: instance.getKodoUploadInfo(bucket2, b.zone, key),
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
            throw new OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.success === true || result.key) {
            return;
        }
        else {
            throw new OakUploadException('图片上传失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        const { config } = getConfig(context, 'Cos', 'qiniu');
        if (config) {
            let bucket = config.buckets.find((ele) => ele.name === extraFile.bucket);
            assert(bucket);
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
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');
        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? { fsize: 100 } : undefined;
        const b = config.buckets.find(ele => ele.name === extraFile.bucket);
        assert(b, `extrafile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`);
        try {
            const result = await instance.getKodoFileStat(extraFile.bucket, b.zone, key, mockData);
            const { fsize } = result;
            return fsize > 0;
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof OakExternalException) {
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
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');
        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? true : undefined;
        const b = config.buckets.find(ele => ele.name === extraFile.bucket);
        assert(b, `extrafile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`);
        try {
            await instance.removeKodoFile(extraFile.bucket, b.zone, key, mockData);
        }
        catch (err) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof OakExternalException) {
                const data = err.data;
                if (data && data.status === 612) {
                    return;
                }
            }
            throw err;
        }
    }
}
;
