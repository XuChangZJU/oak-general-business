import { RuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain/EntityDict';

export async function loginMp<ED extends EntityDict>(params: { code: string }, context: RuntimeContext<ED>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword<ED extends EntityDict>(params: { password: string, mobile: string }, context: RuntimeContext<ED>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: RuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: RuntimeContext<ED>) => Promise<string>;
};
 */