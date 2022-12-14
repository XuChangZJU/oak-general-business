import { RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import { AsyncContext } from 'oak-domain/lib/store/AsyncRowStore';
/**
 * general数据结构要求的后台上下文
 */
export declare class BackendRuntimeContext<ED extends EntityDict> extends AsyncContext<ED> implements RuntimeContext {
    private application?;
    private token?;
    private amIRoot?;
    private amIReallyRoot?;
    private rootMode?;
    protected initialize(data?: SerializedData): Promise<void>;
    getApplicationId(): ED["application"]["Schema"]["id"] | undefined;
    getSystemId(): ED["application"]["Schema"]["systemId"] | undefined;
    getApplication(): Partial<ED["application"]["Schema"]> | undefined;
    getTokenValue(allowUnloggedIn?: boolean): "oak-root-token" | ED["token"]["Schema"]["id"] | undefined;
    getToken(allowUnloggedIn?: boolean): Partial<ED["token"]["Schema"]> | undefined;
    getCurrentUserId(allowUnloggedIn?: boolean): string;
    toString(): string;
    isRoot(): boolean;
    isReallyRoot(): boolean;
    sendMessage(data: ED['message']['CreateSingle']['data']): Promise<import("oak-domain/lib/types").OperationResult<ED>>;
    allowUserUpdate(): boolean;
}
