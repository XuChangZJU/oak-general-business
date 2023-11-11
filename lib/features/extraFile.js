"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const upload_1 = require("oak-frontend-base/es/utils/upload");
const extraFile_1 = require("../utils/extraFile");
const assert_1 = require("oak-domain/lib/utils/assert");
const cos_1 = require("../utils/cos");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const oak_domain_1 = require("oak-domain");
const Projection_1 = require("../types/Projection");
class ExtraFile extends oak_frontend_base_1.Feature {
    cache;
    application;
    locales;
    files;
    runningTree;
    constructor(cache, application, locales, runningTree) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
        this.files = {};
        this.runningTree = runningTree;
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
    async upload(id, entity) {
        /**
         * 这个函数假设了前台知道后台会产生modi的行为和数据结构，不是很好的设计
         */
        const { toModi } = this.cache.getSchema()[entity];
        let modiEntityId = '';
        const getExtraFileData = () => {
            if (toModi) {
                const [modi] = this.cache.get('modi', {
                    data: {
                        id: 1,
                        data: 1,
                        entity: 1,
                        entityId: 1,
                    },
                    filter: {
                        entity: entity,
                        targetEntity: 'extraFile',
                        action: 'create',
                        filter: {
                            id,
                        },
                    },
                });
                modiEntityId = modi.entityId;
                return modi.data;
            }
            else {
                const [extraFile] = this.cache.get('extraFile', {
                    data: Projection_1.extraFileProjection,
                    filter: {
                        id,
                    },
                });
                return extraFile;
            }
        };
        const extraFile = getExtraFileData();
        (0, assert_1.assert)(extraFile && extraFile.uploadState === 'uploading');
        const item = this.files[id];
        (0, assert_1.assert)(item);
        const { file, state } = item;
        (0, assert_1.assert)(['local', 'failed'].includes(state));
        item.state = 'uploading';
        item.percentage = 0;
        const up = new upload_1.Upload();
        const cos = (0, cos_1.getCos)(extraFile.origin);
        try {
            await cos.upload(extraFile, up.uploadFile, file, this.uploadToAspect.bind(this));
        }
        catch (err) {
            item.state = 'failed';
            item.percentage = undefined;
            this.publish();
            throw err;
        }
        if (!cos.autoInform()) {
            const informServer = async () => {
                const operation = {
                    id: await (0, oak_domain_1.generateNewIdAsync)(),
                    action: 'update',
                    data: {
                        uploadState: 'success',
                    },
                    filter: {
                        id,
                    },
                };
                if (toModi) {
                    await this.cache.exec('operate', {
                        entity: 'modi',
                        operation: {
                            id: await (0, oak_domain_1.generateNewIdAsync)(),
                            action: 'create',
                            data: {
                                id: await (0, oak_domain_1.generateNewIdAsync)(),
                                entity: entity,
                                entityId: modiEntityId,
                                data: operation.data,
                                action: 'update',
                                filter: operation.filter,
                                targetEntity: 'extraFile',
                            },
                        },
                    });
                }
                else {
                    await this.cache.exec('operate', {
                        entity: 'extraFile',
                        operation,
                    });
                }
            };
            await informServer();
        }
        item.state = 'uploaded';
        item.percentage = undefined;
        this.publish();
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
            if (typeof file === 'string') {
                return file;
            }
            if (file instanceof File) {
                return (0, extraFile_1.getFileURL)(file);
            }
            (0, assert_1.assert)(false, 'the incoming file is not supported');
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
    getFileName(extraFile) {
        const name = extraFile.filename +
            (extraFile.extension ? `.${extraFile.extension}` : '');
        return name;
    }
    formatBytes(size) {
        return (0, extraFile_1.bytesToSize)(size);
    }
    async autoUpload(extraFile, file) {
        const extraFileId = extraFile.id || (0, oak_domain_1.generateNewId)();
        const applicationId = extraFile.applicationId || this.application.getApplicationId();
        await this.cache.operate('extraFile', {
            action: 'create',
            data: Object.assign(extraFile, {
                id: extraFileId,
                applicationId,
            }),
            id: await (0, oak_domain_1.generateNewIdAsync)(),
        });
        const [newExtraFile] = this.cache.get('extraFile', {
            data: Projection_1.extraFileProjection,
            filter: {
                id: extraFileId,
            },
        });
        const up = new upload_1.Upload();
        try {
            const cos = (0, cos_1.getCos)(newExtraFile.origin);
            await cos.upload(newExtraFile, up.uploadFile, file, this.uploadToAspect.bind(this));
            this.publish();
            return this.getUrl(newExtraFile);
        }
        catch (err) {
            await this.cache.operate('extraFile', {
                action: 'remove',
                data: {},
                filter: {
                    id: extraFileId,
                },
                id: await (0, oak_domain_1.generateNewIdAsync)(),
            });
            this.publish();
            throw err;
        }
    }
    // 私有
    async uploadToAspect(file, name, // 文件的part name
    aspectName, // 上传的aspect名
    formData, // 上传的其它part参数
    autoInform // 上传成功是否会自动通知server（若不会则需要前台显式通知）
    ) {
        const formData2 = new FormData();
        for (const key of Object.keys(formData)) {
            formData2.append(key, formData[key]);
        }
        formData2.append(name || 'file', file);
        const { result } = await this.cache.exec(aspectName, formData2);
        return result;
    }
}
exports.ExtraFile = ExtraFile;
