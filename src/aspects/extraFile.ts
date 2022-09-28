import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Origin, QiniuCosConfig } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
import { getConfig } from '../utils/getContextConfig';
import { assert } from 'oak-domain/lib/utils/assert';
import { QiniuCloudInstance } from 'oak-external-sdk';


export async function getUploadInfo<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(
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