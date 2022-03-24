import { RunningContext } from 'oak-domain/lib/types/Context';
import { Schema as Token } from 'oak-domain/lib/entities/Token';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-domain/EntityDict';
import { EntityDict } from 'oak-domain/lib/types/Entity';

export async function loginMp(params: { code: string }, context: RunningContext<BaseEntityDict>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword(params: { password: string, mobile: string }, context: RunningContext<BaseEntityDict>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
