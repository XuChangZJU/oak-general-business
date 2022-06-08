import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'general-app-domain';
export declare function getUploadInfo<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    origin: string;
    fileName: string;
}, context: Cxt): Promise<object>;
