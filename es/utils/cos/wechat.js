import { assert } from 'oak-domain/lib/utils/assert';
import { OakUploadException } from '../../types/Exception';
import { composeDomainUrl } from '../../utils/domain';
export default class Wechat {
    name = 'wechat';
    autoInform() {
        return false;
    }
    formKey(extraFile) {
        //微信上传素材库 不需要
        const { id, extension, entity, objectId } = extraFile;
        return '';
    }
    async formUploadMeta(extraFile, context) {
        const pathname = '/uploadWechatMedia';
        const applicationId = context.getApplicationId();
        const [domain] = await context.select('domain', {
            data: {
                id: 1,
                url: 1,
                apiPath: 1,
                protocol: 1,
                port: 1,
            },
            filter: Object.assign({
                system: {
                    application$system: {
                        id: applicationId,
                    },
                },
            }, process.env.NODE_ENV === 'development' && {
                url: 'localhost',
            }),
        }, { dontCollect: true });
        const url = composeDomainUrl(domain, pathname);
        Object.assign(extraFile, {
            uploadMeta: {
                uploadHost: url,
            },
        });
    }
    async upload(extraFile, uploadFn, file) {
        let result;
        const { applicationId, type, uploadMeta } = extraFile;
        assert(type === 'image');
        try {
            result = (await uploadFn(file, 'file', uploadMeta.uploadHost, {
                applicationId,
                type,
            }, true));
        }
        catch (err) {
            // 网络错误
            throw new OakUploadException('图片上传失败');
        }
        // 解析回调
        if (result.mediaId) {
            return;
        }
        else {
            throw new OakUploadException('图片上传失败');
        }
    }
    composeFileUrl(extraFile, context, style) {
        // 微信获取素材链接 还需要处理下
        return extraFile.extra1 || '';
    }
    async checkWhetherSuccess(extraFile, context) {
        return false;
    }
    async removeFile(extraFile, context) { }
}
;
