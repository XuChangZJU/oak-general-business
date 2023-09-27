import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { unset } from 'oak-domain/lib/utils/lodash';
export class ExtraFile2 extends Feature {
    cache;
    application;
    locales;
    files;
    constructor(cache, application, locales) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
        this.files = {};
    }
    addLocalFile(id, file) {
        assert(!this.files[id]);
        this.files[id] = {
            file,
            state: 'local',
        };
        this.publish();
    }
    removeLocalFiles(ids) {
        ids.forEach((id) => unset(this.files, id));
        this.publish();
    }
    async upload(id) {
        const [extraFile] = this.cache.get('extraFile', {
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
        assert(extraFile && extraFile.uploadState === 'uploading');
        const item = this.files[id];
        assert(item);
        const { file, state } = item;
        assert(['local', 'failed'].includes(state));
        item.state = 'uploading';
        item.percentage = 0;
        const up = new Upload();
        const cos = getCos(origin);
        try {
            await cos.upload(extraFile, up.uploadFile, file);
            item.state = 'uploaded';
            item.percentage = undefined;
            this.publish();
        }
        catch (err) {
            item.state = 'failed';
            item.percentage = undefined;
            this.publish();
        }
    }
    getUrl(extraFile, style) {
        if (!extraFile) {
            return '';
        }
        if (extraFile?.isBridge && extraFile?.extra1) {
            return this.locales.makeBridgeUrl(extraFile?.extra1);
        }
        const { id } = extraFile;
        if (this.files[id]) {
            const { file } = this.files[id];
            if (file instanceof File) {
                return getFileURL(file);
            }
            else {
                return file;
            }
        }
        const { origin } = extraFile;
        const cos = getCos(origin);
        const context = this.cache.begin();
        this.cache.commit();
        return cos.composeFileUrl(extraFile, context, style);
    }
    getFileState(id) {
        if (this.files[id]) {
            return this.files[id];
        }
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
        const blob = new Blob([result], {
            type: 'image/png',
        });
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
