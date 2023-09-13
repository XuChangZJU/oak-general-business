import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';

import Uploader from "../../types/Uploader";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';

import { QiniuUploadInfo } from 'oak-frontend-base';
import { getConfig } from '../../utils/getContextConfig';
import { QiniuCosConfig } from '../../types/Config';
import { QiniuCloudInstance } from 'oak-external-sdk';
import { get } from 'oak-domain/lib/utils/lodash';

const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';

export default class Qiniu<ED extends EntityDict & BaseEntityDict> implements Uploader<ED> {
    name = 'qiniu';

    async formUploadMeta(extraFile: OpSchema, context: BackendRuntimeContext<ED>) {
        const { origin, objectId, extension, entity, bucket } =
            extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        const {
            instance,
            config,
        } = await getConfig<ED, BackendRuntimeContext<ED>>(context, 'Cos', 'qiniu');

        const { uploadHost, bucket: bucket2 } = config as QiniuCosConfig;
        Object.assign(
            extraFile, {
            bucket: bucket || bucket2,
            uploadMeta: (instance as QiniuCloudInstance).getUploadInfo(uploadHost, bucket || bucket2, key)
        }
        )
    }

    async upload(extraFile: OpSchema, uploadFn: (
        name: string,               // 文件的part name
        uploadUrl: string,          // 上传的url
        formData: Record<string, any>,  // 上传的其它part参数
        autoInform: boolean,        // 上传成功是否会自动通知server（若不会则需要前台显式通知）
        file: string | File,
    ) => Promise<any>, file: string | File) {
        const uploadMeta = extraFile.uploadMeta! as QiniuUploadInfo;
        const result = await uploadFn(
            '',
            get(extraFile, 'uploadMeta.uploadHost', ''),
            {
                key: uploadMeta?.key,
                token: uploadMeta?.uploadToken,
            },
            true,
            file,
        );
        if (result.success === true || result.key) {
            return;
        }
        throw new Error('图片上传失败');
    }

    async checkWhetherSuccess(extraFile: OpSchema, context: BackendRuntimeContext<ED>) {
        const { uploadMeta, bucket } = extraFile;
        const { key } = uploadMeta as { key: string };
        const qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', `${bucket}:${key}`);
        return false;
    }

    async removeFile(extraFile: OpSchema, context: BackendRuntimeContext<ED>) {
        const { bucket, uploadMeta } = extraFile;

    }
};
