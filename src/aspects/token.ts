import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';

export async function loginMp<ED extends EntityDict>(params: { code: string }, context: GeneralRuntimeContext<ED>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword<ED extends EntityDict>(params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>): Promise<string> {
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

/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */