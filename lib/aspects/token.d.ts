import { RuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
export declare function loginMp<ED extends EntityDict>(params: {
    code: string;
}, context: RuntimeContext<ED>): Promise<string>;
export declare function loginByPassword(params: {
    password: string;
    mobile: string;
}, context: RuntimeContext<EntityDict>): Promise<string>;
