import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { unset } from 'oak-domain/lib/utils/lodash';
import { generateNewId, generateNewIdAsync } from 'oak-domain';
import { extraFileProjection } from '../types/Projection';
export class ExtraFile2 extends Feature {
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
    async upload(id) {
        const [extraFile] = this.cache.get('extraFile', {
            data: extraFileProjection,
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
        try {
            const cos = getCos(extraFile.origin);
            await cos.upload(extraFile, up.uploadFile, file, this.uploadToAspect.bind(this));
            if (!cos.autoInform()) {
                await this.cache.exec('operate', {
                    entity: 'extraFile',
                    operation: {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            uploadState: 'success',
                        },
                    },
                });
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
    async uploadCommit(efPaths, oakFullpath) {
        assert(false, '方法已经废弃');
        assert(efPaths && efPaths.length > 0);
        let ids = [];
        if (oakFullpath) {
            ids = efPaths
                .map((path) => {
                const path2 = path
                    ? `${oakFullpath}.${path}`
                    : oakFullpath;
                const data = this.runningTree.getFreshValue(path2);
                assert(data, `efPath为${path}的路径上取不到extraFile数据，请设置正确的相对路径`);
                return data.map((ele) => ele.id);
            })
                .flat()
                .filter((ele) => !!ele);
        }
        assert(ids.length > 0);
        const promises = [];
        ids.forEach((id) => {
            const fileState = this.getFileState(id);
            if (fileState) {
                const { state } = fileState;
                if (['local', 'failed'].includes(state)) {
                    promises.push(this.upload(id));
                }
            }
        });
        if (promises.length > 0) {
            await Promise.all(promises);
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
