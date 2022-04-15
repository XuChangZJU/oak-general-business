import { EntityDict } from 'oak-domain/lib/types/Entity';
import { RuntimeContext } from '../types/RuntimeContext';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
import { Schema as Application } from '../base-ed/Application/Schema';
import { Schema as Token } from '../base-ed/Token/Schema';
import { Context, TreeStore } from 'oak-memory-tree-store';
export declare class CacheContext<ED extends EntityDict & BaseEntityDict> extends Context<ED> implements RuntimeContext<ED> {
    getApplication: () => Pick<Application, 'id'> | undefined;
    getToken: () => Pick<Token, 'id' | 'userId' | 'playerId'> | undefined;
    constructor(store: TreeStore<ED>, application?: Pick<Application, 'id'>, token?: Pick<Token, 'id' | 'userId' | 'playerId'>);
    on(event: "commit" | "rollback", callback: (context: any) => Promise<void>): void;
}
