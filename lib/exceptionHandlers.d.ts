import { ExceptionHandlerDict } from "oak-frontend-base/lib/types/ExceptionHandler";
import { EntityDict } from './general-app-domain';
import { RuntimeContext } from './context/RuntimeContext';
import { GeneralFeatures } from './features/index';
import { AspectDict } from './aspects/AspectDict';
export declare const handlerDict: ExceptionHandlerDict<EntityDict, RuntimeContext<EntityDict>, AspectDict<EntityDict, RuntimeContext<EntityDict>>, GeneralFeatures<EntityDict, RuntimeContext<EntityDict>, AspectDict<EntityDict, RuntimeContext<EntityDict>>>>;
