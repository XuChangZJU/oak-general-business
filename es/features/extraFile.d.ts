import { Feature } from 'oak-frontend-base';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Locales } from 'oak-frontend-base/es/features/locales';
import { CommonAspectDict } from 'oak-common-aspect';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Application } from './application';
export declare class ExtraFile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private application;
    private locales;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, application: Application<ED, Cxt, FrontCxt, AD>, locales: Locales<ED, Cxt, FrontCxt, AD>);
    createAndUpload(extraFile: EntityDict['extraFile']['CreateSingle']['data'], file: string | File): Promise<{
        url: any;
    }>;
    upload(extraFile: EntityDict['extraFile']['CreateSingle']['data'], file: string | File): Promise<void>;
    getUrl(extraFile?: EntityDict['extraFile']['OpSchema'] | EntityDict['extraFile']['Schema'] | null, style?: string): any;
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
