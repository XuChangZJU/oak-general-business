import { EntityDict } from '../oak-app-domain';
import { QiniuUploadInfo } from 'oak-frontend-base';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    extraFile: EntityDict['extraFile']['CreateSingle']['data'];
}, context: Cxt): Promise<QiniuUploadInfo>;
export declare function upload<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    extraFile: EntityDict['extraFile']['CreateSingle']['data'];
}, context: Cxt): Promise<QiniuUploadInfo>;
export declare function getInfoByUrl(params: {
    url: string;
}): Promise<{
    title: string;
    publishDate: number | undefined;
    imageList: string[];
}>;
