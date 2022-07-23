import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base/lib/page.mp';
import { EntityDict } from 'general-app-domain';
import { GeneralRuntimeContext } from '../../src/RuntimeContext';
import { aspectDict } from '../../src/aspects';
import { initialize } from '../../src/features';


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
}
export {}