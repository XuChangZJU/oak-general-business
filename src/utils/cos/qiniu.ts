import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import { assert } from 'oak-domain/lib/utils/assert';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';

import { QiniuUploadInfo } from '../../types/Upload';
import { getConfig } from '../getContextConfig';
import { QiniuCosConfig } from '../../types/Config';
import { QiniuCloudInstance } from 'oak-external-sdk/es/service/qiniu/QiniuCloud';
import { urlSafeBase64Encode } from '../sign';
import { OakUploadException } from '../../types/Exception';
import { OakExternalException, OakNetworkException } from 'oak-domain/lib/types/Exception';

export default class Qiniu implements Cos<ED, BRC, FRC> {
    name = 'qiniu';

    autoInform(): boolean {
        return false;
    }

    private formKey(extraFile: OpSchema) {
        const { id, extension, objectId } = extraFile;

        assert(objectId);
        return `extraFile/${objectId}${extension ? '.' + extension : ''}`;
    }

    async formUploadMeta(extraFile: OpSchema, context: BRC) {
        const { bucket } = extraFile;
        // 构造文件上传所需的key
        const key = this.formKey(extraFile);
        const { instance, config } = getConfig<ED, BRC, FRC>(
            context,
            'Cos',
            'qiniu'
        );

        const { buckets } = config as QiniuCosConfig;
        let bucket2 = bucket;
        if (!bucket2) {
            const { defaultBucket } = config as QiniuCosConfig;
            bucket2 = defaultBucket!;
        }
        assert(bucket2);
        const b = buckets.find((ele) => ele.name === bucket2);
        assert(b, `${bucket2}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket: bucket2,
            uploadMeta: (instance as QiniuCloudInstance).getKodoUploadInfo(
                bucket2,
                b.zone,
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
        let response;
        try {
            response = await uploadFn(
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
            throw new OakNetworkException('网络异常，请求失败');
        }
        let isSuccess = false;
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            // 小程序端上传 使用wx.uploadFile
            if (response.errMsg === 'uploadFile:ok') {
                const data = JSON.parse(response.data);
                isSuccess = !!(data.success === true || data.key);
            }
        } else {
            const data = await response.json();
            isSuccess = !!(data.success === true || data.key);
        }
        // 解析回调
        if (isSuccess) {
            return;
        } else {
            throw new OakUploadException('图片上传七牛失败');
        }
    }

    composeFileUrl(
        extraFile: ED['extraFile']['OpSchema'],
        context: FRC,
        style?: string
    ) {
        const application = context.getApplication();
        if (!application) {
            return '';
        }
        const { config } = getConfig<ED, BRC, FRC>(context, 'Cos', 'qiniu');

        if (config) {
            let bucket = (config.buckets as QiniuCosConfig['buckets']).find(
                (ele) => ele.name === extraFile.bucket!
            );
            if (bucket) {
                const { domain, protocol } = bucket!;
                let protocol2 = protocol;
                if (protocol instanceof Array) {
                    // protocol存在https 说明域名有证书
                    const index = (protocol as ['http', 'https']).includes(
                        'https'
                    )
                        ? protocol.findIndex((ele) => ele === 'https')
                        : 0;
                    protocol2 = protocol[index];
                }
                return `${protocol2}://${domain}/${this.formKey(extraFile)}${style ? '?' + style : ''}`;
            }
        }
        return '';
    }

    async checkWhetherSuccess(extraFile: OpSchema, context: BRC) {
        const key = this.formKey(extraFile);
        const { instance, config } = getConfig<ED, BRC, FRC>(
            context,
            'Cos',
            'qiniu'
        );

        // web环境下访问不了七牛接口，用mockData过
        const mockData =
            process.env.OAK_PLATFORM === 'web' ? { fsize: 100 } : undefined;

        const b = (config as QiniuCosConfig).buckets.find(
            (ele) => ele.name === extraFile.bucket
        );
        assert(
            b,
            `extraFile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`
        );

        try {
            const result = await (
                instance as QiniuCloudInstance
            ).getKodoFileStat(extraFile.bucket!, b.zone, key, mockData);

            const { fsize } = result;
            return fsize > 0;
        } catch (err: any) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof OakExternalException) {
                const data = err.data;
                if (data && data.status === 612) {
                    return false;
                }
            }
            throw err;
        }
    }

    async removeFile(extraFile: OpSchema, context: BRC) {
        const key = this.formKey(extraFile);
        const { instance, config } = getConfig<ED, BRC, FRC>(
            context,
            'Cos',
            'qiniu'
        );

        // web环境下访问不了七牛接口，用mockData过
        const mockData = process.env.OAK_PLATFORM === 'web' ? true : undefined;
        const b = (config as QiniuCosConfig).buckets.find(
            (ele) => ele.name === extraFile.bucket
        );
        assert(
            b,
            `extraFile中的bucket名称在七牛配置中找不到「${extraFile.bucket}」`
        );
        try {
            await (instance as QiniuCloudInstance).removeKodoFile(
                extraFile.bucket!,
                b.zone,
                key,
                mockData
            );
        } catch (err: any) {
            // 七牛如果文件不存在会抛出status ＝ 612的异常
            if (err instanceof OakExternalException) {
                const data = err.data;
                if (data && data.status === 612) {
                    return;
                }
            }
            throw err;
        }
    }
};
