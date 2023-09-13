import { getConfig } from '../utils/getContextConfig';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatSDK } from 'oak-external-sdk';
export async function getUploadInfo(params, context) {
    const { origin, extra1, filename, objectId, extension, entity, bucket } = params.extraFile;
    // 构造文件上传所需的key
    const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
    assert(origin && origin !== 'unknown');
    const { instance, config, } = await getConfig(context, 'Cos', origin);
    assert(origin === 'qiniu');
    const { uploadHost, domain, bucket: bucket2 } = config;
    return instance.getUploadInfo(uploadHost, domain, bucket || bucket2, key);
}
export async function upload(params, context) {
    const { origin, extra1, filename, objectId, extension, entity, bucket } = params.extraFile;
    // 构造文件上传所需的key
    const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
    assert(origin && origin !== 'unknown');
    const { instance, config, } = await getConfig(context, 'Cos', origin);
    assert(origin === 'qiniu');
    const { uploadHost, domain, bucket: bucket2 } = config;
    return instance.getUploadInfo(uploadHost, domain, bucket || bucket2, key);
}
// 请求链接获取标题，发布时间，图片等信息
export async function getInfoByUrl(params) {
    const { url } = params;
    return await WechatSDK.analyzePublicArticle(url);
}
