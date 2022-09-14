import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(params: {
    origin: string;
    key?: string;
}, context: Cxt): Promise<QiniuUploadInfo>;
