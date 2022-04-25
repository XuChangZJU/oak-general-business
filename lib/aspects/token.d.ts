import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
export declare function loginMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    code: string;
}, context: Cxt): Promise<string>;
export declare function loginByPassword<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    password: string;
    mobile: string;
}, context: Cxt): Promise<string>;
