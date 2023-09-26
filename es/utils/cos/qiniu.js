import { assert } from 'oak-domain/lib/utils/assert';
import { getConfig } from '../getContextConfig';
import { urlSafeBase64Encode } from '../sign';
import { OakUploadException } from '../../types/Exception';
const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';
export default class Qiniu {
    name = 'qiniu';
    async formUploadMeta(extraFile, context) {
        const { origin, objectId, extension, entity, bucket } = extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');
        const { uploadHost, defaultBucket: bucket2, buckets } = config;
        if (bucket) {
            assert(buckets.hasOwnProperty(bucket), `${bucket}不是一个有效的桶配置`);
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
        const { objectId, extension, entity, bucket } = extraFile || {};
        const { config } = getConfig(context, 'Cos', 'qiniu');
        if (config && config.Cos) {
            const { domain, protocol } = config.Cos[origin].buckets[bucket];
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
        const encodedEntryURI = urlSafeBase64Encode(entry);
        const qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', encodedEntryURI);
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');
        return false;
    }
    async removeFile(extraFile, context) {
        const { bucket, uploadMeta } = extraFile;
    }
}
;
