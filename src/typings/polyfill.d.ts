import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base/lib/types/Page';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../src/RuntimeContext';
import { aspectDict } from '../src/aspects';
import { initialize } from '../src/features';

declare global {
    const generateNewId: (options?: { timestamp?: boolean }) => Promise<string>;

    const OakPage: MakeOakPage<
        EntityDict,
        RuntimeContext,
        typeof aspectDict,
        ReturnType<typeof initialize>['features']
    >;
    const OakComponent: MakeOakComponent<
        EntityDict,
        RuntimeContext,
        typeof aspectDict,
        ReturnType<typeof initialize>['features']
    >;
}
export {};
