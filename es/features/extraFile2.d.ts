import { Feature } from 'oak-frontend-base';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Locales } from 'oak-frontend-base/es/features/locales';
import { CommonAspectDict } from 'oak-common-aspect';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Application } from './application';
export type FileState = 'local' | 'uploading' | 'uploaded' | 'failed';
export declare class ExtraFile2<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private application;
    private locales;
    private files;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, application: Application<ED, Cxt, FrontCxt, AD>, locales: Locales<ED, Cxt, FrontCxt, AD>);
    addLocalFile(id: string, file: File | string): void;
    removeLocalFiles(ids: string[]): void;
    upload(id: string): Promise<void>;
    getUrl(extraFile?: EntityDict['extraFile']['OpSchema'] | EntityDict['extraFile']['Schema'] | null, style?: string): string;
    getFileState(id: string): {
        state: FileState;
        percentage?: number;
    } | undefined;
    /**
     * 使用该方法，要在使用完url时，通过URL.revokeObjectURL释放缓存
     *
     * @param url 需要桥接访问的图片链接
     * @returns 浏览器 img可访问的url
     */
    getBridgeUrl(url: string): Promise<string>;
    getFileName(extraFile: EntityDict['extraFile']['OpSchema']): string;
    formatBytes(size: number): string;
}
