import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../general-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
export declare function mergeUser<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    from: string;
    to: string;
}, context: Cxt, innerLogic?: boolean): Promise<void>;
/**
 * 获取有对entity进行actions操作权限的用户Id（不包含root）
 * @param params
 * @param context
 */
export declare function getUserIdsByActionAuth<ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: T;
    entityId: string;
    actions: ED[T]['Action'][];
    overlap?: boolean;
}, context: Cxt): Promise<string[]>;
