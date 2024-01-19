import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
/**
 * 创建todo例程，为entity对象上满足filter条件的，需要以action进行处理的行创建一个todo
 * @param entity
 * @param filter
 * @param action
 * @param userIds
 */
export declare function createToDo<ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(entity: T, filter: ED[T]['Selection']['filter'], action: ED[T]['Action'], context: Cxt, data: {
    title: string;
    description?: string;
    redirectTo: EntityDict['toDo']['OpSchema']['redirectTo'];
    entity: any;
    entityId: string;
}, userIds?: string[]): Promise<1 | 0>;
/**
 * 完成todo例程，当在entity对象上进行action操作时（操作条件是filter），将对应的todo完成
 * 必须在entity的action的后trigger中调用
 * @param entity
 * @param filter    传入的filter限定查询todo的范围，在todo中的targetFilter查找相同限制下的行，和创建toDo要保持一致（但要考虑action可能造成的数据变化）
 * @param action
 * @param context
 */
export declare function completeToDo<ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(entity: T, filter: ED[T]['Selection']['filter'], action: ED[T]['Action'], context: Cxt): Promise<number>;
