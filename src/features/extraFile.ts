import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Locales } from 'oak-frontend-base/es/features/locales';
import { CommonAspectDict } from 'oak-common-aspect';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Origin } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Application } from './application'
import { composeFileUrl, bytesToSize } from '../utils/extraFile'
import { assert } from 'oak-domain/lib/utils/assert';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private application: Application<ED, Cxt, FrontCxt, AD>;
    private locales: Locales<ED, Cxt, FrontCxt, AD>;
    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        application: Application<ED, Cxt, FrontCxt, AD>,
        locales: Locales<ED, Cxt, FrontCxt, AD>,
    ) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
    }

    private async getUploadInfo(origin: Origin, key?: string) {
        const uploadInfo = await this.cache.exec('getUploadInfo', {
            origin,
            key,
        });
        return uploadInfo;
    }

    async upload(extraFile: EntityDict['extraFile']['CreateSingle']['data']) {
        const { origin, extra1, filename, objectId, extension, entity } =
            extraFile;
        // 构造文件上传所需的key
        const key = `${entity ? entity + '/' : ''}${objectId}${extension ? '.' + extension : ''}`;
        assert(origin && origin !== 'unknown');
        const { result: uploadInfo } = await this.getUploadInfo(origin, key);

        if (process.env.OAK_PLATFORM === 'wechatMp') {
            // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
            const up = new Upload();
            const result = await up.uploadFile(origin, extra1!, uploadInfo);
            return result;
        } else {
            const up = new Upload();
            const result = await up.uploadFile(origin, extra1!, uploadInfo);
            return result;
        }
    }

    getUrl(
        extraFile?: EntityDict['extraFile']['OpSchema'] | EntityDict['extraFile']['Schema'] | null,
        style?: string
    ) {
        if (!extraFile) {
            return '';
        }
        const application = this.application.getApplication();
        const config =
            application?.system?.config ||
            application?.system?.platform?.config;
        let url;
        if(extraFile?.isBridge && extraFile?.extra1) {
            if(typeof extraFile?.extra1 === 'string') {
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
    async getBridgeUrl(url: string) {
        const { result } = await this.cache.exec('crossBridge', {
            url,
        })
        const blob = new Blob([result as unknown as BlobPart], { type: 'image/png' });
        return URL.createObjectURL(blob);
    }

    getFileName(extraFile: EntityDict['extraFile']['OpSchema']) {
        const name =
            extraFile.filename +
            (extraFile.extension ? `.${extraFile.extension}` : '');

        return name;
    }

    formatBytes(size: number) {
        return bytesToSize(size);
    }
}
