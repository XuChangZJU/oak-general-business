import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import { assert } from 'oak-domain/lib/utils/assert';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
import { Schema as DomainSchema } from '../../oak-app-domain/Domain/Schema';
import {
    AppType,
    WechatPublicConfig,
} from '../../oak-app-domain/Application/Schema';

import { WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { OakUploadException } from '../../types/Exception';
import { composeServerUrl } from '../../utils/domain';

type response = {
    mediaId: string;
};

export default class Wechat implements Cos<ED, BRC, FRC> {
    name = 'wechat';

    autoInform(): boolean {
        return false;
    }

    private formKey(extraFile: OpSchema) {
        // 微信上传素材库不需要
        const { id, extension, entity, objectId } = extraFile;

        return '';
    }

    async formUploadMeta(extraFile: OpSchema, context: BRC) {
        // 微信上传素材库
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
        file: string | File,
        uploadToAspect: (
            file: File | string,
            name: string, // 文件的part name
            aspectName: string, // 上传的aspect名
            formData: Record<string, any>, // 上传的其它part参数
            autoInform?: boolean // 上传成功是否会自动通知server（若不会则需要前台显式通知）
        ) => Promise<any>
    ) {
        let result: response;
        const { applicationId, type, extra2, id } = extraFile;
        assert(type === 'image');
        try {
            result = (await uploadToAspect(
                file,
                'file',
                'uploadWechatMedia',
                {
                    applicationId,
                    type,
                    isPermanent:
                        (extra2 as { isPermanent: boolean })?.isPermanent ||
                        false,
                    extraFileId: id,
                },
                true
            )) as response;
        } catch (err) {
            // 网络错误
            throw new OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.mediaId) {
            return;
        } else {
            throw new OakUploadException('图片上传微信失败');
        }
    }

    composeFileUrl(
        extraFile: ED['extraFile']['OpSchema'],
        context: FRC,
        style?: string
    ) {
        // 微信获取素材链接 还需要处理下
        const { applicationId, extra1: mediaId, extra2, type } = extraFile;
        const systemId = context.getSystemId();
        const [domain] = context.select(
            'domain',
            {
                data: {
                    id: 1,
                    systemId: 1,
                    url: 1,
                    apiPath: 1,
                    protocol: 1,
                    port: 1,
                },
                filter: Object.assign(
                    {
                        systemId,
                    },
                    process.env.NODE_ENV === 'development' && {
                        url: 'localhost',
                    }
                ),
            },
            {}
        );

        if (domain && mediaId) {
            const serverUrl = composeServerUrl(
                domain as DomainSchema,
                'endpoint/wechatMaterial',
                {
                    applicationId,
                    mediaId: mediaId as string,
                    isPermanent: `${
                        (extra2 as { isPermanent: boolean })?.isPermanent ||
                        false
                    }`,
                }
            );

            return serverUrl;
        }
        return '';
    }

    async checkWhetherSuccess(extraFile: OpSchema, context: BRC) {
        const { extra1 } = extraFile;
        return !!extra1;
    }

    async removeFile(extraFile: OpSchema, context: BRC) {
        const { extra2, applicationId, extra1: mediaId } = extraFile;
        const isPermanent =
            (extra2 as { isPermanent: boolean })?.isPermanent || false;

        // 只有永久素材 才能删除素材
        if (isPermanent) {
            assert(applicationId);
            assert(mediaId);
            const [application] = await context.select(
                'application',
                {
                    data: {
                        id: 1,
                        config: 1,
                        type: 1,
                    },
                    filter: {
                        id: applicationId,
                    },
                },
                {
                    dontCollect: true,
                }
            );
            assert(application);
            const { type, config } = application!;
            assert(type === 'wechatPublic');

            const config2 = config as WechatPublicConfig;
            const { appId, appSecret } = config2;

            const wechatInstance = WechatSDK.getInstance(
                appId!,
                type!,
                appSecret!
            ) as WechatPublicInstance;

            const result = await wechatInstance.deleteMaterial({
                mediaId,
            });

            return result
        }
    }
};
