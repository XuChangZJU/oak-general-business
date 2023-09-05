import { EntityDict } from '../oak-app-domain';
import { Origin, QiniuCosConfig } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base';
import { getConfig } from '../utils/getContextConfig';
import { assert } from 'oak-domain/lib/utils/assert';
import { QiniuCloudInstance } from 'oak-external-sdk';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { WechatSDK } from 'oak-external-sdk';

export async function getUploadInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(
    params: { origin: Origin; bucket?: string; key?: string },
    context: Cxt): Promise<QiniuUploadInfo> {
    const { origin, key, bucket } = params;

    const {
        instance,
        config,
    } = await getConfig<ED, Cxt>(context, 'Cos', origin);
    assert(origin === 'qiniu');
    const { uploadHost, domain, bucket: bucket2 } = config as QiniuCosConfig;
    return (instance as QiniuCloudInstance).getUploadInfo(uploadHost, domain, bucket || bucket2, key);
}


// 请求链接获取标题，发布时间，图片等信息
export async function getInfoByUrl(
    params: { url: string; }
): Promise<{
    title: string;
    publishDate: number | undefined;
    imageList: string[];
}> {
    const { url } = params;
    return await WechatSDK.analyzePublicArticle(url);
}

