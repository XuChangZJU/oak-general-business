import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import { assert } from 'oak-domain/lib/utils/assert';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
import { Schema as DomainSchema } from '../../oak-app-domain/Domain/Schema';


import { WechatPublicInstance } from 'oak-external-sdk';
import { OakUploadException } from '../../types/Exception';
import { composeDomainUrl } from '../../utils/domain';

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
        const { applicationId, type, uploadMeta, id } = extraFile;
        assert(type === 'image');
        try {
            result = (await uploadToAspect(
                file,
                'file',
                'uploadWechatMedia',
                {
                    applicationId,
                    type,
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
        return extraFile.extra1 || '';
    }

    async checkWhetherSuccess(extraFile: OpSchema, context: BRC) {
        return false;
    }

    async removeFile(extraFile: OpSchema, context: BRC) {}
};
