import { getConfig } from '../../utils/getContextConfig';
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
    async checkWhetherSuccess(extraFile, context) {
        const { uploadMeta, bucket } = extraFile;
        const { key } = uploadMeta;
        const qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', `${bucket}:${key}`);
        return false;
    }
    async removeFile(extraFile, context) {
        const { bucket, uploadMeta } = extraFile;
    }
}
;
