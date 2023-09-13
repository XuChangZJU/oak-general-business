import { MakeOakComponent } from '../src/types/Page';
import { EntityDict } from '../src/oak-app-domain';
import { GeneralAspectDict as AspectDict } from '../src/aspects/AspectDict';
import { GeneralFeatures } from '../src/features';
import { FrontendRuntimeContext } from '../src/context/FrontendRuntimeContext';
import { BackendRuntimeContext } from '../src/context/BackendRuntimeContext';

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
