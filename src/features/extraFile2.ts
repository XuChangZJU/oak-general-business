import { Feature } from 'oak-frontend-base';
import { Upload } from 'oak-frontend-base/es/utils/upload';
import { Cache } from 'oak-frontend-base/es/features/cache';
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
import { generateNewIdAsync } from 'oak-domain';

export type FileState = 'local' | 'uploading' | 'uploaded' | 'failed';

export class ExtraFile2<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {    
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private application: Application<ED, Cxt, FrontCxt, AD>;
    private locales: Locales<ED, Cxt, FrontCxt, AD>;
    private files: Record<string, {
        file: File | string;
        state: FileState;
        percentage?: number;
    }>;

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        application: Application<ED, Cxt, FrontCxt, AD>,
        locales: Locales<ED, Cxt, FrontCxt, AD>
    ) {
        super();
        this.cache = cache;
        this.application = application;
        this.locales = locales;
        this.files = {};
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
        ids.forEach(
            (id) => unset(this.files, id)
        );
        this.publish();
    }

    async upload(id: string) {
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
        try {
            const cos = getCos<ED, Cxt, FrontCxt>(extraFile.origin!);
            await cos.upload(
                extraFile as OpSchema,
                up.uploadFile,
                file
            );
            await this.cache.exec('operate', {
                entity: 'extraFile',
                operation: {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        uploadState: 'success',
                    },
                } as ED['extraFile']['Operation'],
            });
            item.state = 'uploaded';
            item.percentage = undefined;
            this.publish();
        } catch (err) {
            item.state = 'failed';
            item.percentage = undefined;
            this.publish();
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
        const cos = getCos<ED, Cxt, FrontCxt>(origin);
        const context = this.cache.begin();
        this.cache.commit();
        return cos.composeFileUrl(extraFile, context, style);
    }

    getFileState(id: string): {
        state: FileState;
        percentage?: number;
    } | undefined {
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