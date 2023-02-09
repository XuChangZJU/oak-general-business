import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { Upload } from 'oak-frontend-base/lib/utils/upload';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { Origin } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Application } from './application'
import { composeFileUrl, bytesToSize } from '../utils/extraFile'
import assert from 'assert';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private application: Application<ED, Cxt, FrontCxt, AD>;
    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        application: Application<ED, Cxt, FrontCxt, AD>
    ) {
        super();
        this.cache = cache;
        this.application = application;
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
        const key = `${entity ? entity + '/' : ''}${objectId}.${extension}`;
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
        extraFile?: EntityDict['extraFile']['OpSchema'] | null,
        style?: string
    ) {
        if (!extraFile) {
            return '';
        }
        const application = this.application.getApplication();
        const config =
            application?.system?.config ||
            application?.system?.platform?.config;

        const url = composeFileUrl(extraFile, config, style);
        return url;
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
