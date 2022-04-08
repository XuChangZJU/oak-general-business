import { RuntimeContext } from '../types/RuntimeContext';
import { Schema as Token } from '../base-ed/Token/Schema';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
import { EntityDict } from 'oak-domain/lib/types/Entity';

export async function loginMp(params: { code: string }, context: RuntimeContext<BaseEntityDict>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword(params: { password: string, mobile: string }, context: RuntimeContext<BaseEntityDict>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
