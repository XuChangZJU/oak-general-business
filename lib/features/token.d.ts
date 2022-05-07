import { EntityDict } from 'oak-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
export declare class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private token?;
    private rwLock;
    constructor();
    loginByPassword(mobile: string, password: string, scene: string): Promise<void>;
    loginWechatMp(scene: string): Promise<void>;
    syncUserInfoWechatMp(scene: string): Promise<void>;
    logout(): Promise<void>;
    getToken(): Promise<string | undefined>;
}
