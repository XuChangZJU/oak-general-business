import { EntityDict } from 'oak-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { aspectDict } from '../aspects';
import { Feature } from 'oak-frontend-base';
export declare class Token extends Feature<EntityDict, GeneralRuntimeContext<EntityDict>, typeof aspectDict> {
    private token?;
    loginByPassword(mobile: string, password: string): Promise<void>;
    logout(): Promise<void>;
    getToken(): string | undefined;
}
