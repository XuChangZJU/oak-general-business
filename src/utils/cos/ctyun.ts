import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import { assert } from 'oak-domain/lib/utils/assert';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';

import { CTYunUploadInfo } from '../../types/Upload';
import { getConfig } from '../getContextConfig';
import { CTYunCosConfig } from '../../types/Config';
import { CTYunInstance } from 'oak-external-sdk';
import { urlSafeBase64Encode } from '../sign';
import { OakUploadException } from '../../types/Exception';
import { OakExternalException, OakNetworkException } from 'oak-domain/lib/types/Exception';

export default class CTYun implements Cos<ED, BRC, FRC> {
    name = 'ctyun';

    autoInform(): boolean {
        return false;
    }

    private formKey(extraFile: OpSchema) {
        const { id, extension, objectId } = extraFile;

        assert(objectId);
        return `extraFile/${objectId}${extension ? '.' + extension : ''}`;
    }

    async formUploadMeta(
        extraFile: OpSchema,
        context: BRC
    ) {
        const { bucket } = extraFile;
        // 构造文件上传所需的key
        const key = this.formKey(extraFile);
        const { instance, config } = getConfig<ED, BRC, FRC>(context, 'Cos', 'ctyun');

        const { buckets } = config as CTYunCosConfig;
        let bucket2 = bucket;
        if (!bucket2) {
            const { defaultBucket } = config as CTYunCosConfig;
            bucket2 = defaultBucket!;
        }
        assert(bucket2);
        const b = buckets.find(ele => ele.name === bucket2);
        assert(b, `${bucket2}不是一个有效的桶配置`);
        Object.assign(extraFile, {
            bucket: bucket2,
            uploadMeta: (instance as CTYunInstance).getUploadInfo(
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
        const uploadMeta = extraFile.uploadMeta! as CTYunUploadInfo;
        let response;
        try {
            response = await uploadFn(
                file,
                'file',
                uploadMeta.uploadHost,
                {
                    key: uploadMeta.key,
                    Policy: uploadMeta.policy,
                    AWSAccessKeyId: uploadMeta.accessKey,
                    signature: uploadMeta.signature,
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
            // 待测试
            if (response.errMsg === 'uploadFile:ok') {
                const data = JSON.parse(response.data);
                isSuccess = !!(data.status === 204);
            }
        }
        else {
            isSuccess = !!(response.status === 204);
        }
        // 解析回调
        if (isSuccess) {
            return;
        } else {
            throw new OakUploadException('图片上传天翼云失败');
        }
    }

    composeFileUrl(
        extraFile: ED['extraFile']['OpSchema'],
        context: FRC,
        style?: string,
    ) {
        const { config } = getConfig<ED, BRC, FRC>(context, 'Cos', 'ctyun');

        if (config) {
            let bucket = (config.buckets as CTYunCosConfig['buckets']).find((ele) => ele.name === extraFile.bucket!);
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
                return `${protocol2}://${domain}/${this.formKey(extraFile)}`;
            }
        }
        return '';
    }

    async checkWhetherSuccess(
        extraFile: OpSchema,
        context: BRC
    ) {
        return true;
    }


    async removeFile(extraFile: OpSchema, context: BRC) {
    }
};
