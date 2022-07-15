import { EntityDict } from 'general-app-domain';
import { Feature, LocalStorage } from 'oak-frontend-base';
import { Cache } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '..';
import { AspectWrapper } from 'oak-domain/lib/types';
export declare class Token<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private token?;
    private rwLock;
    private cache;
    private context;
    private storage;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, context: Cxt);
    loginByMobile(mobile: string, password?: string, captcha?: string): Promise<void>;
    loginWechatMp(): Promise<void>;
    syncUserInfoWechatMp(): Promise<void>;
    logout(): Promise<void>;
    getToken(): Promise<string | undefined>;
    getUserId(): Promise<string | undefined>;
    isRoot(): Promise<boolean>;
    sendCaptcha(mobile: string): Promise<string>;
}
