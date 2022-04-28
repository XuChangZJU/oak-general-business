import { EntityDict } from 'oak-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
export declare class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private token?;
    loginByPassword(mobile: string, password: string): Promise<void>;
    loginWechatMp(code: string): Promise<void>;
    logout(): Promise<void>;
    getToken(): string | undefined;
}
