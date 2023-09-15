import { getConfig } from '../../utils/getContextConfig';
import { urlSafeBase64Encode } from '../sign';
const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';
export default class Qiniu {
    name = 'qiniu';
    async formUploadMeta(extraFile, context) {
        const { origin, objectId, extension, entity, bucket } = extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        const { instance, config } = await getConfig(context, 'Cos', 'qiniu');
        const { uploadHost, bucket: bucket2 } = config;
        Object.assign(extraFile, {
            bucket: bucket || bucket2,
            uploadMeta: instance.getUploadInfo(uploadHost, bucket || bucket2, key),
        });
    }
    async upload(extraFile, uploadFn, file) {
        const uploadMeta = extraFile.uploadMeta;
        const result = await uploadFn(file, 'file', uploadMeta.uploadHost, {
            key: uploadMeta.key,
            token: uploadMeta.uploadToken,
        }, true);
        if (result.success === true || result.key) {
            return;
        }
        throw new Error('图片上传失败');
    }
    composeFileUrl(extraFile, config, style) {
        const { objectId, extension, entity, } = extraFile || {};
        if (config && config.Cos) {
            const { domain, protocol } = config.Cos[origin];
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
        const { instance, config } = await getConfig(context, 'Cos', 'qiniu');
        return false;
    }
    async removeFile(extraFile, context) {
        const { bucket, uploadMeta } = extraFile;
    }
}
;
