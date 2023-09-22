"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
const tslib_1 = require("tslib");
const oak_frontend_base_1 = require("oak-frontend-base");
const upload_1 = require("oak-frontend-base/es/utils/upload");
const extraFile_1 = require("../utils/extraFile");
const assert_1 = require("oak-domain/lib/utils/assert");
const uploader_1 = tslib_1.__importDefault(require("../utils/uploader"));
const uuid_1 = require("oak-domain/lib/utils/uuid");
class ExtraFile extends oak_frontend_base_1.Feature {
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
            id: (0, uuid_1.generateNewId)(),
        });
        await this.upload(extraFile, file);
        const application = this.application.getApplication();
        const config = application?.system?.config ||
            application?.system?.platform?.config;
        return {
            url: this.getUrl(extraFile),
        };
    }
    async upload(extraFile, file) {
        const { id, origin } = extraFile;
        (0, assert_1.assert)(origin, '未设置上传方式');
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
        const up = new upload_1.Upload();
        try {
            await uploader_1.default[origin].upload(extraFileData, up.uploadFile, file);
            await this.cache.operate('extraFile', {
                action: 'update',
                data: {
                    uploadState: 'success',
                },
                filter: {
                    id,
                },
                id: (0, uuid_1.generateNewId)(),
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
                id: (0, uuid_1.generateNewId)(),
            });
            this.publish();
            throw err;
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
        if (extraFile?.extra1) {
            // 有extra1就用extra1 可能File对象 可能外部链接
            if (typeof extraFile?.extra1 === 'string') {
                return extraFile?.extra1;
            }
            if (extraFile?.extra1 instanceof File) {
                return (0, extraFile_1.getFileURL)(extraFile?.extra1) || '';
            }
            return extraFile?.extra1 || '';
        }
        url = (0, extraFile_1.composeFileUrl)(extraFile, config, style);
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
exports.ExtraFile = ExtraFile;
