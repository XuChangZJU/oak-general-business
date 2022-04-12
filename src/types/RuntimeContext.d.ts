import { Context } from 'oak-domain/lib/types/Context';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from '../base-ed/Application/Schema';
import { Schema as Token } from '../base-ed/Token/Schema';
export interface RuntimeContext<ED extends EntityDict> extends Context<ED> {
    getApplication: () => Pick<Application, 'id'> | undefined;
    getToken: () => Pick<Token, 'id' | 'userId' | 'playerId'> | undefined;
    on(event: 'commit' | 'rollback', callback: (context: RuntimeContext<ED>) => Promise<void>): void;
}
