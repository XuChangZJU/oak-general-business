import { EntityDict } from "oak-domain/lib/types/Entity";
import { Logger } from "oak-domain/lib/types/Logger";
import { Checker } from '../types/Auth';
import { RuntimeContext } from '../types/RuntimeContext';
import { Trigger, Executor } from "../types/Trigger";
export declare class TriggerExecutor<ED extends EntityDict> extends Executor<ED> {
    private triggerMap;
    private triggerNameMap;
    private volatileEntities;
    private logger;
    constructor(logger?: Logger);
    registerChecker<T extends keyof ED>(checker: Checker<ED, T>): void;
    registerTrigger<T extends keyof ED>(trigger: Trigger<ED, T>): void;
    private preCommitTrigger;
    preOperation<T extends keyof ED>(entity: T, operation: ED[T]['Operation'], context: RuntimeContext<ED>): Promise<void>;
    private onCommit;
    private postCommitTrigger;
    postOperation<T extends keyof ED>(entity: T, operation: ED[T]['Operation'], context: RuntimeContext<ED>): Promise<void>;
    checkpoint(context: RuntimeContext<ED>, timestamp: number): Promise<number>;
}
