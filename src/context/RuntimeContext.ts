
import { EntityDict } from '../general-app-domain';

export interface RuntimeContext {
    getApplicationId(): string | undefined;

    getSystemId(): string | undefined;

    getApplication(): Partial<EntityDict['application']['Schema']> | undefined;

    getToken(allowUnloggedIn?: boolean): Partial<EntityDict['token']['Schema']> | undefined; 

    getTokenValue(allowUnloggedIn?: boolean): string | undefined;
    
    isRoot(): boolean;
};