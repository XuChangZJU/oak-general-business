import { EntityDict } from '../general-app-domain';
import { Origin } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: Origin;
    bucket?: string;
    key?: string;
}, context: Cxt): Promise<QiniuUploadInfo>;
export declare function getImgsByUrl(params: {
    url: string;
}): Promise<any>;
