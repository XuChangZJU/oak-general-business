import { EntityDict, OperateParams } from 'oak-domain/lib/types/Entity';
import { RuntimeContext } from '../types/RuntimeContext';

export async function operate<ED extends EntityDict, T extends keyof ED>(
    options: { entity: T, operation: ED[T]['Operation'], params?: OperateParams }, context: RuntimeContext<ED>) {
    const { entity, operation, params } = options;
    return context.rowStore.operate(entity, operation, context, params);
}

export async function select<ED extends EntityDict, T extends keyof ED>(
    options: { entity: T, selection: ED[T]['Selection'], params?: object }, context: RuntimeContext<ED>) {
        const { entity, selection, params } = options;
    return context.rowStore.select(entity, selection, context, params);
}
