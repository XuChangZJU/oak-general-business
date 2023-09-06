import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function sendSms<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(options: {
    origin: 'ali' | 'tencent';
    templateName: string;
    mobile: string;
    templateParamSet?: Record<string, string> | string[];
}, context: Cxt): Promise<boolean>;
