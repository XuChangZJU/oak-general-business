import { assert } from 'oak-domain/lib/utils/assert';
import { OakUploadException } from '../../types/Exception';
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
        //微信上传素材库 不需要
    }
    getServerUrl() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = process.env.NODE_ENV === 'development' ? 3001 : undefined;
        const apiPath = process.env.NODE_ENV === 'development' ? undefined : '/oak-api';
        let serverUrl = `${protocol}//${hostname}`;
        if (typeof port === 'number') {
            serverUrl += `:${port}`;
        }
        if (apiPath) {
            assert(apiPath.startsWith('/'), 'apiPath前缀必须存在/');
            serverUrl += apiPath;
        }
        return serverUrl;
    }
    async upload(extraFile, uploadFn, file) {
        let result;
        try {
            const url = this.getServerUrl();
            result = (await uploadFn(file, 'file', `${url}/uploadWechatMedia`, {}, true));
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
