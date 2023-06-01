import { EntityDict } from '../general-app-domain';
import { Origin, QiniuCosConfig } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
import { getConfig } from '../utils/getContextConfig';
import { assert } from 'oak-domain/lib/utils/assert';
import { QiniuCloudInstance } from 'oak-external-sdk';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import fetch from 'node-fetch';

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

export async function getImgsByUrl(
    params: { url: string; }
): Promise<any> {
    const { url } = params;
    const imgs: string[] = [];
    const response = await fetch(url);
    const html = await response.text();
    const regex = /<img.*?src="(.*?)"/g;
    const matches = html.matchAll(regex);
    for (const match of matches) {
        // 不是链接的不要
        if (match[1].includes('https://') || match.includes('http://')) {
            imgs.push(match[1]);
        }
    }
    return imgs;
}

