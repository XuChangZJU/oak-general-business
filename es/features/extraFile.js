import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
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
    async createAndUpload(extraFile, file) {
        await this.cache.operate('extraFile', {
            action: 'create',
            data: extraFile,
            id: generateNewId(),
        });
        await this.upload(extraFile, file);
        const application = this.application.getApplication();
        return {
            url: this.getUrl(extraFile),
        };
    }
    async upload(extraFile, file) {
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
            const cos = getCos(origin);
            await cos.upload(extraFileData, up.uploadFile, file, async () => undefined);
            await this.cache.operate('extraFile', {
                action: 'update',
                data: {
                    uploadState: 'success',
                },
                filter: {
                    id,
                },
                id: generateNewId(),
            });
            this.publish();
        }
        catch (err) {
            await this.cache.operate('extraFile', {
                action: 'update',
                data: {
                    uploadState: 'failed',
                },
                filter: {
                    id,
                },
                id: generateNewId(),
            });
            this.publish();
            throw err;
        }
    }
    getUrl(extraFile, style) {
        if (!extraFile) {
            return '';
        }
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
            if (extraFile?.extra1 instanceof File) {
                return getFileURL(extraFile?.extra1) || '';
            }
            return extraFile?.extra1 || '';
        }
        const { origin } = extraFile;
        const cos = getCos(origin);
        const context = this.cache.begin();
        this.cache.commit();
        url = cos.composeFileUrl(extraFile, context, style);
        return url;
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
