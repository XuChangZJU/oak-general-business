import { OperateParams, EntityDict, OperationResult, SelectionResult2 } from 'oak-domain/lib/types/Entity';
import { RuntimeContext } from '../RuntimeContext';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';

export async function operate<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    options: { entity: T, operation: ED[T]['Operation'], params?: OperateParams }, context: RuntimeContext<ED>) {
    const { entity, operation, params } = options;
    return context.rowStore.operate(entity, operation, context, params);
}

export async function select<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    options: { entity: T, selection: ED[T]['Selection'], params?: object }, context: RuntimeContext<ED>) {
        const { entity, selection, params } = options;
    return context.rowStore.select(entity, selection, context, params);
}

/* 
export type AspectDict<ED extends EntityDict & BaseEntityDict> = {
    operation: <T extends keyof ED>(options: { entity: T, operation: ED[T]['Operation'], params?: OperateParams }, context: RuntimeContext<ED>) => Promise<OperationResult>;
    select: <T extends keyof ED, S extends ED[T]['Selection']>( options: { entity: T, selection: S, params?: object }, context: RuntimeContext<ED>) => Promise<SelectionResult2<ED[T]['Schema'], S>>;
}; */
