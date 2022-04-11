
import { Context } from 'oak-domain/lib/types/Context';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from '../base-ed/Application/Schema';
import { Schema as Token } from '../base-ed/Token/Schema';


export interface RuntimeContext<ED extends EntityDict> extends Context<ED> {
    getApplication: () => Application | undefined;
    getToken: () => Token | undefined;    
    on(event: 'commit' | 'rollback', callback: (context: RuntimeContext<ED>) => Promise<void>): void;
};