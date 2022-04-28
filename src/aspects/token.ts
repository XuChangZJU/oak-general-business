import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
import assert from 'assert';
import { WechatMpConfig } from 'oak-app-domain/Application/Schema';

export async function loginMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: { code: string }, context: Cxt): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: { password: string, mobile: string }, context: Cxt): Promise<string> {
    const { rowStore } = context;
   
    const { result: [mobile]} = await rowStore.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
    }, context);

    throw new Error('method not implemented!');
}

export async function loginWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(code: string, context: Cxt): Promise<string> {
    const application = await context.getApplication();
    const { type, config } = application;

    assert (type === 'wechatMp' || config.type === 'wechatMp');
    const config2 = config as WechatMpConfig;
    const { appId, appSecret } = config2;

    const result = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`);
    const json = await result.json();
    console.log(json);

    throw new Error('method not implemented!');
}

/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */