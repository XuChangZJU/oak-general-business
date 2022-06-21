import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'general-app-domain';
import { SystemConfig } from 'general-app-domain/System/Schema';
import qiniuInstance from '../utils/externalUpload/qiniu';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';

const ExternalUploadClazz = {
    qiniu: qiniuInstance,
};


export async function getUploadInfo<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(
    params: { origin: string, fileName: string },
    context: Cxt): Promise<QiniuUploadInfo> {
    const { rowStore } = context;
    const application = await context.getApplication();
    const { type, config, systemId } = application!;
    const { origin, fileName } = params;

    const { result: [system] } = await rowStore.select('system', {
        data: {
            id: 1,
            config: 1
        },
        filter: {
            id: systemId
        }
    }, context);
    try {
        const { config: systemConfig } = system;
        const originConfig = (systemConfig as SystemConfig).Cos![
            origin as keyof typeof systemConfig
        ];

        const instance = new ExternalUploadClazz[
            origin as keyof typeof ExternalUploadClazz
        ](originConfig);
        const uploadInfo = await instance.getUploadInfo(fileName);
        return uploadInfo;
    } catch (err) {
        throw err;
    }
}