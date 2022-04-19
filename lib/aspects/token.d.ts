import { RuntimeContext } from '../RuntimeContext';
import { EntityDict } from '../base-ed/EntityDict';
export declare function loginMp<ED extends EntityDict>(params: {
    code: string;
}, context: RuntimeContext<ED>): Promise<string>;
export declare function loginByPassword<ED extends EntityDict>(params: {
    password: string;
    mobile: string;
}, context: RuntimeContext<ED>): Promise<string>;
