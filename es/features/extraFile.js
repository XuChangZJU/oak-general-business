import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { unset } from 'oak-domain/lib/utils/lodash';
import { generateNewId, generateNewIdAsync } from 'oak-domain';
import { extraFileProjection } from '../types/Projection';
export class ExtraFile extends Feature {
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
                    data: extraFileProjection,
                    filter: {
                        id,
                    },
                });
                return extraFile;
            }
        };
        const extraFile = getExtraFileData();
        assert(extraFile && extraFile.uploadState === 'uploading');
        const item = this.files[id];
        assert(item);
        const { file, state } = item;
        assert(['local', 'failed'].includes(state));
        item.state = 'uploading';
        item.percentage = 0;
        const up = new Upload();
        const cos = getCos(extraFile.origin);
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
                    id: await generateNewIdAsync(),
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
                            id: await generateNewIdAsync(),
                            action: 'create',
                            data: {
                                id: await generateNewIdAsync(),
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
                return getFileURL(file);
            }
            assert(false, 'the incoming file is not supported');
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
    getFileName(extraFile) {
        const name = extraFile.filename +
            (extraFile.extension ? `.${extraFile.extension}` : '');
        return name;
    }
    formatBytes(size) {
        return bytesToSize(size);
    }
    async autoUpload(extraFile, file) {
        const extraFileId = extraFile.id || generateNewId();
        const applicationId = extraFile.applicationId || this.application.getApplicationId();
        await this.cache.operate('extraFile', {
            action: 'create',
            data: Object.assign(extraFile, {
                id: extraFileId,
                applicationId,
            }),
            id: await generateNewIdAsync(),
        });
        const [newExtraFile] = this.cache.get('extraFile', {
            data: extraFileProjection,
            filter: {
                id: extraFileId,
            },
        });
        const up = new Upload();
        try {
            const cos = getCos(newExtraFile.origin);
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
                id: await generateNewIdAsync(),
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
