/// <reference types="node" />
import { RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { BackendRuntimeContext as BRC } from 'oak-frontend-base';
import { AsyncRowStore } from 'oak-domain';
import { IncomingHttpHeaders } from 'http';
/**
 * general数据结构要求的后台上下文
 */
export declare abstract class BackendRuntimeContext<ED extends EntityDict & BaseEntityDict> extends BRC<ED> implements RuntimeContext {
    protected application?: Partial<ED['application']['Schema']>;
    protected token?: Partial<ED['token']['Schema']>;
    protected amIRoot?: boolean;
    protected amIReallyRoot?: boolean;
    protected rootMode?: boolean;
    private temporaryUserId?;
    private tokenException?;
    private initializedMark;
    constructor(store: AsyncRowStore<ED, BackendRuntimeContext<ED>>, data?: SerializedData, headers?: IncomingHttpHeaders);
    refineOpRecords(): Promise<void>;
    setTokenValue(tokenValue: string): Promise<void>;
    setApplication(appId: string): Promise<void>;
    /**
     * 异步等待初始化完成
     */
    protected initialized(): Promise<void>;
    private initialize;
    getApplicationId(): ED["application"]["Schema"]["id"] | undefined;
    getSystemId(): ED["application"]["Schema"]["systemId"] | undefined;
    getApplication(): Partial<ED["application"]["Schema"]> | undefined;
    openRootMode(): () => void;
    getTokenValue(allowUnloggedIn?: boolean): "oak-root-token" | ED["token"]["Schema"]["id"] | undefined;
    getToken(allowUnloggedIn?: boolean): Partial<ED["token"]["Schema"]> | undefined;
    getCurrentUserId(allowUnloggedIn?: boolean): string;
    setTemporaryUserId(userId: string | undefined): void;
    toString(): string;
    isRoot(): boolean;
    isReallyRoot(): boolean;
    sendMessage(data: ED['message']['CreateSingle']['data']): Promise<import("oak-domain").OperationResult<ED>>;
    allowUserUpdate(): boolean;
}
