import { MakeOakComponent } from '../types/Page';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../src/RuntimeContext';
import { AspectDict } from '../src/aspects/AspectDict';
import { GeneralFeatures } from '../src/features';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

declare global {
    const OakComponent: MakeOakComponent<
        EntityDict,
        BackendRuntimeContext<EntityDict>,
        FrontendRuntimeContext<EntityDict, BackendRuntimeContext<EntityDict>, AspectDict<EntityDict, BackendRuntimeContext<EntityDict>>>,
        AspectDict<EntityDict, BackendRuntimeContext<EntityDict>>,
        GeneralFeatures<EntityDict, BackendRuntimeContext<AspectDict>, FrontendRuntimeContext<EntityDict, BackendRuntimeContext<EntityDict>, AspectDict<EntityDict, BackendRuntimeContext<EntityDict>>>, AspectDict<EntityDict, BackendRuntimeContext<EntityDict>>>
    >;
}
export {};
