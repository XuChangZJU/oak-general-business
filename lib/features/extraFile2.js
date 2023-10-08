"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile2 = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const upload_1 = require("oak-frontend-base/es/utils/upload");
const extraFile_1 = require("../utils/extraFile");
const assert_1 = require("oak-domain/lib/utils/assert");
const cos_1 = require("../utils/cos");
const lodash_1 = require("oak-domain/lib/utils/lodash");
class ExtraFile2 extends oak_frontend_base_1.Feature {
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
        (0, assert_1.assert)(!this.files[id]);
        this.files[id] = {
            file,
            state: 'local',
        };
        this.publish();
    }
    removeLocalFiles(ids) {
        ids.forEach((id) => (0, lodash_1.unset)(this.files, id));
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
        (0, assert_1.assert)(extraFile && extraFile.uploadState === 'uploading');
        const item = this.files[id];
        (0, assert_1.assert)(item);
        const { file, state } = item;
        (0, assert_1.assert)(['local', 'failed'].includes(state));
        item.state = 'uploading';
        item.percentage = 0;
        const up = new upload_1.Upload();
        try {
            const cos = (0, cos_1.getCos)(extraFile.origin);
            await cos.upload(extraFile, up.uploadFile, file);
            if (!cos.autoInform()) {
                /* await this.cache.exec('operate', {
                    entity: 'extraFile',
                    operation: {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            uploadState: 'success',
                        },
                    } as ED['extraFile']['Operation'],
                }); */
            }
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
                return (0, extraFile_1.getFileURL)(file);
            }
            else {
                return file;
            }
        }
        const { origin } = extraFile;
        const cos = (0, cos_1.getCos)(origin);
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
        return (0, extraFile_1.bytesToSize)(size);
    }
}
exports.ExtraFile2 = ExtraFile2;
