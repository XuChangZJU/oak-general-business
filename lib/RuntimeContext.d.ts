import { Context } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
import { RowStore } from 'oak-domain/lib/types';
export declare class RuntimeContext<ED extends EntityDict> extends UniversalContext<ED> implements Context<ED> {
    applicationId: string;
    constructor(store: RowStore<ED>, appId: string);
    getApplication(): Promise<import("oak-domain/lib/types").SelectionResult2<ED["application"]["Schema"], ED["application"]["Selection"]["data"]>>;
    getToken(): void;
}
