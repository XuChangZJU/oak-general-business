import { EntityDict } from '../oak-app-domain';
import { Origin } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: Origin;
    bucket?: string;
    key?: string;
}, context: Cxt): Promise<QiniuUploadInfo>;
export declare function getInfoByUrl(params: {
    url: string;
}): Promise<{
    title: string;
    publishDate: number | undefined;
    imageList: string[];
}>;
