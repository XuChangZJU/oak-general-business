import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { RunningTree } from 'oak-frontend-base/es/features/runningTree';
import { Locales } from 'oak-frontend-base/es/features/locales';
import { CommonAspectDict } from 'oak-common-aspect';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Application } from './application'
import { bytesToSize, getFileURL } from '../utils/extraFile';
import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { OpSchema } from '../oak-app-domain/ExtraFile/Schema';
import { unset } from 'oak-domain/lib/utils/lodash';
import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { extraFileProjection } from '../types/Projection';

export type FileState = 'local' | 'uploading' | 'uploaded' | 'failed';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
    > extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private application: Application<ED, Cxt, FrontCxt, AD>;
    private locales: Locales<ED, Cxt, FrontCxt, AD>;
    private files: Record<
        string,
        {
            file: File | string;
            state: FileState;
            percentage?: number;
        }
    >;
    private runningTree: RunningTree<ED, Cxt, FrontCxt, AD>;

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        application: Application<ED, Cxt, FrontCxt, AD>,
        locales: Locales<ED, Cxt, FrontCxt, AD>,
        runningTree: RunningTree<ED, Cxt, FrontCxt, AD>
    ) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
        this.files = {};
        this.runningTree = runningTree;
    }

    addLocalFile(id: string, file: File | string) {
        assert(!this.files[id]);
        this.files[id] = {
            file,
            state: 'local',
        };
        this.publish();
    }

    removeLocalFiles(ids: string[]) {
        ids.forEach((id) => unset(this.files, id));
        this.publish();
    }

    async upload(id: string, entity: keyof ED) {
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
                        entity: entity as string,
                        targetEntity: 'extraFile',
                        action: 'create',
                        filter: {
                            id,
                        },
                    },
                });
                modiEntityId = modi.entityId!;
                return modi.data as ED['extraFile']['OpSchema'];
            }
            else {
                const [extraFile] = this.cache.get('extraFile', {
                    data: extraFileProjection,
                    filter: {
                        id,
                    },
                });
                return extraFile as ED['extraFile']['OpSchema'];
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
        const cos = getCos<ED, Cxt, FrontCxt>(extraFile.origin!);
        try {
            await cos.upload(
                extraFile as OpSchema,
                up.uploadFile,
                file,
                this.uploadToAspect.bind(this)
            );
        } catch (err) {
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
                } as ED['extraFile']['Operation'];
                if (toModi) {
                    await this.cache.exec('operate', {
                        entity: 'modi',
                        operation: {
                            id: await generateNewIdAsync(),
                            action: 'create',
                            data: {
                                id: await generateNewIdAsync(),
                                entity: entity as string,
                                entityId: modiEntityId,
                                data: operation.data,
                                action: 'update',
                                filter: operation.filter,
                                targetEntity: 'extraFile',
                            },
                        } as ED['modi']['Operation'],
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
        const { origin, extra1 } = extraFile;
        if (origin === 'unknown') {
            return extra1 || '';
        }
        const cos = getCos<ED, Cxt, FrontCxt>(origin);
        const context = this.cache.begin();
        this.cache.commit();
        return cos.composeFileUrl(extraFile, context, style);
    }

    getFileState(id: string):
        | {
            state: FileState;
            percentage?: number;
        }
        | undefined {
        if (this.files[id]) {
            return this.files[id];
        }
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

    async autoUpload(
        extraFile: EntityDict['extraFile']['OpSchema'],
        file: File | string
    ) {
        const extraFileId = extraFile.id || generateNewId();
        const applicationId =
            extraFile.applicationId || this.application.getApplicationId();
        await this.cache.operate('extraFile', {
            action: 'create',
            data: Object.assign(extraFile, {
                id: extraFileId,
                applicationId,
            }),
            id: await generateNewIdAsync(),
        } as EntityDict['extraFile']['Operation']);
        const [newExtraFile] = this.cache.get('extraFile', {
            data: extraFileProjection,
            filter: {
                id: extraFileId,
            },
        });
        const up = new Upload();
        try {
            const cos = getCos<ED, Cxt, FrontCxt>(newExtraFile.origin!);
            await cos.upload(
                newExtraFile as OpSchema,
                up.uploadFile,
                file,
                this.uploadToAspect.bind(this)
            );
            if (!cos.autoInform()) {
                await this.cache.exec('operate', {
                    entity: 'extraFile',
                    operation: {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            uploadState: 'success',
                        },
                        filter: {
                            id: extraFileId,
                        },
                    } as ED['extraFile']['Operation'],
                });
            }
            this.publish();
            return this.getUrl(
                newExtraFile as EntityDict['extraFile']['Schema']
            );
        } catch (err) {
            await this.cache.operate('extraFile', {
                action: 'remove',
                data: {},
                filter: {
                    id: extraFileId,
                },
                id: await generateNewIdAsync(),
            } as EntityDict['extraFile']['Operation']);
            this.publish();
            throw err;
        }
    }

    // 私有
    private async uploadToAspect(
        file: File | string,
        name: string, // 文件的part name
        aspectName: string, // 上传的aspect名
        formData: Record<string, any>, // 上传的其它part参数
        autoInform?: boolean // 上传成功是否会自动通知server（若不会则需要前台显式通知）
    ) {
        const formData2 = new FormData();
        for (const key of Object.keys(formData)) {
            formData2.append(key, formData[key]);
        }
        formData2.append(name || 'file', file as File);

        const { result } = await this.cache.exec(
            aspectName as keyof CommonAspectDict<ED, Cxt>,
            formData2
        );
        return result;
    }
}