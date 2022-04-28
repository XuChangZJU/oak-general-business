import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain';
import { WechatMpEnv } from 'oak-app-domain/Token/Schema';
export declare function loginMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    code: string;
}, context: Cxt): Promise<string>;
export declare function loginByPassword<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    password: string;
    mobile: string;
}, context: Cxt): Promise<string>;
export declare function loginWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string>;
