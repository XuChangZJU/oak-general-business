import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { composeFileUrl, bytesToSize } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
export class ExtraFile extends Feature {
    cache;
    application;
    locales;
    constructor(cache, application, locales) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
    }
    async getUploadInfo(origin, key) {
        const uploadInfo = await this.cache.exec('getUploadInfo', {
            origin,
            key,
        });
        return uploadInfo;
    }
    async upload(extraFile) {
        const { origin, extra1, filename, objectId, extension, entity } = extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        assert(origin && origin !== 'unknown');
        const { result: uploadInfo } = await this.getUploadInfo(origin, key);
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
            const up = new Upload();
            const result = await up.uploadFile(origin, extra1, uploadInfo);
            return result;
        }
        else {
            const up = new Upload();
            const result = await up.uploadFile(origin, extra1, uploadInfo);
            return result;
        }
    }
    getUrl(extraFile, style) {
        if (!extraFile) {
            return '';
        }
        const application = this.application.getApplication();
        const config = application?.system?.config ||
            application?.system?.platform?.config;
        let url;
        if (extraFile?.isBridge && extraFile?.extra1) {
            if (typeof extraFile?.extra1 === 'string') {
                url = this.locales.makeBridgeUrl(extraFile?.extra1);
                return url;
            }
        }
        url = composeFileUrl(extraFile, config, style);
        return url;
    }
    /**
     * 使用该方法，要在使用完url时，通过URL.revokeObjectURL释放缓存
     *
     * @param url 需要桥接访问的图片链接
     * @returns 浏览器 img可访问的url
     */
    async getBridgeUrl(url) {
        const { result } = await this.cache.exec('crossBridge', {
            url,
        });
        const blob = new Blob([result], { type: 'image/png' });
        return URL.createObjectURL(blob);
    }
    getFileName(extraFile) {
        const name = extraFile.filename +
            (extraFile.extension ? `.${extraFile.extension}` : '');
        return name;
    }
    formatBytes(size) {
        return bytesToSize(size);
    }
}
