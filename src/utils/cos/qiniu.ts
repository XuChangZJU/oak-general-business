import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import { assert } from 'oak-domain/lib/utils/assert';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';

import { QiniuUploadInfo } from '../../types/Upload';
import { getConfig } from '../getContextConfig';
import { QiniuCosConfig } from '../../types/Config';
import { QiniuCloudInstance } from 'oak-external-sdk';
import { urlSafeBase64Encode } from '../sign';
import { OakUploadException } from '../../types/Exception';

const QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';

export default class Qiniu implements Cos<ED, BRC, FRC> {
    name = 'qiniu';

    async formUploadMeta(
        extraFile: OpSchema,
        context: BRC
    ) {
        const { origin, objectId, extension, entity, bucket } = extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''
            }`;
        const { instance, config } = getConfig<ED, BRC, FRC>(context, 'Cos', 'qiniu');

        const { uploadHost, defaultBucket: bucket2, buckets } = config as QiniuCosConfig;
        if (bucket) {
            assert(buckets.hasOwnProperty(bucket), `${bucket}不是一个有效的桶配置`);
        }
        Object.assign(extraFile, {
            bucket: bucket || bucket2,
            uploadMeta: (instance as QiniuCloudInstance).getUploadInfo(
                uploadHost,
                bucket || bucket2,
                key
            ),
        });
    }

    async upload(
        extraFile: OpSchema,
        uploadFn: (
            file: File | string,
            name: string, // 文件的part name
            uploadUrl: string, // 上传的url
            formData: Record<string, any>, // 上传的其它part参数
            autoInform?: boolean // 上传成功是否会自动通知server（若不会则需要前台显式通知）
        ) => Promise<any>,
        file: string | File
    ) {
        const uploadMeta = extraFile.uploadMeta! as QiniuUploadInfo;
        let result;
        try {
            result = await uploadFn(
                file,
                'file',
                uploadMeta.uploadHost,
                {
                    key: uploadMeta.key,
                    token: uploadMeta.uploadToken,
                },
                true
            );
        } catch (err) {
            // 网络错误
            throw new OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.success === true || result.key) {
            return;
        } else {
            throw new OakUploadException('图片上传失败');
        }
    }

    composeFileUrl(
        extraFile: ED['extraFile']['OpSchema'],
        context: FRC,
        style?: string,
    ) {
        const {
            objectId,
            extension,
            entity,
            bucket
        } = extraFile || {};
        const { config } = getConfig<ED, BRC, FRC>(context, 'Cos', 'qiniu');

        if (config) {
            let bucket = (config.buckets as QiniuCosConfig['buckets']).find((ele) => ele.name === config.defaultBucket);
            if (!bucket) {
                bucket = config.buckets[0]
            }
            const { domain, protocol } = bucket!;
            let protocol2 = protocol;
            if (protocol instanceof Array) {
                // protocol存在https 说明域名有证书
                const index = (protocol as ['http', 'https']).includes('https')
                    ? protocol.findIndex((ele) => ele === 'https')
                    : 0;
                protocol2 = protocol[index];
            }
            return `${protocol2}://${domain}/${entity}/${objectId}.${extension}`;
        }
        return '';
    }

    async checkWhetherSuccess(
        extraFile: OpSchema,
        context: BRC
    ) {
        const { uploadMeta, bucket } = extraFile;
        const { key } = uploadMeta as { key: string };
        const entry = `${bucket}:${key}`;
        const encodedEntryURI = urlSafeBase64Encode(entry);
        const qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', encodedEntryURI);
        const { instance, config } = getConfig(context, 'Cos', 'qiniu');

        return false;
    }


    async removeFile(extraFile: OpSchema, context: BRC) {
        const { bucket, uploadMeta } = extraFile;
    }
};
