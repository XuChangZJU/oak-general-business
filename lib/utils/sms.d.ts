import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function sendSms<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(options: {
    origin: 'ali' | 'tencent';
    templateName: string;
    mobile: string;
    templateParamSet?: Record<string, string>;
    templateParamSetFn?: (origin: 'ali' | 'tencent', templateParamSet?: Record<string, string>) => string[] | Record<string, string> | undefined;
}, context: Cxt): Promise<boolean>;
