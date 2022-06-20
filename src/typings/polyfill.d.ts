import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base';
import { EntityDict } from 'general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import aspectDict from '../aspects';
import { initialize } from '../features';

declare global {
    const OakPage: MakeOakPage<
        EntityDict,
        GeneralRuntimeContext<EntityDict>,
        typeof aspectDict,
        ReturnType<typeof initialize>
    >;
    const OakComponent: MakeOakComponent<
        EntityDict,
        GeneralRuntimeContext<EntityDict>,
        typeof aspectDict,
        ReturnType<typeof initialize>
    >;
    const generateNewId: (options?: { timestamp?: boolean }) => Promise<string>;
}
export {}