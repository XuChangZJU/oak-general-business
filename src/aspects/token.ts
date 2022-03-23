import { RunningContext } from 'oak-domain/lib/types/Context';
import { Schema as Token } from 'oak-domain/lib/entities/Token';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-domain/EntityDict';
import { EntityDict } from 'oak-domain/lib/types/Entity';

export async function loginMp<ED extends EntityDict & BaseEntityDict> (params: { code: string }, context: RunningContext<ED>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword<ED extends EntityDict & BaseEntityDict>(params: { password: string, mobile: string }, context: RunningContext<ED>): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
