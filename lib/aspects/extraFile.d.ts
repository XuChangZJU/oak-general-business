import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Origin } from '../types/Config';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(params: {
    origin: Origin;
    bucket?: string;
    key?: string;
}, context: Cxt): Promise<QiniuUploadInfo>;
