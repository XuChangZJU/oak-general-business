import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Locales } from 'oak-frontend-base/es/features/locales';
import { CommonAspectDict } from 'oak-common-aspect';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Config, Origin } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Application } from './application'
import { composeFileUrl, bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import UploaderDict from '../utils/uploader';
import { OpSchema } from '../oak-app-domain/ExtraFile/Schema';
import { generateNewId } from 'oak-domain/lib/utils/uuid';

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
        locales: Locales<ED, Cxt, FrontCxt, AD>
    ) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
    }

    async createAndUpload(
        extraFile: EntityDict['extraFile']['CreateSingle']['data'],
        file: string | File,
    ) {
        await this.cache.operate('extraFile', {
            action: 'create',
            data: extraFile,
            id: generateNewId(),
        } as EntityDict['extraFile']['Operation']);
        await this.upload(
            extraFile,
            file
        );
        const application = this.application.getApplication();
        const config =
            application?.system?.config ||
            application?.system?.platform?.config;
        return {
            url: this.getUrl(
                extraFile as EntityDict['extraFile']['OpSchema']
            ),
        };
    }

    async upload(
        extraFile: EntityDict['extraFile']['CreateSingle']['data'],
        file: string | File
    ) {
        const { id, origin } = extraFile;
        assert(origin, '未设置上传方式');
        const [extraFileData] = this.cache.get('extraFile', {
            data: {
                origin: 1,
                type: 1,
                bucket: 1,
                objectId: 1,
                tag1: 1,
                tag2: 1,
                filename: 1,
                md5: 1,
                entity: 1,
                entityId: 1,
                extra1: 1,
                extension: 1,
                size: 1,
                sort: 1,
                fileType: 1,
                isBridge: 1,
                uploadState: 1,
                uploadMeta: 1,
            },
            filter: {
                id,
            },
        });
        const up = new Upload();
        try {
            await UploaderDict[origin!].upload(
                extraFileData as OpSchema,
                up.uploadFile,
                file
            );
            await this.cache.operate('extraFile', {
                action: 'update',
                data: {
                    uploadState: 'success',
                },
                filter: {
                    id,
                },
                id: generateNewId(),
            } as EntityDict['extraFile']['Operation']);
            this.publish();
        } catch (err) {
            await this.cache.operate('extraFile', {
                action: 'update',
                data: {
                    uploadState: 'failed',
                },
                filter: {
                    id,
                },
                id: generateNewId(),
            } as EntityDict['extraFile']['Operation']);
            this.publish();
            throw err;
        }
    }

    getUrl(
        extraFile?:
            | EntityDict['extraFile']['OpSchema']
            | EntityDict['extraFile']['Schema']
            | null,
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
        if (extraFile?.isBridge && extraFile?.extra1) {
            if (typeof extraFile?.extra1 === 'string') {
                url = this.locales.makeBridgeUrl(extraFile?.extra1);
                return url;
            }
        }
        if (extraFile?.extra1) {
            // 有extra1就用extra1 可能File对象 可能外部链接
            if (typeof extraFile?.extra1 === 'string') {
                return extraFile?.extra1;
            }
            if ((extraFile?.extra1 as File) instanceof File) {
                return getFileURL(extraFile?.extra1) || '';
            }
            return extraFile?.extra1 || '';
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
        });
        const blob = new Blob([result as unknown as BlobPart], {
            type: 'image/png',
        });
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
