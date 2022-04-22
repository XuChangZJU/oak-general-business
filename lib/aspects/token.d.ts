import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
export declare function loginMp<ED extends EntityDict>(params: {
    code: string;
}, context: GeneralRuntimeContext<ED>): Promise<string>;
export declare function loginByPassword<ED extends EntityDict>(params: {
    password: string;
    mobile: string;
}, context: GeneralRuntimeContext<ED>): Promise<string>;
