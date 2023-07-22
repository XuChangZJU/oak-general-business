import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from '../general-app-domain';
import { StorageSchema } from 'oak-domain/lib/types';
export declare function rewriteSelection<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, selection: ED[T]['Selection']): Promise<void>;
export declare function rewriteOperation<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, operation: ED[T]['Operation']): Promise<void>;
