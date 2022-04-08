import { RuntimeContext } from '../types/RuntimeContext';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
export declare function loginMp(params: {
    code: string;
}, context: RuntimeContext<BaseEntityDict>): Promise<string>;
export declare function loginByPassword(params: {
    password: string;
    mobile: string;
}, context: RuntimeContext<BaseEntityDict>): Promise<string>;
